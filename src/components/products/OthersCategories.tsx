import { CATEGORIES } from "@/lib/validation/product";
import { TagLink } from "../TagLink";
import { categoryToClient, categoryToSlug } from "@/helpers/category";

export const OthersCategories = () => {
  return (
    <div>
      <h2 className="mb-4 border-b text-xl">All Categories</h2>

      <div className="grid gap-4">
        {CATEGORIES.map((category) => (
          <TagLink
            key={category}
            path={`/products?q=${categoryToSlug(category)}`}
            label={categoryToClient(category)}
          />
        ))}
      </div>
    </div>
  );
};
