import { useNavigation } from "@react-navigation/native"
import { DefaultTheme } from "@theme/index"
import { useCallback } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "react-native"
import { Dimensions } from "react-native"

const screenWidth = Dimensions.get('window').width
const ITEM_WIDTH = screenWidth / 3 - 16
export const WordItem = ({ title }: { title: string }) => {
  const navigation = useNavigation()
  const onPress = useCallback(() => {
    navigation.navigate('WordsModal', {
      word: title
    })
  }, [useNavigation])
  return (
    <TouchableOpacity testID={title} style={styleItem.square} onPress={onPress}>
      <Text style={styleItem.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styleItem = StyleSheet.create({
  square: {
    width: ITEM_WIDTH,
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