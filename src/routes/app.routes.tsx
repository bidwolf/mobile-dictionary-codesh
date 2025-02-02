import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from '../theme';
import LoginScreen from "@screens/Login";
import { SignInContext, useIsSignedIn, useIsSignedOut } from "../context/signedInContext";
import { useAppSelector } from '@store/hooks/useAppSelector';

import HomeStack from "./home.routes";
import { WordsModalScreen } from "@screens/Words/WordsModalScreen";
import React from "react";
import { initializeTtsListeners, playTTS } from "@events/ttsListeners";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import { loginWithGoogle } from "@store/user/thunks";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    async function checkLoggedIn() {
      const alreadyLoggedIn = await AsyncStorage.getItem('alreadyLogged')
      if (alreadyLoggedIn === 'true') {
        dispatch(loginWithGoogle())
      }
    }
    checkLoggedIn();
    initializeTtsListeners();

    return () => {
      playTTS("Goodbye");
    }
  }, []);
  const isSignedIn = token !== null
  return (
    <SignInContext.Provider value={isSignedIn}>
      <Router theme={DefaultTheme} />
    </SignInContext.Provider>

  )
}
type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}