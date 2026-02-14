import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS, TRANSITIONS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  style 
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...(fullWidth && { width: '100%' }),
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? COLORS.primaryLight : COLORS.primary,
          ...SHADOWS.level1,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: disabled ? COLORS.border : COLORS.border,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = styles.buttonText;

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: disabled ? COLORS.textTertiary : COLORS.surface,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: disabled ? COLORS.textTertiary : COLORS.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? COLORS.textTertiary : COLORS.primary,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: SIZES.radiusSmall,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
});
