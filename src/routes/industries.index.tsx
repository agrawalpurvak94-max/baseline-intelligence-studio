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
  component: () => {
    const featured = industries.filter((ind) => ind.featured);
    const others = industries.filter((ind) => !ind.featured);
    return (
      <SiteLayout>
        <PageHero
          eyebrow="Industries"
          title={<>Built for businesses <span className="text-muted-foreground">where operations get complex.</span></>}
          lead="Every industry works differently. We combine domain understanding with AI, automation and software engineering to redesign workflows around how your business actually operates."
        />

        <section className="container-x pb-20">
          <Reveal>
            <div className="text-eyebrow">Where we focus</div>
            <h2 className="text-display mt-4 text-3xl md:text-5xl max-w-3xl">
              Enterprise manufacturing, pharma, automotive and OEM supply —
              <span className="text-muted-foreground"> that's the depth we build for.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 60}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: ind.slug }}
                  className="card-dark purple-glow block p-8 h-full"
                >
                  <div className="text-eyebrow text-purple-soft">Featured</div>
                  <h3 className="text-display mt-4 text-2xl md:text-3xl">{ind.name}</h3>
                  <p className="mt-4 text-sm text-muted-foreground">{ind.lead}</p>
                  {ind.pov ? (
                    <p className="mt-5 text-sm text-foreground/80 border-l border-purple/40 pl-4">
                      {ind.pov.different}
                    </p>
                  ) : null}
                  <div className="mt-6 text-sm text-purple-soft">Explore →</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="container-x pb-32 border-t border-white/5 pt-16">
          <div className="text-eyebrow">Also serving</div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {others.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 40}>
                <Link to="/industries/$slug" params={{ slug: ind.slug }} className="card-dark block p-6 h-full">
                  <h3 className="text-display text-xl">{ind.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{ind.lead}</p>
                  <div className="mt-5 text-sm text-purple-soft">Explore →</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </SiteLayout>
    );
  },
});
