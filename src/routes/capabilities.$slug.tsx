import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CALENDLY_URL } from "@/components/site/Nav";
import { pillarBySlug, pillars, type Pillar } from "@/data/pillars";

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export const Route = createFileRoute("/capabilities/$slug")({
  loader: ({ params }) => {
    const p = pillarBySlug(params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Baseline AI" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.p;
    return {
      meta: [
        { title: `${p.name} — Baseline AI` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — Baseline AI` },
        { property: "og:description", content: p.tagline },
        { property: "og:url", content: `/capabilities/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/capabilities/${p.slug}` }],
    };
  },
  component: PillarPage,
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero eyebrow="Capabilities" title="Pillar not found" lead="This capability pillar doesn't exist yet." />
    </SiteLayout>
  ),
});

function PillarPage() {
  const { p } = Route.useLoaderData() as { p: Pillar };
  const others = pillars.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <SiteLayout>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.name}
        lead={p.tagline}
      >
        <div className="mt-10 flex gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          <Link to="/capabilities" className="btn-ghost">All capabilities</Link>
        </div>
      </PageHero>

      <section className="container-x py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-14">
          <Reveal>
            <div>
              <div className="text-eyebrow">Overview</div>
              <p className="mt-4 text-lg text-foreground/90">{p.lead}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-dark p-6">
              <div className="text-eyebrow">Capabilities</div>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/85">
                {p.capabilities.map((c) => (
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
          {p.workflow.map((w, i) => (
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
          {p.outcomes.map((o, i) => (
            <Reveal key={o} delay={i * 60}>
              <li className="card-dark p-6 text-foreground/90">{o}</li>
            </Reveal>
          ))}
        </ul>
      </section>

      {p.solutionSlugs.length > 0 ? (
        <section className="container-x py-20 border-t border-white/5">
          <div className="text-eyebrow">Capabilities in this pillar</div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {p.solutionSlugs.map((slug) => (
              <Link key={slug} to="/solutions/$slug" params={{ slug }} className="card-dark p-5">
                <div className="text-sm text-muted-foreground">Solution</div>
                <div className="mt-1 text-display text-xl">{titleCaseFromSlug(slug)}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {p.caseStudySlugs.length > 0 ? (
        <section className="container-x py-20 border-t border-white/5">
          <div className="text-eyebrow">Related work</div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {p.caseStudySlugs.map((slug) => (
              <Link key={slug} to="/work/$slug" params={{ slug }} className="card-dark p-5">
                <div className="text-sm text-muted-foreground">Case study</div>
                <div className="mt-1 text-display text-xl">{titleCaseFromSlug(slug)}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-x py-20 border-t border-white/5">
        <div className="text-eyebrow">Other pillars</div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to="/capabilities/$slug" params={{ slug: o.slug }} className="card-dark p-5">
              <div className="text-display text-lg">{o.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
