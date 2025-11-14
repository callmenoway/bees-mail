import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function InboxPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-400">
              Inbox
            </h1>
            <p className="text-amber-700 dark:text-amber-500 mt-2">
              Benvenuto, {session.user?.email}
            </p>
          </div>

          <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg border border-amber-200 dark:border-amber-800 p-8">
            <p className="text-center text-amber-700 dark:text-amber-500">
              La tua inbox è vuota. Inizia a ricevere email!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
