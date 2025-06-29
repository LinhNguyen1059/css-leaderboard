import DatePicker from "./DatePicker";

export default function LogsHeader({
  fromImport = false,
}: {
  fromImport?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold">Logs</h1>
      {!fromImport && <DatePicker />}
    </div>
  );
}
