import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4">
      {/* Pattern esagonale di sfondo */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="honeycomb"
              x="0"
              y="0"
              width="56"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="28,0 56,16 56,50 28,66 0,50 0,16"
                fill="none"
                stroke="#d97706"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb)" />
        </svg>
      </div>

      <Card className="relative z-10 w-full max-w-md border-2 border-amber-200 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600">
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
          <CardTitle className="text-3xl font-bold text-amber-900">
            Beesmail
          </CardTitle>
          <CardDescription className="text-amber-700">
            Accedi al tuo account sul protocollo Honeycomb
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-amber-700">
            Non hai un account?{" "}
            <a
              href="/register"
              className="font-medium text-amber-900 underline hover:text-amber-700"
            >
              Registrati
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}