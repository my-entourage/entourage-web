"use client";

import { PlusCornerCard } from "../ui/PlusCornerCard";
import { Icon } from "../Icon";
import { LogoMark } from "../Logo";

export function IntegrationsCard() {
  return (
    <PlusCornerCard className="h-full min-h-[440px] md:min-h-[500px] flex flex-col">
      {/* Card header */}
      <div className="p-4 md:p-6 pb-0">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Integrations
        </span>
        <h3 className="mt-1 text-lg font-semibold text-black dark:text-white">
          Connect your tools
        </h3>
      </div>

      {/* Circuit board SVG */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <svg
          className="w-full h-auto max-h-[320px] md:max-h-[360px] text-zinc-300 dark:text-zinc-700"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Circuit paths from integrations to center */}
          <g
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeDasharray="200 200"
            pathLength="200"
          >
            {/* Top row paths */}
            <path
              className="circuit-path circuit-path-1"
              d="M 60 30 v 35 q 0 5 5 5 h 115 q 5 0 5 5 v 25"
            />
            <path
              className="circuit-path circuit-path-2"
              d="M 140 30 v 25 q 0 5 5 5 h 35 q 5 0 5 5 v 35"
            />
            <path
              className="circuit-path circuit-path-3"
              d="M 200 30 v 70"
            />
            <path
              className="circuit-path circuit-path-4"
              d="M 260 30 v 25 q 0 5 -5 5 h -35 q -5 0 -5 5 v 35"
            />
            <path
              className="circuit-path circuit-path-5"
              d="M 340 30 v 35 q 0 5 -5 5 h -115 q -5 0 -5 5 v 25"
            />

            {/* Bottom row paths */}
            <path
              className="circuit-path circuit-path-6"
              d="M 60 170 v -35 q 0 -5 5 -5 h 115 q 5 0 5 -5 v -25"
            />
            <path
              className="circuit-path circuit-path-7"
              d="M 140 170 v -25 q 0 -5 5 -5 h 35 q 5 0 5 -5 v -35"
            />
            <path
              className="circuit-path circuit-path-8"
              d="M 200 170 v -50"
            />
            <path
              className="circuit-path circuit-path-9"
              d="M 260 170 v -25 q 0 -5 -5 -5 h -35 q -5 0 -5 -5 v -35"
            />
            <path
              className="circuit-path circuit-path-10"
              d="M 340 170 v -35 q 0 -5 -5 -5 h -115 q -5 0 -5 -5 v -25"
            />

            {/* Path animation */}
            <animate
              attributeName="stroke-dashoffset"
              from="200"
              to="0"
              dur="1.5s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.25,0.1,0.5,1"
              keyTimes="0; 1"
            />
          </g>

          {/* Animated signal lights - green accent */}
          <g mask="url(#circuit-mask-1)">
            <circle className="circuit-signal circuit-signal-1" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-2)">
            <circle className="circuit-signal circuit-signal-2" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-3)">
            <circle className="circuit-signal circuit-signal-3" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-4)">
            <circle className="circuit-signal circuit-signal-4" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-5)">
            <circle className="circuit-signal circuit-signal-5" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-6)">
            <circle className="circuit-signal circuit-signal-6" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-7)">
            <circle className="circuit-signal circuit-signal-7" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-8)">
            <circle className="circuit-signal circuit-signal-8" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-9)">
            <circle className="circuit-signal circuit-signal-9" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>
          <g mask="url(#circuit-mask-10)">
            <circle className="circuit-signal circuit-signal-10" cx="0" cy="0" r="8" fill="url(#signal-gradient)" />
          </g>

          {/* Integration icons - Top row */}
          <foreignObject x="48" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:linear" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="128" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:slack" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="188" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:googledrive" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="248" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="mdi:gmail" size={20} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="328" y="5" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:whatsapp" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>

          {/* Integration icons - Bottom row */}
          <foreignObject x="48" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:microsoftoutlook" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="128" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:notion" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="188" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <Icon icon="simple-icons:openai" size={18} className="text-zinc-600 dark:text-zinc-400" />
            </div>
          </foreignObject>
          <foreignObject x="248" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/icons/fireflies.svg"
                alt="Fireflies"
                className="w-[18px] h-[18px] opacity-70 grayscale dark:invert"
              />
            </div>
          </foreignObject>
          <foreignObject x="328" y="171" width="24" height="24">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/icons/granola.svg"
                alt="Granola"
                className="w-[20px] h-[20px] opacity-70 grayscale dark:invert"
              />
            </div>
          </foreignObject>

          {/* Center Entourage node */}
          <g>
            <rect
              x="180"
              y="80"
              width="40"
              height="40"
              className="fill-white dark:fill-black stroke-zinc-200 dark:stroke-zinc-800"
              strokeWidth="1"
              strokeDasharray="2 2"
              shapeRendering="crispEdges"
            />
            <g className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" fill="none">
              <path d="M 180 75 v 10 M 175 80 h 10" />
              <path d="M 220 75 v 10 M 215 80 h 10" />
              <path d="M 180 115 v 10 M 175 120 h 10" />
              <path d="M 220 115 v 10 M 215 120 h 10" />
            </g>
            <foreignObject x="180" y="80" width="40" height="40">
              <div className="w-full h-full flex items-center justify-center">
                <LogoMark size={22} className="text-black dark:text-white" />
              </div>
            </foreignObject>
          </g>

          {/* Definitions */}
          <defs>
            <mask id="circuit-mask-1">
              <path d="M 60 30 v 35 q 0 5 5 5 h 115 q 5 0 5 5 v 25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-2">
              <path d="M 140 30 v 25 q 0 5 5 5 h 35 q 5 0 5 5 v 35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-3">
              <path d="M 200 30 v 70" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-4">
              <path d="M 260 30 v 25 q 0 5 -5 5 h -35 q -5 0 -5 5 v 35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-5">
              <path d="M 340 30 v 35 q 0 5 -5 5 h -115 q -5 0 -5 5 v 25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-6">
              <path d="M 60 170 v -35 q 0 -5 5 -5 h 115 q 5 0 5 -5 v -25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-7">
              <path d="M 140 170 v -25 q 0 -5 5 -5 h 35 q 5 0 5 -5 v -35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-8">
              <path d="M 200 170 v -50" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-9">
              <path d="M 260 170 v -25 q 0 -5 -5 -5 h -35 q -5 0 -5 -5 v -35" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <mask id="circuit-mask-10">
              <path d="M 340 170 v -35 q 0 -5 -5 -5 h -115 q -5 0 -5 -5 v -25" strokeWidth="2" stroke="white" fill="none" />
            </mask>
            <radialGradient id="signal-gradient" fx="0.5" fy="0.5">
              <stop offset="0%" stopColor="#48BB78" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </PlusCornerCard>
  );
}
