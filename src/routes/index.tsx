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
      { name: "description", content: "Baseline AI is an AI engineering and automation studio. We design and deploy intelligent systems that transform how businesses operate." },
      { property: "og:title", content: "Baseline AI — From complexity to intelligence" },
      { property: "og:description", content: "We design and deploy intelligent systems that transform how businesses operate." },
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
            We design and deploy intelligent systems that transform how businesses operate.
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
    { m: "25+ HOURS", l: "Saved monthly" },
    { m: "AUTOMATED", l: "Financial intelligence" },
    { m: "SURFACED", l: "Previously hidden charge leakage" },
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
            25+ HOURS
            <br />
            <span className="text-muted-foreground">GIVEN BACK.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <Reveal delay={140}>
              <div className="text-eyebrow">Financial Intelligence System</div>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                We transformed fragmented financial data across inboxes, statements and
                transactions into one intelligent system — automating financial organization
                and surfacing previously hidden bank-charge leakage.
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

/* ----------------------------- 1. HERO ----------------------------- */
function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24">
      <StarField density={80} />
      <PurpleAurora />
      <IntelligenceCore />
      <div className="container-x relative z-10 flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center text-center">
        <Reveal>
          <div className="text-eyebrow">AI Engineering & Automation Studio</div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="text-hero mt-6 max-w-5xl text-balance">
            From manual work<br />
            <span className="bg-gradient-to-b from-white via-white to-purple-soft/70 bg-clip-text text-transparent">
              to intelligent systems.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 max-w-2xl text-balance text-base md:text-lg text-muted-foreground">
            Baseline AI finds the work slowing your business down — then builds the automation,
            AI and custom software to eliminate it.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Book a Strategy Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <Link to="/solutions" className="btn-ghost">Explore What We Build</Link>
          </div>
        </Reveal>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white/40">
        SCROLL
      </div>
    </section>
  );
}

