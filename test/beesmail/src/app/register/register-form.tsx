"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2Icon, AlertCircle, X } from "lucide-react";
import trpc from "@/utils/trpc";

// Schema di validazione con Zod
const formSchema = z.object({
  emailPrefix: z
    .string()
    .min(3, { message: "Il prefisso email deve essere almeno 3 caratteri." })
    .max(30, { message: "Il prefisso email non può superare 30 caratteri." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Il prefisso può contenere solo lettere e numeri.",
    }),
  password: z
    .string()
    .min(8, { message: "La password deve essere almeno 8 caratteri." })
    .regex(/[A-Z]/, { message: "La password deve contenere almeno una lettera maiuscola." })
    .regex(/[a-z]/, { message: "La password deve contenere almeno una lettera minuscola." })
    .regex(/[0-9]/, { message: "La password deve contenere almeno un numero." })
    .regex(/[^A-Za-z0-9]/, {
      message: "La password deve contenere almeno un carattere speciale.",
    }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Devi accettare i termini e le condizioni.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Le password non corrispondono.",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailPrefix: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Calcola la forza della password
  const watchPassword = form.watch("password");
  useEffect(() => {
    let strength = 0;
    if (watchPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(watchPassword)) strength += 25;
    if (/[a-z]/.test(watchPassword)) strength += 25;
    if (/[0-9]/.test(watchPassword)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(watchPassword)) strength += 12.5;
    setPasswordStrength(strength);
  }, [watchPassword]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setShowError(false);
    
    try {
      const result = await trpc.auth.register.mutate({
        username: values.emailPrefix,
        password: values.password,
      });

      if (result.success) {
        setShowSuccess(true);
        form.reset();
        setTimeout(() => {
          setShowSuccess(false);
          // Redirect to login page
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Si è verificato un errore durante la registrazione");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {showSuccess && (
        <Alert className="mb-4 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300">
            Registrazione completata!
          </AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            Il tuo account {form.getValues("emailPrefix")}:beesmail è stato
            creato con successo. Reindirizzamento in corso...
          </AlertDescription>
        </Alert>
      )}

      {showError && (
        <Alert className="mb-4 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 relative">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <button
            onClick={() => setShowError(false)}
            className="absolute top-2 right-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
            aria-label="Chiudi"
          >
            <X className="h-4 w-4" />
          </button>
          <AlertTitle className="text-red-800 dark:text-red-300">
            Errore
          </AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-400">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Email con suffisso fisso */}
          <FormField
            control={form.control}
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
                    />
                    <span className="bg-amber-100 dark:bg-amber-900 px-3 py-2 text-sm font-medium text-amber-900 dark:text-amber-300">
                      :beesmail
                    </span>
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-amber-700 dark:text-amber-500">
                  Scegli il prefisso per la tua email Beesmail
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900 dark:text-amber-400">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="border-amber-300 dark:border-amber-700 focus-visible:ring-amber-500 text-gray-900 dark:text-gray-100"
                  />
                </FormControl>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-700 dark:text-amber-500">Forza password:</span>
                    <span
                      className={`font-medium ${
                        passwordStrength < 50
                          ? "text-red-600"
                          : passwordStrength < 75
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength < 50
                        ? "Debole"
                        : passwordStrength < 75
                        ? "Medio"
                        : "Forte"}
                    </span>
                  </div>
                  <Progress
                    value={passwordStrength}
                    className="h-2 bg-amber-200 [&>div]:bg-gradient-to-r [&>div]:from-yellow-500 [&>div]:to-amber-600"
                  />
                </div>
                <FormDescription className="text-xs text-amber-700 dark:text-amber-500">\n                  Minimo 8 caratteri, con maiuscole, minuscole, numeri e
                  simboli
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Conferma Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900 dark:text-amber-400">
                  Conferma Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="border-amber-300 dark:border-amber-700 focus-visible:ring-amber-500 text-gray-900 dark:text-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox Termini e Condizioni */}
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-amber-400 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label className="text-sm text-amber-900 dark:text-amber-400">
                    Accetto i{" "}
                    <a
                      href="/terms"
                      className="font-medium text-amber-700 dark:text-amber-500 underline hover:text-amber-900 dark:hover:text-amber-300"
                    >
                      termini e le condizioni
                    </a>
                  </Label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Pulsante Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creazione account..." : "Crea Account"}
          </Button>
        </form>
      </Form>
    </>
  );
}