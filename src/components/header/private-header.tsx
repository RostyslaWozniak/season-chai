import { LogOutButton } from "@/features/auth/components/log-out-button";
import { getCurrentUser } from "@/features/auth/current-user";
import { Suspense } from "react";
import { Button } from "../shadcn-ui/button";
import { MaxWidthWrapper } from "../max-width-wrapper";
import Link from "next/link";
const navigation = [
  { label: "Główna", href: "/", ariaLabel: "Przejdź na główną" },
  { label: "Profil", href: "/profile", ariaLabel: "Przejdź do profilu" },
];

export function PrivateHeader() {
  return (
    <header className="bg-card w-screen py-2">
      <MaxWidthWrapper className="flex items-center justify-between">
        <nav>
          <ul className="flex gap-x-4">
            {navigation.map(({ ariaLabel, label, href }) => (
              <li key={href} className="hover:underline">
                <Link href={href} aria-label={ariaLabel}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-x-2">
          <Suspense fallback={<div>Loading..</div>}>
            <LogoutButtonSuspense />
          </Suspense>
          {/* <ThemeToggle /> */}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}

async function LogoutButtonSuspense() {
  const user = await getCurrentUser();
  return (
    <>
      {user ? (
        <LogOutButton>Wyloguj się</LogOutButton>
      ) : (
        <Link href="/login" aria-label="Przejdź do logowania">
          <Button>Zaloguj się</Button>
        </Link>
      )}
    </>
  );
}
