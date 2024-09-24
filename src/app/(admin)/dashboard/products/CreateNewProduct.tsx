"use client";

import { DialogWrapper } from "@/components/DialogWrapper";
import { ProductForm } from "./ProductForm";
import { useState } from "react";
import IconMenu from "@/components/IconMenu";
import { PackagePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CreateNewProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Create Product"
        description="Make changes to your product here. Do not forget to save changes."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="flex w-[700px] justify-end gap-3"
      >
        <ProductForm setIsOpen={setIsOpen} />
      </DialogWrapper>
      <Button onClick={() => setIsOpen(true)}>
        <IconMenu
          icon={PackagePlusIcon}
          text="Create New Product"
          iconSize={24}
          className="text-base hover:underline"
        />
      </Button>
    </>
  );
};
