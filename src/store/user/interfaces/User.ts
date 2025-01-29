
export type UserState = {
  name: string;
  email: string;
  uid: string;
  loading: boolean;
  token: string | null;
  error?: string;
} 