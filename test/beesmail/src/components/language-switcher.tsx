"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { setLanguageCookie } from "@/lib/actions/set-language";
import { useRouter } from "next/navigation";
import { Language } from "@/lib/translations";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const handleLanguageChange = async (lang: Language) => {
    setLanguage(lang);
    await setLanguageCookie(lang);
    router.refresh(); // Aggiorna i server components
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")} className={language === "en" ? "bg-accent" : ""}>
          <span className="mr-2">🇬🇧</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("it")} className={language === "it" ? "bg-accent" : ""}>
          <span className="mr-2">🇮🇹</span>
          Italiano
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
