import Leaderboard from "@/components/leaderboards";
import Logs from "@/components/logs";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <Leaderboard />
      <Logs />
    </div>
  );
}
