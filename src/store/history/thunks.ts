import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, getDocs, addDoc, where } from 'firebase/firestore';
import { WordViewRecord } from './interfaces/history';
import { FIREBASE_DB } from '../../../firebase.config';

const firestore = FIREBASE_DB;
const historiesCollectionRef = collection(firestore, 'wordHistory');
export const registerWordView = createAsyncThunk(
  'history/registerWord',
  async ({ wordViewed, userId }: { wordViewed: WordViewRecord, userId: string }, { rejectWithValue }) => {
    try {
      const newFavorite = await addDoc(historiesCollectionRef, {
        word: wordViewed.word,
        viewedAt: wordViewed.viewedAt,
        userId: userId
      });
      const data = newFavorite.id
      if (!data) {
        return rejectWithValue("Erro ao registrar palavra no histórico")
      }
      return wordViewed
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("Erro ao registrar palavra no histórico")
    }
  },
);


export const viewHistory = createAsyncThunk(
  'favorites/viewHistory',
  async (userId: string, { rejectWithValue }) => {
    try {
      const historyQuery = query(historiesCollectionRef, where('userId', '==', userId));
      const historySnapshot = await getDocs(historyQuery);
      const data: WordViewRecord[] = historySnapshot.docs.map(doc => ({
        viewedAt: doc.data().viewedAt,
        word: doc.data().word,
        id: doc.id
      }));
      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erro ao carregar histórico de palavras");
    }
  },
);