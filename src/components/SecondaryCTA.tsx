"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

export function SecondaryCTA() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section className="border-t border-black dark:border-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
              Ready to stop missing action items?
            </h2>

            <div className="mt-8">
              <Link href="/sign-up">
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
    <section className="border-t border-black dark:border-white py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white md:text-3xl">
            Ready to stop missing action items?
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.12, delay: 0.05, ease: "easeOut" }}
            className="mt-8"
          >
            <Link href="/sign-up">
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
