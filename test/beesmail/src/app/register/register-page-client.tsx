"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./register-form";
import { HoneycombBackground } from "@/components/honeycomb-background";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";

export function RegisterPageClient() {
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4">
      <HoneycombBackground />

      <Card className="relative z-10 w-full max-w-md border-2 border-amber-200 dark:border-amber-800 shadow-2xl backdrop-blur-sm bg-white/90 dark:bg-black/30">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 dark:from-amber-500 dark:to-amber-700">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10 text-white"
            >
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,8 17,11 17,16 12,19 7,16 7,11" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold text-amber-900 dark:text-amber-400">
            {t.register.title}
          </CardTitle>
          <CardDescription className="text-amber-700 dark:text-amber-500">
            {t.register.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-amber-700 dark:text-amber-500">
            {t.register.hasAccount}{" "}
            <Link
              href="/login"
              className="font-medium text-amber-900 dark:text-amber-400 underline hover:text-amber-700 dark:hover:text-amber-300"
            >
              {t.register.signIn}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
