"use client";

import Link from "next/link";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import { PlusCorner } from "../../ui/PlusCorner";
import { trackCTAClick } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32">
      <Container>
        {/* Content wrapper with plus corners */}
        <div className="relative mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-16">
          {/* Dashed border */}
          <div className="absolute inset-0 border border-dashed border-zinc-200 dark:border-zinc-800" />

          {/* Plus corners - matching FlowSection style */}
          <PlusCorner className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
          <PlusCorner className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
          <PlusCorner className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />
          <PlusCorner className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600" />

          {/* Content */}
          <div className="relative text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl md:text-6xl animate-fade-up">
              Know what needs to be done.
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-500 dark:text-zinc-400 sm:text-4xl md:text-6xl animate-fade-up animation-delay-100">
              Without touching your task list.
            </p>

            <p className="mx-auto mt-6 max-w-xl text-base text-zinc-500 dark:text-zinc-400 sm:mt-8 sm:text-lg md:text-xl animate-fade-up animation-delay-200">
              AI-powered task management that extracts actionable items from your
              meetings, chats, and communications automatically.
            </p>

            <div className="mt-8 sm:mt-10 animate-fade-up animation-delay-300">
              <Link
                href="/waitlist"
                onClick={() => trackCTAClick("hero", "solid")}
              >
                <Button variant="solid" size="lg">
                  Join the Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
