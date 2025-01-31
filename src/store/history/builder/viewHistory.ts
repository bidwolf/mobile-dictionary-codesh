import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { HistoryState } from "../interfaces/history";
import { viewHistory } from "../thunks";

export const viewHistoryBuilder = (builder: ActionReducerMapBuilder<HistoryState>) => {
  builder.addCase(viewHistory.fulfilled, (state, action) => {
    state.history = action.payload;
    state.loading = false;
  });
  builder.addCase(viewHistory.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  })
  builder.addCase(viewHistory.pending, (state) => {
    state.loading = true;
  })
}