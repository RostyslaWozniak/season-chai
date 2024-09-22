"use server";

import type { Cookie } from "lucia";
import { cookies } from "next/headers";

export const setCookies = async (sessionCookies: Cookie) => {
  const result = cookies().set(
    sessionCookies.name,
    sessionCookies.value,
    sessionCookies.attributes,
  );
  return result;
};
