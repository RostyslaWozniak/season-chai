import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
      Login
    </Link>
  );
};
