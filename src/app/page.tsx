"use client";

import Leaderboard from "@/components/leaderboards";
import Logs from "@/components/logs";
import useGetGameLogs from "@/hooks/useGetGameLogs";
import useGetLeaderboard from "@/hooks/useGetLeaderboard";
import useLogsStore from "@/stores/logs";
import { LogsInfo } from "@/types/game";

export default function HomePage() {
  const logs = useLogsStore(state => state.logs);
  const date = useLogsStore(state => state.date);

  const { isLoading: isLoadingLeaderboard } = useGetLeaderboard(date);
  const { isLoading: isLoadingGameLogs } = useGetGameLogs(date);

  return (
    <div className="flex h-screen">
      <Leaderboard isLoading={isLoadingLeaderboard} />
      <Logs data={logs as LogsInfo} isLoading={isLoadingGameLogs} />
    </div>
  );
}
