# ChalayGa? Design System Documentation

## Overview
This design system implements a sophisticated, minimalist aesthetic for a meetup planning application targeting users aged 17-30. The design philosophy emphasizes maturity, clarity, and calm over playfulness.

---

## Design Principles

### 1. Maturity Over Playfulness
- **No emojis in UI chrome** - Emojis are reserved for user-generated content only
- **Refined color palette** - Muted, sophisticated colors instead of bright, saturated ones
- **Professional typography** - Clear hierarchy with consistent weights and sizes

### 2. Clarity Through Hierarchy
- **Clear type scale** - 7 distinct typography levels from display to caption
- **Consistent spacing** - 4px base unit system (xxs to xxl)
- **Purposeful whitespace** - Generous spacing for breathing room

### 3. Calm & Sophisticated
- **Subtle shadows** - 4-level elevation system with minimal opacity
- **Muted colors** - Blue-grey primary with sage, sand, and dusty rose accents
- **Unobtrusive animations** - Quick 150-200ms transitions, no bouncing

---

## Color Palette

### Primary Colors
```typescript
primary: '#5B7C99'      // Muted blue-grey - Primary CTAs
primaryDark: '#3D5A73'  // Hover states and emphasis
primaryLight: '#E8EDF2' // Subtle backgrounds, disabled states
```

### Accent Colors
```typescript
success: '#6B9080'  // Sage green - "I'm In" states
warning: '#D4A574'  // Warm sand - Tentative responses
danger: '#C08B82'   // Dusty rose - Negative actions
```

### Neutral Base
```typescript
background: '#FAFBFC'   // Off-white main background
surface: '#FFFFFF'      // Card backgrounds
border: '#E5E8EB'       // Subtle dividers
```

### Text
```typescript
textPrimary: '#1F2937'    // Main text
textSecondary: '#6B7280'  // Supporting text
textTertiary: '#9CA3AF'   // Meta information
```

