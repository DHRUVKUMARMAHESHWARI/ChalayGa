import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";

interface CategoryCardProps {
  emoji: string;
  title: string;
  backgroundColor: string;
  onPress: () => void;
}

export default function CategoryCard({
  emoji,
  title,
  backgroundColor,
  onPress,
}: CategoryCardProps) {
  return (
    <Pressable
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.white,
  },
});
