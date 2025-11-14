import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginPageClient } from "./login-page-client";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/inbox");
  }

  return <LoginPageClient />;
}