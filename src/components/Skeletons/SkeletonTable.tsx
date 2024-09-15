import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

export const SkeletonTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">
            <Skeleton className="h-10 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            {/* {Array.from({ length: 5 }).map((_, i) => (
              <TableCell key={i} className="min-w-40"> */}
            <Skeleton className="my-3 h-10 w-full" />
            {/* </TableCell>
            ))} */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
