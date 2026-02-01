import { timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp("created_at", { withTimezone: false })
  .notNull()
  .defaultNow();
export const updatedAt = timestamp("updated_at", { withTimezone: false })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
