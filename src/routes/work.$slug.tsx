import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CALENDLY_URL } from "@/components/site/Nav";
import { caseStudyBySlug, caseStudies, type CaseStudy, type CaseStudyCategory } from "@/data/case-studies";

const CATEGORY_LABEL: Record<CaseStudyCategory, string> = {
  implementation: "Customer Implementation",
  illustrative: "Illustrative Scenario",
  reference: "Reference Architecture",
};

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const c = caseStudyBySlug(params.slug);
    if (!c) throw notFound();
    return { c };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Baseline AI" }, { name: "robots", content: "noindex" }] };
    const { c } = loaderData;
    return {
      meta: [
        { title: `${c.title} — Baseline AI` },
        { name: "description", content: c.tagline },
        { property: "og:title", content: `${c.title} — Baseline AI` },
        { property: "og:description", content: c.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${c.slug}` },
      ],
      links: [{ rel: "canonical", href: `/work/${c.slug}` }],
    };
  },
  component: WorkPage,
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero eyebrow="Case study" title="Case study not found" />
    </SiteLayout>
  ),
});

function CategoryBadge({ c }: { c: CaseStudy }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-eyebrow rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
        {CATEGORY_LABEL[c.category]}
      </span>
      <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{c.statusLabel}</span>
    </div>
  );
}

function WorkPage() {
  const { c } = Route.useLoaderData() as { c: CaseStudy };
  const related = caseStudies.filter((x) => c.relatedCaseStudies?.includes(x.slug));

  return (
    <SiteLayout>
      <PageHero eyebrow="Case Study" title={c.title} lead={c.tagline}>
        <div className="mt-6">
          <CategoryBadge c={c} />
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{c.disclosure}</p>
        </div>
        <div className="mt-10 flex gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          <Link to="/work" className="btn-ghost">All work</Link>
        </div>
      </PageHero>

      {/* 14-section narrative */}
      <section className="container-x py-16 max-w-3xl space-y-14">
        <Reveal>
          <div className="text-eyebrow">Business context</div>
          <p className="mt-4 text-lg text-foreground/90">{c.sections.businessContext}</p>
        </Reveal>
        <Reveal>
          <div className="text-eyebrow">The operational problem</div>
          <p className="mt-4 text-foreground/90">{c.sections.operationalProblem}</p>
        </Reveal>
        <Reveal>
          <div className="text-eyebrow">Why existing processes are insufficient</div>
          <p className="mt-4 text-foreground/90">{c.sections.whyInsufficient}</p>
        </Reveal>
        <Reveal>
          <div className="text-eyebrow">Proposed solution</div>
          <p className="mt-4 text-foreground/90">{c.sections.proposedSolution}</p>
        </Reveal>
      </section>

      {/* Architecture diagram — full plain-text block */}
      <section className="container-x py-10">
        <Reveal>
          <div className="rounded-3xl hairline surface-1 p-6 md:p-10">
            <div className="text-eyebrow mb-6">Solution architecture</div>
            <pre className="overflow-x-auto text-[11px] md:text-xs leading-relaxed font-mono text-foreground/80 whitespace-pre">
              {c.sections.architectureDiagram}
            </pre>
          </div>
        </Reveal>

        {c.architecture.length > 0 && (
          <Reveal delay={80}>
            <div className="mt-6">
              <ol className="grid gap-3 md:grid-cols-4">
                {c.architecture.map((a, i) => (
                  <li key={a} className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <div className="text-[10px] text-muted-foreground">Step {i + 1}</div>
                    <div className="mt-1 text-sm font-medium">{a}</div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        )}
      </section>

      <section className="container-x py-16 max-w-3xl space-y-14">
        <Reveal>
          <div className="text-eyebrow">Data and application integrations</div>
          <p className="mt-4 text-foreground/90">{c.sections.integrations}</p>
        </Reveal>

        <Reveal>
          <div className="text-eyebrow">Technology stack</div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {c.sections.techStack.map((t) => (
              <li key={t} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-foreground/90">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="text-eyebrow">End-to-end workflow</div>
          <ol className="mt-4 space-y-4">
            {c.sections.workflow.map((w, i) => (
              <li key={w.step} className="flex gap-4">
                <div className="text-display text-lg text-purple-soft/80 w-8 shrink-0">{i + 1}</div>
                <div>
                  <div className="text-sm font-medium">{w.step}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{w.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <div className="text-eyebrow">Implementation methodology</div>
          <p className="mt-4 text-foreground/90">{c.sections.methodology}</p>
        </Reveal>

        <Reveal>
          <div className="text-eyebrow">Security and governance</div>
          <p className="mt-4 text-foreground/90">{c.sections.security}</p>
        </Reveal>

        <Reveal>
          <div className="text-eyebrow">Deployment considerations</div>
          <p className="mt-4 text-foreground/90">{c.sections.deployment}</p>
        </Reveal>
      </section>

      <section className="container-x py-16">
        <Reveal><h2 className="text-display text-3xl md:text-5xl">Expected operational benefits</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {c.sections.benefits.map((b, i) => (
            <Reveal key={b} delay={i * 60}>
              <div className="card-dark p-6">
                <p className="text-sm text-foreground/90">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16 max-w-3xl">
        <Reveal>
          <div className="text-eyebrow">What makes this technically challenging</div>
          <p className="mt-4 text-foreground/90">{c.sections.challenge}</p>
        </Reveal>
      </section>

      {/* Closing status + disclosure */}
      <section className="container-x py-16 border-t border-white/5">
        <Reveal>
          <div className="rounded-3xl hairline surface-1 p-6 md:p-10 max-w-3xl">
            <CategoryBadge c={c} />
            <p className="mt-4 text-foreground/90">{c.sections.statusDisclosure}</p>
            <p className="mt-4 text-sm text-muted-foreground">{c.disclosure}</p>
          </div>
        </Reveal>
      </section>

      {(related.length > 0 || (c.relatedCapabilities && c.relatedCapabilities.length > 0)) && (
        <section className="container-x py-16 border-t border-white/5">
          <div className="grid gap-10 md:grid-cols-2">
            {related.length > 0 && (
              <div>
                <div className="text-eyebrow">Related case studies</div>
                <div className="mt-5 grid gap-3">
                  {related.map((r) => (
                    <Link key={r.slug} to="/work/$slug" params={{ slug: r.slug }} className="card-dark block p-5">
                      <div className="text-xs uppercase tracking-[0.08em] text-muted-foreground">{CATEGORY_LABEL[r.category]}</div>
                      <div className="text-display mt-2 text-lg">{r.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {c.relatedCapabilities && c.relatedCapabilities.length > 0 && (
              <div>
                <div className="text-eyebrow">Related capabilities</div>
                <div className="mt-5 grid gap-3">
                  {c.relatedCapabilities.map((slug) => (
                    <Link key={slug} to="/solutions/$slug" params={{ slug }} className="card-dark block p-5">
                      <div className="text-display text-lg capitalize">{slug.replace(/-/g, " ")}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="container-x py-20 border-t border-white/5">
        <Reveal>
          <h2 className="text-display text-3xl md:text-5xl max-w-2xl">Want to talk about something like this?</h2>
        </Reveal>
        <div className="mt-8 flex gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          <Link to="/work" className="btn-ghost">All work</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
