"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { Icon } from "./Icon";

interface ValuePropProps {
  icon: string;
  title: string;
  description: string;
}

function ValueProp({ icon, title, description }: ValuePropProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-black">
        <Icon icon={icon} size={24} className="text-black" />
      </div>
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.12,
      ease: "easeOut" as const,
    },
  },
};

export function ValueProps() {
  const prefersReducedMotion = useReducedMotion();

  const props = [
    {
      icon: "lucide:list-checks",
      title: "Never Miss a Task",
      description:
        "Every action item from every meeting, every chat thread, every voice memo — captured automatically. Stop manually transferring notes to your task list.",
    },
    {
      icon: "lucide:link",
      title: "Context-Aware",
      description:
        "Entourage understands your projects and priorities. Tasks are organized where they belong, linked to the conversations that created them.",
    },
    {
      icon: "line-md:account",
      title: "Human in the Loop",
      description:
        "Review and approve suggested tasks before they sync. You stay in control while AI handles the busy work.",
    },
  ];

  if (prefersReducedMotion) {
    return (
      <section className="border-t border-black py-16 md:py-24">
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

  return (
    <section className="border-t border-black py-16 md:py-24">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid gap-12 md:grid-cols-3 md:gap-8"
        >
          {props.map((prop, i) => (
            <motion.div key={i} variants={itemVariants}>
              <ValueProp {...prop} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
