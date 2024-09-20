import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

export const LeafLoader = ({
  className,
  size = 30,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div className={cn("flex text-primary", className)}>
      <Leaf size={size} className="animate-bounce" />
      <Leaf size={size} className="animate-bounce delay-100" />
      <Leaf size={size} className="animate-bounce delay-200" />
    </div>
  );
};

export const LoaderScreen = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-background",
        className,
      )}
    >
      <LeafLoader size={50} />
    </div>
  );
};
