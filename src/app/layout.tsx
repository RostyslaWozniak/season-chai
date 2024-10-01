import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/context/SessionProvider";
import Header from "@/components/main/Header";
import { Toaster } from "@/components/ui/toaster";
import { validateRequest } from "@/lib/auth";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "@/app/api/uploadthing/core";
import CartProvider from "@/context/CartContext";
import { type Metadata } from "next";
import { cn } from "@/lib/utils";
import ProductsProvider from "@/context/ProductsContext";

export const metadata: Metadata = {
  title: {
    template: "%s | Season Chai",
    default: "Season Chai",
  },
  description: "The e-commerce platform for tea products",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Season Chai",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await validateRequest();
  return (
    <html lang="en" className={cn("", `${GeistSans.variable}`)}>
      <body className="overflow-x-hidden">
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <TRPCReactProvider>
          {/* context providers */}
          <SessionProvider value={session}>
            <ProductsProvider>
              <CartProvider>
                {/* context providers  */}
                <div className="flex min-h-dvh flex-col">
                  <Header />
                  <main className="flex w-screen grow flex-col pt-14">
                    {children}
                  </main>
                  <Toaster />
                </div>
              </CartProvider>
            </ProductsProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
