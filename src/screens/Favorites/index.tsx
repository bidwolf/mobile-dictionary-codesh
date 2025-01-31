import React from 'react';
import { IconHeader } from '@components/IconHeader';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useAppSelector } from '@store/hooks/useAppSelector';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAppDispatch } from '@store/hooks/useAppDispatch';
import { removeFavorite, viewFavorites } from '@store/favorites/thunks';
import { selectUserAndFavorites } from '@store/favorites/selectors';
import FavoriteEmptySVG from '@assets/favorite-empty.svg';
import { FavoriteActionsMenu } from './FavoriteActionsMenu';
import { LoadingOverlay } from '@components/LoadingOverlay';

const FavoritesScreen = () => {
  const { favorites, userId, error, loading } = useAppSelector(state => selectUserAndFavorites(state));
  const dispatch = useAppDispatch();
  const navigation = useNavigation()
  const theme = useTheme();
  React.useEffect(() => {
    dispatch(viewFavorites(userId))
  }, [])
  const handleViewDetails = (word: string) => {
    navigation.navigate('WordsModal', {
      word: word
    })
  }
  const handleRemoveFavorite = (word: string) => {
    dispatch(removeFavorite({ userId, word }))
  }
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
      <View style={{ maxHeight: 10 * 48 + 32, marginBlockStart: 100 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, borderRadius: 8, overflow: 'hidden' }}>
          {favorites.length > 0 && (
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Palavra</Text>
              <Text style={styles.headerCell}>Fonética</Text>
            </View>
          )}
          {favorites.length === 0 ? (
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 24,
                textAlign: 'center',
                marginTop: 32,
                color: theme.colors.text,
                opacity: 0.5,
              }}>
                Voce ainda não adicionou nenhum favorito
              </Text>
              <FavoriteEmptySVG style={{
                marginTop: 32,
                alignSelf: 'center',
              }} />
            </View>
          ) : (
            favorites.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{item.word}</Text>
                <View style={{ flexDirection: 'row', gap: 24 }}>
                  <Text style={styles.cell}>{item.phonetic}</Text>
                  <FavoriteActionsMenu
                    trigger={
                      <Icon name='ellipsis' size={16} color={theme.colors.text} style={{ opacity: 0.5, }} iconStyle='solid' />
                    }
                    handleViewWordMeaning={() => handleViewDetails(item.word)}
                    handleRemoveFavorite={() => handleRemoveFavorite(item.word)}
                  />
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

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
