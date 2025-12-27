"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "../../ui/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { trackFAQOpened, trackFAQClosed } from "@/lib/analytics";

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

export function FAQ() {
  const [mounted, setMounted] = useState(false);
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const prevOpenItem = useRef<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleValueChange = useCallback(
    (value: string) => {
      // Track close event for previously open item
      if (prevOpenItem.current && prevOpenItem.current !== value) {
        const prevIndex = parseInt(prevOpenItem.current.replace("item-", ""));
        if (!isNaN(prevIndex) && faqs[prevIndex]) {
          trackFAQClosed(faqs[prevIndex].question, prevIndex);
        }
      }

      // Track open event for newly opened item
      if (value) {
        const index = parseInt(value.replace("item-", ""));
        if (!isNaN(index) && faqs[index]) {
          trackFAQOpened(faqs[index].question, index);
        }
      }

      prevOpenItem.current = value;
      setOpenItem(value);
    },
    []
  );

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
          {mounted ? (
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={handleValueChange}
            >
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="space-y-2">
              {faqs.map((_, i) => (
                <div
                  key={i}
                  className="border border-zinc-200 dark:border-zinc-800 px-4 py-4"
                >
                  <Skeleton className="h-5 w-3/4 rounded-none" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
