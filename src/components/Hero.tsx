"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  });

  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            {...fadeUp(0)}
            className="text-3xl font-semibold tracking-tight text-black sm:text-4xl md:text-6xl"
          >
            Know what needs to be done.
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-400 sm:text-4xl md:text-6xl"
          >
            Without touching your task list.
          </motion.p>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-6 max-w-xl text-base text-zinc-500 sm:mt-8 sm:text-lg md:text-xl"
          >
            AI-powered task management that extracts actionable items from your
            meetings, chats, and communications automatically.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-8 sm:mt-10">
            <Link href="/sign-up">
              <Button variant="primary" size="lg">
                Join the Waitlist
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
