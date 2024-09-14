import { type AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

export type AdminProduct =
  inferRouterOutputs<AppRouter>["admin"]["getAllProducts"][number];

export type PublicProduct =
  inferRouterOutputs<AppRouter>["product"]["getAll"][number];
