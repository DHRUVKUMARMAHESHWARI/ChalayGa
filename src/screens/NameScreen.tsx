import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../constants/theme";

export default function NameScreen() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleContinue = async () => {
    if (name.trim().length === 0) return;

    try {
      await AsyncStorage.setItem("userName", name.trim());
      // Navigate to home (which will now pass the check in index.tsx)
      router.replace("/");
    } catch (e) {
      console.error("Failed to save name", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Animated.View entering={FadeInUp.delay(200).duration(600).springify()}>
          <Text style={styles.title}>What should we call you?</Text>
          <Text style={styles.subtitle}>
            Your friends need to know who's planning the meetup.
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(400).duration(600).springify()}
          style={styles.inputContainer}
        >
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Dhruv"
            placeholderTextColor={COLORS.textTertiary}
            value={name}
            onChangeText={setName}
            autoFocus
            autoCapitalize="words"
            autoCorrect={false}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(600).springify()}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              !name.trim() && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleContinue}
            disabled={!name.trim()}
          >
            <Text style={styles.buttonText}>Continue 🚀</Text>
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: "center",
  },
  title: {
    ...TYPOGRAPHY.display,
    fontSize: 32,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xxl,
  },
  inputContainer: {
    marginBottom: SPACING.xxl,
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SPACING.md,
    fontSize: 18,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
  },
  button: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.level2,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    ...SHADOWS.level1,
  },
  buttonText: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
