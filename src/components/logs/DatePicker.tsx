import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import useLogsStore from "@/stores/logs";
import { cn } from "@/lib/utils";

export default function DatePicker() {
  const date = useLogsStore(state => state.date);
  const setProps = useLogsStore(state => state.setProps);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
          <CalendarIcon className="ml-4 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={selectedDate => setProps({ date: selectedDate })}
          disabled={date => date > new Date() || date < new Date("1900-01-01")}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
