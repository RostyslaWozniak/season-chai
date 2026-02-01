import { LogInIcon } from "lucide-react";
import { Button } from "../shadcn-ui/button";
import { MaxWidthWrapper } from "../max-width-wrapper";
import Link from "next/link";

const navigation = [
  { label: "Główna", href: "/", ariaLabel: "Przejdź na główną" },
  { label: "O nas", href: "/o-nas", ariaLabel: "Przejdź do strony o nas" },
  {
    label: "Kontakt",
    href: "/kontakt",
    ariaLabel: "Przejdź do strony kontakt",
  },
];

export function PublicHeader() {
  return (
    <header className="bg-card sticky top-0 z-50 w-screen py-2">
      <MaxWidthWrapper className="flex items-center justify-between">
        <nav className="hidden md:block">
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
        <div className="flex grow items-center justify-between gap-x-2 md:grow-0">
          <Link
            href="/login"
            className="w-min sm:mx-0"
            aria-label="Przejdź do logowania"
          >
            <Button variant="secondary">
              Zaloguj się
              <LogInIcon />
            </Button>
          </Link>
          {/* <ThemeToggle /> */}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
