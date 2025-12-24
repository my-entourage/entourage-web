import { Container } from "./ui/Container";

interface ValuePropProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueProp({ icon, title, description }: ValuePropProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
    </div>
  );
}

// Simple geometric icons
const CircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="black" strokeWidth="1.5" />
  </svg>
);

const TriangleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L18 18H2L10 2Z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const SquareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="16" height="16" stroke="black" strokeWidth="1.5" />
  </svg>
);

export function ValueProps() {
  const props = [
    {
      icon: <CircleIcon />,
      title: "Never Miss a Task",
      description:
        "Every action item from every meeting, every chat thread, every voice memo — captured automatically. Stop manually transferring notes to your task list.",
    },
    {
      icon: <TriangleIcon />,
      title: "Context-Aware",
      description:
        "Entourage understands your projects and priorities. Tasks are organized where they belong, linked to the conversations that created them.",
    },
    {
      icon: <SquareIcon />,
      title: "Human in the Loop",
      description:
        "Review and approve suggested tasks before they sync. You stay in control while AI handles the busy work.",
    },
  ];

  return (
    <section className="border-t border-zinc-100 py-16 md:py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {props.map((prop, i) => (
            <ValueProp key={i} {...prop} />
          ))}
        </div>
      </Container>
    </section>
  );
}
