import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CALENDLY_URL } from "@/components/site/Nav";
import { solutionBySlug, solutions, type Solution } from "@/data/solutions";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const s = solutionBySlug(params.slug);
    if (!s) throw notFound();
    return { s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Baseline AI" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.s;
    return {
      meta: [
        { title: `${s.title} — Baseline AI` },
        { name: "description", content: s.tagline },
        { property: "og:title", content: `${s.title} — Baseline AI` },
        { property: "og:description", content: s.tagline },
        { property: "og:url", content: `/solutions/${s.slug}` },
      ],
      links: [{ rel: "canonical", href: `/solutions/${s.slug}` }],
    };
  },
  component: SolutionPage,
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero eyebrow="Solution" title="Solution not found" lead="This solution doesn't exist yet." />
    </SiteLayout>
  ),
});

function SolutionPage() {
  const { s } = Route.useLoaderData() as { s: Solution };
  const others = solutions.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <SiteLayout>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.title}
        lead={s.tagline}
      >
        <div className="mt-10 flex gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          <Link to="/solutions" className="btn-ghost">All solutions</Link>
        </div>
      </PageHero>

      <section className="container-x py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-14">
          <Reveal>
            <div>
              <div className="text-eyebrow">Overview</div>
              <p className="mt-4 text-lg text-foreground/90">{s.lead}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-dark p-6">
              <div className="text-eyebrow">Capabilities</div>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/85">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-purple" />{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <h2 className="text-display text-3xl md:text-5xl max-w-3xl">How the workflow runs</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {s.workflow.map((w, i) => (
            <Reveal key={w.step} delay={i * 60}>
              <div className="card-dark p-5 h-full">
                <div className="text-eyebrow text-purple-soft">0{i + 1}</div>
                <div className="mt-3 text-display text-xl">{w.step}</div>
                <p className="mt-2 text-sm text-muted-foreground">{w.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <h2 className="text-display text-3xl md:text-5xl max-w-3xl">Outcomes we design for</h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {s.outcomes.map((o, i) => (
            <Reveal key={o} delay={i * 60}>
              <li className="card-dark p-6 text-foreground/90">{o}</li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-x py-20 border-t border-white/5">
        <div className="text-eyebrow">More solutions</div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to="/solutions/$slug" params={{ slug: o.slug }} className="card-dark p-5">
              <div className="text-sm text-muted-foreground">{o.eyebrow}</div>
              <div className="mt-1 text-display text-xl">{o.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}