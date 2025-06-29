import { useMemo } from "react";
import { countOccurrences, formatStabCounts } from "@/lib/utils";
import { LogsInfo } from "@/types/game";

export default function Victim({ data }: { data: LogsInfo }) {
  const victim = useMemo(() => {
    if (!data?.stabs) return null;
    return formatStabCounts(countOccurrences(data?.stabs, "victim"));
  }, [data?.stabs]);

  if (!victim) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-medium">Bị đâm</h3>
      <div className="flex items-center gap-2">
        <p className="text-base leading-6">{victim}</p>
      </div>
    </div>
  );
}
