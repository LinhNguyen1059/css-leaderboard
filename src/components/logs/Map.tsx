import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

import { useMapData } from "./LogsContext";
import useLogsStore from "@/stores/logs";
import { Skeleton } from "../ui/skeleton";

export default function Map() {
  const { map, mapUrl } = useMapData();
  const loading = useLogsStore(state => state.mapLoading);

  if (loading) {
    return (
      <div className="mt-4 flex flex-col">
        <Skeleton className="mt-4 h-4 w-2/12 bg-gray-200" />
        <Skeleton className="mt-1 h-4 w-3/12 bg-gray-200" />
      </div>
    );
  }

  if (!map || !mapUrl) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col">
      <h3 className="text-xl font-medium">Map</h3>
      <Link
        href={mapUrl || "/"}
        target={mapUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={`View map ${map} on GameBanana`}
        className="group flex items-center gap-2 self-start"
      >
        <p className="text-base group-hover:underline">{map}</p>
        <SquareArrowOutUpRight size={16} />
      </Link>
    </div>
  );
}
