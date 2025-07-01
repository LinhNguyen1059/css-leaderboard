import LogsHeader from "./Header";
import Killer from "./Killer";
import ListStab from "./ListStab";
import Map from "./Map";
import Victim from "./Victim";
import ChatSelectedModal from "./ChatSelectedModal";
import { LogsInfo } from "@/types/game";
import { LogsProvider } from "./LogsContext";
import LoadingPlaceholder from "./LoadingPlaceholder";

export default function Logs({
  data,
  fromImport = false,
  isLoading = false,
}: {
  data: LogsInfo;
  fromImport?: boolean;
  isLoading?: boolean;
}) {
  return (
    <LogsProvider data={data} fromImport={fromImport}>
      <div className="flex min-h-0 flex-1 flex-col bg-[#FAFAFA] pt-6 pl-16">
        <div className="flex min-h-0 max-w-[600px] flex-1 flex-col">
          <LogsHeader />
          {isLoading ? (
            <LoadingPlaceholder />
          ) : (
            <>
              {data.stabs && data.stabs.length > 0 ? (
                <>
                  <Map />
                  <Killer />
                  <Victim />
                  <ListStab />
                </>
              ) : (
                <span className="text-center">Chọn ngày khác để thông</span>
              )}
            </>
          )}
        </div>
        <ChatSelectedModal />
      </div>
    </LogsProvider>
  );
}
