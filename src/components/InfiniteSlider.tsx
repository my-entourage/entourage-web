"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState, Children } from "react";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
  speed?: number;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  reverse = false,
  className,
  speed,
}: InfiniteSliderProps) {
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  // Convert speed to duration if provided (higher speed = lower duration)
  const effectiveDuration = speed ? 100 / speed : duration;

  // Measure the width of one set of items
  useEffect(() => {
    if (!firstSetRef.current) return;

    const measure = () => {
      const width = firstSetRef.current?.offsetWidth ?? 0;
      setScrollWidth(width + gap); // Include one gap for seamless loop
    };

    measure();

    // Re-measure on resize
    const observer = new ResizeObserver(measure);
    observer.observe(firstSetRef.current);

    return () => observer.disconnect();
  }, [gap]);

  const childArray = Children.toArray(children);

  const renderItems = (setKey: string, ref?: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={ref}
      className="flex shrink-0 items-center"
      style={{ gap: `${gap}px` }}
      aria-hidden={setKey === "second"}
    >
      {childArray.map((child, index) => (
        <div key={`${setKey}-${index}`} className="shrink-0">
          {child}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="flex items-center"
        style={{
          gap: `${gap}px`,
          animation: scrollWidth
            ? `infinite-scroll ${effectiveDuration}s linear infinite ${reverse ? "reverse" : ""}`
            : "none",
          ["--scroll-width" as string]: `${scrollWidth}px`,
        }}
      >
        {renderItems("first", firstSetRef)}
        {renderItems("second")}
      </div>
    </div>
  );
}
