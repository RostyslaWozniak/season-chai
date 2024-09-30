/* eslint-disable @next/next/no-img-element */
import { CartSheet } from "@/components/cart/CartSheet";

import { UserButton } from "../UserButton";
import { validateRequest } from "@/lib/auth";
import { LoginButton } from "../auth/LoginButton";
import Link from "next/link";

export default async function Header() {
  const { user } = await validateRequest();
  return (
    <header className="fixed top-0 z-[40] w-screen bg-card/30 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-5 px-5 py-2 lg:px-12">
        <Link
          href="/"
          className="flex items-end text-2xl font-bold text-primary"
        >
          <img src="/favicon.svg" alt="logo" className="mr-2 h-10 w-10" />
          <p className="[text-shadow:_0.5px_0.5px_0_hsl(var(--card))]">
            Season Chai
          </p>
        </Link>
        {user ? (
          <div className="flex items-center gap-5">
            <CartSheet />
            <UserButton user={user} />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
