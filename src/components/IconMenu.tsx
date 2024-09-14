import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface MenuIconProps {
  icon: LucideIcon;
  text: string;
  className?: string;
  iconSize?: number;
}

export default function IconMenu({
  className,
  icon: Icon,
  text,
  iconSize = 20,
}: MenuIconProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-row items-center justify-start space-x-2 text-center text-sm",
        className,
      )}
    >
      <Icon size={iconSize} />
      <span>{text}</span>
    </div>
  );
}
