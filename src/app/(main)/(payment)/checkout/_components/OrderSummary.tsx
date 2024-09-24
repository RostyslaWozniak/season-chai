import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/helpers";
import Image from "next/image";

export const OrderSummary = ({
  items,
  totalPrice,
}: {
  items: {
    id: string;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
}) => {
  return (
    <Card className="flex max-w-[700px] grow flex-col">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your items before purchasing</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <Table>
          <TableHeader>
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
                    src={item.image_url}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col items-end border-t pt-2">
        <div className="text-right">
          <p className="text-xl font-bold">Total: {formatPrice(totalPrice)}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
