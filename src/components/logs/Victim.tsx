import { useMemo } from "react";
import { countOccurrences, formatStabCounts } from "@/lib/utils";
import { useStabsData } from "./LogsContext";

export default function Victim() {
  const stabs = useStabsData();
  
  const victim = useMemo(() => {
    if (!stabs || stabs.length === 0) return null;
    return formatStabCounts(countOccurrences(stabs, "victim"));
  }, [stabs]);

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
