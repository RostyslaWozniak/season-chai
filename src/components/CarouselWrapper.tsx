import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

/**
 * A reusable wrapper component for the Carousel component.
 *
 * @param {React.ReactNode} children - The content to be rendered within the Carousel.
 * Each child should be wrapped in a CarouselItem component.
 * @return {JSX.Element} The Carousel component with the provided children.
 * @example
 * <CarouselWrapper>
 *   <CarouselItem>Slide 1</CarouselItem>
 *   <CarouselItem>Slide 2</CarouselItem>
 *   <CarouselItem>Slide 3</CarouselItem>
 * </CarouselWrapper>
 */

export const CarouselWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("mx-10 cursor-grab active:cursor-grabbing", className)}
    >
      <CarouselContent className="mx-2 py-3">{children}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
