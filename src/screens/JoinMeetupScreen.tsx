import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../constants/theme";
import { getMeetupByCode } from "../api/meetupApi";
import Icon from "../components/Icon";

export default function JoinMeetupScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!code || code.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-character invite code");
      return;
    }

    setLoading(true);
    try {
      const meetup = await getMeetupByCode(code.toUpperCase());
      
      router.push({
        pathname: "/room",
        params: {
          meetupId: meetup._id,
          meetupType: meetup.type,
          meetupCode: meetup.code,
          hostName: meetup.hostName,
          meetupTitle: meetup.title
        }
      });
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to find meetup. Check your code.");
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
        <Text style={styles.headerTitle}>Join Meetup</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.hero}>
          <View style={styles.iconBadge}>
            <Icon name="users" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Have a Code?</Text>
          <Text style={styles.subtitle}>
            Enter the 4-character invite code shared by your friend to join the plan.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Invite Code</Text>
            <TextInput
              style={styles.codeInput}
              placeholder="ABCD"
              value={code}
              onChangeText={(text) => setCode(text.toUpperCase())}
              maxLength={4}
              autoCapitalize="characters"
              autoFocus
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.joinButton,
              pressed && styles.pressed,
              (loading || code.length !== 4) && styles.disabled,
            ]}
            onPress={handleJoin}
            disabled={loading || code.length !== 4}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.joinText}>Join Meetup</Text>
            )}
          </Pressable>
        </Animated.View>
      </View>
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
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: 40,
  },
  hero: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.display,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: SPACING.xl,
    alignItems: "center",
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  codeInput: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.border,
    width: "100%",
    height: 100,
    letterSpacing: 10,
  },
  joinButton: {
    height: 56,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.level2,
  },
  joinText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: COLORS.border,
    opacity: 0.6,
  },
});
