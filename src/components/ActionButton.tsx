import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import useLogsStore from "@/stores/logs";
import { LIST_VIEW, LOG_STEP } from "@/constants/Game";
import usePostGameData from "@/hooks/usePostGameData";
import { LogsInfo } from "@/types/game";

export default function ActionButton() {
  const router = useRouter();

  const map = useLogsStore(state => state.logsTmp?.map);
  const stab = useLogsStore(state => state.stab);
  const logsTmp = useLogsStore(state => state.logsTmp);
  const setErrorProps = useLogsStore(state => state.setErrorProps);
  const setProps = useLogsStore(state => state.setProps);

  const [loading, setLoading] = useState(false);

  const { postGameData } = usePostGameData();

  const handleSubmit = async () => {
    if (!map) {
      setErrorProps({ map: "Nhập map để thông" });
      return;
    }
    if (!stab) {
      setErrorProps({ stab: "Nhập danh sách để thông" });
      return;
    }

    try {
      setLoading(true);
      toast.promise(postGameData(logsTmp as LogsInfo), {
        loading: "Đang thông, đợi thông cho xong...",
        error: () => {
          setLoading(false);
          return "Thông thất bại, thử thông lại sau";
        },
        success: () => {
          setLoading(false);
          setProps({
            logStep: LOG_STEP.IMPORT,
            listView: LIST_VIEW.STAB,
            logsTmp: undefined,
          });
          router.push("/");
          return "Thông thành công, đã lưu vào bảng thông thần";
        },
      });
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  const handleCancel = () => {
    setProps({ stab: "", listView: LIST_VIEW.STAB, logStep: LOG_STEP.IMPORT });
  };

  return (
    <div className="mt-6 flex items-center justify-between">
      <Button
        className="cursor-pointer"
        variant="outline"
        onClick={handleCancel}
        disabled={loading}
      >
        Chưa thông
      </Button>
      <Button
        className="cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
      >
        Thông ngay
      </Button>
    </div>
  );
}
