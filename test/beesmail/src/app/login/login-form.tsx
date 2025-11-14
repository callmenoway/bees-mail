"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, ArrowLeftIcon, X } from "lucide-react";
import trpc from "@/utils/trpc";

// Schema per il primo step (email)
const emailSchema = z.object({
  emailPrefix: z
    .string()
    .min(3, { message: "Il prefisso email deve essere almeno 3 caratteri." })
    .max(30, { message: "Il prefisso email non può superare 30 caratteri." })
    .regex(/^[a-zA-Z0-9._-]+$/, {
      message: "Il prefisso può contenere solo lettere, numeri, punti, trattini e underscore.",
    }),
});

// Schema per il secondo step (password)
const passwordSchema = z.object({
  password: z.string().min(1, { message: "La password è obbligatoria." }),
});

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [error, setError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      emailPrefix: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setEmailPrefix(values.emailPrefix);
    // Simula il caricamento dell'avatar dall'API
    // In produzione, qui faresti una chiamata API per ottenere l'avatar
    setTimeout(() => {
      // Se l'utente non ha un avatar personalizzato, usa null
      setAvatarUrl(null);
      setStep("password");
    }, 300);
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    setError("");
    setIsLoading(true);

    try {
      const result = await trpc.auth.login.mutate({
        email: `${emailPrefix}:beesmail`,
        password: values.password,
      });

      if (result.success) {
        // Redirect a /inbox se il login ha successo
        router.push("/inbox");
      }
    } catch (err: any) {
      setError(err.message || "Email o password non corretti");
    } finally {
      setIsLoading(false);
    }
  }

  function goBackToEmail() {
    setStep("email");
    passwordForm.reset();
  }

  // Genera l'icona con la prima lettera
  const getAvatarContent = () => {
    const firstLetter = emailPrefix.charAt(0).toUpperCase();
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-600">
        <span className="text-2xl font-bold text-white">{firstLetter}</span>
      </div>
    );
  };

  return (
    <>
      {error && (
        <Alert className="mb-4 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertTitle className="text-red-800 dark:text-red-300">Errore</AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-400">
            {error}
          </AlertDescription>
          <button
            onClick={() => setError("")}
            className="absolute right-2 top-2 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
          </button>
        </Alert>
      )}

      {step === "email" ? (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
            <FormField
              control={emailForm.control}
              name="emailPrefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-amber-900 dark:text-amber-400">
                    Indirizzo Email
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center overflow-hidden rounded-md border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-amber-500">
                      <Input
                        placeholder="username"
                        {...field}
                        className="flex-1 border-0 focus-visible:ring-0 text-gray-900 dark:text-gray-100"
                        autoFocus
                      />
                      <span className="bg-amber-100 dark:bg-amber-900 px-3 py-2 text-sm font-medium text-amber-900 dark:text-amber-300">
                        :beesmail
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-amber-700 dark:text-amber-500">
                    Inserisci il prefisso della tua email Beesmail
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700"
            >
              Continua
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          {/* Avatar e Email Display */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-amber-300">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={emailPrefix} />
                ) : (
                  <AvatarFallback className="overflow-hidden">
                    {getAvatarContent()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <img
                  src="/bee.svg"
                  alt="bee"
                  className="h-8 w-8"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-amber-900">
                {emailPrefix}:beesmail
              </p>
              <button
                type="button"
                onClick={goBackToEmail}
                className="mt-1 flex items-center justify-center text-sm text-amber-700 hover:text-amber-900"
              >
                <ArrowLeftIcon className="mr-1 h-3 w-3" />
                Cambia account
              </button>
            </div>
          </div>

          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-amber-900">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="border-amber-300 focus-visible:ring-amber-500"
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between text-sm">
                <a
                  href="/forgot-password"
                  className="text-amber-700 hover:text-amber-900 underline"
                >
                  Password dimenticata?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 disabled:opacity-50"
              >
                {isLoading ? "Accesso in corso..." : "Accedi"}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}