export interface HistoryState {
  history: WordViewRecord[];
  loading: boolean;
  error?: string;
}
export type WordViewRecord = {
  word: string;
  viewedAt: string;
  id?: string;
}