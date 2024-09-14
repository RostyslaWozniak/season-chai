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

  const { mutate: deleteProduct } = api.admin.deleteProduct.useMutation({
    onSuccess: () => {
      setIsDeleteOpen(false);
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully",
      });
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
