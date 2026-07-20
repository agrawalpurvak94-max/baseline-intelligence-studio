const SOURCES = ["EMAIL", "DOCUMENTS", "CRM", "FINANCE", "CUSTOMERS", "OPERATIONS"];
const OUTCOMES = ["AUTOMATION", "INSIGHTS", "ACTIONS"];

export function IntelligenceCore() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative aspect-square w-[min(92vw,820px)]">
        <div className="absolute inset-0 rounded-full border border-white/5" />
        <div className="absolute inset-[8%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[18%] rounded-full border border-white/[0.05]" />
        <div className="absolute inset-[6%] rounded-full border border-dashed border-purple/20"
             style={{ animation: "orbit-slow 60s linear infinite" }} />
        <div className="absolute inset-[20%] rounded-full border border-dashed border-purple/10"
             style={{ animation: "orbit-reverse 90s linear infinite" }} />
        <div className="absolute inset-[36%] rounded-full"
             style={{
               background:
                 "radial-gradient(closest-side, color-mix(in oklab, var(--purple) 70%, white 5%), color-mix(in oklab, var(--purple-deep) 90%, transparent) 60%, transparent 75%)",
               filter: "blur(2px)",
               animation: "pulse-glow 6s ease-in-out infinite",
             }} />
        <div className="absolute inset-[42%] rounded-full border border-white/20 backdrop-blur-sm"
             style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--purple-soft) 40%, transparent), transparent)" }} />

        {SOURCES.map((label, i) => {
          const angle = (i / SOURCES.length) * 2 * Math.PI - Math.PI / 2;
          const r = 46;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <div key={label} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="text-eyebrow whitespace-nowrap text-[10px] text-white/60">{label}</span>
              <span className="mx-auto mt-1 block h-1.5 w-1.5 rounded-full bg-white/70" />
            </div>
          );
        })}

        {OUTCOMES.map((label, i) => {
          const angle = (i / OUTCOMES.length) * 2 * Math.PI + Math.PI / 6;
          const r = 58;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <div key={label}
                 className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple/40 bg-background/50 px-2.5 py-1 backdrop-blur-md purple-glow"
                 style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="text-[10px] font-medium tracking-[0.16em] text-white/85">{label}</span>
            </div>
          );
        })}

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {SOURCES.map((_, i) => {
            const angle = (i / SOURCES.length) * 2 * Math.PI - Math.PI / 2;
            const r = 46;
            const x = 50 + r * Math.cos(angle);
            const y = 50 + r * Math.sin(angle);
            return (
              <line key={i} x1={x} y1={y} x2={50} y2={50}
                    stroke="url(#flowGrad)" strokeWidth="0.15"
                    strokeDasharray="1.2 3"
                    style={{ animation: `flow-dash ${8 + i}s linear infinite` }} />
            );
          })}
          <defs>
            <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}