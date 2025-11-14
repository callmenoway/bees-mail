import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MailClient } from "@/components/mail-client";

export default async function InboxPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-screen overflow-hidden">
      <MailClient 
        userId={(session.user as any)?.id || ""}
        userEmail={session.user?.email || "user:beesmail"}
        userAvatar={session.user?.image || null}
      />
    </div>
  );
}
