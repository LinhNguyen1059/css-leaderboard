import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RANK_TREND } from "@/constants/Game";

const leaderboard = [
  {
    rank: 4,
    name: "BOT",
    score: -5,
    trend: RANK_TREND.DOWN,
  },
  {
    rank: 5,
    name: "Bear",
    score: -5,
    trend: RANK_TREND.UP,
  },
  {
    rank: 6,
    name: "TrungUyNhi",
    score: -3,
    trend: RANK_TREND.UP,
  },
  {
    rank: 7,
    name: "DucBestz",
    score: 0,
    trend: RANK_TREND.SAME,
  },
  {
    rank: 8,
    name: "HieuDick",
    score: 1,
    trend: RANK_TREND.SAME,
  },
  {
    rank: 9,
    name: "Zen",
    score: 4,
    trend: RANK_TREND.DOWN,
  },
  {
    rank: 10,
    name: "LinhRongLon",
    score: 4,
    trend: RANK_TREND.SAME,
  },
  {
    rank: 11,
    name: "ChungXi",
    score: 6,
    trend: RANK_TREND.UP,
  },
  {
    rank: 12,
    name: "DonKiet",
    score: 8,
    trend: RANK_TREND.DOWN,
  },
  {
    rank: 13,
    name: "SieuNhan",
    score: 16,
    trend: RANK_TREND.SAME,
  },
  {
    rank: 14,
    name: "Nic",
    score: 16,
    trend: RANK_TREND.SAME,
  },
];

export default function TableRanking() {
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
            {leaderboard.map(rank => (
              <TableRow key={rank.rank}>
                <TableCell className="w-[100px] font-medium">
                  {rank.rank}
                </TableCell>
                <TableCell>{rank.name}</TableCell>
                <TableCell className="text-right">{rank.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
