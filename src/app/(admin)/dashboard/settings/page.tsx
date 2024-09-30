"use client";

import { CategoryForm } from "@/app/(admin)/dashboard/settings/category/CategoryForm";
import { CategoryView } from "@/app/(admin)/dashboard/settings/category/CategoryView";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { MainSettingsForm } from "./main-settings/MainSettingsForm";

export default function SettingsPage() {
  const { data: categories } = api.admin.categories.getAllCategories.useQuery();

  const { data: settings } = api.admin.data.getAdminSettings.useQuery();

  return (
    <div className="space-y-10">
      <Card className="">
        <CardHeader>
          <h2 className="border-b text-2xl">Main Settings</h2>
        </CardHeader>

        <CardContent>
          {settings && <MainSettingsForm settings={settings} />}
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <h2 className="border-b text-2xl">Categories</h2>
        </CardHeader>

        <CardContent className="flex gap-12">
          <CategoryForm />
          {categories && <CategoryView categories={categories} />}
        </CardContent>
      </Card>
    </div>
  );
}
