import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required!");

export const loginSchema = z.object({
  email: requiredString.email("Invalid email"),
  password: requiredString.min(3, "TODO: change password required length"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = loginSchema.extend({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores and dashes",
  ),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
