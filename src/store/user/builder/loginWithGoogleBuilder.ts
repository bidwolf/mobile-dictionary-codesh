import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../interfaces/User";
import { loginWithGoogle } from "../thunks";

const loginWithGoogleBuilder = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
    state.email = action.payload.user.email;
    state.name = action.payload.user.name || "Usuário"
    state.uid = action.payload.user.id
    state.loading = false
    state.token = action.payload.idToken
    state.error = undefined
  })
  builder.addCase(loginWithGoogle.pending, (state) => {
    state.loading = true
    state.error = undefined
  })
  builder.addCase(loginWithGoogle.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
}
export default loginWithGoogleBuilder