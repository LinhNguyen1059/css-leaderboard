import { useMemo } from "react";
import { SquareArrowOutUpRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useChatsData } from "./LogsContext";
import useLogsStore from "@/stores/logs";
import { ChatCount } from "@/types/game";
import { groupChatsByPlayer } from "@/lib/utils";

export default function TableChat() {
  const setProps = useLogsStore(state => state.setProps);
  const chatsData = useChatsData();

  const chats = useMemo(() => {
    if (!chatsData || chatsData.length === 0) return [];
    return groupChatsByPlayer(chatsData);
  }, [chatsData]);

  const handleChatClick = (chat: ChatCount) => {
    setProps({ chatSelected: chat, openChatPopup: true });
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Hạng</TableHead>
            <TableHead>Mõm thủ</TableHead>
            <TableHead className="w-[100px] text-right">Số lần mõm</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {chats.map(chat => (
              <TableRow key={chat.rank} className="group/chat">
                <TableCell className="w-[100px] py-1 font-medium">
                  {chat.rank}
                </TableCell>
                <TableCell className="py-1">{chat.player}</TableCell>
                <TableCell className="w-[100px] py-[6px] text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      className="invisible h-auto cursor-pointer !p-1 transition-none group-hover/chat:visible"
                      onClick={() => handleChatClick(chat)}
                    >
                      <SquareArrowOutUpRight size={16} />
                    </Button>
                    <span>{chat.count}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
