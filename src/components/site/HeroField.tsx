import { useEffect, useRef } from "react";

/**
 * Cinematic background: dozens of subtle particles that begin in disorder
 * and slowly organize as time progresses and as the user scrolls.
 */
export function HeroField({ count = 90 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * 0.9)),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      tx: number;
      ty: number;
      r: number;
      hue: number;
    };

    const particles: P[] = Array.from({ length: count }, (_, i) => {
      // organized target = point along a soft double-helix / lattice around center
      const angle = (i / count) * Math.PI * 6;
      const radius = 120 + (i % 5) * 40;
      const tx = width / 2 + Math.cos(angle) * radius;
      const ty = height / 2 + Math.sin(angle * 0.6) * radius * 0.55;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        tx,
        ty,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() * 30 + 265,
      };
    });

    let raf = 0;
    let t = 0;

    const tick = () => {
      t += 1;
      // organization progress: slow time-based drift + scroll-driven acceleration
      const timeOrg = Math.min(1, t / 1800);
      const scrollOrg = scrollRef.current;
      const org = Math.min(1, timeOrg * 0.5 + scrollOrg * 0.9);

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // steer toward target
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        p.vx += dx * 0.0006 * org;
        p.vy += dy * 0.0006 * org;
        // damping
        p.vx *= 0.96;
        p.vy *= 0.96;
        // small ambient jitter
        p.vx += (Math.random() - 0.5) * 0.05 * (1 - org * 0.7);
        p.vy += (Math.random() - 0.5) * 0.05 * (1 - org * 0.7);
        p.x += p.vx;
        p.y += p.vy;

        const brightness = 0.35 + org * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + org * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, ${70 - org * 15}%, ${brightness})`;
        ctx.fill();
      }

      // draw a few connections once organized
      if (org > 0.35) {
        const linkOpacity = (org - 0.35) * 0.9;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i += 3) {
          const a = particles[i];
          const b = particles[(i + 5) % particles.length];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 180) {
            ctx.strokeStyle = `hsla(275, 90%, 70%, ${linkOpacity * (1 - d / 180) * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (!reduced) raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}