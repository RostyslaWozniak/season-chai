import { userRoleEnum } from "@/db/schema";
import z from "zod";

export const updateUserSchema = z.object({
  id: z.uuid(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email().optional(),
  photo: z.string().optional(),
  isVerified: z.boolean().optional(),
  phoneNumber: z.string().optional(),
  roles: z.array(z.enum(userRoleEnum.enumValues)).optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
