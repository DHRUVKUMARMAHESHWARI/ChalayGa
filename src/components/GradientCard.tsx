import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES, SHADOWS } from "../constants/theme";

interface GradientCardProps {
  colors: string[];
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function GradientCard({
  colors,
  children,
  style,
}: GradientCardProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radius,
    padding: 20,
    ...SHADOWS.medium,
  },
});
