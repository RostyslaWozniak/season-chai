"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api, type RouterOutputs } from "@/trpc/react";
import {
  deliveryAddressSchema,
  type DeliveryAddressSchema,
} from "@/lib/validation/deliveryAddress";
import { useToast } from "@/hooks/use-toast";
import { FormButton } from "@/app/(admin)/_components/FormButton";

const COUNTRIES = [
  { id: 1, name: "Poland" },
  { id: 2, name: "Germany" },
  { id: 3, name: "France" },
  { id: 4, name: "Italy" },
];

type DeliveryAddressFormProps = {
  setIsCheckoutFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: RouterOutputs["private"]["data"]["getUserDetails"];
};

export default function DeliveryAddressForm({
  setIsCheckoutFormVisible,
  userDetails,
}: DeliveryAddressFormProps) {
  const form = useForm<DeliveryAddressSchema>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues: {
      name: userDetails.name,
      address: userDetails.address,
      city: userDetails.city,
      postalCode: userDetails?.postalCode,
      country: userDetails.country,
      phoneNumber: userDetails?.phoneNumber,
    },
  });

  const { toast } = useToast();

  const { mutate, isPending } = api.private.data.addDeliveryAddress.useMutation(
    {
      onSuccess: () => {
        console.log("success");
        setIsCheckoutFormVisible(true);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      },
    },
  );

  const onSubmit = (data: DeliveryAddressSchema) => {
    mutate(data);
  };

  return (
    <Card className="h-min w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Delivery Address</CardTitle>
        <CardDescription className="">
          Please enter your delivery details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-x-3">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="h-24">
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input autoFocus placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* name */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="h-24">
                    <FormLabel>Phone number*</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+48 999 999 999"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="h-24">
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="h-24">
                    <FormLabel>City*</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* postal code */}
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="h-24">
                    <FormLabel>Postal Code*</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
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
                            <SelectLabel>Country</SelectLabel>
                            {(COUNTRIES ?? []).map(({ id, name }) => (
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
            </div>
            <FormButton
              isLoading={isPending}
              isDisabled={isPending}
              label="Submit"
              className="w-full"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
