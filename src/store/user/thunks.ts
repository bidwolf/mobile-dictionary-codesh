import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signOut } from '../../services/googleAuthService';

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const data = await signIn()
      if (!data) {
        return rejectWithValue("Error on login with Google")
      }
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
      return true;
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Error on logout")
    }
  },
);