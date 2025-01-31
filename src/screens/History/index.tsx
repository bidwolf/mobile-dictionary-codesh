import React from 'react';
import { IconHeader } from '@components/IconHeader';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useAppSelector } from '@store/hooks/useAppSelector';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import { useAppDispatch } from '@store/hooks/useAppDispatch';
import FavoriteEmptySVG from '@assets/favorite-empty.svg';
import { LoadingOverlay } from '@components/LoadingOverlay';
import { viewHistory } from '@store/history/thunks';
import { selectUserAndHistory } from '@store/history/selectors';
import { format } from 'date-fns';
import { usePaginatedData } from '@hooks/usePaginatedData';
import { TableHeader } from '@components/Table/TableHeader';
import { TableRow } from '@components/Table/TableRow';
import { WordViewRecord } from '@store/history/interfaces/history';
import { DefaultTheme } from '@theme/index';
const ITEMS_PER_PAGE = 100
const INITIAL_DISPLAY_COUNT = 40
const MIN_WORDS_FOR_LARGE_WINDOW = 50;
const DEFAULT_WINDOW_SIZE = 21;
const HistoryScreen = () => {
  const { userId, error, history, loading } = useAppSelector(state => selectUserAndHistory(state))
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(viewHistory(userId))
  }, [])
  const { dataSource, offset, getData } = usePaginatedData(history, ITEMS_PER_PAGE, INITIAL_DISPLAY_COUNT);
  const WINDOW_SIZE = history.length > MIN_WORDS_FOR_LARGE_WINDOW ? history.length / 4 : DEFAULT_WINDOW_SIZE;
  const LOW_OFFSET_THRESHOLD = 10;
  const LOW_OFFSET_MULTIPLIER = 2;
  const DEFAULT_THRESHOLD = 20;
  const onEndReachedThreshold = offset < LOW_OFFSET_THRESHOLD
    ? offset * LOW_OFFSET_MULTIPLIER
    : DEFAULT_THRESHOLD;
  return (
    <View style={styles.container}>
      {loading && (
        <LoadingOverlay />
      )}
      <IconHeader
        FaIcon={<Icon name='clock-rotate-left' size={24} color={"#414040"} iconStyle='solid' />}
        backgroundColor={'#E1FFE2'}
        title='Histórico'
        description='Aqui você pode ver as palavras que você já visualizou anteriormente.'
      />
      <View style={{ flex: 1, marginBlockStart: 100 }}>
        <FlatList
          data={dataSource}
          showsVerticalScrollIndicator={false}
          style={{ borderRadius: 16 }}
          initialNumToRender={INITIAL_DISPLAY_COUNT}
          windowSize={WINDOW_SIZE}
          maxToRenderPerBatch={ITEMS_PER_PAGE}
          updateCellsBatchingPeriod={ITEMS_PER_PAGE / 2}
          onEndReached={getData}
          onEndReachedThreshold={onEndReachedThreshold}
          removeClippedSubviews={true}
          keyExtractor={(item) => item.word + item.viewedAt}
          ListEmptyComponent={EmptyHistory}
          ListHeaderComponent={() => <HistoryHeader shouldDisplay={history.length > 0} />}
          StickyHeaderComponent={() => <HistoryHeader shouldDisplay={history.length > 0} />}
          renderItem={HistoryItem}
        />
      </View>
    </View>
  );
};
const EmptyHistory = () => (
  <View style={{ flex: 1 }}>
    <Text style={{
      fontSize: 24,
      textAlign: 'center',
      marginTop: 32,
      color: DefaultTheme.colors.text,
      opacity: 0.5,
    }}>
      Nenhum histórico de palavras visualizadas
    </Text>
    <FavoriteEmptySVG style={{
      marginTop: 32,
      alignSelf: 'center',
    }} />
  </View>
)
const HistoryHeader = ({ shouldDisplay: shouldDisplay = true }: { shouldDisplay?: boolean }) => (
  shouldDisplay ? (
    <TableHeader>
      <Text style={styles.headerCell}>Palavra</Text>
      <Text style={styles.headerCell}>Visto em</Text>
    </TableHeader>
  ) : null
)
const HistoryItem = ({ item }: { item: WordViewRecord }) => (
  <TableRow>
    <Text style={styles.cell}>{item.word}</Text>
    <Text style={styles.cell}>{format(new Date(item.viewedAt), "dd/MM/yyyy")}</Text>
  </TableRow>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBlock: 24
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 600,
  },
  cell: {
    fontSize: 12,
  },

});


export default HistoryScreen;