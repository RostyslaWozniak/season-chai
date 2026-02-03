"use client";

import { Input } from "@/components/shadcn-ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState, useTransition } from "react";
import { uploadImageAction } from "../actions/upload-image.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const MAX_IMAGE_SIZE = 2_000_000;

export function UploadImageForm() {
  const [image, setImage] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function uploadImage(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (image == null) {
      toast.error("Select image before uploading.");
      return;
    }
    if (image.size >= MAX_IMAGE_SIZE) {
      toast.error("Image is to large ", {
        description: `Max size of image - ${MAX_IMAGE_SIZE / 1_000_000}MB`,
      });
      return;
    }
    startTransition(async () => {
      const { error, blob } = await uploadImageAction(image);
      startTransition(() => {
        if (error) {
          toast.error(error);
          return;
        }
        router.refresh();
        toast.success("Image uploaded");
        console.log(blob);
      });
    });
  }

  return (
    <form onSubmit={uploadImage} className="flex max-w-lg gap-x-2">
      <Input
        type="file"
        id="image"
        name="image"
        accept="image/jpeg, image/png, image/webp"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <LoadingButton loading={isPending}>Upload</LoadingButton>
    </form>
  );
}
