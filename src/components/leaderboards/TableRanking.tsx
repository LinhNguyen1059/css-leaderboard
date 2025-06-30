import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useLeaderboardStore from "@/stores/leaderboard";

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
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {restLeaderboard.map(rank => (
              <TableRow key={rank.rank}>
                <TableCell className="w-[100px] font-medium">
                  {rank.rank}
                </TableCell>
                <TableCell>{rank.name}</TableCell>
                <TableCell className="text-right">
                  {rank.totalMapScore}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
