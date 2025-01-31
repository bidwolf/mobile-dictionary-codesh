import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordItem } from '@components/WordItem';
import Icon from "@react-native-vector-icons/fontawesome6"
import { useTheme } from '@react-navigation/native';
import { IconHeader } from '@components/IconHeader';
import { LoadingOverlay } from '@components/LoadingOverlay';

const WordsScreen = () => {
  const [words, setWords] = React.useState<string[]>([]);
  const [dataSource, setDataSource] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false)
  const [offset, setOffset] = React.useState(1);
  const keyExtractor = (item: string) => item
  const ITEMS_PER_PAGE = 100
  const INITIAL_DISPLAY_COUNT = 40
  const WINDOW_SIZE = words.length > 50 ? words.length / 4 : 21;
  const theme = useTheme()
  React.useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true)
        const cached = await AsyncStorage.getItem("words_chunks");
        if (cached) {
          const parsedCache = JSON.parse(cached);
          const chunks = parsedCache.chunks;
          let cachedWords: string[] = [];
          for (let i = 0; i < chunks; i++) {
            const chunk = await AsyncStorage.getItem(`words_${i}`);
            if (chunk) {
              cachedWords = cachedWords.concat(JSON.parse(chunk));
            }
          }
          setWords(cachedWords);
          return;
        }

        const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json");
        const data = await response.json();
        const wordsArray = Object.keys(data);
        setWords(wordsArray);

        const chunkSize = 1000;
        for (let i = 0; i < wordsArray.length; i += chunkSize) {
          const chunk = wordsArray.slice(i, i + chunkSize);
          await AsyncStorage.setItem(`words_${i / chunkSize}`, JSON.stringify(chunk));
        }
        await AsyncStorage.setItem("words_chunks", JSON.stringify({ chunks: Math.ceil(wordsArray.length / chunkSize) }));
      } catch (error) {
        console.error("Erro ao exibir lista", error);
      }
      finally {
        setLoading(false)
      }
    };
    fetchWords();
  }, []);
  React.useEffect(() => {

    if (dataSource.length < words.length) {
      if (offset == 1) {
        setDataSource(words.slice(0, offset * INITIAL_DISPLAY_COUNT))
      }
    }

  }, [words])
  const getData = () => {

    if (dataSource.length < words.length && words.length != 0) {
      setOffset(offset + 1);
      setDataSource(words.slice(0, offset * ITEMS_PER_PAGE))
    }
  };
  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay />}
      <IconHeader
        FaIcon={<Icon name='play' size={24} color={theme.colors.primary} iconStyle='solid' />}
        backgroundColor={theme.colors.primary}
        title='Lista de palavras'
        description='Para aprender uma palavra você pode clicar em uma das palavras abaixo.'
      />
      <FlatList
        data={dataSource}
        numColumns={3}
        initialNumToRender={INITIAL_DISPLAY_COUNT}
        windowSize={WINDOW_SIZE} //If you have scroll stuttering but working fine when 'disableVirtualization = true' then use this windowSize, it fix the stuttering problem.
        maxToRenderPerBatch={ITEMS_PER_PAGE}
        updateCellsBatchingPeriod={ITEMS_PER_PAGE / 2}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={offset < 10 ? (offset * (offset == 1 ? 2 : 2)) : 20} //While you scolling the offset number and your data number will increases.So endReached will be triggered earlier because our data will be too many
        onEndReached={getData}
        removeClippedSubviews={true}
        renderItem={({ item }) => <WordItem title={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBlock: 40,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default WordsScreen;