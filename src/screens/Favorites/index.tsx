import React, { useEffect } from 'react';
import { IconHeader } from '@components/IconHeader';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useAppSelector } from '@store/hooks/useAppSelector';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAppDispatch } from '@store/hooks/useAppDispatch';
import { removeFavorite, viewFavorites } from '@store/favorites/thunks';
import { selectUserAndFavorites } from '@store/favorites/selectors';
import FavoriteEmptySVG from '@assets/favorite-empty.svg';
import { FavoriteActionsMenu } from './FavoriteActionsMenu';
import { LoadingOverlay } from '@components/LoadingOverlay';
import { usePaginatedData } from '@hooks/usePaginatedData';
import { TableRow } from '@components/Table/TableRow';
import { DefaultTheme } from '@theme/index';
import { TableHeader } from '@components/Table/TableHeader';
import { Favorite } from '@store/favorites/interfaces/favorites';
const ITEMS_PER_PAGE = 100
const INITIAL_DISPLAY_COUNT = 40
const MIN_WORDS_FOR_LARGE_WINDOW = 50;
const DEFAULT_WINDOW_SIZE = 21;
const FavoritesScreen = () => {
  const { favorites, userId, error, loading } = useAppSelector(state => selectUserAndFavorites(state));
  const dispatch = useAppDispatch();
  const navigation = useNavigation()
  const handleViewDetails = (word: string) => {
    navigation.navigate('WordsModal', {
      word: word
    })
  }
  const handleRemoveFavorite = (word: string) => {
    dispatch(removeFavorite({ userId, word }))
    dispatch(viewFavorites(userId))
  }

  React.useEffect(() => {
    dispatch(viewFavorites(userId))
  }, [])


  return (
    <View style={styles.container}>
      {loading && (
        <LoadingOverlay />
      )}
      <IconHeader
        FaIcon={<Icon name='heart' size={24} color={"#EA4335"} iconStyle='regular' />}
        backgroundColor={'#FFE1E1'}
        title='Favoritos'
      />
      <FavoriteList
        key={favorites.length}
        favorites={favorites}
        handleRemoveFavorite={handleRemoveFavorite}
        handleViewDetails={handleViewDetails}
      />
    </View>
  );
};
type FavoriteListProps = {
  favorites: Favorite[];
  handleViewDetails: (word: string) => void;
  handleRemoveFavorite: (word: string) => void;
};
const FavoriteList = ({ favorites, handleRemoveFavorite, handleViewDetails }: FavoriteListProps) => {
  const theme = useTheme();
  const { dataSource, offset, getData } = usePaginatedData(favorites, ITEMS_PER_PAGE, INITIAL_DISPLAY_COUNT);
  const WINDOW_SIZE = favorites.length > MIN_WORDS_FOR_LARGE_WINDOW ? favorites.length / 4 : DEFAULT_WINDOW_SIZE;
  const LOW_OFFSET_THRESHOLD = 10;
  const LOW_OFFSET_MULTIPLIER = 2;
  const DEFAULT_THRESHOLD = 20;
  const onEndReachedThreshold = offset < LOW_OFFSET_THRESHOLD
    ? offset * LOW_OFFSET_MULTIPLIER
    : DEFAULT_THRESHOLD;
  return (
    <View style={{ flex: 1, marginBlockStart: 100 }}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => item.word + index}
        onEndReached={getData}
        onEndReachedThreshold={onEndReachedThreshold}
        windowSize={WINDOW_SIZE}
        style={{ borderRadius: 16 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={INITIAL_DISPLAY_COUNT}
        maxToRenderPerBatch={ITEMS_PER_PAGE}
        removeClippedSubviews={true}
        ListHeaderComponent={() => <FavoriteHeader shouldDisplay={favorites.length > 0} />}
        StickyHeaderComponent={() => <FavoriteHeader shouldDisplay={favorites.length > 0} />}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => (
          <TableRow>
            <Text testID="table-word-row" style={styles.cell}>{item.word}</Text>
            <View style={{ flexDirection: 'row', gap: 24 }}>
              <Text style={styles.cell}>{item.phonetic}</Text>
              <FavoriteActionsMenu
                trigger={
                  <Icon name='ellipsis' testID={`${item.word}-options`} size={16} color={theme.colors.text} style={{ opacity: 0.5, }} iconStyle='solid' />
                }
                handleViewWordMeaning={() => handleViewDetails(item.word)}
                handleRemoveFavorite={() => handleRemoveFavorite(item.word)}
              />
            </View>
          </TableRow>
        )}
      />
    </View>
  )
}
const FavoriteHeader = ({ shouldDisplay: shouldDisplay = true }: { shouldDisplay?: boolean }) => (
  shouldDisplay ? (
    <TableHeader>
      <Text style={styles.headerCell}>Palavra</Text>
      <Text style={styles.headerCell}>Fonética</Text>
    </TableHeader>
  ) : null
)
const ListEmptyComponent = () => (
  <View style={{ flex: 1 }}>
    <Text style={{
      fontSize: 24,
      textAlign: 'center',
      marginTop: 32,
      color: DefaultTheme.colors.text,
      opacity: 0.5,
    }}>
      Voce ainda não adicionou nenhum favorito
    </Text>
    <FavoriteEmptySVG style={{
      marginTop: 32,
      alignSelf: 'center',
    }} />
  </View>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBlock: 24
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 150,
    paddingBlock: 8,
    height: 48,
    paddingInline: 32,
    borderBottomWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#F4F4F4',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBlock: 8,
    paddingInline: 32,
    height: 48,
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
    backgroundColor: "#FCFCFC"
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 600,
  },
  cell: {
    fontSize: 12,
  },

});

export default FavoritesScreen;
