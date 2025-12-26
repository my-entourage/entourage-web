"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { PlusCorner } from "./ui/PlusCorner";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut" as const,
      },
    },
  });

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
            <motion.h1
              {...fadeUp(0)}
              className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl md:text-6xl"
            >
              Know what needs to be done.
            </motion.h1>
            <motion.p
              {...fadeUp(0.1)}
              className="mx-auto mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-400 dark:text-zinc-500 sm:text-4xl md:text-6xl"
            >
              Without touching your task list.
            </motion.p>

            <motion.p
              {...fadeUp(0.2)}
              className="mx-auto mt-6 max-w-xl text-base text-zinc-500 dark:text-zinc-400 sm:mt-8 sm:text-lg md:text-xl"
            >
              AI-powered task management that extracts actionable items from your
              meetings, chats, and communications automatically.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-8 sm:mt-10">
              <Link href="/sign-up">
                <Button variant="solid" size="lg">
                  Join the Waitlist
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
