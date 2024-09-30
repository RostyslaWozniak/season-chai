import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { type OverviewCardData } from "./OverviewCards";

import { api } from "@/trpc/server";
import { cn } from "@/lib/utils";

export const OverviewCardItem = async ({
  title,
  value,
  description,
  icon: Icon,
}: OverviewCardData) => {
  const settings =
    title === "Min Stock" ? await api.admin.data.getAdminSettings() : undefined;

  return (
    <Card
      className={cn("w-full", {
        "text-destructive shadow-destructive":
          Number(settings?.lowStockAlertLevel ?? 0) > Number(value),
        "text-amber-500 shadow-amber-500":
          Number(settings?.warningStockLevel ?? 0) > Number(value) &&
          Number(settings?.lowStockAlertLevel ?? 0) < Number(value),
      })}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
