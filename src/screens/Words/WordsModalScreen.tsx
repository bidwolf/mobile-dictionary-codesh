import * as React from "react";
import { Player } from "@components/Player";
import Icon from "@react-native-vector-icons/fontawesome6";
import { StaticScreenProps, useNavigation } from "@react-navigation/native"
import { Favorite } from "@store/favorites/interfaces/favorites";
import { getFavorite } from "@store/favorites/selectors";
import { addFavorite, removeFavorite, viewFavorites } from "@store/favorites/thunks";
import { registerWordView } from "@store/history/thunks";
import { useAppDispatch } from "@store/hooks/useAppDispatch";
import { useAppSelector } from "@store/hooks/useAppSelector";
import { useGetFoneticsQuery } from "@store/word/apiSlice";
import { DefaultTheme } from "@theme/index";
import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native"
import { Text } from "react-native"
type Props = StaticScreenProps<{
  word: string;
}>;
export const WordsModalScreen = ({ route }: Props) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { uid } = useAppSelector(state => state.user)
  const { data, isLoading } = useGetFoneticsQuery(route.params.word)
  const [currentPlayer, setCurrentPlayer] = React.useState(0)
  const isfavorite = useAppSelector((state) => getFavorite(state, route.params.word))
  const AddToFavorites = (word: string, phonetic: string) => {
    const favorite: Favorite = {
      word: word,
      phonetic: phonetic,
      addedAt: new Date().toISOString()
    }
    dispatch(addFavorite({
      favorite: favorite,
      userId: uid
    }))
  }
  const RemoveFromFavorites = () => {
    if (isfavorite) {
      dispatch(removeFavorite({
        word: isfavorite.word,
        userId: uid
      }))
    }
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
  React.useEffect(() => {
    if (!uid) return
    if (!isfavorite) {
      dispatch(viewFavorites(uid))
    }
    dispatch(registerWordView(
      {
        wordViewed: {
          word: route.params.word,
          viewedAt: new Date().toISOString()
        }, userId: uid
      }
    ))
  }, [])
  return (
    <View style={{
      padding: 16,
      gap: 16
    }}>
      <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
        <Icon name="x" size={24} color="#8E8E8E" iconStyle="solid" />
      </TouchableOpacity>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && <Player word={data?.[0].word || route.params.word} phonetic={data?.[0].phonetic || route.params.word} />}
      {!isLoading && !data && <Text>No data</Text>}
      {!isLoading && data &&
        <ScrollView style={{
          minHeight: 150,
          flexGrow: 1,
          maxHeight: 300,
        }} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.meaningSubtitle}>Meanings</Text>
          <Text selectable style={styles.meaningDefinition}>{data[0].meanings[0].partOfSpeech} - {data[0].meanings[0].definitions[0].definition}</Text>
          {data && data[0] && data[0].meanings && data[0].meanings.length > 1 && (

            <Text style={styles.meaningSubtitle}>
              Another Definitions
            </Text>
          )}
          {data && data[0] && data[0].meanings && data[0].meanings.map((meaning, index) => (
            <View key={index}>
              {
                meaning.definitions.slice(1,).map((definition, index) => (
                  <Text selectable key={index} style={[styles.meaningDefinition, { margin: 2 }]}> - {definition.definition}</Text>
                ))
              }
            </View>
          ))}
        </ScrollView>

      }
      <View style={
        {
          gap: 16,
        }
      }>
        <TouchableOpacity
          testID="favoriteButton"
          disabled={!data || !data[0]}
          onPress={() => {
            if (data && data[0]) {
              isfavorite
                ? RemoveFromFavorites()
                : AddToFavorites(data[0].word, data[0].phonetic || "")
            }
          }}
          style={[
            styles.favoriteButton,
            {
              backgroundColor: isfavorite ? "red" : DefaultTheme.colors.primary,
              opacity: !data || !data[0] ? 0.5 : 1,
            }
          ]}
        >
          <Icon name="heart" size={24} color="#FEFEFF" iconStyle="solid" />
          <Text style={{
            color: '#FEFEFF'
          }}>{isfavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}</Text>
        </TouchableOpacity>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          gap: 16
        }}>
          <TouchableOpacity
            onPress={goToPreviousPlayer}
            disabled={!data || !data[0]}
            style={[styles.previousButton, {
              opacity: !data || !data[0] ? 0.5 : 1,
              borderWidth: 1,
              borderColor: !data || !data[0] ? "transparent" : '#8E8E8E'
            }]}
          >
            <Text style={{
              color: '#8E8E8E'
            }}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!data || !data[0]}
            style={[styles.nextButton, {
              opacity: !data || !data[0] ? 0.5 : 1,
            }]}
            onPress={goToNextPlayer}
          >
            <Text style={{
              color: '#FEFEFF'
            }}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  favoriteButton: {
    padding: 8,
    flexDirection: 'row',
    gap: 8,
    borderRadius: 8,
    backgroundColor: DefaultTheme.colors.primary,
    width: '100%',
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