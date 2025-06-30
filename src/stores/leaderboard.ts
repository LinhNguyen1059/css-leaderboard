import { create } from "zustand";

export interface LeaderboardEntry {
  name: string;
  kills: number;
  deaths: number;
  score: number;
  rank: number;
  trend: string;
  totalMapScore: number;
}

interface LeaderboardStoreState {
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface LeaderboardStoreActions {
  setLeaderboard: (data: LeaderboardEntry[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearLeaderboard: () => void;
}

type LeaderboardStore = LeaderboardStoreState & LeaderboardStoreActions;

const initialState: LeaderboardStoreState = {
  leaderboard: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const useLeaderboardStore = create<LeaderboardStore>()(set => ({
  ...initialState,
  setLeaderboard: data =>
    set({
      leaderboard: data,
      isLoading: false,
      error: null,
      lastUpdated: new Date(),
    }),
  setLoading: isLoading => set({ isLoading }),
  setError: error => set({ error, isLoading: false }),
  clearLeaderboard: () => set(initialState),
}));

export default useLeaderboardStore;
