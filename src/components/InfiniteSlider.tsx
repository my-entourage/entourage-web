"use client";

import { cn } from "@/lib/utils";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from "react";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Convert speed to duration if provided (higher speed = lower duration)
  const effectiveDuration = speed ? 100 / speed : duration;

  // Wait for component to mount before animating to prevent layout shift
  useEffect(() => {
    // Use requestAnimationFrame to ensure layout is complete
    const raf = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Clone children with stable keys to prevent React reconciliation issues
  const childArray = Children.toArray(children);

  const renderSet = useCallback(
    (setKey: string) => (
      <div
        data-slider-set={setKey}
        className={cn(
          "flex shrink-0",
          direction === "horizontal" ? "flex-row" : "flex-col"
        )}
        style={{ gap: `${gap}px` }}
        aria-hidden={setKey === "second"}
      >
        {childArray.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              key: `${setKey}-${index}`,
            } as React.Attributes);
          }
          return <span key={`${setKey}-${index}`}>{child}</span>;
        })}
      </div>
    ),
    [childArray, direction, gap]
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        ref={contentRef}
        className={cn(
          "flex",
          direction === "horizontal" ? "flex-row" : "flex-col",
          isReady && (reverse ? "animate-scroll-reverse" : "animate-scroll")
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${effectiveDuration}s`,
          ["--slider-gap" as string]: `${gap}px`,
        }}
      >
        {renderSet("first")}
        {renderSet("second")}
      </div>
    </div>
  );
}