### Usage Guidelines
- **Primary color** for main CTAs, active states, and brand elements
- **Accent colors** only for status indicators (success/warning/danger)
- **Never use pure black** - Use textPrimary (#1F2937) instead
- **Maintain WCAG AA contrast** - Minimum 4.5:1 for normal text

---

## Typography

### Type Scale
```typescript
Display:      28px, Weight 600, Line Height 34px  // Page titles
Heading 1:    20px, Weight 600, Line Height 26px  // Section headers
Heading 2:    16px, Weight 600, Line Height 22px  // Card titles
Body Large:   16px, Weight 400, Line Height 24px  // Emphasis text
Body Regular: 14px, Weight 400, Line Height 21px  // Default body
Body Small:   12px, Weight 400, Line Height 17px  // Meta text
Caption:      11px, Weight 500, Line Height 14px  // Labels (uppercase)
```

### Font Family
- **Primary**: System font stack
- **iOS**: -apple-system, SF Pro Display
- **Android**: Roboto
- **Fallback**: Inter, sans-serif

### Usage Guidelines
- Use **Display** for main page titles only
- Use **H1** for major section headers
- Use **H2** for card titles and subsections
- Use **Body Regular** as default for all content
- Use **Caption** for labels (always uppercase with letter-spacing: 0.3px)
- **Never use font sizes** outside the type scale

---

## Spacing System

### Base Unit: 4px
```typescript
xxs: 4px   // Tight spacing (icon-text gaps)
xs:  8px   // Compact spacing (small gaps)
sm:  12px  // Small gaps (between related elements)
md:  16px  // Standard spacing (default padding)
lg:  24px  // Section spacing (between sections)
xl:  32px  // Major sections (page-level spacing)
xxl: 48px  // Extra large (hero sections)
```

### Application
- **Card padding**: 20px (exception for comfort)
- **Screen padding**: 16px (md)
- **Between sections**: 24px (lg)
- **Between card elements**: 12px (sm)
- **Icon-text gap**: 4-8px (xxs-xs)

---

## Elevation & Shadows

### Shadow Levels
```typescript
none:   No shadow (flat elements)
level1: 0 1px 3px rgba(0,0,0,0.06)  // Subtle (cards at rest)
level2: 0 2px 6px rgba(0,0,0,0.08)  // Raised (cards on hover)
level3: 0 4px 12px rgba(0,0,0,0.1)  // Elevated (floating buttons)
level4: 0 8px 24px rgba(0,0,0,0.12) // Modal (overlays, modals)
```

### Usage
- **Cards at rest**: level1
- **Cards on hover**: level2
- **Floating action buttons**: level2
- **Bottom navigation**: level1 + top border
- **Modals/sheets**: level4

---

## Border Radius

```typescript
radiusSmall: 8px   // Buttons, small cards
radius: 12px       // Standard cards
radiusLarge: 16px  // Hero cards, large containers
```

---

## Icons

### Style
- **Type**: Outline/Line icons
- **Stroke**: 2px consistent weight
- **Size**: 24px default (scale to 16px, 20px, 32px as needed)
- **Style**: Rounded caps and joins
- **Color**: Inherit from context (textSecondary by default)

### Icon Set
All icons are custom SVG components in `/src/components/Icon.tsx`:
- Navigation: home, calendar, plus-circle, message-circle, user-circle
- Actions: search, arrow-left, arrow-right, users, map-pin, clock
- Categories: utensils, coffee, footprints
- Status: check, x, help-circle, star

### Usage
```tsx
import Icon from '../components/Icon';

<Icon name="home" size={24} color={COLORS.primary} />
```

---

## Components

### Button
Located: `/src/components/Button.tsx`

**Variants:**
- **Primary**: Filled with primary color, white text
- **Secondary**: Transparent with border, primary text
- **Ghost**: Transparent, no border, primary text

**Props:**
```tsx
<Button 
  title="Button Text"
  onPress={() => {}}
  variant="primary" // 'primary' | 'secondary' | 'ghost'
  disabled={false}
  fullWidth={false}
/>
```

**States:**
- Rest: Default appearance
- Hover: Border color → Primary (secondary/ghost only)
- Pressed: Scale 0.98, opacity 0.9
- Disabled: Opacity 0.4

---

### Card
Located: `/src/components/Card.tsx`

**Props:**
```tsx
<Card 
  onPress={() => {}} // Optional
  elevation="level1" // 'none' | 'level1' | 'level2' | 'level3'
  padding={20}
  style={{}}
>
  {children}
</Card>
```

**Features:**
- Automatic border and background
- Optional press interaction
- Configurable elevation
- Pressed state: Scale 0.99

---

### Icon
Located: `/src/components/Icon.tsx`

**Props:**
```tsx
<Icon 
  name="home"
  size={24}
  color={COLORS.primary}
  strokeWidth={2}
/>
```

---

## Screen Layouts

### HomeScreen
**Structure:**
1. Minimal header (logo + search + avatar)
2. Hero card (Plan a Meetup)
3. Recent Plans section
4. Categories grid
5. Bottom navigation

**Key Features:**
- No greeting text
- Single CTA hero card with gradient background
- Icon-based category cards (no emoji)
- Unified bottom navigation (5 items)

---

### MeetupRoomScreen
**Structure:**
1. Header with back button + title + participants icon
2. Status banner (meetup title + creator)
3. Location card with details
4. Attendance list
5. Response radio buttons
6. Location sharing suggestion

**Key Features:**
- Clean header with proper navigation
- Icon-based location details
- List-style attendance (not circular avatars)
- Radio button response system
- Subtle suggestion card

---

## Navigation

### Bottom Navigation
- **Height**: 56px + safe area (30px)
- **Items**: 5 (Home, Plans, New, Chat, Profile)
- **Active state**: Icon color changes to primary
- **Inactive state**: Icon color is textSecondary
- **Background**: Surface white with top border
- **Shadow**: level1

---

## Interactions & Motion

### Transitions
```typescript
standard: 200ms  // Default for most interactions
quick: 150ms     // Fast interactions (button press)
slow: 300ms      // Deliberate animations (page transitions)
```

### Animation Principles
**Do:**
- Fade in content (opacity 0 → 1, 200ms)
- Scale buttons on press (0.98, 100ms)
- Smooth color transitions (200ms)

**Don't:**
- No bouncing effects
- No rotation animations
- No excessive spring physics
- No multi-second animations

---

## Accessibility

### Touch Targets
- **Minimum size**: 44x44px (iOS standard)
- **Spacing**: Minimum 8px between adjacent targets
- **Exception**: Navigation items can be 40px if well-spaced

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Large text: 3:1 minimum
- Interactive elements: 3:1 with surroundings

---

## File Structure

```
src/
├── components/
│   ├── Icon.tsx          // Icon system
│   ├── Button.tsx        // Button component
│   ├── Card.tsx          // Card component
│   └── ...
├── constants/
│   └── theme.ts          // Design tokens
├── screens/
│   ├── HomeScreen.tsx
│   ├── MeetupRoomScreen.tsx
│   └── ...
└── ...
```

---

## Implementation Checklist

### Phase 1 (Critical) ✅
- [x] Update color palette
- [x] Remove emoji from all UI labels
- [x] Refine typography scale
- [x] Create icon system
- [x] Redesign home hero section
- [x] Fix navigation (single bottom nav)

### Phase 2 (Important)
- [x] Update button styles
- [x] Redesign attendance/response UI
- [x] Create card components
- [x] Implement spacing consistency

### Phase 3 (Polish)
- [ ] Add micro-interactions
- [ ] Implement skeleton loading
- [ ] Add dark mode support
- [ ] Performance optimization

---

## Best Practices

### DO:
✅ Use design tokens from `theme.ts`
✅ Use Icon component instead of emojis
✅ Maintain consistent spacing (4px system)
✅ Use Card component for containers
✅ Follow typography scale strictly
✅ Test touch targets (44x44px minimum)

### DON'T:
❌ Use emojis in UI chrome
❌ Use colors outside the palette
❌ Use font sizes outside the scale
❌ Use arbitrary spacing values
❌ Create custom shadows
❌ Use pure black (#000000)

---

## Testing

### Visual Testing
- [ ] All colors meet WCAG AA contrast
- [ ] Touch targets meet 44x44px minimum
- [ ] No emoji in system UI elements
- [ ] Consistent spacing using 4px system
- [ ] All icons from same family

### Interaction Testing
- [ ] Navigation works with single tab bar
- [ ] Cards have consistent border radius
- [ ] Typography scale properly implemented
- [ ] Interactions feel snappy (<200ms)
- [ ] Loading states provide feedback

---

## Resources

### Design Tools
- **Figma**: [Link to design file]
- **Color Palette**: [Link to palette]
- **Icon Library**: Custom SVG components

### References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://material.io/design)

---

**Last Updated**: February 13, 2026
**Version**: 1.0.0
**Maintained by**: Design Team
