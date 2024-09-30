import { adminProcedure, createTRPCRouter } from "../../trpc";

export const usersRouter = createTRPCRouter({
  // GET ALL USERS
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        createdAt: true,
      },
      where: { role: "USER" },
    });
    return users;
  }),
});
