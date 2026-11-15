import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { caseStudies, type CaseStudy, type CaseStudyCategory } from "@/data/case-studies";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Baseline AI" },
      { name: "description", content: "Selected work and system concepts engineered by Baseline AI, honestly labelled across customer implementations, illustrative scenarios, and reference architectures." },
      { property: "og:title", content: "Work — Baseline AI" },
      { property: "og:description", content: "Selected work and system concepts, honestly labelled by category." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkIndexPage,
});

const GROUPS: { category: CaseStudyCategory; heading: string; blurb: string }[] = [
  {
    category: "implementation",
    heading: "Customer Implementations",
    blurb: "Real, anonymised projects. Status stated as of this page's last update — implemented, in UAT, or validated-not-deployed, never rounded up.",
  },
  {
    category: "illustrative",
    heading: "Illustrative Scenarios",
    blurb: "No completed deployment behind these. Realistic, technically detailed designs built to show how we'd engineer the problem, not a claim of delivered work.",
  },
  {
    category: "reference",
    heading: "Reference Architectures",
    blurb: "Architecture-only. Patterns we're prepared to build and stand behind technically — labelled as patterns, never as something shipped.",
  },
];

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <Link to="/work/$slug" params={{ slug: c.slug }} className="card-dark block p-8">
      <div className="text-xs uppercase tracking-[0.08em] text-purple-soft">{c.statusLabel}</div>
      <h3 className="text-display mt-3 text-xl md:text-2xl">{c.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{c.tagline}</p>
      <div className="mt-6 text-sm text-purple-soft">Explore →</div>
    </Link>
  );
}

function WorkIndexPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Work"
        title={<>Selected work. <span className="text-muted-foreground">Honestly labelled.</span></>}
        lead="Selected work and system concepts — thirteen pages across three honestly-labelled categories: customer implementations, illustrative scenarios, and reference architectures."
      />

      {GROUPS.map((g, gi) => {
        const items = caseStudies.filter((c) => c.category === g.category);
        if (items.length === 0) return null;
        return (
          <section key={g.category} className={`container-x py-16 ${gi > 0 ? "border-t border-white/5" : ""}`}>
            <Reveal>
              <div className="text-eyebrow">{g.heading}</div>
              <p className="mt-3 max-w-2xl text-muted-foreground">{g.blurb}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((c, i) => (
                <Reveal key={c.slug} delay={i * 60}>
                  <CaseCard c={c} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </SiteLayout>
  );
}
