import ListDropdown from "./ListDropdown";
import TableChat from "./TableChat";
import TableStab from "./TableStab";
import useLogsStore from "@/stores/logs";
import { LIST_VIEW } from "@/constants/Game";

export default function ListStab() {
  const listView = useLogsStore(state => state.listView);

  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col items-start">
      <ListDropdown />
      {listView === LIST_VIEW.STAB && <TableStab />}
      {listView === LIST_VIEW.CHAT && <TableChat />}
    </div>
  );
}
