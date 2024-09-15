"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  adminCreateProductSchema,
  type AdminCreateProductSchema,
} from "@/lib/validation/product";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import { DialogWrapper } from "@/components/DialogWrapper";
import { useState } from "react";
import { SelectImagesDialog } from "./SelectImagesDialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormButton } from "../../_components/FormButton";
import { type AdminProductWithCategory } from "@/server/helpers/admin";

type ProductFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: AdminProductWithCategory;
};

export const ProductForm = ({ product, setIsOpen }: ProductFormProps) => {
  const [isUploadImagesDialogOpen, setIsUploadImagesDialogOpen] =
    useState(false);

  const { toast } = useToast();

  const form = useForm<AdminCreateProductSchema>({
    resolver: zodResolver(adminCreateProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      image_url: product?.image_url ?? "",
      category: product?.category.name ?? "",
    },
  });

  const utils = api.useUtils();

  const { mutate: createProduct, isPending: isCreating } =
    api.admin.products.createProduct.useMutation({
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Product created successfully",
        });
        form.reset();
        void utils.admin.products.getAllProducts.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: updateProduct, isPending: isUpdating } =
    api.admin.products.updateProduct.useMutation({
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
        form.reset();

        void utils.admin.products.getAllProducts.invalidate();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { data: categories } = api.admin.categories.getAllCategories.useQuery();

  function onSubmit(values: AdminCreateProductSchema) {
    if (product) {
      updateProduct({ ...values, id: product.id });
    } else {
      createProduct(values);
    }
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[700px] flex-col gap-y-5"
      >
        <div className="grid grid-cols-2 gap-x-5">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Price*</FormLabel>
                <FormControl>
                  <Input placeholder="9.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Category*</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {(categories ?? []).map(({ id, name }) => (
                          <SelectItem key={id} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Stock*</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Description{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Product description"
                    className="h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* productImage */}
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem className="relative flex flex-col items-start gap-2">
                <FormLabel>Image*</FormLabel>
                <Button
                  className="relative h-full w-full overflow-hidden rounded-md bg-transparent"
                  type="button"
                  onClick={() => setIsUploadImagesDialogOpen(true)}
                  variant="outline"
                  style={{
                    backgroundImage: `url(${field.value})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-primary/20 text-xl text-secondary-foreground",
                      {},
                    )}
                  >
                    {field.value ? "Change image" : "Select image"}
                    <ImageIcon className="ml-3 h-8 w-8" />
                  </div>
                </Button>
                <FormControl>
                  <DialogWrapper
                    title="Uploaded images"
                    description="Select from existing images or upload a new one."
                    isOpen={isUploadImagesDialogOpen}
                    setIsOpen={setIsUploadImagesDialogOpen}
                    className="min-h-[500px] min-w-[700px]"
                  >
                    <div className="h-[400px]">
                      <SelectImagesDialog
                        onChange={field.onChange}
                        value={field.value}
                        setIsOpen={setIsUploadImagesDialogOpen}
                      />
                    </div>
                  </DialogWrapper>
                </FormControl>

                <FormMessage className="absolute -bottom-6" />
              </FormItem>
            )}
          />
        </div>
        <FormButton
          isLoading={isCreating || isUpdating}
          label={product ? "Save" : "Create"}
        />
      </form>
    </Form>
  );
};
