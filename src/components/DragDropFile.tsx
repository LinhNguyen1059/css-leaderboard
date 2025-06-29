import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { cn, parseFileContent } from "@/lib/utils";
import useLogsStore from "@/stores/logs";
import { LOG_STEP } from "@/constants/Game";

export default function DragDropFile() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLogsTmpInfoProps = useLogsStore(state => state.setLogsTmpInfoProps);
  const setProps = useLogsStore(state => state.setProps);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Check if file is LOG or TXT
    const allowedTypes = [".log", ".txt"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      toast.error("Chỉ thông với file LOG hoặc TXT");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = e => {
      if (!e.target) return;
      const text = e.target.result as string;

      const result = parseFileContent(text);

      setLogsTmpInfoProps({
        matchDate: result.matchDate,
        stabs: result.stabs,
        chats: result.chats,
        map: "",
        mapUrl: "",
      });
      setProps({
        logStep: LOG_STEP.INPUT,
        stab: result.stabs
          .map(stab => `${stab.time} · ${stab.killer} -> ${stab.victim}`)
          .join("\n"),
      });
    };

    reader.readAsText(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 flex h-[290px] w-[580px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border border-dashed bg-white transition-colors",
        isDragOver
          ? "border-blue-500 bg-blue-50"
          : "border-blue-100 hover:border-blue-300"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <Upload
        className={cn(
          "h-12 w-12",
          isDragOver ? "text-blue-500" : "text-gray-400"
        )}
      />
      <div>
        <h4 className="text-center text-base leading-6 font-medium">
          {selectedFile ? (
            <>
              File đã chọn:{" "}
              <span className="text-green-600">{selectedFile.name}</span>
            </>
          ) : (
            <>
              Ném file vào đây hoặc{" "}
              <span className="text-[#008CFF] hover:underline">Chọn file</span>{" "}
              để thông
            </>
          )}
        </h4>
        <p className="text-center text-base leading-6 font-medium text-[#898A8D]">
          LOG hoặc TXT
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".log,.txt"
        onChange={handleFileChange}
      />
    </div>
  );
}
