import useLogsStore from "@/stores/logs";
import { Button } from "./ui/button";
import { LIST_VIEW, LOG_STEP } from "@/constants/Game";

export default function ActionButton() {
  const map = useLogsStore(state => state.logsTmp?.map);
  const stab = useLogsStore(state => state.stab);
  const logsTmp = useLogsStore(state => state.logsTmp);
  const setErrorProps = useLogsStore(state => state.setErrorProps);
  const setProps = useLogsStore(state => state.setProps);

  const handleSubmit = () => {
    if (!map) {
      setErrorProps({ map: "Nhập map để thông" });
      return;
    }
    if (!stab) {
      setErrorProps({ stab: "Nhập danh sách để thông" });
      return;
    }
    console.log("🚀 ~ handleSubmit ~ logsTmp:", logsTmp);
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
      >
        Chưa thông
      </Button>
      <Button className="cursor-pointer" onClick={handleSubmit}>
        Thông ngay
      </Button>
    </div>
  );
}
