"use server";

import { lucia } from "@/lib/auth";
import { db } from "@/server/db";
import { type SignUpSchema, signUpSchema } from "@/lib/validation/auth";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  credentials: SignUpSchema,
  redirectPath: string | null,
): Promise<{ error: string | null; message: string | null }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await db.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    if (existingUsername) {
      return {
        error: "Username already taken",
        message: null,
      };
    }

    const existingEmail = await db.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existingEmail) {
      return {
        error: "Email already taken",
        message: null,
      };
    }

    await db.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
        role: "USER",
      },
    });

    await db.cart.create({
      data: {
        user_id: userId,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect(redirectPath ?? "/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
      message: null,
    };
  }
}
