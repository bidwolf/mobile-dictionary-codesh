import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../interfaces/User";
import { logoutFromGoogle } from "../thunks";
import { initialUserProfile } from "../initialState";

const logoutFromGoogleBuilder = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(logoutFromGoogle.fulfilled, (state, action) => {
    state.email = initialUserProfile.email
    state.name = initialUserProfile.name
    state.uid = initialUserProfile.uid
    state.loading = false
    state.token = initialUserProfile.token
  })
  builder.addCase(logoutFromGoogle.pending, (state) => {
    state.loading = true
    state.error = undefined
  })
  builder.addCase(logoutFromGoogle.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
}
export default logoutFromGoogleBuilder