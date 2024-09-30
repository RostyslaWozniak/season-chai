"use client";
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
import { api, type RouterOutputs } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  mainSettingsSchema,
  type MainSettingsSchema,
} from "@/lib/validation/adminSettings";
import { useEffect, useState } from "react";
import { FormButton } from "@/app/(admin)/_components/FormButton";
import { useToast } from "@/hooks/use-toast";

type MainSettingsFormProps = {
  settings: RouterOutputs["admin"]["data"]["getAdminSettings"];
};

export const MainSettingsForm = ({ settings }: MainSettingsFormProps) => {
  const [isChanged, setIsChanged] = useState(false);

  const { toast } = useToast();

  const utils = api.useUtils();
  const { mutate: updateSettings, isPending } =
    api.admin.data.updateAdminSettings.useMutation({
      onSuccess: () => {
        void utils.admin.data.getAdminSettings.invalidate();
        toast({
          title: "Success",
          description: "Settings updated successfully",
        });
        setIsChanged(false);
      },
      onError: ({ message }) => {
        toast({
          title: "Error",
          description: message ?? "Something went wrong",
        });
      },
    });
  const form = useForm<MainSettingsSchema>({
    resolver: zodResolver(mainSettingsSchema),
    defaultValues: {
      warningStockLevel: settings.warningStockLevel,
      lowStockAlertLevel: settings.lowStockAlertLevel,
      taxRate: settings.taxRate,
    },
  });

  function onSubmit(values: MainSettingsSchema) {
    updateSettings(values);
  }
  const values = form.getValues();
  useEffect(() => {
    if (
      Number(form.watch("lowStockAlertLevel")) !==
        settings.lowStockAlertLevel ||
      Number(form.watch("warningStockLevel")) !== settings.warningStockLevel ||
      Number(form.watch("taxRate")) !== settings.taxRate
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.warningStockLevel, values.lowStockAlertLevel, values.taxRate]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-12"
      >
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="warningStockLevel"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Warning Stock Level</FormLabel>
                <FormControl>
                  <Input placeholder="20" {...field} />
                </FormControl>
                <FormDescription className="flex text-sm">
                  Provide a number between 0 and 100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lowStockAlertLevel"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Low Stock Level</FormLabel>
                <FormControl>
                  <Input placeholder="50" {...field} />
                </FormControl>
                <FormDescription className="flex text-sm">
                  Provide a number between 0 and 100
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxRate"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Tax Rate</FormLabel>
                <FormControl>
                  <Input placeholder="0.2" {...field} />
                </FormControl>
                <FormDescription className="flex text-sm">
                  Provided tax in percentage (
                  {`${(form.watch("taxRate") * 100).toFixed(0)}%`})
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormButton
          isLoading={isPending}
          isDisabled={!isChanged}
          label={"Save"}
        />
      </form>
    </Form>
  );
};
