"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { slugifyString } from "@/helpers";
import { Settings } from "lucide-react";
import Image from "next/image";
import { ProductTableSettings } from "./ProductTableSettings";
import { cn } from "@/lib/utils";
import { TagLink } from "@/components/TagLink";
import { api } from "@/trpc/react";
import { LoaderScreen } from "@/components/Loaders";
import { PriceView } from "../../../../components/products/PriceView";

export const ProductList = () => {
  const { data: products, isFetching } =
    api.admin.products.getAllProducts.useQuery();

  const { data: settings } = api.admin.data.getAdminSettings.useQuery();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Product List</CardTitle>
      </CardHeader>
      <CardContent className="relative min-h-[500px]">
        {isFetching ? (
          <LoaderScreen className="" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-40">Name</TableHead>
                <TableHead className="min-w-20">Image</TableHead>
                <TableHead className="min-w-min">Price</TableHead>
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
                    <TableCell>
                      <PriceView
                        price={product.price}
                        salePrice={product.salePrice}
                      />
                    </TableCell>
                    <TableCell>
                      <TagLink
                        path={`/products?q=${slugifyString(product.category.name)}`}
                        label={product.category.name}
                      />
                    </TableCell>
                    <TableCell
                      className={cn("", {
                        "font-bold text-destructive":
                          product.stock < (settings?.lowStockAlertLevel ?? 0),
                        "font-bold text-amber-500":
                          product.stock < (settings?.warningStockLevel ?? 0) &&
                          product.stock >= (settings?.lowStockAlertLevel ?? 0),
                      })}
                    >
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-2 w-[400px] overflow-hidden text-ellipsis">
                        {product.description}
                      </p>
                    </TableCell>
                    <TableCell className="relative">
                      <ProductTableSettings
                        product={product}
                        warningStockLevel={settings?.warningStockLevel ?? 0}
                        lowStockAlertLevel={settings?.lowStockAlertLevel ?? 0}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
