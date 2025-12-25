import { cn } from "@/lib/utils";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * E-Block logo mark
 * Spec: 40% spine width, 27% bar height, 10% gaps
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-label="Entourage logo"
      className={className}
    >
      {/* Vertical spine: 40% width */}
      <rect x="0" y="0" width="40" height="100" />
      {/* Bar 1: top */}
      <rect x="40" y="0" width="60" height="27" />
      {/* Bar 2: middle */}
      <rect x="40" y="36.5" width="60" height="27" />
      {/* Bar 3: bottom */}
      <rect x="40" y="73" width="60" height="27" />
    </svg>
  );
}

interface LogoFullProps {
  showText?: boolean;
  className?: string;
}

/**
 * Full logo with E-Block mark and wordmark
 */
export function LogoFull({ showText = true, className }: LogoFullProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark size={32} />
      {showText && (
        <span className="font-mono text-lg font-medium tracking-wide">
          Entourage
        </span>
      )}
    </div>
  );
}
