"use server";

import { redisClient } from "@/lib/services/redis";
import {
  redisVerificationSchema,
  verificationCodeSchema,
  type VerificationCodeSchema,
} from "../schemas/verification-code-schema";
import z from "zod";
import { createUserSession } from "../core/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  EMAIL_VERIFICATION_CODE_TTL_IN_MIN,
  REDIS_EMAIL_VERIFICATION_KEY,
} from "../constants";
import { UserService } from "@/features/user/services/user.service";

export async function checkVerificationCodeAction(
  unsafeData: VerificationCodeSchema & { verificationToken: string },
) {
  const { data: parsedCode, error: parseError } = verificationCodeSchema
    .extend({ verificationToken: z.string().uuid() })
    .safeParse(unsafeData);

  if (parseError) {
    return "Invalid input";
  }
  const rawRedisData = await redisClient.get(
    `${REDIS_EMAIL_VERIFICATION_KEY}:${parsedCode.verificationToken}`,
  );

  const { data: parsedRedisData, success } =
    redisVerificationSchema.safeParse(rawRedisData);

  if (!success || !parsedRedisData) {
    redirect(
      `/login?error=Your verification code has expired. The TTL is ${EMAIL_VERIFICATION_CODE_TTL_IN_MIN} minutes. Please try again.`,
    );
  }

  if (parsedRedisData.verificationCode !== parsedCode.code) {
    return "Invalid verification code";
  }

  const user = await UserService.getById(parsedRedisData.userId);

  if (user == null) {
    return "Brak danych użytkownika";
  }

  await UserService.update({ id: user.id, isVerified: true });

  // await db
  //   .update(usersTable)
  //   .set({ isVerified: true })
  //   .where(eq(usersTable.id, user.id));

  await createUserSession({ id: user.id, roles: user.roles }, await cookies());
  const redirectPath = user.roles.includes("ADMIN") ? "/admin" : "/profile";
  redirect(redirectPath);
}
