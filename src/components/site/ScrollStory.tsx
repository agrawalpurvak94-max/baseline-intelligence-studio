import { useEffect, useRef, useState, useMemo } from "react";

type Node = {
  id: number;
  label: string;
  chaos: { x: number; y: number };
  order: { x: number; y: number };
  ring: 0 | 1 | 2;
};

const LABELS = [
  "EMAIL", "DOCS", "CRM", "PEOPLE", "SYSTEMS", "CUSTOMERS",
  "FINANCE", "INBOX", "PDF", "TASKS", "DATA", "OPS",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

export function ScrollStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when top hits viewport top, 1 when bottom leaves viewport bottom
        const total = rect.height - vh;
        const scrolled = -rect.top;
        setProgress(clamp(scrolled / total));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const nodes: Node[] = useMemo(() => {
    const rand = seededRandom(7);
    return LABELS.map((label, i) => {
      // organized: three concentric rings
      const ring: 0 | 1 | 2 = i < 3 ? 0 : i < 8 ? 1 : 2;
      const perRing = ring === 0 ? 3 : ring === 1 ? 5 : 4;
      const idx = ring === 0 ? i : ring === 1 ? i - 3 : i - 8;
      const radius = ring === 0 ? 12 : ring === 1 ? 28 : 42;
      const angle = (idx / perRing) * Math.PI * 2 - Math.PI / 2;
      const order = {
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
      };
      return {
        id: i,
        label,
        chaos: {
          x: 10 + rand() * 80,
          y: 10 + rand() * 80,
        },
        order,
        ring,
      };
    });
  }, []);

  // Phase mapping
  // 0.00 - 0.20: intro / UNDERSTAND establishes
  // 0.20 - 0.45: UNDERSTAND
  // 0.45 - 0.72: DEPLOY (connections form)
  // 0.72 - 1.00: OPTIMISE (feedback + metrics)
  const understand = clamp((progress - 0.05) / 0.35);
  const deploy = clamp((progress - 0.4) / 0.3);
  const optimise = clamp((progress - 0.7) / 0.28);
  const organize = easeInOutCubic(clamp(understand * 0.4 + deploy * 0.9));

  const activePhase: "understand" | "deploy" | "optimise" =
    progress < 0.42 ? "understand" : progress < 0.72 ? "deploy" : "optimise";

  // Position lerp
  const positioned = nodes.map((n) => ({
    ...n,
    x: n.chaos.x + (n.order.x - n.chaos.x) * organize,
    y: n.chaos.y + (n.order.y - n.chaos.y) * organize,
  }));

  // Connections — only visible once deploy begins
  const connections: Array<[number, number]> = [
    [0, 3], [3, 4], [4, 5], [5, 1], [1, 6], [6, 7], [7, 2], [2, 8],
    [8, 9], [9, 10], [10, 11], [11, 0],
    [3, 7], [4, 9], [5, 10],
  ];

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: "420vh" }}
      aria-label="Understand, Deploy, Optimise"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ambient purple that intensifies with organization */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--purple) " +
              (10 + organize * 35) +
              "%, transparent), transparent 60%)",
            filter: "blur(40px)",
            opacity: 0.6 + organize * 0.4,
            transition: "opacity 400ms ease",
          }}
        />

        {/* Visualization */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* connections */}
            <defs>
              <linearGradient id="edge" x1="0" x2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {connections.map(([a, b], i) => {
              const na = positioned[a];
              const nb = positioned[b];
              const strength = clamp((deploy - i * 0.02) * 1.4);
              if (strength <= 0) return null;
              return (
                <line
                  key={i}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="url(#edge)"
                  strokeWidth={0.12 + strength * 0.15}
                  strokeOpacity={strength}
                  strokeDasharray={optimise > 0 ? "0.6 1.2" : "0"}
                  style={{
                    animation:
                      optimise > 0
                        ? `flow-dash ${6 + (i % 4)}s linear infinite`
                        : undefined,
                  }}
                />
              );
            })}

            {/* central intelligence core */}
            <circle
              cx="50"
              cy="50"
              r={2 + organize * 4}
              fill="url(#core)"
              opacity={0.25 + organize * 0.6}
            />
            <defs>
              <radialGradient id="core">
                <stop offset="0%" stopColor="#C4B5FD" stopOpacity="1" />
                <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Nodes as absolute-positioned labels */}
          {positioned.map((n) => {
            const active = organize > 0.6;
            return (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center transition-[opacity] duration-500"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  opacity: 0.55 + organize * 0.4,
                }}
              >
                <span
                  className="mx-auto block rounded-full"
                  style={{
                    width: 6 + organize * 3,
                    height: 6 + organize * 3,
                    background: active
                      ? "color-mix(in oklab, var(--purple-soft) 80%, white)"
                      : "rgba(255,255,255,0.6)",
                    boxShadow: active
                      ? "0 0 12px color-mix(in oklab, var(--purple) 80%, transparent)"
                      : "none",
                    transition: "background 400ms ease, box-shadow 400ms ease",
                  }}
                />
                <span
                  className="mt-1.5 block text-[9px] tracking-[0.22em] text-white/60"
                  style={{ opacity: 0.4 + organize * 0.5 }}
                >
                  {n.label}
                </span>
              </div>
            );
          })}

        </div>

        {/* Kinetic typography overlay */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container-x">
            <div className="max-w-xl">
              <PhaseText phase="understand" active={activePhase === "understand"} progress={understand}>
                <div className="text-eyebrow text-purple-soft">01 — Understand</div>
                <h2 className="text-display mt-4 text-5xl md:text-7xl">UNDERSTAND.</h2>
                <p className="mt-6 text-lg text-muted-foreground max-w-md">
                  Find the friction. Understand the workflow. Identify what actually needs to change.
                </p>
              </PhaseText>

              <PhaseText phase="deploy" active={activePhase === "deploy"} progress={deploy}>
                <div className="text-eyebrow text-purple-soft">02 — Deploy</div>
                <h2 className="text-display mt-4 text-5xl md:text-7xl">DEPLOY.</h2>
                <p className="mt-6 text-lg text-muted-foreground max-w-md">
                  Build the right system.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-display text-2xl md:text-3xl text-foreground/85">
                  <RevealWord show={deploy > 0.15}>Automation.</RevealWord>
                  <RevealWord show={deploy > 0.35}>AI.</RevealWord>
                  <RevealWord show={deploy > 0.55}>Software.</RevealWord>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Whatever the problem actually requires.
                </p>
              </PhaseText>

              <PhaseText phase="optimise" active={activePhase === "optimise"} progress={optimise}>
                <div className="text-eyebrow text-purple-soft">03 — Optimise</div>
                <h2 className="text-display mt-4 text-5xl md:text-7xl">OPTIMISE.</h2>
                <p className="mt-6 text-lg text-muted-foreground max-w-md">
                  Systems shouldn't just run.
                </p>
                <p
                  className="mt-4 text-display text-3xl md:text-5xl bg-gradient-to-r from-white to-purple-soft bg-clip-text text-transparent transition-opacity duration-700"
                  style={{ opacity: optimise > 0.35 ? 1 : 0 }}
                >
                  They should get better.
                </p>
                <p
                  className="mt-6 text-sm text-muted-foreground transition-opacity duration-700"
                  style={{ opacity: optimise > 0.55 ? 1 : 0 }}
                >
                  Measure. Learn. Improve. Repeat.
                </p>
              </PhaseText>
            </div>
          </div>
        </div>

        {/* Phase indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {(["understand", "deploy", "optimise"] as const).map((p) => (
            <span
              key={p}
              className="h-[2px] w-10 rounded-full transition-all duration-500"
              style={{
                background:
                  activePhase === p
                    ? "var(--purple)"
                    : "rgba(255,255,255,0.15)",
                boxShadow:
                  activePhase === p
                    ? "0 0 12px color-mix(in oklab, var(--purple) 70%, transparent)"
                    : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseText({
  active,
  progress,
  children,
}: {
  phase: "understand" | "deploy" | "optimise";
  active: boolean;
  progress: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active
          ? "translate3d(0,0,0)"
          : `translate3d(0, ${progress > 0 ? -20 : 20}px, 0)`,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

function RevealWord({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <span
      className="inline-block transition-all duration-500"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translate3d(0,0,0)" : "translate3d(0,10px,0)",
      }}
    >
      {children}
    </span>
  );
}

