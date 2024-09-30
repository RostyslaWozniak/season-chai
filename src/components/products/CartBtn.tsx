"use client";
import { useSession } from "@/context/SessionProvider";
import React from "react";
import { AddToCartButton } from "./AddToCartButton";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartBtn = ({ productId }: { productId: string }) => {
  const { user } = useSession();
  const router = useRouter();
  return user ? (
    <AddToCartButton productId={productId} />
  ) : (
    <Link
      onTouchStart={() => router.push(`/login?redirect=/products/${productId}`)}
      href={`/login?redirect=/products/${productId}`}
      className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Link>
  );
};

export default CartBtn;
