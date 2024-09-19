"use server";

import { lucia } from "@/lib/auth";
import { db } from "@/server/db";
import { loginSchema, type LoginSchema } from "@/lib/validation/auth";
import { verify } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  credentials: LoginSchema,
  redirectUrl: string | null,
): Promise<{ error: string }> {
  try {
    const { email, password } = loginSchema.parse(credentials);

    const existingUser = await db.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!existingUser ?? !existingUser?.passwordHash) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect(redirectUrl ?? "/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
