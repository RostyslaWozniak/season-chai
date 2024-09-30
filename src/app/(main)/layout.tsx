import Footer from "@/components/main/Footer";
import { MobileNavbar } from "@/components/MobileNavbar";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="grow">{children}</div>
      <Footer />
      <MobileNavbar />
    </>
  );
}
