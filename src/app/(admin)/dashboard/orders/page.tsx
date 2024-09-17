import { type Metadata } from "next";
import { OrdersTable } from "./OrdersTable";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function OrdersPage() {
  return (
    <div className="">
      <OrdersTable />
    </div>
  );
}
