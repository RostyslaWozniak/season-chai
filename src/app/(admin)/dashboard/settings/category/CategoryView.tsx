import { TagLink } from "@/components/TagLink";
import { cn } from "@/lib/utils";
import { type Category } from "@prisma/client";
import { slugifyString } from "@/helpers";

import { CategorySettings } from "./CategorySettings";

export const CategoryView = ({
  categories,
  className,
}: {
  categories: Category[];
  className?: string;
}) => {
  return (
    <div>
      <h2 className="mb-4 border-b text-xl">All Categories</h2>

      <div className={cn("grid gap-4", className)}>
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between gap-4"
          >
            <TagLink
              path={`/products?q=${slugifyString(category.name)}`}
              label={category.name}
            />
            <CategorySettings category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};
