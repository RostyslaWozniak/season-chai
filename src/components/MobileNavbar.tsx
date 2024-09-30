"use client";
import { Home, ShoppingBag, Gift, ClipboardList } from "lucide-react";
import Link from "next/link";
import { CartSheet } from "./cart/CartSheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "@/context/SessionProvider";

export function MobileNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { user } = useSession();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-[999] h-20 w-screen border-t border-gray-200 bg-white bg-opacity-70 backdrop-blur-sm md:hidden">
      <div className="mx-auto max-w-md px-4">
        <ul className="flex items-center justify-between">
          <NavItem
            href="/"
            icon={<Home className="h-6 w-6" />}
            label="Home"
            isActive={pathname === "/" && !searchParams.get("q")}
          />
          <NavItem
            href="/products"
            icon={<ShoppingBag className="h-6 w-6" />}
            label="Products"
            isActive={pathname === "/products" && !searchParams.get("q")}
          />
          <NavItem
            href="/products?q=gift-sets"
            icon={<Gift className="h-6 w-6" />}
            label="Gifts"
            isActive={pathname === "/products" && !!searchParams.get("q")}
          />

          <NavItem
            href={user ? "/orders" : "/login?redirect=/orders"}
            icon={<ClipboardList className="h-6 w-6" />}
            label="Orders"
            isActive={pathname === "/orders"}
          />

          <CartSheet />
        </ul>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  const navigate = useRouter();
  return (
    <li>
      <Link
        onTouchStart={() => navigate.push(href)}
        href={href}
        className={cn(
          "pointer-events-auto flex flex-col items-center p-2 text-gray-600 transition-colors duration-200",
          {
            "text-primary": isActive,
          },
        )}
      >
        <span
          className={cn(
            "inline-block transform rounded-full bg-gray-50 p-2 text-gray-800 transition-all duration-200 ease-in-out",
            {
              "text-primary": isActive,
            },
          )}
        >
          {icon}
        </span>
        <span className="mt-1 text-xs font-medium">{label}</span>
      </Link>
    </li>
  );
}
