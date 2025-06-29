import TableRanking from "./TableRanking";
import TopRanking from "./TopRanking";

export default function Leaderboard() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-end pt-6 pr-16">
      <div className="flex min-h-0 max-w-[450px] flex-1 flex-col">
        <h1 className="text-4xl font-bold">Bảng Thông Thần</h1>
        <TopRanking />
        <TableRanking />
      </div>
    </div>
  );
}
