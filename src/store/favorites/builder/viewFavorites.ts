import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { FavoritesState } from "../interfaces/favorites";
import { viewFavorites } from "../thunks";

export const viewFavoritesBuilder = (builder: ActionReducerMapBuilder<FavoritesState>) => {
  builder.addCase(viewFavorites.fulfilled, (state, action) => {
    state.favorites = action.payload;
    state.loading = false;
  });
  builder.addCase(viewFavorites.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  })
  builder.addCase(viewFavorites.pending, (state) => {
    state.loading = true;
  })
}