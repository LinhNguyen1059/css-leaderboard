import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useLeaderboardStore from "@/stores/leaderboard";
import TrendIcon from "../TrendIcon";
import { RANK_TREND } from "@/constants/Game";

export default function TableRanking() {
  const leaderboard = useLeaderboardStore(state => state.leaderboard);

  const restLeaderboard = leaderboard.slice(3);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Hạng</TableHead>
            <TableHead>Thông thủ</TableHead>
            <TableHead className="text-right">Dao</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {restLeaderboard.length > 0 ? (
              restLeaderboard.map(rank => (
                <TableRow key={rank.rank}>
                  <TableCell className="w-[100px] font-medium">
                    <div className="flex items-center gap-2">
                      <TrendIcon trend={rank.trend as RANK_TREND} />
                      {rank.rank}
                    </div>
                  </TableCell>
                  <TableCell>{rank.name}</TableCell>
                  <TableCell className="text-right">
                    {rank.totalMapScore}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Chưa có ai bị thông
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
