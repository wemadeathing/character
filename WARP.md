# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Start Development Server
```bash
npm start
```

### Platform-Specific Development
```bash
npm run android  # Android emulator/device
npm run ios      # iOS simulator (macOS only)
npm run web      # Web browser
```

### Package Management
```bash
npm install              # Install dependencies
npm install <package>    # Add new dependency
```

## Architecture Overview

This is a React Native/Expo mobile application with a three-stage navigation flow:

### Navigation Architecture

**AppNavigator** (`src/navigation/AppNavigator.tsx`) - Root navigation controller
- Manages application-wide navigation state
- Controls conditional rendering between Onboarding and Main flows
- Uses React state to track `isLoading` and `hasCompletedOnboarding`
- Implements splash screen logic before determining navigation path

**BottomTabNavigator** (`src/navigation/BottomTabNavigator.tsx`) - Main app navigation
- Rendered after onboarding completion
- Currently contains single "Home" tab
- Configured with custom styling (colors, heights, borders)
- Easily extensible for additional tabs

### Screen Flow

1. **SplashScreen** → Checks AsyncStorage for onboarding status
2. **OnboardingScreen** → Three-page swipeable flow (first-time users only)
3. **HomeScreen** → Main application dashboard (post-onboarding)

### State Management Pattern

This app uses **AsyncStorage** for persistence and **React Navigation state** for flow control:
- `hasCompletedOnboarding` key in AsyncStorage determines navigation path
- No global state management library (Redux, MobX, etc.)
- Screen-level state managed with `useState`
- Navigation props passed directly to components

### Key Technical Patterns

**Onboarding Persistence**
- `SplashScreen` reads from AsyncStorage on mount
- `OnboardingScreen` writes to AsyncStorage on completion
- Enables "show once" pattern for first-time user experience

**FlatList Pagination**
- OnboardingScreen uses `FlatList` with `pagingEnabled` for horizontal scrolling
- `onViewableItemsChanged` tracks current page index
- Custom dot indicators reflect scroll position

**Type Safety**
- TypeScript with strict mode enabled (`tsconfig.json`)
- Prop interfaces defined for all screens
- Icon types use `keyof typeof Ionicons.glyphMap`

## Code Modification Guidelines

### Adding New Tabs
Edit `src/navigation/BottomTabNavigator.tsx`:
- Import new screen component
- Add `<Tab.Screen>` with matching icon from `@expo/vector-icons`

### Adding Onboarding Pages
Edit `onboardingData` array in `src/screens/OnboardingScreen.tsx`:
- Each page requires: `id`, `title`, `description`, `icon`, `backgroundColor`
- Icons must be valid Ionicons names

### Resetting Onboarding (Development)
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('hasCompletedOnboarding');
```

### Color Scheme
Primary colors used throughout:
- Primary Blue: `#4A90E2`
- Purple: `#7B68EE`
- Green: `#50C878`
- Background: `#F5F5F5`
- Card Background: `#FFFFFF`

## Dependencies

**Core Framework**
- Expo SDK ~54.0.25
- React 19.1.0
- React Native 0.81.5

**Navigation**
- `@react-navigation/native` - Navigation container
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator

**UI & Storage**
- `@expo/vector-icons` - Icon library (Ionicons)
- `@react-native-async-storage/async-storage` - Local persistence

## Project Structure

```
src/
├── navigation/           # Navigation logic
│   ├── AppNavigator.tsx          # Root navigator with conditional flow
│   └── BottomTabNavigator.tsx    # Bottom tab navigation
└── screens/             # UI screens
    ├── SplashScreen.tsx          # Initial loading & onboarding check
    ├── OnboardingScreen.tsx      # Three-page swipeable onboarding
    └── HomeScreen.tsx            # Main dashboard
```

Entry point: `App.tsx` renders `AppNavigator`
