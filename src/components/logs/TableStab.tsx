import { useMemo } from "react";
import { LogsInfo } from "@/types/game";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

export default function TableStab({ data }: { data: LogsInfo }) {
  const stabs = useMemo(() => {
    if (!data?.stabs) return [];
    return data.stabs.map(stab => ({
      killer: stab.killer,
      victim: stab.victim,
      time: stab.time,
    }));
  }, [data?.stabs]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {stabs.map((stab, index) => (
              <TableRow
                key={`${stab.killer}-${stab.victim}-${stab.time}-${index}`}
                className="group/stab"
              >
                <TableCell className="flex items-center gap-1">
                  <span>{stab.time}</span>
                  <span>·</span>
                  <span>{stab.killer}</span>
                  <span className="font-[family-name:var(--font-fira-code)]">
                    {"->"}
                  </span>
                  <span>{stab.victim}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
