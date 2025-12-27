"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { cn } from "@/lib/utils";

export function WaitlistForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined, company: company || undefined }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
        setName("");
        setCompany("");
        // Redirect to home after showing success message
        setTimeout(() => {
          router.push("/?waitlist=success");
        }, 1500);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to submit. Please try again.");
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
