"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setStatus("loading");
    setMessage("");

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        setStatus("success");
        setMessage("Signed in successfully!");
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/dashboard");
      } else {
        // Handle other statuses (needs_second_factor, etc.)
        setStatus("error");
        setMessage("Additional verification required. Please try again.");
        console.error("Sign-in incomplete:", signInAttempt);
      }
    } catch (err) {
      setStatus("error");
      if (isClerkAPIResponseError(err)) {
        // Get the first error message from Clerk
        const clerkError = err.errors[0];
        setMessage(clerkError?.longMessage || clerkError?.message || "Sign in failed");
      } else {
        setMessage("Failed to sign in. Please try again.");
      }
      console.error("Sign-in error:", err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12 rounded-none" />
          <Skeleton className="h-11 w-full rounded-none" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-none" />
          <Skeleton className="h-11 w-full rounded-none" />
        </div>
        <Skeleton className="h-11 w-full rounded-none" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={status === "loading" || status === "success"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          disabled={status === "loading" || status === "success"}
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        size="lg"
        className="w-full"
        disabled={!isLoaded || status === "loading" || status === "success"}
      >
        {status === "loading"
          ? "Signing in..."
          : status === "success"
            ? "Redirecting..."
            : "Sign In"}
      </Button>

      {message && (
        <p
          className={cn(
            "text-sm text-center",
            status === "success" ? "text-emerald-500" : "text-rose-500"
          )}
        >
          {message}
        </p>
      )}
    </form>
  );
}
