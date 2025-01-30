import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";
import { wordApi } from "./word/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { favoriteSlice } from "./favorites/slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    favorites: favoriteSlice.reducer,
    [wordApi.reducerPath]: wordApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wordApi.middleware),
})
setupListeners(store.dispatch)
