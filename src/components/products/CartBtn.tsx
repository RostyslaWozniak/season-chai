"use client";
import { useSession } from "@/context/SessionProvider";
import React from "react";
import { AddToCartButton } from "./AddToCartButton";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartBtn = ({ productId }: { productId: string }) => {
  const { user } = useSession();
  return user ? (
    <AddToCartButton productId={productId} />
  ) : (
    <Link
      href={`/login?redirect=/products/${productId}`}
      className={cn(buttonVariants({ variant: "outline" }))}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Link>
  );
};

export default CartBtn;
