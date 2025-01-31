import { useTheme } from "@react-navigation/native"
import { ActivityIndicator, StyleSheet, View } from "react-native"

export const LoadingOverlay = () => {
  const theme = useTheme()
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>

  )
}
const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
})