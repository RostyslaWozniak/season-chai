import { Card, CardDescription } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

export const CarouselImageItem = ({
  name,
  url,
  selectedImage,
  setSelectedImage,
}: {
  name: string;
  url: string;
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/5">
      <Card
        tabIndex={0}
        className={cn("relative flex flex-col outline-primary")}
        onClick={() => setSelectedImage(url)}
        onKeyDown={(e) => e.key === "Enter" && setSelectedImage(url)}
      >
        <Image
          src={url}
          width={100}
          height={100}
          alt="image"
          className={cn("aspect-square self-center object-cover")}
        />
        {selectedImage === url && (
          <span className="absolute inset-0 flex items-center justify-center rounded-xl text-card backdrop-brightness-75">
            <Check size={40} />
          </span>
        )}
        <CardDescription className="h-8 overflow-hidden text-pretty text-center text-xs leading-tight">
          {name.split(".")[0]}
        </CardDescription>
      </Card>
    </CarouselItem>
  );
};
