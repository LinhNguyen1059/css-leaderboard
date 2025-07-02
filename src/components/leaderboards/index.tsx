import { useMemo } from "react";
import { formatDate, startOfWeek } from "date-fns";

import TableRanking from "./TableRanking";
import TopRanking from "./TopRanking";
import useLogsStore from "@/stores/logs";
import LoadingPlaceholder from "./LoadingPlaceholder";
// import ExportLeaderboard from "./ExportLeaderboard";

export default function Leaderboard({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  const date = useLogsStore(state => state.date);

  const dateRange = useMemo(() => {
    const startDate = formatDate(
      startOfWeek(date, { weekStartsOn: 1 }),
      "dd/MM/yyyy"
    );
    const endDate = formatDate(date, "dd/MM/yyyy");
    return { startDate, endDate };
  }, [date]);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-end pt-6 pr-16">
      <div className="relative flex min-h-0 max-w-[470px] flex-1 flex-col bg-white px-2">
        <h1 className="text-4xl font-bold">Bảng Thông Thần</h1>
        <span className="text-base text-[#898A8D]">
          ({dateRange.startDate} - {dateRange.endDate})
        </span>
        {/* <ExportLeaderboard /> */}
        <TopRanking isLoading={isLoading} />
        {isLoading ? <LoadingPlaceholder /> : <TableRanking />}
      </div>
    </div>
  );
}
