/* eslint-disable @next/next/no-img-element */
import { TransitionLink } from "../TransitionLink";
import { UserButton } from "../UserButton";

export default function Header() {
  return (
    <header className="fixed top-0 z-[40] w-screen bg-card/30 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-2">
        <TransitionLink
          href="/"
          className="flex items-end text-2xl font-bold text-primary"
        >
          <img src="/favicon.svg" alt="logo" className="mr-2 h-10 w-10" />
          Season Chai
        </TransitionLink>
        <UserButton />
      </div>
    </header>
  );
}