/* -------------------- CREDIBILITY STRIP -------------------- */
function CredibilityStrip() {
  return (
    <section className="relative border-y border-white/5 py-14">
      <div className="container-x">
        <Reveal>
          <p className="text-eyebrow text-center">Built at the intersection of</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6 flex items-center justify-center gap-6 md:gap-14 text-2xl md:text-4xl text-display text-foreground/80">
            <span>Business</span>
            <span className="text-purple">×</span>
            <span>AI</span>
            <span className="text-purple">×</span>
            <span>Engineering</span>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Experience shaped across leading global technology environments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- 2. PROBLEM -------------------- */
function ProblemSection() {
  const sources = ["Email", "Excel", "CRM", "PDFs", "ERP", "WhatsApp", "Accounting"];
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="container-x relative">
        <Reveal>
          <h2 className="text-display text-4xl md:text-6xl max-w-4xl">
            Your business doesn't need more software.<br />
            <span className="text-muted-foreground">It needs less friction.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-4xl">
            <div className="text-muted-foreground text-lg leading-relaxed space-y-2">
              <p>Manual handoffs.</p>
              <p>Disconnected systems.</p>
              <p>Endless spreadsheets.</p>
              <p>Repetitive emails.</p>
              <p>Documents moving between people.</p>
              <p>Teams doing work software should be doing.</p>
            </div>
            <div className="flex items-end">
              <p className="text-display text-2xl md:text-3xl text-foreground">
                That is where we start.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-20 rounded-3xl hairline surface-1 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(closest-side,black,transparent)]" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto_1fr] items-center">
              <div>
                <p className="text-eyebrow">Before</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {sources.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Disconnected. People move information between them.</p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                  <path d="M2 12h70M60 4l14 8-14 8" stroke="url(#gr)" strokeWidth="1.5" />
                  <defs><linearGradient id="gr" x1="0" x2="1"><stop stopColor="white" stopOpacity=".3"/><stop offset="1" stopColor="#A855F7"/></linearGradient></defs>
                </svg>
              </div>
              <div>
                <p className="text-eyebrow">After</p>
                <div className="mt-4 rounded-2xl border border-purple/30 bg-purple/5 p-4 purple-glow">
                  <p className="text-sm text-foreground/90">One connected operational system.</p>
                  <p className="mt-2 text-xs text-muted-foreground">Information flows automatically. Humans handle exceptions.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-14 text-display text-2xl md:text-4xl max-w-3xl text-foreground/80">
            We redesign the workflow. <br />
            <span className="text-foreground">Then build the technology around it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- 3. CAPABILITIES -------------------- */
function CapabilitiesSection() {
  const caps = [
    {
      no: "01",
      title: "Intelligent Automation",
      copy: "Eliminate repetitive work and connect the systems your business already depends on.",
      items: ["Workflow Automation", "Finance Operations", "Email & Document Processing", "CRM Automation", "Back-Office Automation", "Cross-System Integrations"],
      flow: ["Trigger", "Understand", "Decide", "Execute", "Update"],
      slug: "intelligent-automation",
    },
    {
      no: "02",
      title: "AI & Agentic Systems",
      copy: "Intelligent systems that understand context, make decisions and take action across real business workflows.",
      items: ["AI Agents", "Voice Agents", "Document Intelligence", "Knowledge Systems", "AI Decision Support", "Agentic Workflows"],
      flow: ["Input", "Reason", "Tools", "Act", "Return"],
      slug: "ai-agentic-systems",
    },
    {
      no: "03",
      title: "Custom Software",
      copy: "When off-the-shelf software doesn't fit the way your business works, we build what does.",
      items: ["AI-Native Applications", "Internal Tools", "Operations Dashboards", "Client Portals", "Workflow Applications", "Custom Business Systems"],
      flow: ["Data", "Workflow", "AI", "UI", "API"],
      slug: "custom-software",
    },
  ];
  return (
    <section className="relative py-28 md:py-40 border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-display text-4xl md:text-6xl max-w-4xl">
            We build the systems<br />
            <span className="text-muted-foreground">your business actually needs.</span>
          </h2>
        </Reveal>

        <div className="mt-20 space-y-8">
          {caps.map((c, i) => (
            <Reveal key={c.no} delay={i * 80}>
              <article className="card-dark relative overflow-hidden grid md:grid-cols-[1fr_1.1fr] gap-10 p-8 md:p-12">
                <div>
                  <div className="text-eyebrow">{c.no} — Capability</div>
                  <h3 className="text-display mt-3 text-3xl md:text-5xl">{c.title}</h3>
                  <p className="mt-5 max-w-md text-muted-foreground">{c.copy}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/80">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-purple" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Link to="/solutions/$slug" params={{ slug: c.slug }} className="mt-8 inline-flex items-center gap-1.5 text-sm text-purple-soft hover:text-white transition-colors">
                    Explore →
                  </Link>
                </div>
                <div className="relative min-h-[260px] rounded-2xl border border-white/5 bg-black/40 overflow-hidden">
                  <div className="absolute inset-0 grid-lines opacity-30 [mask-image:radial-gradient(closest-side,black,transparent)]" />
                  <FlowViz steps={c.flow} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowViz({ steps }: { steps: string[] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-8">
      <div className="flex w-full items-center gap-2 md:gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2 md:gap-3">
            <div className="flex-1">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2 md:px-3 py-2 text-center text-[10px] md:text-xs font-medium text-white/85">
                {s}
              </div>
            </div>
            {i < steps.length - 1 && (
              <svg width="20" height="8" viewBox="0 0 20 8" className="shrink-0">
                <path d="M0 4h18M14 1l4 3-4 3" stroke="url(#f)" strokeWidth="1" fill="none" />
                <defs><linearGradient id="f" x1="0" x2="1"><stop stopColor="white" stopOpacity=".2"/><stop offset="1" stopColor="#A855F7"/></linearGradient></defs>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- 4. METHODOLOGY -------------------- */
function MethodologySection() {
  const steps = [
    { name: "Discover", detail: "Understand the workflow." },
    { name: "Design", detail: "Redesign how the work should happen." },
    { name: "Build", detail: "Apply automation, AI or custom software." },
    { name: "Deploy", detail: "Integrate into real operations." },
    { name: "Improve", detail: "Measure, learn and continuously optimize." },
  ];
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="container-x">
        <Reveal>
          <p className="text-display text-3xl md:text-5xl text-muted-foreground/60 line-through decoration-purple/60">
            "We need AI."
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display mt-6 text-4xl md:text-6xl max-w-4xl">
            We don't start with AI.<br />
            <span className="bg-gradient-to-r from-white to-purple-soft bg-clip-text text-transparent">
              We start with the business problem.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            "What is actually slowing the business down?" — that's the first question.
            Then we choose the right technology to remove it.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <div className="card-dark p-6 h-full">
                <div className="flex items-center gap-3">
                  <span className="text-eyebrow text-purple-soft">0{i + 1}</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="text-display mt-4 text-2xl">{s.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- 5. SOLUTIONS GRID -------------------- */
function SolutionsGrid() {
  const featured = solutions.filter((s) => ["finance-operations","customer-operations","sales-revenue","document-intelligence"].includes(s.slug));
  return (
    <section className="relative py-28 md:py-40 border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-display text-4xl md:text-6xl max-w-4xl">
            Real problems.<br />
            <span className="text-muted-foreground">Intelligent systems.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link to="/solutions/$slug" params={{ slug: s.slug }} className="card-dark block p-8 h-full group">
                <div className="text-eyebrow">{s.eyebrow}</div>
                <h3 className="text-display mt-3 text-2xl md:text-3xl">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.tagline}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.capabilities.slice(0, 4).map((c) => (
                    <li key={c} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-foreground/70">{c}</li>
                  ))}
                </ul>
                <div className="mt-6 text-sm text-purple-soft group-hover:text-white transition-colors">Explore →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- 6. CASE STUDY -------------------- */
function CaseStudySection() {
  const arch = ["Multiple Inboxes","Bank Alerts + Statements","Intelligent Extraction","Normalization","Deduplication","Categorization","Financial Database","Intelligence Dashboard"];
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
             style={{ background:"radial-gradient(closest-side, color-mix(in oklab, var(--purple-deep) 35%, transparent), transparent 70%)", filter:"blur(80px)"}} />
      </div>
      <div className="container-x relative">
        <Reveal>
          <div className="text-eyebrow">Case Study</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-display mt-4 text-4xl md:text-6xl max-w-4xl">
            From financial chaos<br />
            <span className="text-muted-foreground">to one intelligent system.</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Financial data was fragmented across bank alerts, statements, inboxes and accounts.
            Manual tracking consumed significant time and made it difficult to identify anomalies,
            categorize spending and maintain a unified financial view.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { m: "25+", l: "Hours of manual work saved monthly" },
            { m: "Bank charge leakage", l: "Automatically surfaced through financial intelligence" },
            { m: "Unified visibility", l: "Across fragmented financial activity" },
          ].map((k, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="card-dark p-6 h-full">
                <div className="text-display text-3xl md:text-4xl bg-gradient-to-b from-white to-purple-soft bg-clip-text text-transparent">
                  {k.m}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{k.l}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 rounded-3xl hairline surface-1 p-6 md:p-10 relative overflow-hidden">
            <div className="text-eyebrow mb-6">Architecture</div>
            <ol className="grid gap-3 md:grid-cols-4">
              {arch.map((a, i) => (
                <li key={a} className="relative rounded-xl border border-white/10 bg-black/40 p-4">
                  <div className="text-[10px] text-muted-foreground">Step {i + 1}</div>
                  <div className="mt-1 text-sm font-medium text-foreground/90">{a}</div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="mt-10">
          <Link to="/work/$slug" params={{ slug: "financial-intelligence-platform" }} className="btn-ghost">
            Explore the case study →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------- 7. SYSTEMS DEMOS -------------------- */
function SystemsDemos() {
  const demos = [
    { title: "AI Voice Agent", steps: ["Incoming Call","AI Answers","Understands Intent","Qualifies","Books Appointment","Updates CRM","Follow-Up"], outcome: "Never let a valuable customer call disappear into voicemail." },
    { title: "Invoice Intelligence", steps: ["Email / PDF","AI Extracts","Validates","Matches Records","Routes Approval","Updates Finance","Flags Exceptions"], outcome: "Turn invoice processing into an intelligent workflow." },
    { title: "Client Follow-Up", steps: ["Lead Action","Understand Context","Determine Next Action","Personalised Follow-Up","Track Response","Escalate"], outcome: "Make sure important opportunities don't disappear because someone forgot to follow up." },
    { title: "Document Intelligence", steps: ["Docs Arrive","Classify","Extract","Validate","Route","Update Systems"], outcome: "Structured, routed and actionable — from any channel, any format." },
  ];
  return (
    <section className="relative py-28 md:py-40 border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-display text-4xl md:text-6xl max-w-4xl">
            Systems built for<br />
            <span className="text-muted-foreground">real business work.</span>
          </h2>
        </Reveal>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">
          Solution concepts we've engineered and can adapt to your business. Not client case studies.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {demos.map((d, i) => (
            <Reveal key={d.title} delay={i * 60}>
              <div className="card-dark p-8 h-full">
                <h3 className="text-display text-2xl">{d.title}</h3>
                <ol className="mt-6 space-y-2">
                  {d.steps.map((s, idx) => (
                    <li key={s} className="flex items-center gap-3 text-sm text-foreground/85">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-purple/40 text-[10px] text-purple-soft">
                        {idx + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
                <p className="mt-6 border-t border-white/5 pt-4 text-sm text-muted-foreground">{d.outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- 8. INDUSTRIES -------------------- */
function IndustriesSection() {
  return (
    <section className="relative py-28 md:py-40 border-t border-white/5">
      <div className="container-x">
        <Reveal>
          <h2 className="text-display text-4xl md:text-6xl max-w-4xl">
            Built for businesses<br />
            <span className="text-muted-foreground">where operations get complex.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Every industry works differently. We combine domain understanding with AI, automation
            and software engineering to redesign workflows around how your business actually operates.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 40}>
              <Link to="/industries/$slug" params={{ slug: ind.slug }} className="card-dark block p-6 h-full group">
                <div className="flex items-start justify-between">
                  <h3 className="text-display text-xl">{ind.name}</h3>
                  <span className="text-purple-soft opacity-60 group-hover:opacity-100 transition">↗</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{ind.lead}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {ind.opportunities.slice(0, 3).map((o) => (
                    <li key={o} className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-foreground/70">
                      {o}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- 10. WHY BASELINE -------------------- */
function WhyBaseline() {
  const cols = [
    { t: "Traditional Software Agency", items: ["Starts with requirements", "Builds what was requested", "Hands over software"] },
    { t: "Automation Freelancer", items: ["Starts with a tool", "Automates individual tasks", "Limited strategic context"] },
    { t: "SaaS Software", items: ["You adapt to the software", "Generic workflows", "Limited customization"] },
    { t: "Baseline AI", highlight: true, items: ["Starts with the business problem", "Redesigns the workflow", "Chooses the right technology", "Builds around your operations", "Integrates and improves"] },
  ];
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="container-x">
        <Reveal>
          <h2 className="text-display text-4xl md:text-6xl max-w-4xl">
            Business first.<br />
            <span className="text-muted-foreground">Technology where it matters.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {cols.map((c, i) => (
            <Reveal key={c.t} delay={i * 60}>
              <div className={[
                "p-6 h-full rounded-2xl border",
                c.highlight ? "border-purple/40 bg-purple/5 purple-glow" : "border-white/10 bg-white/[0.02]",
              ].join(" ")}>
                <h3 className={["text-sm font-medium", c.highlight ? "text-white" : "text-muted-foreground"].join(" ")}>{c.t}</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                  {c.items.map((it) => <li key={it} className="flex gap-2"><span className={c.highlight ? "text-purple-soft" : "text-white/30"}>—</span>{it}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 max-w-3xl">
            <p className="text-display text-3xl md:text-5xl">
              The right solution isn't always AI.
            </p>
            <p className="mt-4 text-muted-foreground text-lg">
              Sometimes it's automation. Sometimes it's software. Sometimes it's all three.
              Our job is to know the difference.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- 11. FOUNDER -------------------- */
function FounderSection() {
  return (
    <section className="relative py-28 md:py-40 border-t border-white/5">
      <div className="container-x grid gap-14 md:grid-cols-[1fr_1.2fr] items-center">
        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-deep/40 via-black to-black">
            <div className="absolute inset-0 grid-lines opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-display text-[9rem] text-white/10">B</div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-eyebrow">Founder</div>
              <div className="mt-1 text-lg font-medium">[Founder Name]</div>
              <div className="text-sm text-muted-foreground">Founder — Baseline AI</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <h2 className="text-display text-4xl md:text-5xl max-w-2xl">
              Built at the intersection of business and technology.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground max-w-xl">
              <p>
                Baseline AI was created around a simple observation: businesses don't struggle
                because they lack AI tools. They struggle because their systems, processes and
                information don't work together.
              </p>
              <p>
                The founder brings experience spanning business strategy, enterprise technology,
                AI and digital transformation, with professional experience across leading global
                technology environments.
              </p>
              <p className="text-foreground">
                Understand the business first. Then engineer the right solution.
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="btn-ghost">Connect on LinkedIn</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- 12. FINAL CTA -------------------- */
function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <PurpleAurora className="opacity-80" />
      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="text-display text-4xl md:text-7xl max-w-5xl mx-auto text-balance">
            What's the work<br />
            your business shouldn't<br />
            <span className="bg-gradient-to-r from-white via-white to-purple-soft bg-clip-text text-transparent">
              still be doing manually?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 max-w-2xl mx-auto text-muted-foreground text-lg">
            Show us the bottleneck. We'll help you determine what should be automated,
            where AI actually makes sense, and what needs to be built.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Book a Strategy Call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <Link to="/solutions" className="btn-ghost">Explore Solutions</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
