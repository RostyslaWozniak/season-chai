import { type Metadata } from "next";

import Footer from "@/components/main/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Season Chai",
    default: "Season Chai",
  },
  description: "The e-commerce platform for tea products",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
