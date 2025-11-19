# React Native Onboarding App

A React Native/Expo mobile application with a splash screen, onboarding flow, and home screen with bottom navigation.

## Features

- **Splash Screen**: Displays a welcome screen while checking onboarding status
- **Onboarding Flow**: 3 beautiful onboarding screens with swipe navigation
  - Welcome screen
  - Easy to Use screen
  - Get Started screen
- **Home Screen**: Main dashboard with feature cards
- **Bottom Navigation**: Tab navigation with home icon

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation (Native Stack & Bottom Tabs)
- AsyncStorage (for persisting onboarding completion)
- Expo Vector Icons

## Project Structure

```
src/
├── navigation/
│   ├── AppNavigator.tsx       # Main navigation logic
│   └── BottomTabNavigator.tsx # Bottom tab navigation setup
└── screens/
    ├── SplashScreen.tsx       # Initial loading screen
    ├── OnboardingScreen.tsx   # 3-page onboarding flow
    └── HomeScreen.tsx         # Main home screen
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (optional)

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the App

#### Start the development server:
```bash
npm start
```

#### Run on specific platforms:
```bash
npm run android  # Run on Android
npm run ios      # Run on iOS (macOS only)
npm run web      # Run on web browser
```

#### Using Expo Go:
1. Start the development server with `npm start`
2. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## How It Works

1. **First Launch**:
   - Shows splash screen for 2 seconds
   - Navigates to onboarding screens
   - User can swipe through 3 onboarding pages or skip
   - Onboarding completion is saved to AsyncStorage

2. **Subsequent Launches**:
   - Shows splash screen
   - Checks AsyncStorage for onboarding completion
   - Directly navigates to home screen

3. **Home Screen**:
   - Displays main dashboard
   - Bottom tab navigation with home icon
   - Feature cards and grid items

## Customization

- **Colors**: Update the color schemes in each screen's StyleSheet
- **Icons**: Change icons in the `Ionicons` components
- **Content**: Modify text and descriptions in each screen
- **Add More Tabs**: Add more screens in `BottomTabNavigator.tsx`

## Reset Onboarding

To test the onboarding flow again, you can reset the AsyncStorage:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('hasCompletedOnboarding');
```

## License

MIT
