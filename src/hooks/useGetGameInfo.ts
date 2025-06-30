import { useState } from "react";

export default function useGetGameInfo() {
  const [loading, setLoading] = useState(false);
  const [gameInfo, setGameInfo] = useState<any[]>([]);

  const fetchGameInfo = async (date: Date) => {
    if (!date) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/v1/leaderboard?date=${date.toISOString()}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch game info: ${response.statusText}`);
      }
      const data = await response.json();
      setGameInfo(data.data);
    } catch (error) {
      console.error("Error fetching game info:", error);
      setGameInfo([]);
    } finally {
      setLoading(false);
    }
  };

  return { loading, gameInfo, fetchGameInfo };
}
