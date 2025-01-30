import { UserState } from "./interfaces/User";

export const initialUserProfile: UserState = {
  name: "",
  email: "",
  uid: "",
  loading: false,
  token: null,
}