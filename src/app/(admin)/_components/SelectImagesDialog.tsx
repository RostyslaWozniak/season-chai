import { api } from "@/trpc/react";
import { LeafLoader } from "@/components/Loaders";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { CarouselImageItem } from "./CarouselImageItem";
import { CarouselWrapper } from "@/components/CarouselWrapper";
import { generateUploadDropzone } from "@uploadthing/react";
import { type AppFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/hooks/use-toast";
import { DialogWrapper } from "@/components/DialogWrapper";
import { cn } from "@/lib/utils";

const UploadDropzone = generateUploadDropzone<AppFileRouter>();

export const SelectImagesDialog = ({
  value,
  onChange,
  setIsOpen,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(value);
  const [isImageChoosen, setIsImageChoosen] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const {
    data: images,
    isLoading,
    refetch,
  } = api.uploadFiles.getAllImages.useQuery();

  if (isLoading || !images)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LeafLoader size={30} />
      </div>
    );

  const closeDialog = () => {
    onChange(selectedImage);
    setIsOpen(false);
  };

  const handleSelectImageBtnClick = () => {
    if (isImageChoosen) {
      return setIsDialogOpen(true);
    }
    closeDialog();
  };
  return (
    <div className="flex h-[500px] select-none flex-col">
      <div className="flex grow items-center py-2">
        {images.length ? (
          <CarouselWrapper className="max-w-[700px]">
            {images.map((image) => (
              <CarouselImageItem
                key={image.id}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                {...image}
              />
            ))}
          </CarouselWrapper>
        ) : (
          <p className="mx-auto">No images found</p>
        )}
      </div>
      {/* image upload dropzone */}
      <UploadDropzone
        className="flex h-[200px] border-2 py-0 outline-primary ut-button:bg-primary ut-allowed-content:text-muted-foreground ut-label:text-primary"
        endpoint="productImage"
        onClientUploadComplete={() => {
          void refetch();
          setIsImageChoosen(true);
          toast({
            title: "Success",
            description: "Upload Completed",
          });
          setIsImageChoosen(false);
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
        onChange={(acceptedFiles) => {
          setIsImageChoosen(true);
          console.log(acceptedFiles);
        }}
      />
      <Button
        className="mt-4 self-end"
        disabled={!selectedImage || value === selectedImage}
        onClick={handleSelectImageBtnClick}
      >
        Select
      </Button>
      <DialogWrapper
        title="Close the dialog?"
        description="You've selected an image, but it hasn't been uploaded."
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        className="flex w-[400px] justify-end gap-3"
        closeButton="No"
        closeButtonVariant={{ variant: "destructive" }}
      >
        <Button
          onClick={() => {
            closeDialog();
            setIsDialogOpen(false);
          }}
          className={cn(buttonVariants())}
        >
          Yes
        </Button>
      </DialogWrapper>
    </div>
  );
};
