import { OverviewCards } from "@/components/OverviewCards";
import { formatPrice } from "@/helpers";
import { api } from "@/trpc/server";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

export const AdminDashboardOverview = async () => {
  const { totalProducts, totalCustomers, totalOrders, totalRevenue } =
    await api.admin.data.getOverview();

  const overviewData = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      description: "+10% from last month",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      description: "+15% from last month",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      description: "+5% from last month",
    },
    {
      title: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      description: "+20% from last month",
    },
  ];
  return <OverviewCards data={overviewData} title="Overview" />;
};
