import { deliveryAddressSchema } from "@/lib/validation/deliveryAddress";
import { createTRPCRouter, privateProcedure } from "../../trpc";

export const dataRouter = createTRPCRouter({
  getTax: privateProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.adminSettings.findFirstOrThrow({
      select: { taxRate: true },
    });
    return { taxRate: Number(data.taxRate) };
  }),

  getUserDetails: privateProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.user.findFirst({
      where: { id: ctx.userId },
      select: { username: true },
    });

    const address = await ctx.db.deliveryAddress.findFirst({
      where: { userId: ctx.userId },
    });

    return {
      name: data?.username ?? "",
      phoneNumber: address?.phoneNumber ?? "",
      address: address?.street ?? "",
      city: address?.city ?? "",
      postalCode: address?.postalCode ?? "",
      country: address?.country ?? "",
    };
  }),

  addDeliveryAddress: privateProcedure
    .input(deliveryAddressSchema)
    .mutation(async ({ ctx, input }) => {
      const address = await ctx.db.deliveryAddress.findFirst({
        where: { userId: ctx.userId },
      });
      if (ctx.user?.username !== input.name) {
        await ctx.db.user.update({
          where: { id: ctx.userId },
          data: { username: input.name },
        });
      }

      if (address) {
        await ctx.db.deliveryAddress.update({
          where: { id: address.id },
          data: {
            name: input.name,
            street: input.address,
            city: input.city,
            postalCode: input.postalCode,
            country: input.country,
            phoneNumber: input.phoneNumber,
          },
        });
        return;
      }

      await ctx.db.deliveryAddress.create({
        data: {
          userId: ctx.userId,
          name: input.name,
          street: input.address,
          city: input.city,
          postalCode: input.postalCode,
          country: input.country,
          phoneNumber: input.phoneNumber,
        },
      });
    }),
});
