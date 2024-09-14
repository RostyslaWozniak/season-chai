import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { Sidebar } from "./_components/Sidebar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Admin | %s | Season Chai",
    default: "Season Chai",
  },
  description: "The e-commerce platform for tea products",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");
  if (user?.role !== "ADMIN") redirect("/");
  return (
    <div className="container relative mx-auto flex min-h-[calc(100vh-240px)] max-w-7xl grow justify-between">
      <Sidebar />
      <div className="grow px-10 py-5">{children}</div>
    </div>
  );
}
