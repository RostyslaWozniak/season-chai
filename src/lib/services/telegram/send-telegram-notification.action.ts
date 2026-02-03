"use server";

import { env } from "@/lib/env/server";

export async function sendTelegramNotificationAction(text: string) {
  await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_ACCESS_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
      }),
    },
  );
}
