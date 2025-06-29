import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { LogsInfo } from "@/types/game";

export default function Map({ data }: { data: LogsInfo }) {
  if (!data?.map) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col">
      <h3 className="text-xl font-medium">Map</h3>
      <Link
        href={data.mapUrl || "/"}
        target={data.mapUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={`View map ${data.map} on GameBanana`}
        className="group flex items-center gap-2 self-start"
      >
        <p className="text-base group-hover:underline">{data.map}</p>
        <SquareArrowOutUpRight size={16} />
      </Link>
    </div>
  );
}
