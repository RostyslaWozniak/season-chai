"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn-ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  verificationCodeSchema,
  type VerificationCodeSchema,
} from "../schemas/verification-code-schema";
import { checkVerificationCodeAction } from "../actions/check-verification-code-action";
import { useTransition } from "react";
import { toast } from "sonner";

const INPUT_LENGTH = 6;

export function VerificationCodeForm({
  verificationToken,
}: {
  verificationToken: string;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<VerificationCodeSchema>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: undefined,
    },
  });

  function onSubmit(values: VerificationCodeSchema) {
    startTransition(async () => {
      const error = await checkVerificationCodeAction({
        ...values,
        verificationToken,
      });

      if (error) {
        startTransition(() => {
          toast.error(error);
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={INPUT_LENGTH}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                >
                  <InputOTPGroup className="grid w-full grid-cols-6">
                    {Array.from({ length: INPUT_LENGTH }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-11 w-full text-xl"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Wyślij
        </LoadingButton>
      </form>
    </Form>
  );
}
