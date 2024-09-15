import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";

export const DeleteCategoryButton = ({
  id,
  setIsDeleteOpen,
}: {
  id: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();

  const utils = api.useUtils();

  const { mutate: deleteProduct } =
    api.admin.categories.deleteCategory.useMutation({
      onSuccess: () => {
        setIsDeleteOpen(false);
        toast({
          title: "Category Deleted",
          description: "Category has been deleted successfully",
        });
        void utils.admin.categories.getAllCategories.invalidate();
      },
      onError: ({ message }) => {
        toast({
          title: "Something went wrong. Please try again later.",
          description: message,
        });
      },
    });
  const onDelete = () => {
    deleteProduct({ id });
  };
  return (
    <Button variant="destructive" onClick={onDelete}>
      Delete
    </Button>
  );
};
