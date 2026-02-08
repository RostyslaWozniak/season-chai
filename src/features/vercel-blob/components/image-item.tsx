"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteImageAction } from "../actions/delete-image.action";
import { useRouter } from "next/navigation";

export function ImageItem({
  src,
  title,
  priority,
}: {
  src: string;
  title: string;
  priority: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function deleteImage() {
    startTransition(async () => {
      await deleteImageAction(src);

      startTransition(() => {
        toast.success("Image deleted");
        router.refresh();
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
      <p className="max-w-40 overflow-hidden text-nowrap">{title}</p>
    </div>
  );
}
