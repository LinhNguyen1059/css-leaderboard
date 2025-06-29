import { useMemo } from "react";
import { countOccurrences, formatStabCounts } from "@/lib/utils";
import { LogsInfo } from "@/types/game";

export default function Killer({ data }: { data: LogsInfo }) {
  const killer = useMemo(() => {
    if (!data?.stabs) return null;
    return formatStabCounts(countOccurrences(data?.stabs, "killer"));
  }, [data?.stabs]);

  if (!killer) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-medium">Đâm</h3>
      <div className="flex items-center gap-2">
        <p className="text-base leading-6">{killer}</p>
      </div>
    </div>
  );
}
