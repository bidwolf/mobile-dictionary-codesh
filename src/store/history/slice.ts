import { createSlice } from "@reduxjs/toolkit";
import { initialHistory } from "./initialState";
import { registerHistoryBuilder } from "./builder/registerHistory";
import { viewHistoryBuilder } from "./builder/viewHistory";
export const historySlice = createSlice({
  name: "favorites",
  initialState: initialHistory,
  reducers: {
  },
  selectors: {
    getHistory: (state) => state.history,
  },
  extraReducers: (builder) => {
    registerHistoryBuilder(builder);
    viewHistoryBuilder(builder);
  }
})
