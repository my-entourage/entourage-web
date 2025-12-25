"use client";

/**
 * Blueprint-style grid background inspired by Vercel font page
 * Subtle dashed grid with technical measurement annotations
 */
export function BlueprintGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Horizontal grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 79px,
              var(--grid-line-color, rgba(0, 0, 0, 0.04)) 79px,
              var(--grid-line-color, rgba(0, 0, 0, 0.04)) 80px
            )
          `,
        }}
      />
      {/* Vertical grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 79px,
              var(--grid-line-color, rgba(0, 0, 0, 0.04)) 79px,
              var(--grid-line-color, rgba(0, 0, 0, 0.04)) 80px
            )
          `,
        }}
      />
      {/* Corner coordinate annotation */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-300 select-none">
        0,0
      </div>
      {/* Right side measurement */}
      <div className="absolute top-1/2 right-4 font-mono text-[10px] text-zinc-300 -rotate-90 origin-right select-none">
        80px
      </div>
    </div>
  );
}
