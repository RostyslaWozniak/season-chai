"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrettyTime, formatPrice } from "@/helpers";
import { api } from "@/trpc/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Dot } from "lucide-react";

export const OrdersTable = () => {
  const { data: orders } = api.admin.orders.getAllOrders.useQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-min">Name</TableHead>

              <TableHead className="w-min">Email</TableHead>
              <TableHead className="w-min">Date</TableHead>

              <TableHead className="min-w-20">Items</TableHead>

              <TableHead className="min-w-20">Status</TableHead>
              <TableHead className="min-w-20">Price</TableHead>
              <TableHead align="right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          {orders && (
            <TableBody>
              {orders.map(
                ({ user, _count, id, totalPrice, createdAt, status }) => (
                  <TableRow key={id}>
                    <TableCell>{user.username}</TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>{formatPrettyTime(createdAt)}</TableCell>
                    <TableCell>{_count.orderItems}</TableCell>

                    <TableCell className="text-center">
                      {status === "COMPLETED" && (
                        <Dot className="scale-[2] text-emerald-500" />
                      )}
                      {status === "PENDING" && (
                        <Dot className="scale-[2] text-amber-500" />
                      )}
                      {status === "CANCELED" && (
                        <Dot className="scale-[2] text-destructive" />
                      )}
                    </TableCell>
                    <TableCell>{formatPrice(totalPrice)}</TableCell>
                    <TableCell>
                      <button>
                        <DotsHorizontalIcon className="h-5 w-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
};
