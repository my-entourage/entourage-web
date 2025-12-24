import Link from "next/link";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

export function SecondaryCTA() {
  return (
    <section className="border-t border-zinc-100 py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
            Ready to stop missing action items?
          </h2>

          <div className="mt-8">
            <Link href="/sign-up">
              <Button variant="primary" size="lg">
                Join the Waitlist
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-zinc-500">
            We&apos;re onboarding users in batches. Get early access.
          </p>
        </div>
      </Container>
    </section>
  );
}
