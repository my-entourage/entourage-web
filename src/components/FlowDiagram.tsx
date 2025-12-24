import { Container } from "./ui/Container";

// Input source icons as simple SVG paths
const MicIcon = () => (
  <g>
    <rect x="8" y="2" width="8" height="12" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 10v1a8 8 0 0 0 16 0v-1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" />
  </g>
);

const ChatIcon = () => (
  <g>
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </g>
);

const MailIcon = () => (
  <g>
    <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 6l-10 7L2 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </g>
);

const WaveformIcon = () => (
  <g>
    <line x1="4" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const CheckIcon = () => (
  <g>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

interface InputSourceProps {
  icon: React.ReactNode;
  label: string;
  x: number;
}

function InputSource({ icon, label, x }: InputSourceProps) {
  return (
    <g transform={`translate(${x}, 20)`}>
      <svg x="-12" y="0" width="24" height="24" viewBox="0 0 24 24" className="text-black">
        {icon}
      </svg>
      <text
        x="0"
        y="40"
        textAnchor="middle"
        className="fill-zinc-500"
        style={{ fontSize: "11px", fontFamily: "var(--font-geist-mono)" }}
      >
        {label}
      </text>
    </g>
  );
}

function TaskCard({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-45"
        y="0"
        width="90"
        height="28"
        rx="4"
        fill="white"
        stroke="black"
        strokeWidth="1"
      />
      <rect x="-37" y="6" width="8" height="8" rx="1" fill="none" stroke="black" strokeWidth="1" />
      <line x1="-23" y1="10" x2="35" y2="10" stroke="black" strokeWidth="1" opacity="0.3" />
      <line x1="-23" y1="17" x2="15" y2="17" stroke="black" strokeWidth="1" opacity="0.2" />
    </g>
  );
}

export function FlowDiagram() {
  const inputSources = [
    { icon: <MicIcon />, label: "Meetings", x: 70 },
    { icon: <ChatIcon />, label: "Chat", x: 150 },
    { icon: <MailIcon />, label: "Email", x: 230 },
    { icon: <WaveformIcon />, label: "Voice", x: 310 },
  ];

  const centerX = 190;

  return (
    <section className="py-12 sm:py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-md sm:max-w-lg">
          <svg
            viewBox="0 0 380 480"
            className="w-full"
            style={{ maxWidth: "380px", margin: "0 auto", display: "block" }}
          >
            {/* Section Label: Inputs */}
            <text
              x={centerX}
              y="12"
              textAnchor="middle"
              className="fill-zinc-400"
              style={{ fontSize: "10px", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Your Communications
            </text>

            {/* Input Sources - horizontal row */}
            {inputSources.map((source, i) => (
              <InputSource key={i} {...source} />
            ))}

            {/* Connection lines from inputs down to center */}
            {inputSources.map((source, i) => (
              <g key={`line-${i}`}>
                <path
                  d={`M ${source.x} 65 L ${source.x} 100 L ${centerX} 100 L ${centerX} 140`}
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  className="animate-dash"
                />
                {/* Animated dot */}
                <circle
                  r="2.5"
                  fill="black"
                  className={`animate-dot-${(i % 4) + 1}`}
                  style={{
                    offsetPath: `path('M ${source.x} 65 L ${source.x} 100 L ${centerX} 100 L ${centerX} 140')`,
                  }}
                />
              </g>
            ))}

            {/* Central AI Node */}
            <g transform={`translate(${centerX}, 190)`}>
              <circle
                r="45"
                fill="white"
                stroke="black"
                strokeWidth="2"
                className="animate-pulse-slow"
              />
              <text
                textAnchor="middle"
                y="6"
                style={{ fontSize: "20px", fontFamily: "var(--font-geist-mono)", fontWeight: 600 }}
                className="fill-black"
              >
                AI
              </text>
            </g>

            {/* Label under AI circle */}
            <text
              x={centerX}
              y="255"
              textAnchor="middle"
              className="fill-zinc-400"
              style={{ fontSize: "10px", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Entourage
            </text>

            {/* Connection line from center down to tasks */}
            <path
              d={`M ${centerX} 235 L ${centerX} 290`}
              fill="none"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4,4"
              className="animate-dash"
            />

            {/* Section Label: Tasks */}
            <text
              x={centerX}
              y="310"
              textAnchor="middle"
              className="fill-zinc-400"
              style={{ fontSize: "10px", fontFamily: "var(--font-geist-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            >
              Your Tasks
            </text>

            {/* Output: Task Cards - stacked vertically */}
            <TaskCard x={centerX} y={325} />
            <TaskCard x={centerX} y={360} />
            <TaskCard x={centerX} y={395} />

            {/* Task list icon at bottom */}
            <g transform={`translate(${centerX}, 445)`}>
              <svg x="-12" y="0" width="24" height="24" viewBox="0 0 24 24" className="text-black">
                <CheckIcon />
              </svg>
            </g>
          </svg>
        </div>
      </Container>
    </section>
  );
}
