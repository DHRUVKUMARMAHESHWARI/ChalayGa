# ChalayGa? - Minimalist Meetup App

A sophisticated, minimalist meetup planning application designed for users aged 17-30. Built with **React Native**, **Expo Router**, and **TypeScript**.

---

## 🎨 Design System

This project implements a custom design system focused on maturity, clarity, and calm.

- **Outcome**: A professional, emoji-free interface with a refined color palette.
- **Documentation**: See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for full guidelines.
- **Quick Reference**: See [DESIGN_SPECS.md](./DESIGN_SPECS.md) for copy-paste values.
- **Summary of Changes**: See [REDESIGN_SUMMARY.md](./REDESIGN_SUMMARY.md) for implementation details.

### Key Features
- **Sophisticated Color Palette**: Muted blue-grey primary with functional accents.
- **Advanced Typography**: 7-level type scale with consistent hierarchy.
- **Custom Icon System**: 20+ SVG outline icons replacing emojis.
- **Unified Navigation**: Single bottom tab bar experience.

---

## 📂 Project Structure

The project follows a standard Expo Router structure with separation of concerns:

```
ChalayGa/
├── app/                  # Expo Router pages
│   ├── index.tsx         # Home screen route
│   ├── room.tsx          # Meetup details route
│   └── _layout.tsx       # Root layout configuration
│
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Icon.tsx      # Custom SVG icon system
│   │   ├── Button.tsx    # Standardized button component
│   │   ├── Card.tsx      # Card container component
│   │   └── ...           # Legacy components
│   │
│   ├── constants/
│   │   └── theme.ts      # Design tokens (colors, spacing, typography)
│   │
│   ├── screens/          # Screen implementations
│   │   ├── HomeScreen.tsx
│   │   └── MeetupRoomScreen.tsx
│   │
│   └── navigation/       # Legacy React Navigation setup (unused)
│
├── DESIGN_SYSTEM.md      # Comprehensive design documentation
├── DESIGN_SPECS.md       # Developer cheat sheet
└── REDESIGN_SUMMARY.md   # Change log for current redesign
```

---

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npx expo start
   ```

3. **Run on device/simulator**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

---

## 🛠 Tech Stack

- **Framework**: React Native (via Expo)
- **Routing**: Expo Router (v3)
- **Language**: TypeScript
- **Styling**: StyleSheet API with custom design tokens
- **Icons**: react-native-svg

---

## 📝 Developer Notes

- **Navigation**: The app uses `expo-router` as the primary navigation library. `App.tsx` and `src/navigation/` are legacy artifacts and can be ignored.
- **Icons**: Always use the `<Icon />` component from `src/components/Icon.tsx`. Do not use emojis in UI elements.
- **Theming**: Import colors and spacing from `src/constants/theme.ts`. Avoid hardcoding values.

---

**Last Updated**: February 13, 2026
**Version**: 1.0.0
