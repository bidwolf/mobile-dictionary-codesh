import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DarkTheme, DefaultTheme } from '../theme';
import LoginScreen from "@screens/Login";
import { SignInContext, useIsSignedIn, useIsSignedOut } from "../context/signedInContext";
import { useAppSelector } from '@store/hooks/useAppSelector';

import HomeStack from "./home.routes";
import { useColorScheme } from "react-native";
import { WordsModalScreen } from "@screens/Words/WordsModalScreen";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  groups: {
    Main: {
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
    },
    Modal: {
      screenOptions: {
        presentation: 'modal',
      },
      screens: {
        WordsModal: {
          if: useIsSignedIn,
          screen: WordsModalScreen,
          getId: () => 'WordsModal',
        }
      }
    }
  },
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
type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}