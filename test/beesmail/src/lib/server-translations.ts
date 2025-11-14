import { translations } from "./translations";

// Helper per le traduzioni server-side
// Per ora usa inglese di default, ma può essere esteso per accettare il language dal client
export function getServerTranslations(lang: "en" | "it" = "en") {
  return translations[lang];
}
