import { TagLink } from "../TagLink";
import { cn } from "@/lib/utils";
import { type Category } from "@prisma/client";
import { slugifyString } from "@/helpers";

export const CategoriesView = ({
  categories,
  className,
}: {
  categories: Category[];
  className?: string;
}) => {
  return (
    <div className="px-4">
      <h2 className="mb-4 border-b text-xl">All Categories</h2>

      <div className={cn("flex flex-wrap gap-4 lg:grid", className)}>
        {categories.map(({ id, name }) => (
          <TagLink
            key={id}
            path={`/products?q=${slugifyString(name)}`}
            label={name}
          />
        ))}
      </div>
    </div>
  );
};
