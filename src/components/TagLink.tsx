import Link from "next/link";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type TagLinkProps = {
  path: string;
  label: string;
  className?: string;
};

export const TagLink = ({ path, label, className }: TagLinkProps) => {
  return (
    <div>
      <Link href={path} className={cn("text-nowrap", className)}>
        <Badge>{label}</Badge>
      </Link>
    </div>
  );
};
