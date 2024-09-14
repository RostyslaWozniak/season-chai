"use client";
import Link, { type LinkProps } from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  className,
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const container = document.getElementById("main-container");

    container?.classList.add("page-transition");

    await sleep(500);
    router.push(href);
    await sleep(500);

    container?.classList.remove("page-transition");
  };

  return (
    <Link
      className={cn("", className)}
      {...props}
      href={href}
      // onClick={handleTransition}
    >
      {children}
    </Link>
  );
};
