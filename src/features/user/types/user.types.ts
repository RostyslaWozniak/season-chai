import { usersTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof usersTable>;
// export type User = {
//     id: string;
//     firstName: string | null;
//     lastName: string | null;
//     email: string;
//     photo: string | null;
//     isVerified: boolean;
//     phoneNumber: string | null;
//     roles: ("ADMIN" | "CLIENT")[];
//     createdAt: Date;
//     updatedAt: Date;
// }
