"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type CreateCategorySchema,
  createCategorySchema,
} from "@/lib/validation/category";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";
import { FormButton } from "../../../_components/FormButton";
import { type Category } from "@prisma/client";

type CategoryFormProps = {
  category?: Category;
  setIsEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CategoryForm = ({
  category,
  setIsEditOpen,
}: CategoryFormProps) => {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      category: category?.name ?? "",
    },
  });

  const { toast } = useToast();

  const utils = api.useUtils();

  const { mutate: createCategory, isPending: isCreating } =
    api.admin.categories.createCategory.useMutation({
      onSuccess: () => {
        form.reset();
        void utils.admin.categories.getAllCategories.invalidate();
      },
      onError: ({ message }) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: message ?? "Something went wrong",
        });
      },
    });

  const { mutate: updateCategory, isPending: isUpdating } =
    api.admin.categories.updateCategory.useMutation({
      onSuccess: () => {
        form.reset();
        void utils.admin.categories.getAllCategories.invalidate();
      },
      onError: ({ message }) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: message ?? "Something went wrong",
        });
      },
    });

  function onSubmit(values: CreateCategorySchema) {
    if (category) {
      updateCategory({ category: values.category, id: category.id });
      if (setIsEditOpen) setIsEditOpen(false);
    } else {
      createCategory(values);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grow space-y-3">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create New Category</FormLabel>
              <FormControl>
                <Input placeholder="new category" {...field} />
              </FormControl>
              <FormDescription>
                If you want to create new category please add it here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton
          isLoading={isCreating || isUpdating}
          label={category ? "Save" : "Create"}
        />
      </form>
    </Form>
  );
};
