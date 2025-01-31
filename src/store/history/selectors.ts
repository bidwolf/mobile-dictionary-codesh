import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const selectUserAndHistory = createSelector(
  [(state: RootState) => state.user, (state: RootState) => state.history],
  (user, favorites) => ({
    userId: user.uid,
    history: favorites.history,
    loading: favorites.loading,
    error: favorites.error
  })
);
