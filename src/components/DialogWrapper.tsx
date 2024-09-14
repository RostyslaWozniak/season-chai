import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { buttonVariants } from "./ui/button";
import { type VariantProps } from "class-variance-authority";

type DialogProps = {
  children?: React.ReactNode;
  closeButton?: string;
  closeButtonVariant?: VariantProps<typeof buttonVariants>;
  className?: string;
  description: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

export const DialogWrapper = ({
  children,
  closeButton,
  closeButtonVariant = { variant: "default", size: "default" },
  className,
  isOpen,
  setIsOpen,
  title,
  description,
}: DialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex h-min max-h-min max-w-min flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className={cn("grow", className)}>
          {children}
          {closeButton && (
            <DialogClose
              className={cn(
                "self-end justify-self-end",
                buttonVariants(closeButtonVariant),
              )}
            >
              {closeButton}
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
