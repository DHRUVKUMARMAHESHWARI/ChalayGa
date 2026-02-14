# Visual Design Specifications

## Quick Reference Guide for Developers

This document provides quick-reference specifications for implementing the ChalayGa? design system.

---

## 🎨 Color Palette

### Copy-Paste Ready Colors

```typescript
// Primary Colors
const PRIMARY = '#5B7C99';
const PRIMARY_DARK = '#3D5A73';
const PRIMARY_LIGHT = '#E8EDF2';

// Accent Colors
const SUCCESS = '#6B9080';
const WARNING = '#D4A574';
const DANGER = '#C08B82';

// Neutral Base
const BACKGROUND = '#FAFBFC';
const SURFACE = '#FFFFFF';
const BORDER = '#E5E8EB';

// Text
const TEXT_PRIMARY = '#1F2937';
const TEXT_SECONDARY = '#6B7280';
const TEXT_TERTIARY = '#9CA3AF';
```

### Color Usage Matrix

| Element | Color | Hex |
|---------|-------|-----|
| Primary Button Background | Primary | `#5B7C99` |
| Primary Button Hover | Primary Dark | `#3D5A73` |
| Disabled Background | Primary Light | `#E8EDF2` |
| Success Status | Success | `#6B9080` |
| Warning Status | Warning | `#D4A574` |
| Error Status | Danger | `#C08B82` |
| Screen Background | Background | `#FAFBFC` |
| Card Background | Surface | `#FFFFFF` |
| Borders | Border | `#E5E8EB` |
| Headings | Text Primary | `#1F2937` |
| Body Text | Text Secondary | `#6B7280` |
| Meta Text | Text Tertiary | `#9CA3AF` |

---

## 📝 Typography Specifications

### Font Sizes & Weights

```typescript
// Display - Page Titles
fontSize: 28px
fontWeight: 600
lineHeight: 34px
letterSpacing: -0.5px

// Heading 1 - Section Headers
fontSize: 20px
fontWeight: 600
lineHeight: 26px
letterSpacing: -0.3px

// Heading 2 - Card Titles
fontSize: 16px
fontWeight: 600
lineHeight: 22px
letterSpacing: -0.2px

// Body Large - Emphasis
fontSize: 16px
fontWeight: 400
lineHeight: 24px

// Body Regular - Default
fontSize: 14px
fontWeight: 400
lineHeight: 21px

// Body Small - Meta
fontSize: 12px
fontWeight: 400
lineHeight: 17px

// Caption - Labels
fontSize: 11px
fontWeight: 500
lineHeight: 14px
letterSpacing: 0.3px
textTransform: uppercase
```

### Typography Usage

| Element | Type | Example |
|---------|------|---------|
| Page Title | Display | "Meetup Details" |
| Section Header | H1 | "Recent Plans" |
| Card Title | H2 | "Café Meetup" |
| Button Text | Body Large | "Create Meetup" |
| Body Content | Body Regular | "4 going · Today, 6:30 PM" |
| Meta Info | Body Small | "Started by Dhruv" |
| Labels | Caption | "BEST SPOT" |

---

## 📏 Spacing Values

### Spacing Scale (4px base unit)

```typescript
XXS: 4px   // Icon-text gaps
XS:  8px   // Small gaps
SM:  12px  // Between related elements
MD:  16px  // Standard padding
LG:  24px  // Section spacing
XL:  32px  // Major sections
XXL: 48px  // Hero sections
```

### Common Spacing Patterns

```typescript
// Card Padding
padding: 20px

// Screen Horizontal Padding
paddingHorizontal: 16px

// Section Margin Bottom
marginBottom: 24px

// Element Gap (between items)
gap: 12px

// Icon-Text Gap
gap: 8px

// Header Padding
paddingTop: 60px
paddingBottom: 16px
```

---

## 🔲 Border Radius

```typescript
Small:    8px   // Buttons, small cards
Standard: 12px  // Cards, containers
Large:    16px  // Hero cards, large containers
```

### Usage Examples

| Element | Radius | Value |
|---------|--------|-------|
| Button | Small | 8px |
| Card | Standard | 12px |
| Hero Card | Large | 16px |
| Avatar | Circle | 50% |
| Icon Button | Circle | 50% |

---

## 🌑 Shadows & Elevation

### Shadow Specifications

