"use client";

import Leaderboard from "@/components/leaderboards";
import Logs from "@/components/logs";
import useGetLeaderboard from "@/hooks/useGetLeaderboard";
import useLogsStore from "@/stores/logs";
import { LogsInfo } from "@/types/game";

export default function HomePage() {
  const logs = useLogsStore(state => state.logs);
  const date = useLogsStore(state => state.date);

  useGetLeaderboard(date);

  return (
    <div className="flex h-screen">
      <Leaderboard />
      <Logs data={logs as LogsInfo} />
    </div>
  );
}
