import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

const data = [
  "w-1/2",
  "w-1/3",
  "w-2/3",
  "w-1/2",
  "w-1/4",
  "w-2/3",
  "w-1/3",
  "w-1/2",
  "w-1/4",
  "w-1/3",
];

export default function LoadingPlaceholder() {
  return (
    <div className="flex flex-col">
      <Skeleton className="mt-4 h-4 w-2/12 bg-gray-200" />
      <Skeleton className="mt-1 h-4 w-3/12 bg-gray-200" />
      <Skeleton className="mt-4 h-4 w-2/12 bg-gray-200" />
      <Skeleton className="mt-1 h-4 w-full bg-gray-200" />
      <Skeleton className="mt-1 h-4 w-6/12 bg-gray-200" />
      <Skeleton className="mt-4 h-4 w-3/12 bg-gray-200" />
      <Skeleton className="mt-1 h-4 w-full bg-gray-200" />
      <Skeleton className="mt-1 h-4 w-9/12 bg-gray-200" />
      <Skeleton className="mt-4 h-4 w-4/12 bg-gray-200" />
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Skeleton className="h-4 w-2/3 bg-gray-200" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-2/2 bg-gray-200" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="ml-auto h-4 w-1/2 bg-gray-200" />
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="flex-1 overflow-y-auto">
          <Table>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[100px] font-medium">
                    <Skeleton className="h-4 w-1/3 bg-gray-200" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className={cn("h-4 bg-gray-200", item)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-1/3 bg-gray-200" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
