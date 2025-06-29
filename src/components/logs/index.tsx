import { LogsInfo } from "@/types/game";
import LogsHeader from "./Header";
import Killer from "./Killer";
import ListStab from "./ListStab";
import Map from "./Map";
import Victim from "./Victim";
import ChatSelectedModal from "./ChatSelectedModal";

export default function Logs({
  data,
  fromImport = false,
}: {
  data: LogsInfo;
  fromImport?: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#FAFAFA] pt-6 pl-16">
      <div className="flex min-h-0 max-w-[600px] flex-1 flex-col">
        <LogsHeader fromImport={fromImport} />
        <Map data={data} />
        <Killer data={data} />
        <Victim data={data} />
        <ListStab data={data} />
      </div>
      <ChatSelectedModal />
    </div>
  );
}
