"use client";

import { Container } from "./ui/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Entourage extract tasks from my communications?",
    answer:
      "Entourage uses AI to analyze your meetings, messages, and emails to identify action items, deadlines, and commitments. It understands context and prioritizes based on your projects.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your data is encrypted at rest and in transit. We never share your data with third parties, and you can delete your data at any time.",
  },
  {
    question: "Which integrations are supported?",
    answer:
      "We currently support Linear, Slack, Google Calendar, Gmail, Outlook, WhatsApp, Notion, Fireflies, Granola, and ChatGPT. More integrations are coming soon.",
  },
  {
    question: "Do I need to manually approve tasks?",
    answer:
      "Yes. Entourage suggests tasks but you remain in control. Review and approve suggestions before they sync to your task manager.",
  },
];

interface FAQProps {
  className?: string;
}

export function FAQ({ className }: FAQProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <Container>
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            FAQ
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-black dark:text-white">
            Common questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-zinc-200 dark:border-zinc-800 px-4"
              >
                <AccordionTrigger className="text-left text-black dark:text-white hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 dark:text-zinc-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
