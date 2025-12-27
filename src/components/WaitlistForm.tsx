"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { cn } from "@/lib/utils";
import { useWaitlist } from "@/hooks/useWaitlist";

export function WaitlistForm() {
  const router = useRouter();
  const { status, message, submit, trackStart } = useWaitlist();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submit({ 
      email, 
      name: name || undefined, 
      company: company || undefined 
    });

    if (success) {
      setEmail("");
      setName("");
      setCompany("");
      // Redirect to home after showing success message
      setTimeout(() => {
        router.push("/?waitlist=success");
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="waitlist-name">Name (optional)</Label>
        <Input
          id="waitlist-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={trackStart}
          disabled={status === "loading" || status === "success"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="waitlist-company">Company (optional)</Label>
        <Input
          id="waitlist-company"
          type="text"
          placeholder="Your company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onFocus={trackStart}
          disabled={status === "loading" || status === "success"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="waitlist-email">Email</Label>
        <Input
          id="waitlist-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={trackStart}
          required
          disabled={status === "loading" || status === "success"}
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        size="lg"
        className="w-full"
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading" ? "Joining..." : status === "success" ? "Redirecting..." : "Join the Waitlist"}
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
