import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const selectUserAndHistory = createSelector(
  [(state: RootState) => state.user, (state: RootState) => state.history],
  (user, historyRecords) => ({
    userId: user.uid,
    history: historyRecords.history,
    loading: historyRecords.loading,
    error: historyRecords.error
  })
);
