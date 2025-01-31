import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Logo from "@assets/logo.svg"
import { useNavigation, useTheme } from "@react-navigation/native"
import * as React from "react"
import { useAppDispatch } from "@store/hooks/useAppDispatch"
import { logoutFromGoogle } from "@store/user/thunks"
type RootProps = {
  description?: string
}
export const Header: React.FC<RootProps> = ({ description }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onLogout = () => {
    dispatch(logoutFromGoogle());
    navigation.navigate(
      "Home"
    )
  }
  const theme = useTheme()
  return (
    <View style={styles.header}>
      <View style={styles.logo} >
        <Logo />
        <Text style={{
          fontSize: theme.fontsize.xl,
          fontWeight: theme.fonts.bold.fontWeight,
        }}>Mobile Dictionary</Text>
        <Text style={{
          color: theme.colors.primary,
          fontSize: theme.fontsize.m,
          fontWeight: theme.fonts.bold.fontWeight,
        }}>Beta</Text>
        <TouchableOpacity
          onPress={onLogout}
          style={{
            marginLeft: 32,
          }}>
          <Text style={{
            color: theme.colors.text,
            opacity: 0.7,
            fontSize: theme.fontsize.m,
            fontWeight: theme.fonts.bold.fontWeight,
          }}>Sair</Text>
        </TouchableOpacity>
      </View>
      {description ? <Text>{description}</Text> : null}
    </View>
  )
}
export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.7)"
  }
})