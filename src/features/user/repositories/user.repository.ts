import { db } from "@/db";
import { User } from "../types/user.types";
import { CreateUserSchema } from "../schemas/create-user.schema";
import { usersTable } from "@/db/schema";
import { UpdateUserSchema } from "../schemas/update-user.schema";
import { eq } from "drizzle-orm";

export class UserRepository {
  public static findAll() {}
  public static async create(user: CreateUserSchema): Promise<User> {
    const { email, firstName, lastName } = user;
    const [newUser] = await db
      .insert(usersTable)
      .values({ email, firstName, lastName })
      .returning();
    return newUser;
  }

  public static findById(id: string): Promise<User | undefined> {
    return db.query.usersTable.findFirst({
      where: (table, funcs) => funcs.eq(table.id, id),
    });
  }
  public static findByEmail(email: string): Promise<User | undefined> {
    return db.query.usersTable.findFirst({
      where: (table, funcs) => funcs.eq(table.email, email),
    });
  }

  public static update(user: UpdateUserSchema) {
    return db.update(usersTable).set(user).where(eq(usersTable.id, user.id));
  }
}
