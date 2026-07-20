import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Baseline AI" },
      { name: "description", content: "Selected work and system concepts engineered by Baseline AI." },
      { property: "og:title", content: "Work — Baseline AI" },
      { property: "og:description", content: "Selected client work and engineered system concepts." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="Work"
        title={<>Selected work. <span className="text-muted-foreground">Real business outcomes.</span></>}
        lead="A growing collection of client work and engineered system concepts."
      />
      <section className="container-x pb-32 grid gap-6 md:grid-cols-2">
        <Link to="/work/$slug" params={{ slug: "financial-intelligence-platform" }} className="card-dark block p-8">
          <div className="text-eyebrow">Case Study</div>
          <h2 className="text-display mt-3 text-2xl md:text-3xl">Financial Intelligence Platform</h2>
          <p className="mt-3 text-muted-foreground">From fragmented financial data to one intelligent system.</p>
          <div className="mt-6 text-sm text-purple-soft">Explore →</div>
        </Link>
        <div className="card-dark p-8 opacity-70">
          <div className="text-eyebrow">Case Study</div>
          <h2 className="text-display mt-3 text-2xl md:text-3xl">More work coming soon</h2>
          <p className="mt-3 text-muted-foreground">We're preparing additional case studies for publication.</p>
        </div>
      </section>
    </SiteLayout>
  ),
});