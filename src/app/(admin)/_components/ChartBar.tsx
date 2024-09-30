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
import { useEffect, useState } from "react";
import { getMonth } from "@/helpers/date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChartBar({
  data,
}: {
  data: {
    date: string | undefined;
    price: string;
  }[];
}) {
  const [numOfMonths, setNumOfMonths] = useState(12);

  const months = getMonth(numOfMonths);

  const barData = months
    .map((month) => {
      const filtered = data.filter((d) => d.date === month);
      return {
        date: month,
        price: filtered.reduce((a, b) => a + Number(b.price), 0),
      };
    })
    .reverse();

  useEffect(() => {
    console.log(barData);
  }, [barData]);
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Sales Overview</CardTitle>
        <Select
          defaultValue="12"
          onValueChange={(value) => setNumOfMonths(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="12">12</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"date"} />
            <YAxis />
            <Tooltip formatter={(value) => `${formatPrice(value)}`} />
            <Bar dataKey="price" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
