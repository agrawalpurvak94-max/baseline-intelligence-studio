import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const systems = [
  { name: "Lead Intelligence", copy: "Turn fragmented lead activity into an intelligent revenue system.", caps: ["Lead enrichment","Qualification","Routing","Follow-up","Pipeline intelligence"], status: "Solution Accelerator" },
  { name: "CFO Co-Pilot", copy: "An intelligent financial layer that turns fragmented financial data into visibility, insights and action.", caps: ["Financial data intelligence","Expense visibility","Anomaly detection","Reporting","Decision support"], status: "In Development" },
  { name: "AdaptOps", copy: "Operational intelligence for businesses where work moves across people, systems and processes.", caps: ["Operations visibility","Workflow intelligence","Exception detection","Decision support","Dashboards"], status: "Solution Accelerator" },
];

export const Route = createFileRoute("/systems")({
  head: () => ({
    meta: [
      { title: "Systems by Baseline — Baseline AI" },
      { name: "description", content: "Reusable intelligence, customized around how your business operates." },
      { property: "og:title", content: "Systems by Baseline" },
      { property: "og:description", content: "Solution accelerators for lead, finance and operations intelligence." },
      { property: "og:url", content: "/systems" },
    ],
    links: [{ rel: "canonical", href: "/systems" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="Systems by Baseline"
        title={<>Reusable intelligence. <span className="text-muted-foreground">Customized around your business.</span></>}
        lead="Solution accelerators we've built and adapt to each engagement."
      />
      <section className="container-x pb-32 grid gap-6 md:grid-cols-3">
        {systems.map((s, i) => (
          <Reveal key={s.name} delay={i * 60}>
            <article className="card-dark p-6 h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-display text-xl">{s.name}</h2>
                <span className="text-[10px] text-purple-soft rounded-full border border-purple/30 px-2 py-0.5">{s.status}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.copy}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.caps.map((c) => <li key={c} className="flex gap-2"><span className="text-purple-soft">—</span>{c}</li>)}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>
    </SiteLayout>
  ),
});