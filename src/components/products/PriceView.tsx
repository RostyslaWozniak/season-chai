import { formatPrice } from "@/helpers";
import { cn } from "@/lib/utils";

export const PriceView = ({
  price,
  salePrice,
  className,
  horizontal = false,
}: {
  price: number;
  salePrice?: number | null;
  className?: string;
  horizontal?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        {
          "flex-row gap-2 text-xl font-bold max-[400px]:flex-col max-[400px]:gap-0":
            horizontal,
        },
        className,
      )}
    >
      <div
        className={cn("relative w-min text-center font-bold", {
          "text-muted-foreground": !!salePrice,
        })}
      >
        {formatPrice(price)}
        {!!salePrice && (
          <span
            className={cn(
              "absolute top-1/2 block h-[1.5px] w-full rotate-6 bg-destructive",
              { "h-[2.5px]": horizontal },
            )}
          />
        )}
      </div>
      {!!salePrice && (
        <p
          className={cn("text-base font-bold text-primary", {
            "text-2xl": horizontal,
          })}
        >
          {formatPrice(salePrice)}
        </p>
      )}
    </div>
  );
};
