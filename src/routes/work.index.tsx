import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { caseStudyBySlug, type CaseStudy } from "@/data/case-studies";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Selected Customer Work — Baseline AI" },
      { name: "description", content: "Anonymised customer implementations by Baseline AI across data engineering, reconciliation, finance operations and custom software — with status stated as of each page's last update." },
      { property: "og:title", content: "Selected Customer Work — Baseline AI" },
      { property: "og:description", content: "Anonymised customer implementations, with status stated plainly." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkIndexPage,
});

type CustomerGroup = {
  heading: string;
  blurb: string;
  slugs: string[];
};

const GROUPS: CustomerGroup[] = [
  {
    heading: "Pharmaceutical manufacturer — multi-plant operations",
    blurb: "One customer relationship across finance reporting, inventory valuation and the reconciliation engine that underpins both. Each project is shown on its own.",
    slugs: [
      "sap-exports-manufacturing-intelligence-platform",
      "enterprise-data-quality-reconciliation-engine",
      "intelligent-inventory-reconciliation",
      "spreadsheet-to-intelligent-business-applications",
      "legacy-erp-process-modernisation",
    ],
  },
  {
    heading: "Owner-managed group of businesses",
    blurb: "An individual managing several businesses, with automated financial visibility across accounts.",
    slugs: ["financial-intelligence-platform"],
  },
];

function CaseCard({ c, featured }: { c: CaseStudy; featured?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: c.slug }}
      className={`card-dark block p-8 h-full ${featured ? "md:col-span-2 md:p-12" : ""}`}
    >
      <div className="text-xs uppercase tracking-[0.08em] text-purple-soft">{c.statusLabel}</div>
      <h3 className={`text-display mt-3 ${featured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}`}>{c.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground max-w-2xl">{c.tagline}</p>
      <div className="mt-6 text-sm text-purple-soft">Explore →</div>
    </Link>
  );
}

function WorkIndexPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Selected Customer Work"
        title={<>Engineering that runs <span className="text-muted-foreground">inside real finance operations.</span></>}
        lead="Anonymised customer implementations. Each page states the project's status as of its last update — in UAT, embedded in a pipeline, or in use."
      />

      {GROUPS.map((g, gi) => {
        const items = g.slugs.map((s) => caseStudyBySlug(s)).filter((c): c is CaseStudy => Boolean(c));
        if (items.length === 0) return null;
        return (
          <section key={g.heading} className={`container-x py-16 ${gi > 0 ? "border-t border-white/5" : ""}`}>
            <Reveal>
              <div className="text-eyebrow">{g.heading}</div>
              <p className="mt-3 max-w-2xl text-muted-foreground">{g.blurb}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((c, i) => (
                <Reveal key={c.slug} delay={i * 60}>
                  <CaseCard c={c} featured={gi === 0 && i === 0} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <section className="container-x py-20 border-t border-white/5">
        <Reveal>
          <div className="text-eyebrow">Solutions we build</div>
          <h2 className="text-display mt-4 text-3xl md:text-5xl max-w-2xl">The same engineering, applied to your operations.</h2>
        </Reveal>
        <div className="mt-8">
          <Link to="/solutions" className="btn-ghost">Explore solutions</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
