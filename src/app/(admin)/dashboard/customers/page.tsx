import { CustomersList } from "./CustomersList";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

export default function CustomersPage() {
  return (
    <div className="">
      <CustomersList />
    </div>
  );
}
