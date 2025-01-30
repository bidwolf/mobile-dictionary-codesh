import { useNavigation } from "@react-navigation/native"
import { DefaultTheme } from "@theme/index"
import { useCallback } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "react-native"
export const WordItem = ({ title }: { title: string }) => {
  const navigation = useNavigation()
  const onPress = useCallback(() => {
    navigation.navigate('WordsModal', {
      word: title
    })
  }, [useNavigation])
  return (
    <TouchableOpacity style={styleItem.square} onPress={onPress}>
      <Text style={styleItem.text}>{title}</Text>
    </TouchableOpacity>
  )
}
const styleItem = StyleSheet.create({
  square: {
    width: 120,
    marginInline: 8,
    marginBlock: 8,
    height: 96,
    backgroundColor: DefaultTheme.colors.primary,
    opacity: 0.67,
    borderRadius: 16,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: DefaultTheme.fonts.bold.fontFamily,
    fontWeight: DefaultTheme.fonts.bold.fontWeight,
    color: '#F5f5f5',

  }
})