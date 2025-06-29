"use client";

import ActionButton from "@/components/ActionButton";
import DragDropFile from "@/components/DragDropFile";
import KillerTextarea from "@/components/KillerTextarea";
import Logs from "@/components/logs";
import MapInput from "@/components/MapInput";
import { LOG_STEP } from "@/constants/Game";
import { cn } from "@/lib/utils";
import useLogsStore from "@/stores/logs";
import { LogsInfo } from "@/types/game";

export default function LogsPage() {
  const logStep = useLogsStore(state => state.logStep);
  const logsTmp = useLogsStore(state => state.logsTmp);

  return (
    <div className="flex h-screen">
      <div className="flex min-h-0 flex-1 flex-col items-end pt-6 pr-16">
        <div className="flex min-h-0 w-full max-w-[450px] flex-1 flex-col">
          <h1 className="text-4xl font-bold">Bảng Thông Thần</h1>
          {logStep === LOG_STEP.INPUT && (
            <>
              <MapInput />
              <KillerTextarea />
              <ActionButton />
            </>
          )}
        </div>
      </div>
      {logStep === LOG_STEP.IMPORT && (
        <>
          <div className="flex min-h-0 flex-1 flex-col pt-6 pl-16" />
          <DragDropFile />
        </>
      )}
      {logStep === LOG_STEP.INPUT && (
        <Logs data={logsTmp as LogsInfo} fromImport />
      )}
    </div>
  );
}
