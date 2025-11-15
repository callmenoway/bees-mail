"use server";

import { cookies } from "next/headers";
import { Language } from "../translations";

export async function setLanguageCookie(lang: Language) {
  const cookieStore = await cookies();
  cookieStore.set("language", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 anno
    sameSite: "lax",
  });
}
