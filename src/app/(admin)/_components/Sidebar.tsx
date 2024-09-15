"use client";
import IconMenu from "@/components/IconMenu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Image,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: Home,
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/dashboard/customers",
    label: "Customers",
    icon: Users,
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: "/dashboard/images",
    label: "Images",
    icon: Image,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="relative min-w-min">
      <nav className="sticky top-20 space-y-8 pr-4">
        <div>
          <h2 className="mb-2 text-xs uppercase">menu</h2>
          <ul className="space-y-2">
            {sidebarItems.map(({ href, label, icon: Icon }) => (
              <li
                key={href}
                className={cn("", {
                  "mt-2 border-t-2 pt-2 text-muted-foreground":
                    label === "Settings",
                })}
              >
                <Link
                  href={href}
                  className={cn(
                    buttonVariants({
                      variant: pathname === href ? "secondary" : "ghost",
                    }),
                  )}
                >
                  <IconMenu
                    icon={Icon}
                    text={label}
                    className="text-lg"
                    iconSize={24}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
