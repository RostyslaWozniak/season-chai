"use client";

import { DialogWrapper } from "@/components/DialogWrapper";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import IconMenu from "@/components/IconMenu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { InfoIcon, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { DeleteProductButton } from "./DeleteProductButton";
import { type AdminProduct } from "@/types";
import { AdminInfoCard } from "../../_components/AdminInfoCard";

type ProductTableSettingsProps = {
  product: AdminProduct;
};

export const ProductTableSettings = ({
  product,
}: ProductTableSettingsProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Info About Product"
        description="Here you can find more information about the product."
        isOpen={isInfoOpen}
        setIsOpen={setIsInfoOpen}
        className="flex w-[800px] flex-col gap-3"
        closeButton="Ok"
      >
        <AdminInfoCard product={product} />
      </DialogWrapper>
      <DialogWrapper
        title="Edit Product"
        description="Make changes to your product here. Do not forget to save changes."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        className="flex w-[700px] justify-end gap-3"
      >
        <ProductForm product={product} setIsOpen={setIsEditOpen} />
      </DialogWrapper>
      <DialogWrapper
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        className="flex w-[500px] flex-row-reverse justify-start gap-3"
        closeButton="Cancel"
        closeButtonVariant={{ variant: "outline" }}
      >
        <DeleteProductButton
          id={product.id}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </DialogWrapper>

      <DropdownWrapper>
        <DropdownMenuItem onClick={() => setIsInfoOpen(true)}>
          <IconMenu
            icon={InfoIcon}
            text="Info"
            className="text-muted-foreground"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
          <IconMenu icon={Edit} text="Edit" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
          <IconMenu icon={Trash2} text="Delete" className="text-destructive" />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
};
