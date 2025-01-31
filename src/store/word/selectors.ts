import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { WordViewRecord } from "@store/history/interfaces/history";
import { Favorite } from "@store/favorites/interfaces/favorites";

export const selectHomePageData = createSelector(
  [(state: RootState) => state.user, (state: RootState) => state.history, (state: RootState) => state.favorites],
  (user, history, favorites) => ({
    userName: user.name,
    userId: user.uid,
    lastSeenWord: _getLastSeemWord(history.history),
    lastFavorite: _getLastSeemFavorite(favorites.favorites),
    loading: user.loading || favorites.loading || favorites.loading,
    error: favorites.error
  })
);
const _getLastSeemWord = (history: WordViewRecord[]) => {
  return history.reduce((latest, record) => {
    return !latest || new Date(record.viewedAt).getTime() > new Date(latest.viewedAt).getTime() ? record : latest;
  }, null as WordViewRecord | null);
}

const _getLastSeemFavorite = (favorites: Favorite[]) => {
  return favorites.reduce((latest, favorite) => {
    return !latest || new Date(favorite.addedAt).getTime() > new Date(latest.addedAt).getTime() ? favorite : latest;
  }, null as Favorite | null);
}
