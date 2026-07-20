import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CALENDLY_URL } from "@/components/site/Nav";
import { industryBySlug, industries, type Industry } from "@/data/industries";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const ind = industryBySlug(params.slug);
    if (!ind) throw notFound();
    return { ind };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Baseline AI" }, { name: "robots", content: "noindex" }] };
    const ind = loaderData.ind;
    return {
      meta: [
        { title: `${ind.name} — Baseline AI` },
        { name: "description", content: ind.hero },
        { property: "og:title", content: `${ind.name} — Baseline AI` },
        { property: "og:description", content: ind.hero },
        { property: "og:url", content: `/industries/${ind.slug}` },
      ],
      links: [{ rel: "canonical", href: `/industries/${ind.slug}` }],
    };
  },
  component: IndustryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero eyebrow="Industries" title="Industry not found" />
    </SiteLayout>
  ),
});

function IndustryPage() {
  const { ind } = Route.useLoaderData() as { ind: Industry };
  const others = industries.filter((x) => x.slug !== ind.slug).slice(0, 3);
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Industry"
        title={ind.hero}
        lead={ind.lead}
      >
        <div className="mt-10 flex gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          <Link to="/industries" className="btn-ghost">All industries</Link>
        </div>
      </PageHero>

      <section className="container-x py-20 grid md:grid-cols-2 gap-10">
        <Reveal>
          <div>
            <div className="text-eyebrow">Common friction</div>
            <ul className="mt-5 space-y-3">
              {ind.pains.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/90"><span className="text-white/30">—</span>{p}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div className="text-eyebrow">Where automation and AI fit</div>
            <ul className="mt-5 grid grid-cols-1 gap-2">
              {ind.opportunities.map((o) => (
                <li key={o} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground/90">{o}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <h2 className="text-display text-3xl md:text-5xl max-w-3xl">Before → After</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-white/10 p-6">
              <div className="text-eyebrow">Before</div>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {ind.before.map((b) => <li key={b}>— {b}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-purple/40 bg-purple/5 p-6 purple-glow">
              <div className="text-eyebrow">After</div>
              <ul className="mt-4 space-y-2 text-foreground">
                {ind.after.map((b) => <li key={b}>— {b}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20 border-t border-white/5">
        <div className="text-eyebrow">Other industries</div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to="/industries/$slug" params={{ slug: o.slug }} className="card-dark p-5">
              <div className="text-display text-lg">{o.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}