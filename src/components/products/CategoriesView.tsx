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
    <div>
      <h2 className="mb-4 border-b text-xl">All Categories</h2>

      <div className={cn("grid gap-4", className)}>
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
