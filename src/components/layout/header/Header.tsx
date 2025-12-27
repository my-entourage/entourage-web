"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import { Button } from "../../ui/Button";
import { Skeleton } from "../../ui/skeleton";
import { LogoMark, LogoFull } from "../../Logo";
import { ThemeToggle } from "../../ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.nav
        className={cn(
          "flex items-center justify-between px-4 h-14 w-full max-w-[1200px]",
          "transition-all duration-300 ease-out",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border border-black dark:border-white"
            : "bg-background border border-transparent"
        )}
        initial={false}
        animate={{
          scale: isScrolled ? 0.85 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1],
        }}
        style={{
          transformOrigin: "center top",
        }}
      >
        <Link href="/" className="text-black dark:text-white">
          <div>
            {/* Mobile: Logo mark only */}
            <LogoMark size={24} className="md:hidden" />
            {/* Desktop: Full logo with text */}
            <LogoFull className="hidden md:flex" />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ClerkLoading>
            <Skeleton className="h-9 w-[68px] rounded-none" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="secondary" size="default">
                  Login
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </motion.nav>
    </header>
  );
}
