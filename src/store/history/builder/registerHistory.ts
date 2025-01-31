import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { HistoryState } from "../interfaces/history";
import { registerWordView } from "../thunks";

export const registerHistoryBuilder = (builder: ActionReducerMapBuilder<HistoryState>) => {
  builder.addCase(registerWordView.fulfilled, (state, action) => {
    state.history.push(action.payload);
    state.loading = false;
  });
  builder.addCase(registerWordView.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  })
  builder.addCase(registerWordView.pending, (state) => {
    state.loading = true;
  })
}
