import { Header } from '@components/Header';
import { useTheme } from '@react-navigation/native';
import { useAppSelector } from '@store/hooks/useAppSelector';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen: React.FC = () => {
  const { name } = useAppSelector((state) => state.user);
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>
        Olá<Text style={{ color: theme.colors.primary }}> {name} </Text>!{"\n"}
        O que deseja aprender hoje?

      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default HomeScreen;