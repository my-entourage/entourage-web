import { SignInForm } from "@/components/SignInForm";
import { PlusCorner } from "@/components/ui/PlusCorner";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-6">
      {/* Content wrapper with plus corners */}
      <div className="relative w-full max-w-md px-6 py-12 md:px-8 md:py-16">
        {/* Dashed border */}
        <div className="absolute inset-0 border border-dashed border-zinc-200 dark:border-zinc-800" />

        {/* Plus corners */}
        <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
        <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />

        {/* Content */}
        <div className="relative text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Welcome Back
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
            Sign In
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Access your Entourage account.
          </p>
          <div className="mt-8">
            <SignInForm />
          </div>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
