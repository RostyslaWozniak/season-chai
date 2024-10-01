import { PriceView } from "@/components/products/PriceView";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatPrettyTime } from "@/helpers";
import { api } from "@/trpc/server";
import { Status } from "@/components/Status";
import { ShoppingBag, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { user } = await validateRequest();

  if (!user) redirect("/login");

  const orders = await api.private.order.getCurrrentUserOrders();
  return (
    <div className="container mx-auto max-w-7xl px-2 py-20">
      {orders.length !== 0 ? (
        <Card className="mx-auto flex w-full max-w-[700px] flex-col px-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Your Orders</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[200px] grow p-0 md:min-h-[400px]">
            <Table className="relative mb-6">
              <TableHeader className="sticky top-0 z-20 bg-card shadow">
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="">{i + 1}</TableCell>
                    <TableCell className="">
                      {formatPrettyTime(item.createdAt)}
                    </TableCell>
                    <TableCell>{item._count.orderItems}</TableCell>
                    <TableCell>
                      <Status status={item.status} />
                    </TableCell>
                    <TableCell>
                      <PriceView
                        price={Number(item.totalPrice)}
                        className="items-start justify-center"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex flex-col items-end px-2 py-4 shadow-[0_-4px_5px_-2px_rgba(0,0,0,0.1)] sm:px-8">
            <Link href="/products" className={cn(buttonVariants(), "text-lg")}>
              <ShoppingBag className="mr-2 h-6 w-6" /> Go Shopping
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-col items-center px-10 text-center">
          <ShoppingBagIcon className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold">No Orders Yet</h2>
          <p className="mb-6 text-muted-foreground">
            {
              "Looks like you haven't placed any orders. Start shopping to see your orders here!"
            }
          </p>
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg" }), "text-lg")}
          >
            <ShoppingBag className="mr-2 h-6 w-6" /> Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
