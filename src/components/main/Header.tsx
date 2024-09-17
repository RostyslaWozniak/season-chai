/* eslint-disable @next/next/no-img-element */
import { CartSheet } from "@/components/CartSheet";
import { TransitionLink } from "../TransitionLink";
import { UserButton } from "../UserButton";

export default async function Header() {
  return (
    <header className="fixed top-0 z-[40] w-screen bg-card/30 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-2">
        <TransitionLink
          href="/"
          className="flex items-end text-2xl font-bold text-primary"
        >
          <img src="/favicon.svg" alt="logo" className="mr-2 h-10 w-10" />
          <p className="[text-shadow:_0.5px_0.5px_0_hsl(var(--card))]">
            Season Chai
          </p>
        </TransitionLink>
        <div className="flex items-center gap-5">
          <CartSheet />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
