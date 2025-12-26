"use client";

import { useState } from "react";
import { PlusCornerCard } from "../ui/PlusCornerCard";
import { Icon } from "../Icon";

const dataItems = [
  { id: 1, label: "Meeting Notes", icon: "lucide:file-text" },
  { id: 2, label: "Slack Threads", icon: "lucide:message-square" },
  { id: 3, label: "Email Chains", icon: "lucide:mail" },
];

export function DataVaultCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PlusCornerCard
      className="h-full min-h-[400px] md:min-h-[440px] flex flex-col cursor-pointer"
      dashed={true}
    >
      {/* Card header */}
      <div className="p-4 md:p-6 pb-0">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Unified storage
        </span>
        <h3 className="mt-1 text-lg font-semibold text-black dark:text-white">
          Your Data Vault
        </h3>
      </div>

      {/* 3D Folder Animation */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: "1000px" }}
      >
        {/* Folder visualization */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Folder back panel */}
          <div
            className="w-32 h-24 bg-zinc-200 dark:bg-zinc-800 relative"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered ? "rotateX(-15deg)" : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Folder tab */}
          <div
            className="absolute w-12 h-4 bg-zinc-300 dark:bg-zinc-700"
            style={{
              top: "-16px",
              left: "8px",
              transformOrigin: "bottom center",
              transform: isHovered
                ? "rotateX(-25deg) translateY(-2px)"
                : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 10,
            }}
          />

          {/* Data cards container */}
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
                  className="absolute w-16 h-20 bg-background border border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center"
                  style={{
                    transform: isHovered
                      ? `translateY(-70px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
                      : "translateY(0) translateX(0) rotate(0deg) scale(0.5)",
                    opacity: isHovered ? 1 : 0,
                    transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`,
                    zIndex: 10 - index,
                    left: "50%",
                    top: "50%",
                    marginLeft: "-32px",
                    marginTop: "-40px",
                  }}
                >
                  <Icon
                    icon={item.icon}
                    size={20}
                    className="text-zinc-600 dark:text-zinc-400"
                  />
                  <span className="mt-1 text-[8px] font-mono text-zinc-500 dark:text-zinc-400 text-center px-1">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Folder front panel */}
          <div
            className="absolute top-0 left-0 w-32 h-24 bg-zinc-100 dark:bg-zinc-900"
            style={{
              transformOrigin: "bottom center",
              transform: isHovered
                ? "rotateX(25deg) translateY(8px)"
                : "rotateX(0deg)",
              transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 30,
            }}
          />
        </div>

        {/* Labels */}
        <p
          className="mt-6 text-sm font-mono text-zinc-500 dark:text-zinc-400"
          style={{
            opacity: isHovered ? 0.7 : 1,
            transition: "opacity 300ms",
          }}
        >
          Unified & indexed
        </p>
        <p
          className="mt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500"
          style={{
            opacity: isHovered ? 0 : 0.6,
            transform: isHovered ? "translateY(10px)" : "translateY(0)",
            transition: "all 300ms",
          }}
        >
          Hover to explore
        </p>
      </div>
    </PlusCornerCard>
  );
}
