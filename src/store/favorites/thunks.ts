import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, getDocs, doc, addDoc, setDoc, where, deleteDoc } from 'firebase/firestore';
import { Favorite } from './interfaces/favorites';
import { FIREBASE_DB } from '../../../firebase.config';

const firestore = FIREBASE_DB;
const favoritesRef = collection(firestore, 'favorites');
export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ favorite, userId }: { favorite: Favorite, userId: string }, { rejectWithValue }) => {
    try {
      const favoriteQuery = query(favoritesRef, where('word', '==', favorite.word), where('userId', '==', userId));
      const favoriteSnapshot = await getDocs(favoriteQuery);
      if (!favoriteSnapshot.empty) {
        return rejectWithValue("Palavra já adicionada aos favoritos");
      }
      const newFavorite = await addDoc(favoritesRef, {
        word: favorite.word,
        phonetic: favorite.phonetic,
        userId: userId
      });
      const data = newFavorite.id;
      if (!data) {
        return rejectWithValue("Erro ao adicionar favorito");
      }
      return favorite;
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erro ao adicionar favorito");
    }
  },
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({ word, userId }: { word: string, userId: string }, { rejectWithValue }) => {
    try {
      const favoriteQuery = query(favoritesRef, where('word', '==', word), where('userId', '==', userId));
      const favoriteSnapshot = await getDocs(favoriteQuery);
      if (!favoriteSnapshot.empty) {
        await deleteDoc(favoriteSnapshot.docs[0].ref);
      }
      return word;
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erro ao remover favorito");
    }
  },
);

export const viewFavorites = createAsyncThunk(
  'favorites/viewFavorites',
  async (userId: string, { rejectWithValue }) => {
    try {
      const favoritesQuery = query(favoritesRef, where('userId', '==', userId));
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const data: Favorite[] = favoritesSnapshot.docs.map(doc => ({
        phonetic: doc.data().phonetic,
        word: doc.data().word
      }));
      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erro ao carregar favoritos");
    }
  },
);