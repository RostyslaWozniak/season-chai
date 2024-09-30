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
import { formatPrice } from "@/helpers";
import { api } from "@/trpc/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { User } from "lucide-react";
import Image from "next/image";

export const CustomersList = () => {
  const { data: carts } = api.admin.orders.getAllCarts.useQuery();
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
              <TableHead className="w-min">Image</TableHead>
              <TableHead className="w-min">Email</TableHead>
              <TableHead className="min-w-20">Items in Cart</TableHead>
              <TableHead className="min-w-20">Total in Cart</TableHead>
              <TableHead className="min-w-20">Status</TableHead>
              <TableHead className="min-w-20">Price</TableHead>
              <TableHead align="right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          {carts && (
            <TableBody>
              {carts.map(({ users, _count, cart_items }) => (
                <TableRow key={users.id}>
                  <TableCell>{users.username}</TableCell>
                  <TableCell>
                    {users.avatarUrl ? (
                      <Image
                        src={users.avatarUrl}
                        alt="User avatar"
                        className="aspect-square h-12 object-cover"
                      />
                    ) : (
                      <User />
                    )}
                  </TableCell>
                  <TableCell>{users.email}</TableCell>
                  <TableCell>{_count.cart_items}</TableCell>
                  <TableCell>
                    {cart_items.reduce((acc, item) => acc + item.quantity, 0)}
                  </TableCell>
                  <TableCell>
                    {_count.cart_items ? (
                      <div className="aspect-square h-2 rounded-full bg-emerald-500" />
                    ) : (
                      <div className="aspect-square h-2 rounded-full bg-amber-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    {formatPrice(
                      cart_items.reduce(
                        (acc, item) =>
                          acc +
                          item.quantity *
                            Number(
                              item.products.salePrice ?? item.products.price,
                            ),
                        0,
                      ),
                    )}
                  </TableCell>
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
