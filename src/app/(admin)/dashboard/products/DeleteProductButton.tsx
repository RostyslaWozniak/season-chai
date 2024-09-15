import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";

export const DeleteProductButton = ({
  id,
  setIsDeleteOpen,
}: {
  id: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();

  const utils = api.useUtils();

  const { mutate: deleteProduct } =
    api.admin.products.deleteProduct.useMutation({
      onSuccess: () => {
        setIsDeleteOpen(false);
        toast({
          title: "Product Deleted",
          description: "Product has been deleted successfully",
        });
        void utils.admin.products.getAllProducts.invalidate();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
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
