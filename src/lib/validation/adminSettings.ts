import { z } from "zod";

export const mainSettingsSchema = z.object({
  warningStockLevel: z.coerce.number().min(0).max(100),
  lowStockAlertLevel: z.coerce.number().min(0).max(100),
  taxRate: z.coerce.number().min(0).max(100),
});

export type MainSettingsSchema = z.infer<typeof mainSettingsSchema>;
