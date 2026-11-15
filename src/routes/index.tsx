import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PurpleAurora } from "@/components/site/Background";
import { HeroField } from "@/components/site/HeroField";
import { ScrollStory } from "@/components/site/ScrollStory";
import { Reveal } from "@/components/site/Reveal";
import { CALENDLY_URL } from "@/components/site/Nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Baseline AI — From complexity to intelligence" },
      { name: "description", content: "Baseline AI by Leadryze is an enterprise AI engineering, data engineering and intelligent operations partner for manufacturers, pharmaceutical plants and automotive suppliers." },
      { property: "og:title", content: "Baseline AI — From complexity to intelligence" },
      { property: "og:description", content: "We design and deploy the AI-native systems manufacturers, pharmaceutical plants and automotive suppliers run their operations on." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <ScrollStory />
      <SelectedWork />
      <Founder />
      <FinalCTA />
    </SiteLayout>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <PurpleAurora className="opacity-70" />
      <HeroField />
      <div className="container-x relative z-10 flex min-h-[100svh] flex-col items-center justify-center text-center">
        <Reveal>
          <div className="text-eyebrow">Baseline AI — Engineering &amp; Automation Studio</div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="text-hero mt-8 max-w-6xl text-balance">
            FROM COMPLEXITY
            <br />
            <span className="bg-gradient-to-b from-white via-white to-purple-soft/70 bg-clip-text text-transparent">
              TO INTELLIGENCE.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 max-w-xl text-balance text-base md:text-lg text-muted-foreground">
            We build the data engineering, AI engineering and intelligent automation that manufacturers, pharmaceutical plants and automotive suppliers run their operations on.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Book a Strategy Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
            </a>
            <button
              onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 text-xs tracking-[0.28em] text-white/50 hover:text-white/90 transition-colors"
            >
              SEE HOW WE WORK
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-y-0.5"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SELECTED WORK ---------------- */
function SelectedWork() {
  const proof = [
    { m: "17,061 FORMULAS", l: "Reverse-engineered into one deterministic engine" },
    { m: "858 TESTS", l: "Backing the calculation engine, automated" },
    { m: "18 OF 29 COLUMNS", l: "Reconciled exactly against the customer's own workbook" },
  ];
  return (
    <section className="relative py-32 md:py-48 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--purple-deep) 32%, transparent), transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>
      <div className="container-x relative">
        <Reveal>
          <div className="text-eyebrow">Selected Work</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-display mt-6 text-5xl md:text-7xl max-w-4xl">
            A SPREADSHEET
            <br />
            <span className="text-muted-foreground">BECOMES AN ENGINE.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <Reveal delay={140}>
              <div className="text-eyebrow">Manufacturing Intelligence Platform</div>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                A pharmaceutical manufacturer's month-end reporting ran on a 25-tab workbook
                no one could fully audit. We reverse-engineered it into a deterministic SQL
                Server engine — every rule traced, every number reconciled.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <Link
                to="/work"
                className="mt-10 inline-flex items-center gap-2 text-sm text-purple-soft hover:text-white transition-colors"
              >
                View the Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-3">
            {proof.map((p, i) => (
              <Reveal key={p.m} delay={200 + i * 80}>
                <div className="card-dark p-6 flex items-baseline justify-between gap-6">
                  <div className="text-display text-2xl md:text-3xl bg-gradient-to-r from-white to-purple-soft bg-clip-text text-transparent">
                    {p.m}
                  </div>
                  <div className="text-sm text-muted-foreground text-right max-w-[14rem]">
                    {p.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOUNDER ---------------- */
function Founder() {
  return (
    <section className="relative py-32 md:py-48 border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-display text-5xl md:text-7xl max-w-4xl">
            BUSINESS THINKING.
            <br />
            <span className="text-muted-foreground">TECHNOLOGY EXECUTION.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-[auto_1fr] items-start">
          <Reveal delay={120}>
            <div className="relative">
              <div className="h-56 w-56 rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-purple-deep/30 to-black">
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, color-mix(in oklab, var(--purple-soft) 45%, transparent), transparent 55%), radial-gradient(circle at 70% 80%, color-mix(in oklab, var(--purple-deep) 60%, transparent), transparent 55%)",
                  }}
                />
              </div>
              <div
                className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, var(--purple) 30%, transparent), transparent)",
                  filter: "blur(30px)",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="max-w-xl">
              <p className="text-display text-2xl md:text-3xl text-foreground/90 leading-snug">
                Baseline AI was founded on a simple belief:
                <br />
                <span className="text-muted-foreground">
                  Technology should adapt to how a business needs to work — not the other way around.
                </span>
              </p>
              <div className="mt-10">
                <div className="text-sm font-medium text-foreground">Founder</div>
                <div className="mt-1 text-sm text-muted-foreground">Founder, Baseline AI</div>
              </div>
              <p className="mt-8 text-sm text-muted-foreground max-w-md">
                Professional experience across leading global technology environments,
                including Google and Microsoft.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-40 md:py-56 overflow-hidden border-t border-white/5"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--purple) 35%, transparent), transparent 60%)`,
        }}
      />
      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="text-display text-5xl md:text-7xl lg:text-8xl max-w-5xl mx-auto">
            WHAT COULD YOUR
            <br />
            <span className="bg-gradient-to-b from-white to-purple-soft bg-clip-text text-transparent">
              BUSINESS DO BETTER?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-10 text-display text-2xl md:text-4xl text-muted-foreground">
            Let's find out.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-14">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary text-base">
              Book a Strategy Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

