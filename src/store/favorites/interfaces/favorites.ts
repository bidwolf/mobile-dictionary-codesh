export interface FavoritesState {
  favorites: Favorite[];
  loading: boolean;
  error?: string;
}
export type Favorite = {
  word: string;
  phonetic: string;
  addedAt: string;
  id?: string;
}