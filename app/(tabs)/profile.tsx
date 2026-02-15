import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../../src/constants/theme";
import { getUserProfile, clearAuthData } from "../../src/api/storage";
import Icon from "../../src/components/Icon";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
    checkPushToken();
  }, []);

  const checkPushToken = async () => {
    try {
      // We can't easily get the storage token here without exporting a getter, 
      // but we can try to register again which retrieves the existing token
      const { registerForPushNotifications } = require("../../src/notifications/registerPushToken");
      const token = await registerForPushNotifications();
      setPushToken(token);
    } catch (e) {
      console.log("Error fetching token for display:", e);
    }
  };

  const loadProfile = async () => {
    try {
      const userData = await getUserProfile();
      setProfile(userData);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await clearAuthData();
            // Go to auth screen
            router.replace("/auth");
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const initials = profile?.name
    ? profile.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "??";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Animated.View entering={FadeInUp.duration(600)} style={styles.header}>
        <Animated.View entering={ZoomIn.delay(300).duration(500)} style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{initials}</Text>
        </Animated.View>
        <Text style={styles.name}>{profile?.name || "User Name"}</Text>
        <Text style={styles.username}>@{profile?.username || "username"}</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="mail" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{profile?.email || "Not provided"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="phone" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{profile?.phone || "Not provided"}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, styles.noBorder]}>
            <View style={styles.infoIcon}>
              <Icon name="bell" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Push Token Status</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {pushToken ? "Active ✅" : "Inactive ❌"}
              </Text>
              {pushToken && (
                <Text style={{ fontSize: 10, color: COLORS.textTertiary }} numberOfLines={1} ellipsizeMode="middle">
                  {pushToken}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed
          ]}
          onPress={handleLogout}
        >
          <Icon name="log-out" size={20} color={COLORS.danger || "#FF3B30"} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </Animated.View>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    paddingTop: 80,
    paddingBottom: SPACING.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
    ...SHADOWS.level2,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  name: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  username: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    ...SHADOWS.level1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + "1A", // 10% opacity
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textPrimary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    ...SHADOWS.level1,
  },
  logoutText: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.danger || "#FF3B30",
    marginLeft: SPACING.sm,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  versionText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});
