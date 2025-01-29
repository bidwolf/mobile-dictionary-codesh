import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DarkTheme, DefaultTheme } from '../theme';
import LoginScreen from "@screens/Login";
import { SignInContext, useIsSignedIn, useIsSignedOut } from "../context/signedInContext";
import { useAppSelector } from '@store/hooks/useAppSelector';

import HomeStack from "./home.routes";
import { useColorScheme } from "react-native";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Login: {
      if: useIsSignedOut,
      screen: LoginScreen,
      screenOptions: {
        headerShown: false,
      },
    },
    Home: {
      if: useIsSignedIn,
      screen: HomeStack,
      screenOptions: {
        headerShown: false,
      },
    }
  }
});
const Router = createStaticNavigation(RootStack);

export const Navigation = () => {
  const { token } = useAppSelector(state => state.user)
  const scheme = useColorScheme()

  const isSignedIn = token !== null
  return (
    <SignInContext.Provider value={isSignedIn}>
      <Router theme={scheme === "dark" ? DarkTheme : DefaultTheme} />
    </SignInContext.Provider>

  )
}
