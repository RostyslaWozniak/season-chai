import React from "react";
import { ChartBar } from "../_components/ChartBar";
import { api } from "@/trpc/server";
import { AdminDashboardOverview } from "../_components/AdminDashboardOverview";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminPage() {
  const data = await api.admin.getSalesData();

  return (
    <div className="space-y-10">
      <AdminDashboardOverview />
      <ChartBar data={data} />
    </div>
  );
}
