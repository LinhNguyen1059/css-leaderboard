import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

import { useMapData } from "./LogsContext";

export default function Map() {
  const { map, mapUrl } = useMapData();

  if (!map) {
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
