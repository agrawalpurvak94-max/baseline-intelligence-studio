import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CALENDLY_URL } from "@/components/site/Nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Baseline AI" },
      { name: "description", content: "Baseline AI is an AI engineering and automation studio built at the intersection of business and technology." },
      { property: "og:title", content: "About — Baseline AI" },
      { property: "og:description", content: "Built at the intersection of business and technology." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title={<>Built at the intersection of <span className="text-muted-foreground">business and technology.</span></>}
        lead="Baseline AI is an AI engineering & automation studio. We help businesses eliminate manual work and build intelligent systems using AI, automation and custom software."
      />
      <section className="container-x py-20 max-w-3xl space-y-6 text-lg text-foreground/90">
        <Reveal><p>Businesses don't struggle because they lack AI tools. They struggle because their systems, processes and information don't work together.</p></Reveal>
        <Reveal delay={80}><p>We start with the business problem. Then we choose the right technology — automation, AI, custom software or a combination — and build it around how your operations actually work.</p></Reveal>
        <Reveal delay={160}><p className="text-foreground">Understand the business first. Then engineer the right solution.</p></Reveal>
        <Reveal delay={240}>
          <div className="pt-6">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  ),
});