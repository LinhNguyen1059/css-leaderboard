import DatePicker from "./DatePicker";
import { useLogsContext } from "./LogsContext";

export default function LogsHeader() {
  const { fromImport } = useLogsContext();
  
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold">Logs</h1>
      {!fromImport && <DatePicker />}
    </div>
  );
}
