import { cn } from "@/lib/utils";
import { type $Enums } from "@prisma/client";
import { Dot } from "lucide-react";

export const Status = ({ status }: { status: $Enums.OrderStatus }) => {
  return (
    <p className="flex items-center lowercase">
      <Dot
        className={cn("scale-[2] text-emerald-500", {
          "text-emerald-500": status === "COMPLETED",
          "text-amber-500": status === "PENDING",
          "text-destructive": status === "CANCELED",
        })}
      />
      {status}
    </p>
  );
};
