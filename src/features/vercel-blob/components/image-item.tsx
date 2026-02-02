"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { del } from "@vercel/blob";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

export function ImageItem({
  src,
  priority,
}: {
  src: string;
  priority: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  function deleteImage() {
    startTransition(() => {
      del(src);

      startTransition(() => {
        toast.success("Image deleted");
      });
    });
  }
  return (
    <div className="relative">
      <Image
        priority={priority}
        src={src}
        alt="My Image"
        width={200}
        height={200}
      />
      <LoadingButton
        loading={isPending}
        className="absolute top-1 right-1"
        variant="destructive"
        size="icon"
        onClick={deleteImage}
      >
        <XIcon />
      </LoadingButton>
    </div>
  );
}
