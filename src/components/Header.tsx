import { StyleSheet, Text, View } from "react-native"
import Logo from "@assets/logo.svg"
import { useTheme } from "@react-navigation/native"
import * as React from "react"
type RootProps = {
  description?: string
}
export const Header: React.FC<RootProps> = ({ description }) => {
  const theme = useTheme()
  return (
    <View style={styles.header}>
      <View style={styles.logo} >
        <Logo />
        <Text style={{
          fontSize: theme.fontsize.xl,
          fontWeight: theme.fonts.bold.fontWeight,
        }}>Mobile Dictionary</Text>
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