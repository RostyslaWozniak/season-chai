import { userRoleEnum } from "@/db/schema";
import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  roles: z.array(z.enum(userRoleEnum.enumValues)),
});
