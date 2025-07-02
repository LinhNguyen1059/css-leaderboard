import { Download } from "lucide-react";

import useLeaderboardStore from "@/stores/leaderboard";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ExportLeaderboard() {
  const leaderboard = useLeaderboardStore(state => state.leaderboard);

  const handleExport = () => {};

  if (leaderboard.length === 0) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="group/download absolute top-0 right-0 z-10 cursor-pointer"
          onClick={handleExport}
        >
          <Download className="text-gray-200 transition-colors duration-200 group-hover/download:text-green-500" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Thông xuất</p>
      </TooltipContent>
    </Tooltip>
  );
}
