import { useMemo } from "react";
import { countOccurrences, formatStabCounts } from "@/lib/utils";
import { useStabsData } from "./LogsContext";

export default function Killer() {
  const stabs = useStabsData();
  
  const killer = useMemo(() => {
    if (!stabs || stabs.length === 0) return null;
    return formatStabCounts(countOccurrences(stabs, "killer"));
  }, [stabs]);

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
