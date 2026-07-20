import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { solutions } from "@/data/solutions";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions — Baseline AI" },
      { name: "description", content: "Automation, AI and custom software solutions for finance, customer, document and revenue operations." },
      { property: "og:title", content: "Solutions — Baseline AI" },
      { property: "og:description", content: "Real problems. Intelligent systems." },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title={<>Real problems. <span className="text-muted-foreground">Intelligent systems.</span></>}
        lead="Capabilities and outcome-shaped solutions we design and build for businesses with real operational complexity."
      />
      <section className="container-x pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 40}>
              <Link to="/solutions/$slug" params={{ slug: s.slug }} className="card-dark block p-8 h-full group">
                <div className="text-eyebrow">{s.eyebrow}</div>
                <h2 className="text-display mt-3 text-2xl md:text-3xl">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.tagline}</p>
                <div className="mt-6 text-sm text-purple-soft group-hover:text-white transition-colors">Explore →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  ),
});