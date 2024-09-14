import { type LucideProps } from "lucide-react";
import { OverviewCardItem } from "./OverviewCardItem";

export type OverviewCardData = {
  title: string;
  value: number | string | null;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  description?: string;
};

type OverviewProps = {
  data: OverviewCardData[];
  title: string;
};
export const OverviewCards = ({ data, title }: OverviewProps) => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="flex items-center gap-4">
        {data.map(({ title, value, icon: Icon, description }) => (
          <OverviewCardItem
            key={title}
            title={title}
            value={value}
            description={description}
            icon={Icon}
          />
        ))}
      </div>
    </div>
  );
};
