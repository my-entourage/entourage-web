"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { Icon } from "./Icon";

interface DataFolderSectionProps {
  className?: string;
}

const dataItems = [
  { id: "1", label: "Meeting Notes", icon: "lucide:file-text" },
  { id: "2", label: "Slack Threads", icon: "lucide:message-square" },
  { id: "3", label: "Email Chains", icon: "lucide:mail" },
];

export function DataFolderSection({ className }: DataFolderSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className={cn("py-16 md:py-24 bg-white dark:bg-black", className)}>
      <Container>
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Unified storage
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-black dark:text-white">
            All your data in one place
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Every meeting, message, and email—indexed and searchable
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="relative flex flex-col items-center justify-center p-8 cursor-pointer border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black transition-all duration-300"
            style={{
              minWidth: "280px",
              minHeight: "320px",
              perspective: "1000px",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Plus corners */}
            <svg
              className="absolute -top-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M12 6v12m6-6H6" />
            </svg>
            <svg
              className="absolute -top-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M12 6v12m6-6H6" />
            </svg>
            <svg
              className="absolute -bottom-2.5 -left-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M12 6v12m6-6H6" />
            </svg>
            <svg
              className="absolute -bottom-2.5 -right-2.5 w-5 h-5 text-zinc-400 dark:text-zinc-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M12 6v12m6-6H6" />
            </svg>

            {/* Folder visualization */}
            <div
              className="relative flex items-center justify-center mb-4"
              style={{ height: "160px", width: "200px" }}
            >
              {/* Folder back */}
              <div
                className="absolute w-32 h-24 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
                style={{
                  transformOrigin: "bottom center",
                  transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
                  transition:
                    "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: 10,
                }}
              />

              {/* Folder tab */}
              <div
                className="absolute w-12 h-4 bg-zinc-300 dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-600"
                style={{
                  top: "calc(50% - 48px - 12px)",
                  left: "calc(50% - 64px + 8px)",
                  transformOrigin: "bottom center",
                  transform: isHovered
                    ? "rotateX(-25deg) translateY(-2px)"
                    : "rotateX(0deg)",
                  transition:
                    "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: 10,
                }}
              />

              {/* Data cards */}
              <div
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
              >
                {dataItems.map((item, index) => {
                  const rotations = [-12, 0, 12];
                  const translations = [-40, 0, 40];

                  return (
                    <div
                      key={item.id}
                      className="absolute w-16 h-20 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center"
                      style={{
                        transform: isHovered
                          ? `translateY(-70px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
                          : "translateY(0px) translateX(0px) rotate(0deg) scale(0.5)",
                        opacity: isHovered ? 1 : 0,
                        transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`,
                        zIndex: 10 - index,
                        left: "-32px",
                        top: "-40px",
                      }}
                    >
                      <Icon
                        icon={item.icon}
                        size={20}
                        className="text-black dark:text-white"
                      />
                      <span className="mt-1 text-[8px] font-mono text-zinc-500 dark:text-zinc-400 text-center px-1">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Folder front */}
              <div
                className="absolute w-32 h-24 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700"
                style={{
                  top: "calc(50% - 48px + 4px)",
                  transformOrigin: "bottom center",
                  transform: isHovered
                    ? "rotateX(25deg) translateY(8px)"
                    : "rotateX(0deg)",
                  transition:
                    "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  zIndex: 30,
                }}
              />
            </div>

            {/* Title */}
            <h3
              className="text-lg font-semibold text-black dark:text-white mt-4 transition-all duration-300"
              style={{
                transform: isHovered ? "translateY(4px)" : "translateY(0)",
              }}
            >
              Your Data Vault
            </h3>

            {/* Count */}
            <p
              className="text-sm font-mono text-zinc-500 dark:text-zinc-400 transition-all duration-300"
              style={{
                opacity: isHovered ? 0.7 : 1,
              }}
            >
              Unified &amp; indexed
            </p>

            {/* Hover hint */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-all duration-300"
              style={{
                opacity: isHovered ? 0 : 0.6,
                transform: isHovered
                  ? "translateY(10px) translateX(-50%)"
                  : "translateY(0) translateX(-50%)",
              }}
            >
              <span>Hover to explore</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
