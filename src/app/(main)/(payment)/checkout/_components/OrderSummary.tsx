import { PriceView } from "@/components/products/PriceView";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/helpers";
import { type RouterOutputs } from "@/trpc/react";

import Image from "next/image";

type OrderSummaryProps = {
  items: RouterOutputs["private"]["cart"]["getCartItems"];
  totalPrice: number;
  tax: number;
  totalPriceWithTax: number;
};

export const OrderSummary = async ({
  items,
  totalPrice,
  tax,
  totalPriceWithTax,
}: OrderSummaryProps) => {
  return (
    <Card className="flex w-full flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        <CardDescription>Review your items before purchasing</CardDescription>
      </CardHeader>
      <CardContent className="grow p-0">
        <ScrollArea className="h-[300px] max-h-[400px] overflow-hidden">
          <Table className="relative mb-6">
            <TableHeader className="sticky top-0 z-20 bg-card shadow">
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={40}
                      height={40}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="sm:pl-6">{item.quantity}</TableCell>
                  <TableCell>
                    <PriceView
                      price={item.price}
                      salePrice={item.salePrice}
                      className="items-start justify-center"
                    />
                  </TableCell>
                  <TableCell>
                    <PriceView
                      price={(item.salePrice ?? item.price) * item.quantity}
                      className="items-start"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col items-end px-1 py-2 shadow-[0_-4px_5px_-2px_rgba(0,0,0,0.1)] sm:px-8">
        <div className="grid grid-cols-2 gap-x-2 text-end">
          {tax > 0 && (
            <>
              <span className="sm:text-lg">Total:</span>{" "}
              <span className="sm:text-lg">{formatPrice(totalPrice)}</span>
              <span className="sm:text-lg">Tax:</span>{" "}
              <span className="sm:text-lg">{formatPrice(tax)}</span>
            </>
          )}
          <span className="sm:text-xl">Total {tax > 0 && "with tax"}:</span>{" "}
          <span className="font-bold text-primary sm:text-xl">
            {formatPrice(totalPriceWithTax)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
