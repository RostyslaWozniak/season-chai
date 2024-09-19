import Footer from "@/components/main/Footer";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="grow">{children}</div>
      <Footer />
    </>
  );
}
