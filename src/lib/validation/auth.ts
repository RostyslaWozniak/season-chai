import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required!");

export const loginSchema = z.object({
  email: requiredString.email("Invalid email"),
  password: requiredString.min(1, "Password is required!"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email"),
  password: requiredString.min(3, "TODO: change password required length"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
