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
      <MailClient userEmail={session.user?.email || "user:beesmail"} />
    </div>
  );
}
