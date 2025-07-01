import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LIST_VIEW } from "@/constants/Game";
import useLogsStore from "@/stores/logs";

export default function ListDropdown() {
  const listView = useLogsStore(state => state.listView);
  const setProps = useLogsStore(state => state.setProps);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto cursor-pointer gap-1 !bg-transparent !p-0"
        >
          <h3 className="text-xl font-medium">
            {listView === LIST_VIEW.STAB ? "Danh sách đâm" : "Danh sách mõm"}
          </h3>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.0549 12.1573 16.0549 12.3704 15.8351Z"
              fill="#000000"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuCheckboxItem
          checked={listView === LIST_VIEW.STAB}
          onCheckedChange={() => {
            if (listView === LIST_VIEW.STAB) return;
            setProps({ listView: LIST_VIEW.STAB });
          }}
        >
          Danh sách đâm
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={listView === LIST_VIEW.CHAT}
          onCheckedChange={() => {
            if (listView === LIST_VIEW.CHAT) return;
            setProps({ listView: LIST_VIEW.CHAT });
          }}
        >
          Danh sách mõm
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
