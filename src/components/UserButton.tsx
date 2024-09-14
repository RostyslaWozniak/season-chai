"use client";

import { logout } from "@/app/(auth)/logout/actions";

import { Lock, LogOutIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/context/SessionProvider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { LoginButton } from "./auth/LoginButton";
import IconMenu from "./IconMenu";

interface UserButtonProps {
  className?: string;
}

export const UserButton = ({ className }: UserButtonProps) => {
  const { user } = useSession();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "rounded-full text-primary outline-primary",
                className,
              )}
            >
              <UserAvatar avatarUrl={user.avatarUrl} fallback={user.username} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/cart`}>
              <DropdownMenuItem className="cursor-pointer">
                <IconMenu icon={ShoppingBag} text="Cart" />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            {user.role === "ADMIN" && (
              <Link href={`/dashboard`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Lock className="mr-2 size-4" />
                  Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </Link>
            )}
            <DropdownMenuItem
              onClick={async () => {
                await logout();
              }}
              className="cursor-pointer"
            >
              <LogOutIcon className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginButton />
      )}
    </>
  );
};
