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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await validateRequest();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="overflow-x-hidden">
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <TRPCReactProvider>
          <SessionProvider value={session}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="w-screen grow pt-20">{children}</main>
              <Toaster />
            </div>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
