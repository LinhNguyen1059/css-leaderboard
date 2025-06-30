import { parseGameLogToScores } from "@/lib/utils";
import { LogsInfo } from "@/types/game";

export default function usePostGameData() {
  const postGameData = async (logData: LogsInfo) => {
    const dailyScore = parseGameLogToScores(logData);

    if (!dailyScore || dailyScore.scores.length === 0) {
      throw new Error("No valid game data to post");
    }

    try {
      const response = await fetch("/api/v1/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error("Failed to save game log");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to save game log");
      }

      const { log_id } = data;

      const scoreResponse = await fetch("/api/v1/daily/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchDate: logData.matchDate,
          scores: dailyScore.scores,
          logId: log_id,
        }),
      });

      if (!scoreResponse.ok) {
        throw new Error("Failed to post daily scores");
      }

      const scoreData = await scoreResponse.json();
      if (!scoreData.success) {
        throw new Error(scoreData.error || "Failed to post daily scores");
      }
      return scoreData;
    } catch (error) {
      console.error("Error posting game log:", error);
      throw error;
    }
  };

  return { postGameData };
}
