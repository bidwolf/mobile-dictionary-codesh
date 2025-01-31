import { favoriteSlice } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const selectUserAndFavorites = createSelector(
  [(state: RootState) => state.user, (state: RootState) => state.favorites],
  (user, favorites) => ({
    userId: user.uid,
    favorites: favorites.favorites,
    loading: favorites.loading,
    error: favorites.error
  })
);
export const {
  getFavorite,
  getFavorites
} = favoriteSlice.selectors;