import { useEffect } from "react";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import useDebounce from "@/hooks/useDebounce";
import useLogsStore from "@/stores/logs";
import { cn } from "@/lib/utils";

export default function KillerTextarea() {
  const stab = useLogsStore(state => state.stab);
  const errorStab = useLogsStore(state => state.error.stab);
  const setProps = useLogsStore(state => state.setProps);
  const setErrorProps = useLogsStore(state => state.setErrorProps);
  const setLogsTmpInfoProps = useLogsStore(state => state.setLogsTmpInfoProps);

  const debouncedInputValue = useDebounce(stab, 500);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newStab = e.target.value;
    setProps({ stab: newStab });
    setErrorProps({ stab: "" });
  };

  const handleParseStab = (stab: string) => {
    try {
      const validLines = stab
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const parsedStabs = validLines
        .map(line => parseStabLine(line))
        .filter(
          (item): item is { time: string; killer: string; victim: string } =>
            item !== null
        );

      if (parsedStabs.length === 0) {
        return;
      }

      setLogsTmpInfoProps({ stabs: parsedStabs });
    } catch (error) {}
  };

  const parseStabLine = (line: string) => {
    const parts = line.split(" · ");
    if (parts.length < 2) return null;

    const [timeStr, stabInfo] = parts;

    // Validate time format (HH:MM:SS)
    if (!isValidTimeFormat(timeStr)) {
      return null;
    }

    const stabParts = stabInfo.split(" -> ");
    if (stabParts.length !== 2) return null;

    const [killer, victim] = stabParts.map(part => part.trim());

    // Validate that killer and victim are not empty
    if (!killer || !victim) return null;

    return { time: timeStr, killer, victim };
  };

  const isValidTimeFormat = (timeStr: string): boolean => {
    return /^\d{2}:\d{2}:\d{2}$/.test(timeStr);
  };

  useEffect(() => {
    if (!debouncedInputValue) return;
    handleParseStab(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <div className="mt-4 grid w-full items-center gap-1">
      <Label htmlFor="killer" className={errorStab ? "text-red-500" : ""}>
        Danh sách thông
      </Label>
      <Textarea
        id="killer"
        placeholder="killer"
        value={stab}
        onChange={handleChange}
        className={cn(
          "custom-scrollbar max-h-[calc(100vh-300px)]",
          errorStab ? "border-red-500 focus-visible:ring-red-500" : ""
        )}
      />
      {errorStab && <p className="text-sm text-red-500">{errorStab}</p>}
    </div>
  );
}
