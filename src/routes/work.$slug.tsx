import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CALENDLY_URL } from "@/components/site/Nav";

const cases: Record<string, {
  title: string; tagline: string; challenge: string; arch: string[]; metrics: { m: string; l: string }[];
}> = {
  "financial-intelligence-platform": {
    title: "Financial Intelligence Platform",
    tagline: "From financial chaos to one intelligent system.",
    challenge:
      "Financial data was fragmented across bank alerts, statements, inboxes and accounts. Manual tracking consumed significant time and made it difficult to identify anomalies, categorize spending and maintain a unified financial view.",
    arch: ["Multiple Inboxes","Bank Alerts + Statements","Intelligent Extraction","Normalization","Deduplication","Categorization","Financial Database","Intelligence Dashboard"],
    metrics: [
      { m: "25+", l: "Hours of manual work saved monthly" },
      { m: "Bank charge leakage", l: "Automatically surfaced through financial intelligence" },
      { m: "Unified visibility", l: "Across fragmented financial activity" },
    ],
  },
};

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const c = cases[params.slug];
    if (!c) throw notFound();
    return { c, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Baseline AI" }, { name: "robots", content: "noindex" }] };
    const { c, slug } = loaderData;
    return {
      meta: [
        { title: `${c.title} — Baseline AI` },
        { name: "description", content: c.tagline },
        { property: "og:title", content: `${c.title} — Baseline AI` },
        { property: "og:description", content: c.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${slug}` },
      ],
      links: [{ rel: "canonical", href: `/work/${slug}` }],
    };
  },
  component: WorkPage,
  notFoundComponent: () => (
    <SiteLayout><PageHero eyebrow="Case study" title="Case study not found" /></SiteLayout>
  ),
});

function WorkPage() {
  const { c } = Route.useLoaderData();
  return (
    <SiteLayout>
      <PageHero eyebrow="Case Study" title={c.title} lead={c.tagline}>
        <div className="mt-10 flex gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          <Link to="/work" className="btn-ghost">All work</Link>
        </div>
      </PageHero>

      <section className="container-x py-20 max-w-3xl">
        <Reveal>
          <div className="text-eyebrow">The challenge</div>
          <p className="mt-4 text-lg text-foreground/90">{c.challenge}</p>
        </Reveal>
      </section>

      <section className="container-x py-10">
        <Reveal>
          <div className="rounded-3xl hairline surface-1 p-6 md:p-10">
            <div className="text-eyebrow mb-6">Architecture</div>
            <ol className="grid gap-3 md:grid-cols-4">
              {c.arch.map((a, i) => (
                <li key={a} className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <div className="text-[10px] text-muted-foreground">Step {i + 1}</div>
                  <div className="mt-1 text-sm font-medium">{a}</div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="container-x py-20">
        <Reveal><h2 className="text-display text-3xl md:text-5xl">Selected outcomes</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {c.metrics.map((k, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card-dark p-6">
                <div className="text-display text-3xl bg-gradient-to-b from-white to-purple-soft bg-clip-text text-transparent">{k.m}</div>
                <p className="mt-3 text-sm text-muted-foreground">{k.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}