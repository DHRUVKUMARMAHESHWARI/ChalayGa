import React, { ReactNode } from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { COLORS, SPACING, SIZES, SHADOWS } from '../constants/theme';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: 'none' | 'level1' | 'level2' | 'level3';
  padding?: number;
}

export default function Card({ 
  children, 
  onPress, 
  style,
  elevation = 'level1',
  padding = SIZES.cardPadding,
}: CardProps) {
  const cardStyle: ViewStyle = {
    ...styles.card,
    padding,
    ...SHADOWS[elevation],
  };

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.cardPressed,
          style,
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[cardStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },
});
