import { cn } from "@/lib/utils";
import { TransitionLink } from "../TransitionLink";
import { buttonVariants } from "../ui/button";

export const LoginButton = () => {
  return (
    <TransitionLink
      href="/login"
      className={cn(buttonVariants({ variant: "default" }))}
    >
      Login
    </TransitionLink>
  );
};
