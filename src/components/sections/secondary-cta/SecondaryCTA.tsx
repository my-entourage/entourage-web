"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import { trackCTAClick } from "@/lib/analytics";

function PlusCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 6v12m6-6H6" />
    </svg>
  );
}

export function SecondaryCTA() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="relative mx-auto inline-block border border-dashed border-zinc-300 px-8 py-6 dark:border-zinc-700">
              <PlusCorner className="absolute -left-2.5 -top-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -right-2.5 -top-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -bottom-2.5 -left-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
              <PlusCorner className="absolute -bottom-2.5 -right-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
              <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
                Ready to stop missing action items?
              </h2>
            </div>

            <div className="mt-8">
              <Link
                href="/waitlist"
                onClick={() => trackCTAClick("secondary-cta", "primary")}
              >
                <Button variant="primary" size="lg">
                  Join the Waitlist
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              We&apos;re onboarding users in batches. Get early access.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <div className="relative mx-auto inline-block border border-dashed border-zinc-300 px-8 py-6 dark:border-zinc-700">
            <PlusCorner className="absolute -left-2.5 -top-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
            <PlusCorner className="absolute -right-2.5 -top-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
            <PlusCorner className="absolute -bottom-2.5 -left-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
            <PlusCorner className="absolute -bottom-2.5 -right-2.5 h-5 w-5 text-zinc-400 dark:text-zinc-600" />
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
              Ready to stop missing action items?
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.12, delay: 0.05, ease: "easeOut" }}
            className="mt-8"
          >
            <Link
              href="/waitlist"
              onClick={() => trackCTAClick("secondary-cta", "primary")}
            >
              <Button variant="primary" size="lg">
                Join the Waitlist
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.12, delay: 0.1 }}
            className="mt-4 text-sm text-zinc-500 dark:text-zinc-400"
          >
            We&apos;re onboarding users in batches. Get early access.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
