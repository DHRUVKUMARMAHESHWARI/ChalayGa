import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, ActivityIndicator, TextInput, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMeetup, getAllMeetups } from "../api/meetupApi";
import { searchUsers } from "../api/authApi";
import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../constants/theme";
import Icon from "../components/Icon";

import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [myPlans, setMyPlans] = React.useState<any[]>([]);
  const [demoPlans] = React.useState([
    { _id: 'd1', title: 'Weekend Coffee', type: 'cafe', hostName: 'Rohan', distance: '0.5 km' },
    { _id: 'd2', title: 'Morning Jog', type: 'walk', hostName: 'Ridhi', distance: '1.2 km' },
    { _id: 'd3', title: 'Pizza Party', type: 'food', hostName: 'Yash', distance: '2.0 km' },
  ]);

  // Search states
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const fetchRecentMeetups = async () => {
    try {
      const data = await getAllMeetups({ my: true });
      setMyPlans(data || []);
    } catch (error) {
      console.error("Error fetching meetups:", error);
    }
  };

  React.useEffect(() => {
    import("../api/storage").then(({ getUserProfile }) => {
      getUserProfile().then((profile) => {
        if (profile) setUser(profile);
      });
    });
    fetchRecentMeetups();
  }, []);
  
  const generateMeetupCode = () => {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const createAndNavigate = async (type: string, title?: string) => {
    if (loading || !user) return;
    setLoading(true);

    try {
      const code = generateMeetupCode();
      
      const response = await createMeetup({
        hostId: user.id,
        hostName: user.name,
        hostUsername: user.username,
        type,
        code,
        title,
        visibility: 'private' // Default to private
      });
      
      const newMeetup = response.meetupId ? response : response.data;

      navigation.push({ 
        pathname: "/room", 
        params: { 
          meetupId: newMeetup._id || newMeetup.meetupId,
          meetupType: newMeetup.type,
          meetupCode: newMeetup.code,
          hostName: newMeetup.hostName,
          meetupTitle: newMeetup.title
        } 
      });
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Connection Error",
        "Failed to create meetup. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (type: string) => {
    createAndNavigate(type);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchUsers(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Minimal Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>CHALAYGA?</Text>
          <View style={styles.headerIcons}>
            <Pressable 
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
              onPress={() => setIsSearchVisible(true)}
            >
              <Icon name="search" size={20} color={COLORS.textSecondary} />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user ? user.name[0].toUpperCase() : "U"}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        
        {/* Greeting */}
        {user ? (
          <Text style={styles.greeting}>Hello, {user.name}</Text>
        ) : null}

        {/* Hero Card - "Plan a Meetup" */}
        <Pressable 
          style={styles.heroCard}
          onPress={() => createAndNavigate("custom")}
        >
          <Text style={styles.heroTitle}>Plan a Meetup</Text>
          <Text style={styles.heroSubtitle}>Pick a place and gather</Text>
          <View style={styles.heroPlusButton}>
            <Icon name="plus-circle" size={40} color={COLORS.primary} />
          </View>
        </Pressable>

        {/* Join with Code Section */}
        <View style={styles.section}>
          <Pressable 
            style={styles.joinCodeButton}
            onPress={() => navigation.push("/join")}
          >
            <View style={styles.joinCodeIcon}>
              <Icon name="hash" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.joinCodeTextContainer}>
              <Text style={styles.joinCodeTitle}>Join with Code</Text>
              <Text style={styles.joinCodeSubtitle}>Enter invite code from a friend</Text>
            </View>
            <Icon name="arrow-right" size={18} color={COLORS.textTertiary} />
          </Pressable>
        </View>

        {/* Your Plans Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Plans ✨</Text>
            <Pressable onPress={fetchRecentMeetups}>
              <Text style={styles.viewAllLink}>Refresh</Text>
            </Pressable>
          </View>
          
          {myPlans.length > 0 ? (
            myPlans.slice(0, 3).map((meetup) => (
              <Pressable 
                key={meetup._id}
                style={[styles.recentPlanCard, { marginBottom: SPACING.sm }]}
                onPress={() => navigation.push({
                  pathname: "/room",
                  params: {
                    meetupId: meetup._id,
                    meetupType: meetup.type,
                    meetupCode: meetup.code,
                    hostName: meetup.hostName,
                    meetupTitle: meetup.title
                  }
                })}
              >
                <View style={styles.planIconContainer}>
                  <Icon 
                    name={meetup.type === 'cafe' ? 'coffee' : meetup.type === 'walk' ? 'footprints' : 'utensils'} 
                    size={20} 
                    color={COLORS.primary} 
                  />
                </View>
                <View style={styles.planInfo}>
                  <Text style={styles.planTitle}>{meetup.title || 'Untitled Plan'}</Text>
                  <Text style={styles.planSubtitle}>{meetup.participants?.length || 0} People • {meetup.status}</Text>
                </View>
                <Icon name="arrow-right" size={16} color={COLORS.textTertiary} />
              </Pressable>
            ))
          ) : (
            <Text style={{ ...TYPOGRAPHY.bodySmall, color: COLORS.textTertiary, textAlign: 'center', marginVertical: 10 }}>
              No plans yet. Start by picking a category!
            </Text>
          )}
        </View>

        {/* Near You (Demo) Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Near You (Demo)</Text>
            <View style={styles.demoBadge}>
                <Text style={styles.demoBadgeText}>UI ONLY</Text>
            </View>
          </View>
          
          {demoPlans.map((plan) => (
            <Pressable 
              key={plan._id}
              style={[styles.recentPlanCard, { marginBottom: SPACING.sm, opacity: 0.8 }]}
              onPress={() => Alert.alert("Demo Mode", "This is a dummy public plan for UI demonstration purposes.")}
            >
              <View style={[styles.planIconContainer, { backgroundColor: COLORS.border }]}>
                <Icon 
                  name={plan.type === 'cafe' ? 'coffee' : plan.type === 'walk' ? 'footprints' : 'utensils'} 
                  size={20} 
                  color={COLORS.textSecondary} 
                />
              </View>
              <View style={styles.planInfo}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planSubtitle}>By {plan.hostName} • {plan.distance}</Text>
              </View>
              <Icon name="lock" size={16} color={COLORS.textTertiary} />
            </Pressable>
          ))}
        </View>

        {/* Category Cards - "Plan a Meetup" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          
          <View style={styles.categoryGrid}>
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("food")}
            >
              <Icon name="utensils" size={32} color={COLORS.textSecondary} />
              <Text style={styles.categoryText}>Food</Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("cafe")}
            >
              <Icon name="coffee" size={32} color={COLORS.textSecondary} />
              <Text style={styles.categoryText}>Café</Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("walk")}
            >
              <Icon name="footprints" size={32} color={COLORS.textSecondary} />
              <Text style={styles.categoryText}>Walk</Text>
            </Pressable>
          </View>
        </View>

        {/* Bottom spacing for navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>

      
      {/* Search Modal */}
      <Modal
        visible={isSearchVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSearchVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.searchModalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setIsSearchVisible(false)} style={styles.modalCloseButton}>
                <Icon name="arrow-left" size={24} color={COLORS.textPrimary} />
              </Pressable>
              <View style={styles.searchBarWrapper}>
                <Icon name="search" size={18} color={COLORS.textTertiary} style={styles.searchBarIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChangeText={handleSearch}
                  autoFocus
                  autoCapitalize="none"
                />
              </View>
            </View>

            <ScrollView style={styles.searchResultsList} showsVerticalScrollIndicator={false}>
              {isSearching ? (
                <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} />
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    searchResults.map((u) => (
                      <Pressable key={u._id} style={styles.userResultItem}>
                        <View style={styles.userAvatarSmall}>
                          <Text style={styles.userAvatarTextSmall}>
                            {u.name[0].toUpperCase()}
                          </Text>
                        </View>
                        <View style={styles.userInfoSmall}>
                          <Text style={styles.userNameSmall}>{u.name}</Text>
                          <Text style={styles.userUsernameSmall}>@{u.username}</Text>
                        </View>
                        <Icon name="plus-circle" size={20} color={COLORS.primary} />
                      </Pressable>
                    ))
                  ) : searchQuery.length >= 2 ? (
                    <Text style={styles.noResultsText}>No users found for "{searchQuery}"</Text>
                  ) : (
                    <View style={styles.searchEmptyState}>
                      <Icon name="users" size={48} color={COLORS.border} />
                      <Text style={styles.searchEmptyText}>Type at least 2 characters to search</Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Creating Room...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  searchModalContent: {
    height: '90%',
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  modalCloseButton: {
    padding: 8,
  },
  searchBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.md,
    height: 44,
  },
  searchBarIcon: {
    marginRight: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textPrimary,
  },
  searchResultsList: {
    flex: 1,
    padding: SPACING.md,
  },
  userResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  userAvatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  userAvatarTextSmall: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  userInfoSmall: {
    flex: 1,
  },
  userNameSmall: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  userUsernameSmall: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 40,
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
  },
  searchEmptyState: {
    alignItems: 'center',
    marginTop: 80,
    opacity: 0.5,
  },
  searchEmptyText: {
    marginTop: SPACING.md,
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.7,
  },
  
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  logo: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: COLORS.textPrimary,
  },
  headerIcons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  
  // Join Code Section
  joinCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.level1,
  },
  joinCodeIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  joinCodeTextContainer: {
    flex: 1,
  },
  joinCodeTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  joinCodeSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  
  // Hero Card
  heroCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    height: 180,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.level1,
  },
  heroTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  heroPlusButton: {
    marginTop: SPACING.sm,
  },
  
  // Sections
  section: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  viewAllLink: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.primary,
    fontWeight: "500",
  },
  demoBadge: {
    backgroundColor: COLORS.border,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  demoBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  
  // Recent Plan Card
  recentPlanCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    ...SHADOWS.level1,
  },
  planIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  planSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  
  // Category Grid
  categoryGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  categoryCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    ...TYPOGRAPHY.bodyRegular,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  
  greeting: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  loadingText: {
    marginTop: SPACING.md,
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});
