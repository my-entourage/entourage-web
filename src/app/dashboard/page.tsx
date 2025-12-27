import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-5xl px-6 md:px-12 py-16">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Dashboard
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          Welcome, {user?.firstName || "User"}
        </p>
        <p className="mt-8 text-zinc-400 dark:text-zinc-500 text-sm">
          This is a placeholder dashboard. More features coming soon.
        </p>
      </div>
    </div>
  );
}
