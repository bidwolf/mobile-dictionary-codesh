import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { FavoritesState } from "../interfaces/favorites";
import { removeFavorite } from "../thunks";

export const removeFavoriteBuilder = (builder: ActionReducerMapBuilder<FavoritesState>) => {
  builder.addCase(removeFavorite.fulfilled, (state, action) => {
    state.favorites = state.favorites.filter(favorite => favorite.word !== action.payload);
    state.loading = false;
  });
  builder.addCase(removeFavorite.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  })
  builder.addCase(removeFavorite.pending, (state) => {
    state.loading = true;
  })
}
