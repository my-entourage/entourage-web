"use client";

import Link from "next/link";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-lg tracking-wide font-medium"
          >
            Entourage
          </Link>

          <Link href="/sign-in">
            <Button variant="ghost" size="default">
              Login
            </Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
