import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

const roles = [
  {
    title: "AI Context Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "You've gone past the YouTube videos. You've read the papers on agent memory, context compression, retrieval-augmented generation. You know LLMs are only as good as what you feed them. Your job is figuring out how to feed them efficiently. What survives the context window? What gets retrieved? What gets summarized? These questions keep you up at night.",
    responsibilities: [
      "Design what goes into the context and what gets cut",
      "Build retrieval systems that surface the right information at the right time",
      "Compress conversations into machine-readable state without losing meaning",
      "Measure and optimize context quality across agent chains",
    ],
    openings: 1,
  },
  {
    title: "Junior AI Engineer",
    type: "Full-time",
    location: "Remote",
    description:
      "You don't have years of experience. That's fine. What matters: you work extremely hard, you learn fast, and you want this more than is probably healthy. You will become an expert in building, managing, and shipping agents. Build with agents. Build agents. Learn from agents.",
    responsibilities: [
      "Start shipping code immediately. Day one.",
      "Ask AI first, then ask humans.",
      "Build with agents, build agents, debug agents, repeat.",
      "Learn faster than you thought possible.",
    ],
    openings: 1,
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32">
        <Container>
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors mb-8"
            >
              <span>←</span>
              <span>Back to home</span>
            </Link>

            <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
              Careers
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-black dark:text-white mb-6">
              Idea to production.
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">
                As fast as possible.
              </span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Lean team. Unreasonably talented. We use what we build.
            </p>
            <blockquote className="mt-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 text-lg italic text-zinc-500 dark:text-zinc-400">
              "Ship production software while riding the metro."
            </blockquote>
          </div>

          {/* Roles */}
          <div className="space-y-8">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Open Roles
            </h2>

            <div className="space-y-6">
              {roles.map((role) => (
                <div
                  key={role.title}
                  className="group border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white transition-colors p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                        {role.title}
                        <span className="ml-2 text-sm font-mono text-zinc-400 dark:text-zinc-500">
                          ×{role.openings}
                        </span>
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <span>{role.type}</span>
                        <span className="text-zinc-300 dark:text-zinc-700">
                          /
                        </span>
                        <span>{role.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                    {role.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                      What you'll do
                    </h4>
                    <ul className="space-y-2">
                      {role.responsibilities.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-zinc-500 dark:text-zinc-400"
                        >
                          <span className="text-zinc-300 dark:text-zinc-600 mt-1">
                            +
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Apply */}
          <div className="mt-16 md:mt-24 border border-dashed border-zinc-300 dark:border-zinc-700 p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
              How to apply
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl">
              Email us. Tell us what you've built. Link your GitHub or
              whatever you have. We'll read it. If it's interesting, we'll
              reply.
            </p>
            <a
              href="mailto:life@myentourage.dev?subject=Job application"
              className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white px-6 py-3 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              <span>life@myentourage.dev</span>
              <span className="text-zinc-400 dark:text-zinc-600">→</span>
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
