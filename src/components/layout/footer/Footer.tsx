import Link from "next/link";
import { Container } from "../../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-black dark:border-white py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-zinc-400 dark:text-zinc-500">Entourage</span>
            <span className="text-zinc-200 dark:text-zinc-700">|</span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">Built with AI</span>
            <span className="text-zinc-200 dark:text-zinc-700">|</span>
            <Link
              href="/careers"
              className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
            >
              We&apos;re hiring
            </Link>
          </div>

          <span className="text-sm text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Entourage
          </span>
        </div>
      </Container>
    </footer>
  );
}
