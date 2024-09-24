import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";

export const RemoveCartItem = ({ productId }: { productId: string }) => {
  const { handleRemoveCartItem } = useCart();
  return (
    <Button
      variant="outline"
      size="lg"
      className="px-3"
      onClick={() => handleRemoveCartItem(productId)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
