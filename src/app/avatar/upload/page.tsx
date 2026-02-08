"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Input } from "@/components/shadcn-ui/input";
import { Progress } from "@/components/shadcn-ui/progress";
import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils/cn";
import { ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const MAX_SIZE_OF_IMAGE = 2_045_000;
const MAX_IMAGES = 10;

export default function AvatarUploadPage() {
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  function handleSubmit() {
    if (files.length === 0) {
      toast.error("Select Image");
      return;
    }
    setFiles(Array.from(files));
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    startTransition(async () => {
      await uploadWithProgress("/api/avatar/upload", formData, setProgress);
      startTransition(() => {
        toast.success("Images Uploaded");
      });
      setFiles([]);
    });
  }

  return (
    <SectionWrapper>
      <MaxWidthWrapper className="flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Images</CardTitle>
          </CardHeader>
          <CardContent>
            {files.length > 0 && (
              <div className="mb-4 space-y-2">
                {Array.from(files).map((file) => (
                  <div
                    key={file.name}
                    className="border-muted flex justify-between border-b p-1"
                  >
                    <div className="flex items-center gap-x-1">
                      <ImageIcon className="text-muted-foreground" />
                      <p>{file.name}</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <span>{formatBytes(file.size)}</span>
                      <Button
                        size="icon-xs"
                        variant="destructive"
                        onClick={() =>
                          setFiles((prev) =>
                            prev.filter((img) => img.name !== file.name),
                          )
                        }
                      >
                        <XIcon />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {progress > 0 && progress < 100 && (
              <div className="mb-4">
                <div className="flex items-center justify-between p-1">
                  <p>Progress</p>
                  <p>{progress}%</p>
                </div>
                <Progress value={progress} />
              </div>
            )}
            <div
              className={cn(
                "border-primary/20 bg-primary/5 hover:bg-primary/10 relative isolate flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
                {
                  "hover:bg-primary/5 cursor-default opacity-80": isPending,
                },
              )}
            >
              <ImageIcon className="text-primary/60 mb-4 h-10 w-10" />
              <div className="text-muted-foreground text-center">
                <p className="text-sm">
                  Drag and drop images here or click to browse
                </p>
                <p className="text-xs">
                  PNG, JPG, GIF up to {formatBytes(MAX_SIZE_OF_IMAGE)} each (max{" "}
                  {MAX_IMAGES} files)
                </p>
              </div>
              <Input
                name="file"
                type="file"
                disabled={isPending}
                required
                multiple
                accept="image/*"
                className="absolute inset-0 h-auto opacity-0 disabled:opacity-0"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files ?? []);

                  setFiles((prev) => {
                    const existing = new Set(
                      prev.map((file) => `${file.name}-${file.size}`),
                    );
                    const duplicates: File[] = [];
                    const uniqueFiles: File[] = [];

                    selectedFiles.forEach((file) => {
                      const key = `${file.name}-${file.size}`;
                      if (existing.has(key)) {
                        duplicates.push(file);
                      } else {
                        uniqueFiles.push(file);
                      }
                    });
                    if (duplicates.length > 0) {
                      toast.error("Duplicated images", {
                        description: `These files were already selected: ${duplicates.map((f) => f.name).join(", ")}`,
                      });
                    }

                    return [...prev, ...uniqueFiles];
                  });
                }}
              />
            </div>
          </CardContent>

          <CardFooter className="grid">
            <LoadingButton loading={isPending} onClick={handleSubmit}>
              <UploadIcon />
              Upload
            </LoadingButton>
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
    </SectionWrapper>
  );
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
}

function uploadWithProgress(
  url: string,
  formData: FormData,
  onProgress: (percent: number) => void,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      resolve(
        new Response(xhr.response, {
          status: xhr.status,
          statusText: xhr.statusText,
        }),
      );
    };

    xhr.onerror = reject;

    xhr.send(formData);
  });
}
