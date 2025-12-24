import Link from "next/link";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl md:text-6xl">
            Know what needs to be done.
          </h1>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-400 sm:text-4xl md:text-6xl">
            Without touching your task list.
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base text-zinc-500 sm:mt-8 sm:text-lg md:text-xl">
            AI-powered task management that extracts actionable items from your
            meetings, chats, and communications automatically.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link href="/sign-up">
              <Button variant="primary" size="lg">
                Join the Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
