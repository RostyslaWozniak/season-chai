import { LeafLoader } from "@/components/Loaders";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type FormButtonProps = {
  isLoading: boolean;
  label: string;
  isDisabled?: boolean;
  className?: string;
};
export const FormButton = ({
  isLoading,
  isDisabled = false,
  label,
  className,
}: FormButtonProps) => {
  return (
    <Button
      disabled={isLoading || isDisabled}
      className={cn(
        "flex w-20 items-center justify-center self-end justify-self-end",
        className,
      )}
      type="submit"
    >
      {isLoading ? (
        <LeafLoader
          className="translate-y-0.5 text-primary-foreground"
          size={15}
        />
      ) : (
        label
      )}
    </Button>
  );
};
