import { createSlice } from "@reduxjs/toolkit";
import { initialUserProfile } from "./initialState";
import loginWithGoogleBuilder from "./builder/loginWithGoogleBuilder";
import logoutFromGoogleBuilder from "./builder/logoutFromGoogleBuilder";
export const userSlice = createSlice({
  name: "user",
  initialState: initialUserProfile,
  reducers: {
    setUserProfile: (state, action:
      { type: string, payload: typeof initialUserProfile }
    ) => {
      state = action.payload;
    },
    clearUserProfile: (state) => {
      state = initialUserProfile;
    },
    setLoading: (state, action: { type: string, payload: boolean }) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    loginWithGoogleBuilder(builder)
    logoutFromGoogleBuilder(builder)
  }
})
