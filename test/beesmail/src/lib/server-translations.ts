import { cookies } from "next/headers";
import { translations, Language } from "./translations";

// Helper per le traduzioni server-side
// Legge la lingua dai cookies o usa inglese come default
export async function getServerTranslations(): Promise<(typeof translations)[Language]> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("language");
  const lang = (langCookie?.value as Language) || "en";
  
  // Validazione della lingua
  if (lang !== "en" && lang !== "it") {
    return translations.en;
  }
  
  return translations[lang];
}
