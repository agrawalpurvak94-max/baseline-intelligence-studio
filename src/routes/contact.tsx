import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CALENDLY_URL } from "@/components/site/Nav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Baseline AI" },
      { name: "description", content: "Book a strategy call with Baseline AI to explore where automation, AI and custom software fit in your business." },
      { property: "og:title", content: "Contact — Baseline AI" },
      { property: "og:description", content: "Show us the bottleneck. We'll help you determine what to build." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title={<>Show us the bottleneck.</>}
        lead="Book a strategy call. We'll help you determine what should be automated, where AI actually makes sense, and what needs to be built."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary">Book a Strategy Call</a>
          <a href="mailto:hello@baseline.ai" className="btn-ghost">hello@baseline.ai</a>
        </div>
      </PageHero>
    </SiteLayout>
  ),
});