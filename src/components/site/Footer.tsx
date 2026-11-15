import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md">
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-purple-soft to-purple-deep opacity-90" />
              <span className="absolute inset-[2px] rounded-[5px] bg-background" />
              <span className="relative text-[11px] font-semibold">B</span>
            </span>
            <span className="text-sm font-medium">Baseline AI</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            AI Engineering & Automation Studio. From manual work to intelligent systems.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">A Leadryze company.</p>
        </div>
        <div>
          <div className="text-eyebrow mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/industries" className="text-muted-foreground hover:text-foreground">Industries</Link></li>
            <li><Link to="/capabilities" className="text-muted-foreground hover:text-foreground">Capabilities</Link></li>
            <li><Link to="/work" className="text-muted-foreground hover:text-foreground">Work</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            <li><Link to="/insights" className="text-muted-foreground hover:text-foreground">Insights</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-eyebrow mb-4">Elsewhere</div>
          <ul className="space-y-2 text-sm">
            <li><a className="text-muted-foreground hover:text-foreground" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="text-muted-foreground hover:text-foreground" href="#">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="container-x pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="text-display text-2xl md:text-4xl max-w-2xl text-foreground/80">
          From complexity to intelligence.
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Baseline AI. All rights reserved.</p>
      </div>
    </footer>
  );
}