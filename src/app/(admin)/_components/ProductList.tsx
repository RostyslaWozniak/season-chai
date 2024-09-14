import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatPrice } from "@/helpers";
import { api } from "@/trpc/server";
import { Settings } from "lucide-react";
import Image from "next/image";
import { TableRowSettings } from "./TableRowSettings";
import { cn } from "@/lib/utils";
import {
  PRODUCT_STOCK_MIN_THRESHOLD,
  PRODUCT_STOCK_THRESHOLD,
} from "@/helpers/constant";
import { TagLink } from "@/components/TagLink";
import { categoryToClient, categoryToSlug } from "@/helpers/category";

export const ProductList = async () => {
  const products = await api.admin.getAllProducts();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Product List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-40">Name</TableHead>
              <TableHead className="min-w-20">Image</TableHead>
              <TableHead className="min-w-24">Price</TableHead>
              <TableHead className="min-w-32">Category</TableHead>
              <TableHead className="min-w-20">Stock</TableHead>
              <TableHead>Description</TableHead>
              <TableHead align="right">
                <Settings size={20} />
              </TableHead>
            </TableRow>
          </TableHeader>
          {products && (
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width="64"
                      height="64"
                      className="aspect-square object-cover"
                    />
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <TagLink
                      path={`/products?q=${categoryToSlug(product.category)}`}
                      label={categoryToClient(product.category)}
                    />
                  </TableCell>
                  <TableCell
                    className={cn("", {
                      "font-bold text-destructive":
                        product.stock < PRODUCT_STOCK_MIN_THRESHOLD,
                      "font-bold text-amber-500":
                        product.stock < PRODUCT_STOCK_THRESHOLD &&
                        product.stock >= PRODUCT_STOCK_MIN_THRESHOLD,
                    })}
                  >
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-3 w-[400px] overflow-hidden text-ellipsis">
                      {product.description}
                    </p>
                  </TableCell>
                  <TableCell className="relative">
                    <TableRowSettings product={product} />
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
