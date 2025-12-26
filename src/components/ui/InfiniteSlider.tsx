"use client";

import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
  speed?: number;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = "horizontal",
  reverse = false,
  className,
  speed,
}: InfiniteSliderProps) {
  // Convert speed to duration if provided (higher speed = lower duration)
  const effectiveDuration = speed ? 100 / speed : duration;

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          direction === "horizontal" ? "flex-row" : "flex-col",
          reverse ? "animate-scroll-reverse" : "animate-scroll"
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${effectiveDuration}s`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
