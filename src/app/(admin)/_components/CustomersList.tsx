import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { api } from "@/trpc/server";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { User } from "lucide-react";

export const CustomersList = async () => {
  const users = await api.admin.getAllUsers();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-40">Name</TableHead>
              <TableHead className="min-w-20">Image</TableHead>
              <TableHead className="min-w-24">Email</TableHead>
              <TableHead className="min-w-20">Orders</TableHead>
              <TableHead className="min-w-20">Current Orders</TableHead>
              <TableHead align="right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          {users && (
            <TableBody>
              {users.map(({ displayName, email, avatarUrl, id }) => (
                <TableRow key={id}>
                  <TableCell>{displayName}</TableCell>
                  <TableCell>
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="User avatar"
                        className="aspect-square h-12 object-cover"
                      />
                    ) : (
                      <User />
                    )}
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <button>
                      <DotsHorizontalIcon className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
};
