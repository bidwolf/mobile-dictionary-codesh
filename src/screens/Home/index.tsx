import { Header } from '@components/Header';
import { InteractiveCard } from '@components/interactiveCard';
import { LoadingOverlay } from '@components/LoadingOverlay';
import { useNavigation, useTheme } from '@react-navigation/native';
import { viewFavorites } from '@store/favorites/thunks';
import { viewHistory } from '@store/history/thunks';
import { useAppDispatch } from '@store/hooks/useAppDispatch';
import { useAppSelector } from '@store/hooks/useAppSelector';
import { selectHomePageData } from '@store/word/selectors';
import { DefaultTheme } from '@theme/index';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userName, userId, loading, error, lastFavorite, lastSeenWord } = useAppSelector((state) => selectHomePageData(state));
  React.useEffect(() => {
    dispatch(viewFavorites(userId))
    dispatch(viewHistory(userId))
  }, []);
  const navigation = useNavigation();
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Header />
      {loading && <LoadingOverlay />}
      <Text style={[styles.title, { marginVertical: 16 }]}>
        Olá<Text style={{ color: theme.colors.primary }}> {userName} </Text>!{"\n"}
        O que deseja aprender hoje?
      </Text>
      <ScrollView contentContainerStyle={{
        flexGrow: 1, justifyContent: 'center', gap: 36, paddingBlockEnd: 32
      }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.newWordContainer}>
          <Text style={styles.newWordText}>
            Que tal aprender uma nova palavra hoje?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'WordsScreen'
              })
            }}
            style={styles.newWordButton}>
            <Text style={styles.newWordButtonText}>
              Aumentar Vocabulário
            </Text>
          </TouchableOpacity>
        </View>

        {lastFavorite && (
          <InteractiveCard
            title='Que tal revisar a última palavra que você favoritou?'
            word={lastFavorite.word}
            onPress={() => {
              navigation.navigate('WordsModal', {
                word: lastFavorite.word
              })
            }}
            action='Ver Significado'
            variant='secondary'
            navigateAction='Ver outros favoritos'
            navigateToScreen={() => {
              navigation.navigate('Home', {
                screen: 'FavoritesScreen'
              })
            }}
          />
        )}
        {lastSeenWord && (
          <InteractiveCard
            title='Deu um branco? Relembre a última palavra que você viu.'
            word={lastSeenWord.word}
            onPress={() => {
              navigation.navigate('WordsModal', {
                word: lastSeenWord.word
              })
            }}
            action='Ver Significado'
            navigateAction='Ver Histórico'
            navigateToScreen={() => {
              navigation.navigate('Home', {
                screen: 'HistoryScreen'
              })
            }}
            variant='primary'
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  newWordContainer: {
    backgroundColor: '#EAEEFF',
    padding: 64,
    borderRadius: 8,
    marginVertical: 16
  },
  newWordText: {
    fontSize: DefaultTheme.fontsize.m,
    color: '#0000007F',
    fontWeight: DefaultTheme.fonts.regular.fontWeight,
    fontFamily: DefaultTheme.fonts.regular.fontFamily,
    textAlign: 'center',
    marginBottom: 16
  },
  newWordButton: {
    backgroundColor: DefaultTheme.colors.primary,
    padding: 16,
    borderRadius: 8
  },
  newWordButtonText: {
    color: '#fff',
    fontSize: DefaultTheme.fontsize.m,
    fontWeight: DefaultTheme.fonts.bold.fontWeight,
    fontFamily: DefaultTheme.fonts.bold.fontFamily,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: DefaultTheme.fontsize.xl,
    color: '#333',
    fontWeight: DefaultTheme.fonts.bold.fontWeight,
    fontFamily: DefaultTheme.fonts.bold.fontFamily,
    textAlign: 'center',
  },
});

export default HomeScreen;