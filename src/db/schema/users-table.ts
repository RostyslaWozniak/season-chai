import { index, pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../lib/helpers";
import { varchar } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_roles", ["ADMIN", "CLIENT"]);

export const usersTable = pgTable(
  "users",
  {
    id,
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    photo: varchar("photo", { length: 255 }),
    email: varchar("email", { length: 255 }).unique().notNull(),
    phoneNumber: varchar("phone_number", { length: 255 }),
    isVerified: boolean("is_verified").default(false).notNull(),
    roles: userRoleEnum("roles").array().default(["CLIENT"]).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("user_id_index").on(table.id),
    index("user_email_index").on(table.email),
  ],
);

export const userOAuthAccountTable = pgTable(
  "user_oauth_accounts",
  {
    userId: uuid("user_id")
      .references(() => usersTable.id)
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 })
      .notNull()
      .unique(),
    createdAt,
    updatedAt,
  },
  (table) => [index("provider_account_id").on(table.providerAccountId)],
);
