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
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, FadeInDown, Layout } from "react-native-reanimated";

import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../src/constants/theme";
import Icon from "../src/components/Icon";
import { createCircle } from "../src/api/circleApi";
import { searchUsers } from "../src/api/userApi";

export default function CreateCircleScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [memberUsername, setMemberUsername] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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
      const filtered = data.filter((u: any) => !members.includes(u.username));
      setSearchResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const addMember = (username: string) => {
    if (!username.trim()) return;
    if (members.includes(username.trim())) {
      Alert.alert("Already Added", "This user is already in the list.");
      return;
    }
    setMembers([...members, username.trim()]);
    setMemberUsername("");
    setSearchResults([]);
  };

  const removeMember = (username: string) => {
    setMembers(members.filter((m) => m !== username));
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a circle name.");
      return;
    }

    setLoading(true);
    try {
      await createCircle(name.trim(), members);
      Alert.alert("Success", "Circle created successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create circle.");
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.headerTitle}>New Circle</Text>
        <View style={{ width: 44 }} />
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
                    onPress={() => addMember(user.username)}
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
                {members.map((username) => (
                  <Animated.View 
                    layout={Layout.springify()}
                    key={username} 
                    style={styles.chip}
                  >
                    <Text style={styles.chipText}>@{username}</Text>
                    <TouchableOpacity onPress={() => removeMember(username)}>
                      <Icon name="x-circle" size={18} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.pressed,
              loading && styles.disabled,
            ]}
            onPress={handleCreate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.createText}>Create Circle</Text>
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
  createButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.lg,
    ...SHADOWS.level2,
  },
  createText: {
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
});

