import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/shadcn-ui/button";
import { H1, H2 } from "@/components/typography";
import { SectionHeader } from "@/components/ui/section-header";
import { list } from "@vercel/blob";
import Link from "next/link";
import { Suspense } from "react";
import { UploadImageForm } from "@/features/vercel-blob/components/upload-image-form";
import { ImageItem } from "@/features/vercel-blob/components/image-item";

export default function Home() {
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SectionHeader
            title="Home page"
            heading={H1}
            subtitle="Welcome to home page"
            subtitleClassName="text-start"
          />
          <div className="mt-12 flex gap-x-8">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/profile">
              <Button>Profile</Button>
            </Link>
            <Link href="/admin">
              <Button>Admin</Button>
            </Link>
            <Link href="/avatar/upload">
              <Button>Upload Avatar</Button>
            </Link>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SectionHeader title="Upload Form" heading={H2} />
          <UploadImageForm />
        </MaxWidthWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <MaxWidthWrapper>
          <SectionHeader title="Images" heading={H2} />
          <Suspense fallback={<div>Loading...</div>}>
            <ImagesList />
          </Suspense>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}

async function ImagesList() {
  const { blobs } = await list();
  return (
    <div className="flex gap-12">
      {blobs.map((image, i) => (
        <ImageItem key={image.pathname} priority={i < 2} src={image.url} />
      ))}
    </div>
  );
}
