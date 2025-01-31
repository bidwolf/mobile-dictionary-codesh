import { createSlice } from "@reduxjs/toolkit";
import { initialFavorites } from "./initialState";
import { addFavoriteBuilder } from "./builder/addFavorite";
import { viewFavoritesBuilder } from "./builder/viewFavorites";
import { removeFavoriteBuilder } from "./builder/removeFavorite";
export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initialFavorites,
  reducers: {
  },
  selectors: {
    getFavorites: (state) => state.favorites,
    getFavorite: (state, word: string) => state.favorites.find(favorite => favorite.word === word)
  },
  extraReducers: (builder) => {
    addFavoriteBuilder(builder);
    viewFavoritesBuilder(builder);
    removeFavoriteBuilder(builder);
  }
})
