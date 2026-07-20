export function StarField({ density = 60 }: { density?: number }) {
  const stars = Array.from({ length: density }, (_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 1.6 + 0.4;
    const opacity = Math.random() * 0.6 + 0.15;
    const delay = Math.random() * 6;
    return (
      <span
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: size,
          height: size,
          opacity,
          animation: `particle-drift ${6 + Math.random() * 6}s ease-in-out ${delay}s infinite`,
        }}
      />
    );
  });
  return <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">{stars}</div>;
}

export function PurpleAurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--purple) 45%, transparent), transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse-glow 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-1/4 top-3/4 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--purple-deep) 55%, transparent), transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}