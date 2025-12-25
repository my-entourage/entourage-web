"use client";

import Link from "next/link";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { LogoMark, LogoFull } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black dark:border-white bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-black dark:text-white">
            {/* Mobile: Logo mark only */}
            <LogoMark size={28} className="md:hidden" />
            {/* Desktop: Full logo with text */}
            <LogoFull className="hidden md:flex" />
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/sign-in">
              <Button variant="secondary" size="default">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
