// Design System - Sophisticated Meetup App for Ages 17-30
// Following mature, minimalist design principles

export const COLORS = {
  // Primary Colors
  primary: '#5B7C99',           // Muted blue-grey
  primaryDark: '#3D5A73',       // Hover states and emphasis
  primaryLight: '#E8EDF2',      // Subtle backgrounds and disabled states
  
  // Accent Colors
  success: '#6B9080',           // Sage green - "I'm In" states
  warning: '#D4A574',           // Warm sand - Tentative responses
  danger: '#C08B82',            // Dusty rose - Negative actions
  
  // Neutral Base
  background: '#FAFBFC',        // Off-white main background
  surface: '#FFFFFF',           // Card backgrounds
  border: '#E5E8EB',            // Subtle dividers
  
  // Text
  textPrimary: '#1F2937',       // Main text
  textSecondary: '#6B7280',     // Supporting text
  textTertiary: '#9CA3AF',      // Meta information
  
  // Legacy support (will be phased out)
  white: '#FFFFFF',
  textDark: '#1F2937',
  textLight: '#6B7280',
};

export const TYPOGRAPHY = {
  // Font Families
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif',
  },
  
  // Type Scale
  display: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyRegular: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 21,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 17,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 14,
    letterSpacing: 0.3,
    textTransform: 'uppercase' as const,
  },
};

export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SIZES = {
  // Border Radius
  radius: 12,
  radiusSmall: 8,
  radiusLarge: 16,
  
  // Padding (exception to 4px system for comfort)
  cardPadding: 20,
  padding: 16,
  
  // Touch Targets
  minTouchTarget: 44,
  
  // Legacy support
  smallRadius: 8,
  largeRadius: 16,
};

export const SHADOWS = {
  // Elevation Scale
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  level2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  level3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  level4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 4,
  },
  
  // Legacy support
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
};

export const TRANSITIONS = {
  standard: 200,
  quick: 150,
  slow: 300,
};
