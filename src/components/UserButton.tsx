"use client";

import { logout } from "@/app/(auth)/logout/actions";

import { ClipboardList, Lock, LogOutIcon } from "lucide-react";
import Link from "next/link";
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
import { Button } from "./ui/button";
import { type User } from "lucia";

interface UserButtonProps {
  user: User;
  className?: string;
}

export const UserButton = ({ user, className }: UserButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full border-primary outline-primary",
            className,
          )}
        >
          <UserAvatar avatarUrl={user.avatarUrl} fallback={user.username} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Logged in as{" "}
          <span className="font-bold capitalize">{user.username}</span>
        </DropdownMenuLabel>
        <Link href={`/orders`} className="hidden md:block">
          <DropdownMenuItem className="cursor-pointer">
            <ClipboardList className="mr-2 size-4" />
            Orders
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </Link>
        {user.role === "ADMIN" && (
          <Link href={`/dashboard`} className="hidden md:block">
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
  );
};
