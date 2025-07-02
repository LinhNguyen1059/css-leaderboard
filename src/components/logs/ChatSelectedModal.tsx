import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import useLogsStore from "@/stores/logs";

export default function ChatSelectedModal() {
  const setProps = useLogsStore(state => state.setProps);
  const chatSelected = useLogsStore(state => state.chatSelected);
  const openChatPopup = useLogsStore(state => state.openChatPopup);

  const handleClose = () => {
    setProps({ openChatPopup: false });
    setTimeout(() => {
      setProps({ chatSelected: undefined });
    }, 300);
  };

  return (
    <Dialog open={openChatPopup} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{chatSelected?.player} mõm rằng</DialogTitle>
        </DialogHeader>
        <div className="flex max-h-[400px] w-full flex-1 flex-col">
          <div className="custom-scrollbar flex-1 overflow-y-auto">
            <Table>
              <TableBody>
                {chatSelected?.data?.map(chat => (
                  <TableRow key={`${chat.time}-${chat.message}`}>
                    <TableCell className="flex items-center gap-1">
                      <span>{chat.time}</span>
                      <span>·</span>
                      <span>{chat.message}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng mõm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
