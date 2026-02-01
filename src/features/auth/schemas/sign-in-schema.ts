import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email({ message: "Nie poprawny e-mail" })
    .min(1, "E-mail jest wymagany"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
