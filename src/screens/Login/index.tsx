import { View, TouchableOpacity, Text } from "react-native";
import GoogleLogo from "@assets/google.svg"
import BookReadingImage from "@assets/book-reading.svg"
import Logo from "@assets/logo.svg"
import { useTheme } from "@react-navigation/native";
import { styles } from "./style";
const LoginScreen = () => {
  const theme = useTheme()
  const signInWithGoogle = async () => {
    console.log('Sign in with Google');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
        <TouchableOpacity testID="GoogleLogo" style={styles.google} onPress={signInWithGoogle} >
          <GoogleLogo width={24} height={24} />
          <Text style={styles.googleText}>Login com Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;