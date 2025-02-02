import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signOut } from '../../services/googleAuthService';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const data = await signIn()
      if (!data) {
        return rejectWithValue("Error on login with Google")
      }
      await AsyncStorage.setItem("alreadyLogged", "true")
      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Error on login with Google")
    }
  },
);
export const logoutFromGoogle = createAsyncThunk(
  'user/logoutFromGoogle',
  async (_, { rejectWithValue }) => {
    try {
      await signOut()
      await AsyncStorage.removeItem("alreadyLogged")
      return true;
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Error on logout")
    }
  },
);