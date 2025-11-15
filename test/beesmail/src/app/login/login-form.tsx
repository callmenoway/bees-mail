"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, ArrowLeftIcon, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import trpc from "@/utils/trpc";

export function LoginForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<"email" | "password" | "2fa">("email");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Schema per il primo step (email)
  const emailSchema = z.object({
    email: z
      .string()
      .min(1, { message: t.login.emailLabel + " is required" })
      .regex(
        /^[a-zA-Z0-9._-]+:[a-zA-Z0-9]+$/,
        { message: t.server.invalidEmailFormat }
      ),
  });

  // Schema per il secondo step (password)
  const passwordSchema = z.object({
    password: z.string().min(1, { message: t.server.passwordRequired }),
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setEmailPrefix(values.email);
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
    setPasswordValue(values.password);

    try {
      const twoFactorStatus = await trpc.twoFactor.checkLoginStatus.query({ email: emailPrefix });

      if (twoFactorStatus.enabled && twoFactorStatus.userId) {
        const result = await signIn("credentials", {
          email: emailPrefix,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          setError(t.login.invalidCredentials);
          setIsLoading(false);
          return;
        }

        setUserId(twoFactorStatus.userId);
        setStep("2fa");
        setIsLoading(false);
      } else {
        const result = await signIn("credentials", {
          email: emailPrefix,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          setError(t.login.invalidCredentials);
        } else if (result?.ok) {
          router.push("/inbox");
        }
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(t.login.loginError);
      setIsLoading(false);
    }
  }

  async function onOtpSubmit() {
    if (otpValue.length !== 6 || !userId) {
      setError("Please enter a 6-digit code");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await trpc.twoFactor.verifyLoginToken.mutate({
        userId,
        token: otpValue,
      });

      if (result.success) {
        router.push("/inbox");
      }
    } catch (err: any) {
      setError("Invalid verification code. Please try again.");
      setOtpValue("");
    } finally {
      setIsLoading(false);
    }
  }

  function goBackToEmail() {
    setStep("email");
    passwordForm.reset();
    setOtpValue("");
    setPasswordValue("");
    setUserId(null);
  }

  function goBackToPassword() {
    setStep("password");
    setOtpValue("");
  }

  // Genera l'icona con la prima lettera
  const getAvatarContent = () => {
    const username = emailPrefix.split(':')[0];
    const firstLetter = username.charAt(0).toUpperCase();
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
          <AlertTitle className="text-red-800 dark:text-red-300">{t.login.errorTitle}</AlertTitle>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-amber-900 dark:text-amber-400">
                    {t.login.emailLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.login.emailPlaceholder}
                      {...field}
                      className="border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 focus-visible:ring-amber-500 text-gray-900 dark:text-gray-100"
                      autoFocus
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-amber-700 dark:text-amber-500">
                    {t.login.emailDescription}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700"
            >
              {t.login.continueButton}
            </Button>
          </form>
        </Form>
      ) : step === "password" ? (
        <div className="space-y-6">
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
              <p className="text-lg font-semibold text-amber-900 dark:text-amber-400">
                {emailPrefix}
              </p>
              <button
                type="button"
                onClick={goBackToEmail}
                className="mt-1 flex items-center justify-center text-sm text-amber-700 dark:text-amber-500 hover:text-amber-900 dark:hover:text-amber-300"
              >
                <ArrowLeftIcon className="mr-1 h-3 w-3" />
                {t.login.changeAccount}
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
                    <FormLabel className="text-amber-900 dark:text-amber-400">{t.login.passwordLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t.login.passwordPlaceholder}
                        {...field}
                        className="border-amber-300 dark:border-amber-700 focus-visible:ring-amber-500 text-gray-900 dark:text-gray-100"
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
                  className="text-amber-700 dark:text-amber-500 hover:text-amber-900 dark:hover:text-amber-300 underline"
                >
                  {t.login.forgotPassword}
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 disabled:opacity-50"
              >
                {isLoading ? t.login.signingIn : t.login.signInButton}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="space-y-6">
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
              <p className="text-lg font-semibold text-amber-900 dark:text-amber-400">
                {emailPrefix}
              </p>
              <button
                type="button"
                onClick={goBackToPassword}
                className="mt-1 flex items-center justify-center text-sm text-amber-700 dark:text-amber-500 hover:text-amber-900 dark:hover:text-amber-300"
              >
                <ArrowLeftIcon className="mr-1 h-3 w-3" />
                Use a different method
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-400">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-500 mt-2">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="border-amber-300 dark:border-amber-700" />
                  <InputOTPSlot index={1} className="border-amber-300 dark:border-amber-700" />
                  <InputOTPSlot index={2} className="border-amber-300 dark:border-amber-700" />
                  <InputOTPSlot index={3} className="border-amber-300 dark:border-amber-700" />
                  <InputOTPSlot index={4} className="border-amber-300 dark:border-amber-700" />
                  <InputOTPSlot index={5} className="border-amber-300 dark:border-amber-700" />
                </InputOTPGroup>
              </InputOTP>

              <Button
                onClick={onOtpSubmit}
                disabled={isLoading || otpValue.length !== 6}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}