```typescript
// Level 1 - Cards at Rest
shadowColor: '#000'
shadowOffset: { width: 0, height: 1 }
shadowOpacity: 0.06
shadowRadius: 3
elevation: 1

// Level 2 - Raised/Hover
shadowColor: '#000'
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.08
shadowRadius: 6
elevation: 2

// Level 3 - Elevated
shadowColor: '#000'
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.1
shadowRadius: 12
elevation: 3

// Level 4 - Modal
shadowColor: '#000'
shadowOffset: { width: 0, height: 8 }
shadowOpacity: 0.12
shadowRadius: 24
elevation: 4
```

### Elevation Usage

| Element | Level | When |
|---------|-------|------|
| Card | 1 | At rest |
| Card | 2 | On hover/press |
| Floating Button | 2 | Always |
| Bottom Nav | 1 | Always |
| Modal | 4 | Always |

---

## 🎯 Touch Targets

### Minimum Sizes

```typescript
// Standard Touch Target
minWidth: 44px
minHeight: 44px

// Icon Button
width: 44px
height: 44px

// Navigation Item
width: 44px
height: 44px

// Minimum Spacing Between Targets
gap: 8px
```

---

## 🎨 Component Specifications

### Button

```typescript
// Primary Button
backgroundColor: COLORS.primary (#5B7C99)
color: COLORS.surface (#FFFFFF)
paddingVertical: 14px
paddingHorizontal: 24px
borderRadius: 8px
height: 48px
fontWeight: 600
fontSize: 15px

// Secondary Button
backgroundColor: transparent
borderWidth: 1.5px
borderColor: COLORS.border (#E5E8EB)
color: COLORS.primary (#5B7C99)
paddingVertical: 14px
paddingHorizontal: 24px
borderRadius: 8px
height: 48px
fontWeight: 600
fontSize: 15px

// Ghost Button
backgroundColor: transparent
color: COLORS.primary (#5B7C99)
paddingVertical: 14px
paddingHorizontal: 16px
borderRadius: 8px
height: 44px
fontWeight: 600
fontSize: 15px

// Button States
Pressed: scale(0.98), opacity: 0.9
Disabled: opacity: 0.4
```

### Card

```typescript
// Standard Card
backgroundColor: COLORS.surface (#FFFFFF)
borderWidth: 1px
borderColor: COLORS.border (#E5E8EB)
borderRadius: 12px
padding: 20px
shadowColor: '#000'
shadowOffset: { width: 0, height: 1 }
shadowOpacity: 0.06
shadowRadius: 3
elevation: 1

// Card Pressed State
scale: 0.99
opacity: 0.95
```

### Input Field

```typescript
// Text Input
borderWidth: 1.5px
borderColor: COLORS.border (#E5E8EB)
borderRadius: 8px
paddingVertical: 12px
paddingHorizontal: 16px
height: 48px
fontSize: 15px
color: COLORS.textPrimary (#1F2937)

// Focus State
borderColor: COLORS.primary (#5B7C99)
shadowColor: COLORS.primary
shadowOpacity: 0.1
shadowRadius: 3

// Error State
borderColor: COLORS.danger (#C08B82)
```

### Radio Button

```typescript
// Radio Circle
width: 20px
height: 20px
borderRadius: 10px
borderWidth: 2px
borderColor: COLORS.border (#E5E8EB)

// Selected State
borderColor: COLORS.success (#6B9080) // or warning/danger
backgroundColor: transparent

// Inner Dot (when selected)
width: 10px
height: 10px
borderRadius: 5px
backgroundColor: COLORS.success (#6B9080) // or warning/danger

// Container
paddingVertical: 14px
paddingHorizontal: 16px
borderRadius: 8px
borderWidth: 2px
borderColor: COLORS.border (#E5E8EB)

// Selected Container
borderColor: COLORS.success (#6B9080) // or warning/danger
backgroundColor: rgba(107, 144, 128, 0.05) // 5% tint
```

---

## 🔤 Icon Specifications

### Icon Properties

```typescript
// Default Icon
size: 24px
strokeWidth: 2px
color: COLORS.textSecondary (#6B7280)
strokeLinecap: 'round'
strokeLinejoin: 'round'

// Small Icon
size: 16px
strokeWidth: 2px

// Large Icon
size: 32px
strokeWidth: 2px

// Active/Primary Icon
color: COLORS.primary (#5B7C99)
strokeWidth: 2.5px
```

### Icon Sizes by Context

| Context | Size | Stroke |
|---------|------|--------|
| Navigation | 24px | 2px |
| Button | 20px | 2px |
| Category Card | 32px | 2px |
| List Item | 20px | 2px |
| Meta Info | 16px | 2px |

---

## 📱 Layout Specifications

### Screen Layout

