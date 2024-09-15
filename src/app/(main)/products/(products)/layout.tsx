/* eslint-disable @next/next/no-img-element */

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="mx-auto mb-12 max-w-[1440px]">
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <img
            src="https://t4.ftcdn.net/jpg/01/25/68/03/360_F_125680347_PqYg8AUODHvTjpVNf61GPhG04NgMqPl6.jpg"
            alt="Featured Tea"
            className="h-full w-full object-cover object-[0,80%]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40">
            <h1 className="mb-4 translate-x-10 translate-y-40 text-5xl font-bold text-card">
              Discover the World of Tea
            </h1>
          </div>
        </div>
      </section>
      <div className="relative min-h-[400px]">{children}</div>
    </>
  );
}
