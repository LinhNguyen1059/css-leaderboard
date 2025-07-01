import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";

import useLogsStore from "@/stores/logs";

const fetchGameLogs = async (date: Date) => {
  const response = await fetch(
    `/api/v1/logs?matchDate=${formatDate(date, "yyyy-MM-dd")}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch game logs: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export default function useGetGameLogs(date: Date) {
  const setLogsInfoProps = useLogsStore(state => state.setLogsInfoProps);

  const query = useQuery({
    queryKey: ["gameLogs", date.toISOString()],
    queryFn: () => fetchGameLogs(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      const { logs, stabs } = query.data;

      if (!logs || !stabs) {
        setLogsInfoProps({
          map: "",
          mapUrl: "",
          matchDate: "",
          stabs: [],
          chats: [],
        });
        return;
      }

      setLogsInfoProps({
        map: logs.map || "",
        mapUrl: logs.map_url || "",
        matchDate: logs.match_date || "",
        stabs: stabs || [],
        chats: logs.chats || [],
      });
    }
  }, [query.data, setLogsInfoProps]);

  return query;
}
