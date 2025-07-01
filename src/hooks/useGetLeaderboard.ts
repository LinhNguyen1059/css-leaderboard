import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { formatDate } from "date-fns";

import useLeaderboardStore from "@/stores/leaderboard";

const fetchLeaderboard = async (date: Date) => {
  const response = await fetch(
    `/api/v1/leaderboard?matchDate=${formatDate(date, "yyyy-MM-dd")}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
};

export default function useGetLeaderboard(date: Date) {
  const { setLeaderboard, setLoading, setError } = useLeaderboardStore();

  const query = useQuery({
    queryKey: ["leaderboard", date.toISOString()],
    queryFn: () => fetchLeaderboard(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Update the store whenever the query state changes
  useEffect(() => {
    if (query.isLoading) {
      setLoading(true);
    } else if (query.error) {
      setError(query.error.message);
    } else if (query.data) {
      setLeaderboard(query.data);
    }
  }, [
    query.data,
    query.isLoading,
    query.error,
    setLeaderboard,
    setLoading,
    setError,
  ]);

  return query;
}