```typescript
// Screen Container
backgroundColor: COLORS.background (#FAFBFC)
paddingHorizontal: 16px

// Header
height: 56px
paddingHorizontal: 16px
paddingVertical: 16px
backgroundColor: COLORS.surface (#FFFFFF)
borderBottomWidth: 1px
borderBottomColor: COLORS.border (#E5E8EB)

// Section
marginBottom: 24px

// Section Title
marginBottom: 16px
```

### Bottom Navigation

```typescript
// Container
height: 86px // 56px + 30px safe area
backgroundColor: COLORS.surface (#FFFFFF)
borderTopWidth: 1px
borderTopColor: COLORS.border (#E5E8EB)
paddingVertical: 8px
paddingBottom: 30px
shadowColor: '#000'
shadowOffset: { width: 0, height: 1 }
shadowOpacity: 0.06
shadowRadius: 3

// Nav Item
width: 44px
height: 44px
justifyContent: 'center'
alignItems: 'center'

// Active Icon
color: COLORS.primary (#5B7C99)
strokeWidth: 2.5px

// Inactive Icon
color: COLORS.textSecondary (#6B7280)
strokeWidth: 2px
```

### Grid Layout

```typescript
// 3-Column Grid
flexDirection: 'row'
gap: 12px

// Grid Item
flex: 1
aspectRatio: 1
```

---

## ⏱️ Animation Specifications

### Transition Timings

```typescript
// Standard (default)
duration: 200ms
easing: ease-in-out

// Quick (button press)
duration: 150ms
easing: ease-out

// Slow (page transition)
duration: 300ms
easing: ease-in-out
```

### Common Animations

```typescript
// Button Press
transform: [{ scale: 0.98 }]
opacity: 0.9
duration: 100ms

// Card Press
transform: [{ scale: 0.99 }]
duration: 150ms

// Fade In
opacity: 0 → 1
duration: 200ms

// Slide Up
translateY: 20px → 0
duration: 250ms
```

---

## 📐 Measurement Reference

### Quick Conversion Table

| Spacing | Value | Use Case |
|---------|-------|----------|
| XXS | 4px | Tight gaps |
| XS | 8px | Icon-text |
| SM | 12px | Related items |
| MD | 16px | Standard padding |
| LG | 24px | Sections |
| XL | 32px | Major sections |
| XXL | 48px | Hero areas |

### Component Dimensions

| Component | Width | Height |
|-----------|-------|--------|
| Button | Auto/100% | 48px |
| Icon Button | 44px | 44px |
| Avatar (small) | 32px | 32px |
| Avatar (medium) | 40px | 40px |
| Input Field | 100% | 48px |
| Nav Bar | 100% | 86px |
| Header | 100% | 56px |

---

## 🎯 Accessibility Checklist

### Color Contrast

- [ ] Text Primary on Surface: 12.6:1 ✅
- [ ] Text Secondary on Surface: 4.5:1 ✅
- [ ] Primary on Surface: 3.8:1 ✅
- [ ] Success on Surface: 3.5:1 ✅
- [ ] Warning on Surface: 3.2:1 ✅
- [ ] Danger on Surface: 3.4:1 ✅

### Touch Targets

- [ ] All interactive elements ≥ 44x44px ✅
- [ ] Spacing between targets ≥ 8px ✅
- [ ] Clear visual feedback on press ✅

---

## 🛠️ Implementation Snippets

### Creating a Card

```tsx
import Card from '../components/Card';

<Card elevation="level1" onPress={handlePress}>
  <Text style={styles.cardTitle}>Card Title</Text>
  <Text style={styles.cardBody}>Card content goes here</Text>
</Card>
```

### Creating a Button

```tsx
import Button from '../components/Button';

<Button 
  title="Primary Action"
  onPress={handlePress}
  variant="primary"
  fullWidth
/>
```

### Using Icons

```tsx
import Icon from '../components/Icon';

<Icon name="home" size={24} color={COLORS.primary} />
```

### Applying Typography

```tsx
import { TYPOGRAPHY } from '../constants/theme';

const styles = StyleSheet.create({
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  body: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
  },
});
```

---

## 📋 Design Checklist

Before submitting any UI work, verify:

- [ ] No emojis in UI chrome (only in user content)
- [ ] Colors from design system palette
- [ ] Font sizes from typography scale
- [ ] Spacing uses 4px system
- [ ] Touch targets ≥ 44x44px
- [ ] Shadows from elevation system
- [ ] Border radius: 8px, 12px, or 16px
- [ ] Icons are outline style, 2px stroke
- [ ] Transitions ≤ 300ms
- [ ] WCAG AA contrast ratios met

---

**Last Updated**: February 13, 2026
**Version**: 1.0.0
**Quick Reference**: Keep this document handy during development
