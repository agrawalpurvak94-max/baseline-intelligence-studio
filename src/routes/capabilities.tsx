import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { pillars } from "@/data/pillars";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title: "Capabilities — Baseline AI" },
      { name: "description", content: "The five engineering pillars behind every solution we build: data engineering, AI engineering, AI operations and automation, custom software, and enterprise AI architecture and deployment." },
      { property: "og:title", content: "Capabilities — Baseline AI" },
      { property: "og:description", content: "Five pillars. One engineering discipline." },
      { property: "og:url", content: "/capabilities" },
    ],
    links: [{ rel: "canonical", href: "/capabilities" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="Capabilities"
        title={<>Five pillars. <span className="text-muted-foreground">One engineering discipline.</span></>}
        lead="Every solution we build rolls up into one of five pillars — the deeper capability and the evidence standard behind it."
      />
      <section className="container-x pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.slug} delay={i * 40}>
              <Link to="/capabilities/$slug" params={{ slug: p.slug }} className="card-dark block p-8 h-full group">
                <div className="text-eyebrow">{p.eyebrow}</div>
                <h2 className="text-display mt-3 text-2xl md:text-3xl">{p.name}</h2>
                <p className="mt-3 text-muted-foreground">{p.tagline}</p>
                <p className="mt-4 text-sm text-foreground/80 line-clamp-3">{p.lead}</p>
                <div className="mt-6 text-sm text-purple-soft group-hover:text-white transition-colors">Explore →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  ),
});
