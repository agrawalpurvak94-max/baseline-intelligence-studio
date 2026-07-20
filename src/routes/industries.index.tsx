import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { industries } from "@/data/industries";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — Baseline AI" },
      { name: "description", content: "AI, automation and custom software tailored to the way your industry actually works." },
      { property: "og:title", content: "Industries — Baseline AI" },
      { property: "og:description", content: "Built for businesses where operations get complex." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="Industries"
        title={<>Built for businesses <span className="text-muted-foreground">where operations get complex.</span></>}
        lead="Every industry works differently. We combine domain understanding with AI, automation and software engineering to redesign workflows around how your business actually operates."
      />
      <section className="container-x pb-32">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 40}>
              <Link to="/industries/$slug" params={{ slug: ind.slug }} className="card-dark block p-6 h-full">
                <h2 className="text-display text-xl">{ind.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{ind.lead}</p>
                <div className="mt-5 text-sm text-purple-soft">Explore →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  ),
});