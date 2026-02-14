# ChalayGa? - Frontend Setup

A modern React Native meetup planning app built with Expo.

## 🎨 Design System

The app follows a consistent design system defined in `src/constants/theme.ts`:

- **Colors**: Primary purple (#5B4DFF), success green, warning yellow, danger red
- **Spacing**: Consistent padding and border radius values
- **Shadows**: Predefined shadow styles for depth

## 📁 Folder Structure

```
src/
 ┣ screens/
 ┃ ┣ HomeScreen.tsx          # Main landing page with categories
 ┃ ┗ MeetupRoomScreen.tsx    # Meetup details and voting interface
 ┣ navigation/
 ┃ ┗ AppNavigator.tsx        # Stack navigation setup
 ┣ components/
 ┃ ┣ CategoryCard.tsx        # Reusable category selection card
 ┃ ┗ GradientCard.tsx        # Gradient background wrapper
 ┗ constants/
   ┗ theme.ts                # Design tokens and theme constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Expo CLI installed globally: `npm install -g expo-cli`
- Expo Go app on your mobile device (optional)

### Installation

1. Navigate to the project directory:
```bash
cd ChalayGa
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## 📱 Features

### HomeScreen
- Personalized greeting header
- Eye-catching banner card
- Recent plans section
- Category cards for Food, Cafe, and Walk meetups
- Bottom navigation bar

### MeetupRoomScreen
- Meetup details and host information
- Best spot recommendation card
- Participant list with vote status
- Vote buttons (I'm In, Can't, Maybe)
- Location sharing and ETA cards
- Lock plan button

## 🎯 Navigation Flow

```
HomeScreen → (Select Category) → MeetupRoomScreen
```

## 🎨 UI Highlights

- **Modern Design**: Clean, professional interface with rounded corners and shadows
- **Consistent Spacing**: Uses design tokens for uniform spacing
- **Interactive Elements**: Pressable components with visual feedback
- **Color-Coded Votes**: Green (Yes), Red (No), Yellow (Maybe)
- **Emoji Integration**: Friendly, approachable UI with emojis

## 🔗 Backend Integration

The app is designed to connect to the ChalayGa backend API:
- Base URL: `http://localhost:5000/api`
- Endpoints:
  - `POST /meetups` - Create meetup
  - `POST /meetups/:id/join` - Join and vote
  - `GET /meetups/:id` - Get meetup details

## 📝 Next Steps

1. **API Integration**: Connect screens to backend endpoints
2. **State Management**: Add Redux/Context for global state
3. **Real-time Updates**: Implement WebSocket for live participant updates
4. **Location Services**: Integrate maps and location sharing
5. **Authentication**: Add user login/signup flow
6. **Push Notifications**: Notify users of meetup updates

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Native Stack)
- **Language**: TypeScript
- **Styling**: StyleSheet API
- **Gradients**: expo-linear-gradient

## 📄 License

Private project - All rights reserved
