import { createContext, useContext, ReactNode } from "react";

import { LogsInfo } from "@/types/game";

interface LogsContextType {
  data: LogsInfo;
  fromImport?: boolean;
}

const LogsContext = createContext<LogsContextType | null>(null);

export function LogsProvider({
  children,
  data,
  fromImport = false,
}: {
  children: ReactNode;
  data: LogsInfo;
  fromImport?: boolean;
}) {
  return (
    <LogsContext.Provider value={{ data, fromImport }}>
      {children}
    </LogsContext.Provider>
  );
}

export function useLogsContext() {
  const context = useContext(LogsContext);
  if (!context) {
    throw new Error("useLogsContext must be used within a LogsProvider");
  }
  return context;
}

// Specific hooks for different parts of the data
export function useMapData() {
  const { data } = useLogsContext();
  return {
    map: data?.map,
    mapUrl: data?.mapUrl,
    matchDate: data?.matchDate,
  };
}

export function useStabsData() {
  const { data } = useLogsContext();
  return data?.stabs || [];
}

export function useChatsData() {
  const { data } = useLogsContext();
  return data?.chats || [];
}
