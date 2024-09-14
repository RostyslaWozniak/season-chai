import { OverviewCards } from "@/components/OverviewCards";
import { ProductList } from "../../_components/ProductList";
import { api } from "@/trpc/server";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  Package,
  Warehouse,
} from "lucide-react";
import { CreateNewProduct } from "../../_components/CreateNewProduct";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsListPage() {
  const { totalProducts, totalStock, minStock, maxStock } =
    await api.admin.getOverview();
  const overviewData = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      description: "+10% from last month",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: Warehouse,
      description: "+15% from last month",
    },
    {
      title: "Max Stock",
      value: maxStock[0]?.stock ?? 0,
      icon: CalendarArrowUp,
      description: maxStock[0]?.name,
    },
    {
      title: "Min Stock",
      value: minStock[0]?.stock ?? 0,
      icon: CalendarArrowDown,
      description: minStock[0]?.name,
    },
  ];
  return (
    <div className="relative w-full space-y-10">
      <div className="absolute -top-2 right-0">
        <CreateNewProduct />
      </div>
      <OverviewCards data={overviewData} title="Overview" />
      <ProductList />
    </div>
  );
}
