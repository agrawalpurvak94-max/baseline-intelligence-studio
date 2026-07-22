import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
] as const;

export const CALENDLY_URL = "https://calendly.com/purvak/businessconsultation";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-xl bg-background/60 border-b border-white/5" : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md">
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-purple-soft to-purple-deep opacity-90" />
            <span className="absolute inset-[2px] rounded-[5px] bg-background" />
            <span className="relative text-[11px] font-semibold tracking-tight text-foreground">B</span>
          </span>
          <span className="text-sm font-medium tracking-tight">
            Baseline<span className="text-muted-foreground"> AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-[13px]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary text-[13px]">
            Book a Strategy Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="sr-only">Menu</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-[15px] text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary mt-3 justify-center">
              Book a Strategy Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
