import { Player } from "@components/Player";
import Icon from "@react-native-vector-icons/fontawesome6";
import { StaticScreenProps, useNavigation } from "@react-navigation/native"
import { Favorite } from "@store/favorites/interfaces/favorites";
import { addFavorite } from "@store/favorites/thunks";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import { useAppSelector } from "@store/hooks/useAppSelector";
import { useGetFoneticsQuery } from "@store/word/apiSlice";
import { DefaultTheme } from "@theme/index";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
type Props = StaticScreenProps<{
  word: string;
}>;
export const WordsModalScreen = ({ route }: Props) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { uid } = useAppSelector(state => state.user)
  const { data, isLoading } = useGetFoneticsQuery(route.params.word)
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const AddToFavorites = (word: string, phonetic: string) => {
    const favorite: Favorite = {
      word: word,
      phonetic: phonetic

    }
    dispatch(addFavorite({
      favorite: favorite,
      userId: uid
    }))
  }
  const goToNextPlayer = () => {
    if (!data || !data[0] || !data[0].meanings) return
    if (currentPlayer + 1 >= data[0].meanings.length) {
      setCurrentPlayer(0)
      return
    }
    setCurrentPlayer(previousPlayer => previousPlayer + 1)
  }
  const goToPreviousPlayer = () => {
    if (!data || !data[0] || data[0].meanings.length === 0) return
    if (currentPlayer === 0) {
      setCurrentPlayer(data.length - 1)
      return
    }
    setCurrentPlayer(previousPlayer => previousPlayer - 1)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
        <Icon name="x" size={24} color="#8E8E8E" iconStyle="solid" />
      </TouchableOpacity>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && data && <Player word={data[0].word} phonetic={data[0].phonetic} />}
      {!isLoading && !data && <Text>No data</Text>}
      {!isLoading && data &&
        <View style={{
          padding: 16,
          margin: 16,
          gap: 4
        }}>
          <Text style={styles.meaningSubtitle}>Meanings</Text>
          {data && data[0] && data[0].meanings && data[0].meanings.map((meaning, index) => (
            <View key={index}>
              <Text style={styles.meaningDefinition}>{meaning.partOfSpeech} - {meaning.definitions[0].definition}</Text>

              <Text style={styles.meaningSubtitle}>
                Another Definitions
              </Text>
              {
                meaning.definitions.slice(1,).map((definition, index) => (
                  <Text key={index} style={[styles.meaningDefinition, { margin: 2 }]}> - {definition.definition}</Text>
                ))
              }
            </View>
          ))}
        </View>}
      <TouchableOpacity
        onPress={() => {
          if (data && data[0]) {
            AddToFavorites(data[0].word, data[0].phonetic || "")
          }
        }}
        style={styles.favoriteButton}
      >
        <Text style={{
          color: '#FEFEFF'
        }}>Adicionar aos favoritos</Text>
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 16,
        gap: 16
      }}>
        <TouchableOpacity
          onPress={goToPreviousPlayer}
          style={styles.previousButton}
        >
          <Text style={{
            color: '#8E8E8E'
          }}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={goToNextPlayer}>
          <Text style={{
            color: '#FEFEFF'
          }}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginInline: 20,
    position: 'relative'
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: DefaultTheme.colors.primary,
    borderWidth: 1,
    width: '100%',
    margin: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  meaningTitle: {
    fontFamily: DefaultTheme.fonts.bold.fontFamily,
    fontSize: DefaultTheme.fontsize.l,
    textAlign: 'center',
    fontWeight: DefaultTheme.fonts.bold.fontWeight,
    color: DefaultTheme.colors.text,
    textTransform: 'capitalize'
  },
  meaningSubtitle: {
    fontFamily: DefaultTheme.fonts.bold.fontFamily,
    fontSize: DefaultTheme.fontsize.m,
    fontWeight: DefaultTheme.fonts.bold.fontWeight,
    color: DefaultTheme.colors.text,
    textTransform: 'capitalize'
  },
  meaningDefinition: {
    fontFamily: DefaultTheme.fonts.regular.fontFamily,
    fontSize: DefaultTheme.fontsize.s,
    color: DefaultTheme.colors.text,
    textTransform: 'capitalize'
  },
  meaningPartOfSpeech: {
    fontFamily: DefaultTheme.fonts.bold.fontFamily,
    fontSize: DefaultTheme.fontsize.m,
    color: DefaultTheme.colors.text,
    textTransform: 'capitalize'
  },
  nextButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: DefaultTheme.colors.text,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  previousButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: '#8E8E8E',
    borderWidth: 1,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  }

})