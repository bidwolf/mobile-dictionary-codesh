import React from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordItem } from '@components/WordItem';
import Icon from "@react-native-vector-icons/fontawesome6"
import { useTheme } from '@react-navigation/native';
import { IconHeader } from '@components/IconHeader';
import { LoadingOverlay } from '@components/LoadingOverlay';
import { usePaginatedData } from '@hooks/usePaginatedData';
import { Text } from '@react-navigation/elements';

const ITEMS_PER_PAGE = 100
const INITIAL_DISPLAY_COUNT = 40
const MIN_WORDS_FOR_LARGE_WINDOW = 50;
const DEFAULT_WINDOW_SIZE = 21;

const WordsScreen = () => {
  const [words, setWords] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false)
  const theme = useTheme()
  const [textFilter, setTextFilter] = React.useState('');

  const applyFilter = (text: string) => {
    setTextFilter(text);
  };

  React.useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true)
        const cached = await AsyncStorage.getItem("words_chunks");
        if (cached) {
          const parsedCache = JSON.parse(cached);
          const chunks = parsedCache.chunks;
          const chunkPromises = [];
          for (let i = 0; i < chunks; i++) {
            chunkPromises.push(AsyncStorage.getItem(`words_${i}`));
          }
          const chunkResults = await Promise.all(chunkPromises);
          let cachedWords: string[] = [];
          chunkResults.forEach(chunk => {
            if (chunk) {
              cachedWords = cachedWords.concat(JSON.parse(chunk));
            }
          });
          setWords(cachedWords);
          return;
        }

        const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json");
        const data = await response.json();
        const wordsArray = Object.keys(data);


        const chunkSize = 1000;
        const chunks = Math.ceil(wordsArray.length / chunkSize);
        const cachePromises = [];

        for (let i = 0; i < chunks; i++) {
          const chunk = wordsArray.slice(i * chunkSize, (i + 1) * chunkSize);
          cachePromises.push(AsyncStorage.setItem(`words_${i}`, JSON.stringify(chunk)));
        }

        await Promise.all(cachePromises);
        await AsyncStorage.setItem("words_chunks", JSON.stringify({ chunks }));
        setWords(wordsArray);
      } catch (error) {
        console.error("Erro ao exibir lista", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, []);
  const filteredWords = React.useMemo(() => {
    return words
      .filter(word => word.includes(textFilter))
      .sort((a, b) => {
        if (a.startsWith(textFilter) && !b.startsWith(textFilter)) return -1;
        if (!a.startsWith(textFilter) && b.startsWith(textFilter)) return 1;
        return 0;
      });
  }, [words, textFilter]);
  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay />}
      <IconHeader
        FaIcon={<Icon name='play' size={24} color={theme.colors.primary} iconStyle='solid' />}
        backgroundColor={theme.colors.primary}
        title='Lista de palavras'
        description='Para aprender uma palavra você pode clicar em uma das palavras abaixo.'
      />

      <SearchBar applyFilter={applyFilter} />
      <List words={filteredWords} key={
        textFilter
      } />
    </View>
  );
};
const List = ({ words }: { words: string[] }) => {
  const keyExtractor = (item: string) => item
  const { dataSource, offset, getData } = usePaginatedData(words, ITEMS_PER_PAGE, INITIAL_DISPLAY_COUNT);
  const WINDOW_SIZE = words.length > MIN_WORDS_FOR_LARGE_WINDOW ? words.length / 4 : DEFAULT_WINDOW_SIZE;
  const LOW_OFFSET_THRESHOLD = 10;
  const LOW_OFFSET_MULTIPLIER = 2;
  const DEFAULT_THRESHOLD = 20;
  const onEndReachedThreshold = offset < LOW_OFFSET_THRESHOLD
    ? offset * LOW_OFFSET_MULTIPLIER
    : DEFAULT_THRESHOLD;
  return (
    <FlatList
      data={dataSource}
      numColumns={3}
      initialNumToRender={INITIAL_DISPLAY_COUNT}
      windowSize={WINDOW_SIZE}
      maxToRenderPerBatch={ITEMS_PER_PAGE}
      updateCellsBatchingPeriod={ITEMS_PER_PAGE / 2}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={getData}
      removeClippedSubviews={true}
      renderItem={({ item }) => <WordItem title={item} />}
    />
  )
}
type SearchBarProps = {
  applyFilter: (text: string) => void;
};
const SearchBar = ({ applyFilter }: SearchBarProps) => {
  const theme = useTheme()
  const [textFilter, setTextFilter] = React.useState('');
  const filterByText = React.useCallback((text: string) => {
    setTextFilter(text);
  }, []);
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: "center",

      gap: 8,
      margin: 16,
    }}>

      <TextInput
        testID='searchInput'
        placeholder="Buscar palavra"
        style={{
          flexGrow: 1,
          height: 40,
          borderColor: theme.colors.border,
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,
          color: theme.colors.text,
        }}
        onChangeText={filterByText}
      />
      <TouchableOpacity testID='searchButton' onPress={() => applyFilter(textFilter)} style={{
        backgroundColor: theme.colors.primary,
        width: 100,
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
      }}>
        <Text style={{ color: 'white' }}>Filtrar</Text>
        <Icon name='magnifying-glass' size={24} color={"white"} iconStyle='solid' />
      </TouchableOpacity>
    </View>
  )
}
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