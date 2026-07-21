import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Baseline AI" },
      { name: "description", content: "Notes on business, systems and intelligence from the Baseline AI studio." },
      { property: "og:title", content: "Insights — Baseline AI" },
      { property: "og:description", content: "Notes on business, systems and intelligence." },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero
        eyebrow="Insights"
        title={<>Notes on business, <span className="text-muted-foreground">systems and intelligence.</span></>}
        lead="A publication is in preparation. Long-form thinking on how modern businesses should design work around intelligent systems."
      />
      <section className="container-x pb-40">
        <div className="card-dark p-10 md:p-14">
          <div className="text-eyebrow">Coming soon</div>
          <p className="text-display mt-4 text-2xl md:text-3xl max-w-2xl">
            The first pieces are being written.
          </p>
          <p className="mt-4 max-w-xl text-muted-foreground">
            In the meantime, the fastest way to explore how this thinking applies to your business is a conversation.
          </p>
        </div>
      </section>
    </SiteLayout>
  ),
});