import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email(),
  photo: z.string().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
