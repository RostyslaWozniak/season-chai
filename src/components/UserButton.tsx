"use client";

import { logout } from "@/app/(auth)/logout/actions";

import { Lock, LogOutIcon } from "lucide-react";
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
import { Button } from "./ui/button";

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
