"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/helpers";

type Data = {
  name: string;
  sales: number;
};

export function ChartBar({ data }: { data: Data[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip formatter={(value) => `${formatPrice(value)}`} />
            <Bar dataKey="sales" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
