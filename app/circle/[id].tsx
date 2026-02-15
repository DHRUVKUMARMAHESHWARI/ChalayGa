import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown, Layout } from "react-native-reanimated";

import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../../src/constants/theme";
import Icon from "../../src/components/Icon";
import { getCircle, updateCircle, deleteCircle } from "../../src/api/circleApi";
import { searchUsers } from "../../src/api/userApi";

export default function CircleDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [memberUsername, setMemberUsername] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCircleDetails();
  }, [id]);

  const fetchCircleDetails = async () => {
    try {
      setLoading(true);
      const data = await getCircle(id as string);
      setName(data.name);
      setMembers(data.members || []);
    } catch (error) {
      console.error("Error fetching circle details:", error);
      Alert.alert("Error", "Failed to load circle details.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (memberUsername.trim().length > 1) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [memberUsername]);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const data = await searchUsers(memberUsername.trim());
      // Filter out users already in members list
      const existingUsernames = members.map(m => m.username);
      const filtered = data.filter((u: any) => !existingUsernames.includes(u.username));
      setSearchResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const addMember = (user: any) => {
    if (members.some(m => m.username === user.username)) {
      Alert.alert("Already Added", "This user is already in the list.");
      return;
    }
    setMembers([...members, user]);
    setMemberUsername("");
    setSearchResults([]);
  };

  const removeMember = (username: string) => {
    setMembers(members.filter((m) => m.username !== username));
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a circle name.");
      return;
    }

    setUpdating(true);
    try {
      const memberUsernames = members.map(m => m.username);
      await updateCircle(id as string, name.trim(), memberUsernames);
      Alert.alert("Success", "Circle updated successfully!");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update circle.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Circle",
      "Are you sure you want to delete this circle? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteCircle(id as string);
              router.back();
            } catch (error: any) {
              Alert.alert("Error", error.message || "Failed to delete circle.");
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={COLORS.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Circle</Text>
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <Icon name="trash-2" size={22} color={COLORS.danger} />
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInUp.duration(600)}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Circle Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Office Buddies, Cafe Gang"
              value={name}
              onChangeText={setName}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Add Members</Text>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <Icon name="search" size={20} color={COLORS.textTertiary} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name or username"
                  value={memberUsername}
                  onChangeText={setMemberUsername}
                  autoCapitalize="none"
                  placeholderTextColor={COLORS.textTertiary}
                />
                {isSearching && (
                  <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />
                )}
              </View>
            </View>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <Animated.View entering={FadeInDown.duration(200)} style={styles.resultsContainer}>
                {searchResults.map((user) => (
                  <TouchableOpacity
                    key={user._id}
                    style={styles.resultItem}
                    onPress={() => addMember(user)}
                  >
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultName}>{user.name}</Text>
                      <Text style={styles.resultUsername}>@{user.username}</Text>
                    </View>
                    <View style={styles.miniAddButton}>
                      <Icon name="plus" size={16} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
          </View>

          {members.length > 0 && (
            <View style={styles.membersList}>
              <Text style={styles.membersLabel}>Circle Members ({members.length})</Text>
              <View style={styles.chipContainer}>
                {members.map((user) => (
                  <Animated.View 
                    layout={Layout.springify()}
                    key={user.username} 
                    style={styles.chip}
                  >
                    <Text style={styles.chipText}>@{user.username}</Text>
                    <TouchableOpacity onPress={() => removeMember(user.username)}>
                      <Icon name="x-circle" size={18} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.pressed,
              updating && styles.disabled,
            ]}
            onPress={handleUpdate}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.saveText}>Save Changes</Text>
            )}
          </Pressable>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  content: {
    padding: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.xl,
    zIndex: 10,
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    height: 56,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchContainer: {
    position: 'relative',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 56,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    height: '100%',
  },
  loader: {
    marginLeft: 10,
  },
  resultsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.level2,
    maxHeight: 250,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  resultUsername: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  miniAddButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  membersList: {
    marginBottom: SPACING.xl,
  },
  membersLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.level1,
  },
  chipText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginRight: 6,
  },
  saveButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.lg,
    ...SHADOWS.level2,
  },
  saveText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.6,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
