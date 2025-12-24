import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}
