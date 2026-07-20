import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/solutions", "/industries", "/work", "/systems", "/about", "/contact"];
        const solutionPaths = solutions.map((s) => `/solutions/${s.slug}`);
        const industryPaths = industries.map((i) => `/industries/${i.slug}`);
        const workPaths = ["/work/financial-intelligence-platform"];
        const all = [...staticPaths, ...solutionPaths, ...industryPaths, ...workPaths];
        const urls = all.map((p) =>
          `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});