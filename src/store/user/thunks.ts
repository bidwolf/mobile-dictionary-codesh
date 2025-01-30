import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from '../../services/googleSignIn';

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