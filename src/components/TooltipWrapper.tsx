import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const TooltipWrapper = ({
  children,
  label,
  icon: Icon,
  className,
}: {
  children: React.ReactNode;
  label: string;
  icon?: React.ComponentType;
  className?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          align="end"
          sideOffset={10}
          className={cn("flex items-center gap-2", className)}
        >
          {Icon && <Icon />}
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
