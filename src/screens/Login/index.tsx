import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import GoogleLogo from "@assets/google.svg"
import BookReadingImage from "@assets/book-reading.svg"
import Logo from "@assets/logo.svg"
import { useTheme } from "@react-navigation/native";
import { styles } from "./style";
import { useAppSelector } from "@store/hooks/useAppSelector";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import { loginWithGoogle } from "@store/user/thunks";
import { LoadingOverlay } from "@components/LoadingOverlay";
const LoginScreen = () => {
  const theme = useTheme()
  const { loading } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const onPressGoogleButton = async () => {
    dispatch(loginWithGoogle())
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {loading && <LoadingOverlay />}
      <View style={styles.header}>
        <View style={styles.logo} >
          <Logo />
          <Text style={{
            fontSize: theme.fontsize.xl,
            fontWeight: theme.fonts.bold.fontWeight,
          }}>Mobile Dictionary</Text>
        </View>
        <Text>Expanda seu vocabulário e domine o inglês</Text>
      </View>
      <View style={styles.main}>

        <BookReadingImage testID="BookReadingImage" />
        <TouchableOpacity testID="GoogleLogo" style={styles.google} onPress={onPressGoogleButton} >
          {loading ? (<Text>Carregando...</Text>) : (
            <>
              <GoogleLogo width={24} height={24} />
              <Text style={styles.googleText}>Login com Google</Text>
            </>
          )
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;