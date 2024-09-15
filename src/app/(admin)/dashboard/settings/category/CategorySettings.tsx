"use client";

import { DialogWrapper } from "@/components/DialogWrapper";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { type Category } from "@prisma/client";
import { DropdownWrapper } from "@/components/DropdownWrapper";
import IconMenu from "@/components/IconMenu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export const CategorySettings = ({ category }: { category: Category }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Edit Category"
        description="Make changes to your category here. Do not forget to save changes."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        className="flex w-[700px] justify-end gap-3"
      >
        <CategoryForm category={category} setIsEditOpen={setIsEditOpen} />
      </DialogWrapper>
      <DialogWrapper
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        className="flex w-[500px] flex-row-reverse justify-start gap-3"
        closeButton="Cancel"
        closeButtonVariant={{ variant: "outline" }}
      >
        <DeleteCategoryButton
          id={category.id}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </DialogWrapper>
      <DropdownWrapper vertical>
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
