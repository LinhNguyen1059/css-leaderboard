import { useEffect } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useLogsStore from "@/stores/logs";
import useGetMapInfo from "@/hooks/useGetMapInfo";
import useDebounce from "@/hooks/useDebounce";

export default function MapInput() {
  const map = useLogsStore(state => state.logsTmp?.map);
  const errorMap = useLogsStore(state => state.error.map);
  const setLogsTmpInfoProps = useLogsStore(state => state.setLogsTmpInfoProps);
  const setErrorProps = useLogsStore(state => state.setErrorProps);

  const { fetchMapInfo } = useGetMapInfo();

  const debouncedInputValue = useDebounce(map, 500);

  const handleMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMap = e.target.value;
    setLogsTmpInfoProps({ map: newMap });
    setErrorProps({ map: "" });
  };

  useEffect(() => {
    if (!debouncedInputValue) return;
    fetchMapInfo(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <div className="mt-6 grid w-full items-center gap-1">
      <Label htmlFor="map" className={errorMap ? "text-red-500" : ""}>
        Map
      </Label>
      <Input
        type="text"
        id="map"
        placeholder="Map"
        value={map}
        onChange={handleMapChange}
        className={errorMap ? "border-red-500 focus-visible:ring-red-500" : ""}
      />
      {errorMap && <p className="text-sm text-red-500">{errorMap}</p>}
    </div>
  );
}
