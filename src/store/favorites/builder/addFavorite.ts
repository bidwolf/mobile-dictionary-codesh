import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { FavoritesState } from "../interfaces/favorites";
import { addFavorite } from "../thunks";

export const addFavoriteBuilder = (builder: ActionReducerMapBuilder<FavoritesState>) => {
  builder.addCase(addFavorite.fulfilled, (state, action) => {
    state.favorites.push(action.payload);
    state.loading = false;
  });
  builder.addCase(addFavorite.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  })
  builder.addCase(addFavorite.pending, (state) => {
    state.loading = true;
  })
}
