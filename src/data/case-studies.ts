export type CaseStudyCategory = "implementation" | "illustrative" | "reference";

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: CaseStudyCategory;
  statusLabel: string;
  pillar: string;
  disclosure: string;
  architecture: string[];
  sections: {
    businessContext: string;
    operationalProblem: string;
    whyInsufficient: string;
    proposedSolution: string;
    architectureDiagram: string;
    integrations: string;
    techStack: string[];
    workflow: { step: string; detail: string }[];
    methodology: string;
    security: string;
    deployment: string;
    benefits: string[];
    challenge: string;
    statusDisclosure: string;
  };
  relatedCaseStudies?: string[];
  relatedCapabilities?: string[];
};

const DISCLOSURE = {
  implementation:
    "Customer implementation. Anonymised. Status shown is current as of this page's last update.",
  illustrative:
    "Illustrative scenario — not a completed customer deployment. Shown to demonstrate our engineering approach, not a claim of delivered work.",
  reference:
    "Reference architecture. Describes a pattern we are prepared to build, not a system that has been deployed.",
} as const;

export const caseStudies: CaseStudy[] = [
  // 1 — implementation
  {
    slug: "sap-exports-manufacturing-intelligence-platform",
    title: "SAP Exports to Manufacturing Intelligence Platform",
    tagline:
      "A governed calculation engine that turns four manual SAP-export report builds into one auditable, repeatable pipeline.",
    category: "implementation",
    statusLabel: "Prototype — in User Acceptance Testing",
    pillar: "data-engineering",
    disclosure: DISCLOSURE.implementation,
    architecture: [
      "SAP export files",
      "n8n intake & staging",
      "SQL Server calculation engine",
      "Workbook builder",
      "Finance UAT interface",
    ],
    sections: {
      businessContext:
        "A manufacturer running SAP for its core transactions closes inventory every month by exporting four report families — ageing, inventory holding, finished-goods-and-bulk (with year-cost/batch-cost breakdowns), and carriage inwards — and rebuilding each one by hand into the workbook Finance actually reports from. The SAP system of record isn't in question; what happens to its output after export is.",
      operationalProblem:
        "Four report families, each with its own cleaning rules, revaluation logic, and provisioning calculations, assembled every month by an analyst working from raw SAP exports. The work is repeatable in principle and manual in practice, which makes it unauditable in practice: when Finance questions a number, there is no record of which rule produced it, only the analyst's memory of what they did that month.",
      whyInsufficient:
        "A spreadsheet process can be correct in any given month and still be fragile: one changed formula, one re-ordered column, one analyst on leave, and the output silently changes shape. There is no independent check that a month's revaluation used the same rule as the month before, and no way to answer \"show me every input that fed this number\" without re-tracing the spreadsheet by hand.",
      proposedSolution:
        "A calculation engine that takes the same SAP export files the team already works from and produces all four report families on a governed, repeatable pipeline — with every business rule not yet confirmed by Finance logged as an open decision rather than silently assumed, and every run independently reconciled against the customer's own workbook before being trusted.",
      architectureDiagram: `
 SAP ECC/S4                 Manual export
 (system of record)  ───────────────────────▶  Report export files (.xlsx/.csv)
                                                        │
                                                        ▼
                                          ┌─────────────────────────┐
                                          │   n8n (conductor)        │
                                          │   file intake, staging   │
                                          └─────────────────────────┘
                                                        │
                                                        ▼
                                          ┌─────────────────────────┐
                                          │  SQL Server              │
                                          │  cleaning & calculation   │
                                          │  engine — ageing,         │
                                          │  holding, FG & Bulk       │
                                          │  (YCBC), carriage inwards │
                                          └─────────────────────────┘
                                                        │
                                            ┌───────────┴───────────┐
                                            ▼                       ▼
                                  ┌──────────────────┐   ┌────────────────────┐
                                  │ Workbook-builder  │   │ Finance UAT         │
                                  │ → reconciled       │   │ interface:          │
                                  │ report workbook    │   │ column-by-column    │
                                  │                     │  │ match vs customer   │
                                  │                     │  │ workbook, query log,│
                                  │                     │  │ sign-off gate       │
                                  └──────────────────┘   └────────────────────┘`,
      integrations:
        "Input: SAP report exports (ageing, holding, FG & Bulk, carriage inwards) as files — not a live SAP connection; SAP OData/API integration is explicitly out of scope (a confirmed business rule, not an oversight). Internal: n8n orchestrates file intake and hands off to SQL Server; the workbook-builder service reads the engine's output and produces the report workbook in the format Finance already expects. Human-facing: a Finance UAT interface for column-by-column comparison against the customer's existing workbook, with an open-query log and a sign-off gate — nothing is called \"accepted\" until Finance clicks accept.",
      techStack: [
        "SQL Server (calculation engine, staging)",
        "n8n (orchestration)",
        "Purpose-built workbook-builder service",
        "Finance-facing UAT web interface",
      ],
      workflow: [
        { step: "Export", detail: "Analyst exports the four SAP report families as usual — no change to how SAP is used." },
        { step: "Stage", detail: "Files land in the pipeline; n8n stages them." },
        { step: "Calculate", detail: "SQL Server applies the cleaning and calculation rules for each report family." },
        { step: "Build workbook", detail: "The workbook-builder assembles the reconciled output in the customer's existing workbook shape." },
        { step: "Match", detail: "The Finance UAT interface runs a column-by-column match against the customer's own workbook for the same period." },
        { step: "Route queries", detail: "Discrepancies route to an open-query log, each tagged to a specific rule or data gap; Finance reviews and confirms the rule or flags it for a decision." },
        { step: "Sign off", detail: "Only after Finance sign-off does a month's output count as accepted — this pipeline has not yet reached that gate." },
      ],
      methodology:
        "Rules were extracted from the customer's existing workbook logic first, each one logged individually rather than reverse-engineered in bulk and assumed correct, so every calculation traces to a specific, confirmable business rule rather than an assumption made under deadline pressure. Where a rule was ambiguous or undocumented, it was logged as an open question for Finance rather than guessed at — the same governance discipline used across our other delivered pipelines, not a one-off practice for this engagement.",
      security:
        "No SAP credentials or live SAP connectivity are involved, because the pipeline consumes export files rather than connecting to SAP directly — this narrows the integration's security surface by design, at the cost of requiring a human to run the export each month. Every pipeline run is logged; every output column traces to a named rule in the rule register, not to an unlogged manual edit.",
      deployment:
        "The pipeline runs against the customer's own export files and reconciles against the customer's own workbook, so it's built to slot in beside the existing process rather than replace it outright during validation — Finance can run both in parallel until they trust the new output. It has not yet been deployed into the customer's production environment or infrastructure.",
      benefits: [
        "A single, auditable rule set instead of four spreadsheets maintained by memory.",
        "A visible log of every open question instead of silent assumptions.",
        "A repeatable process that behaves the same way whoever runs it.",
        "No time or cost saving is stated — none has been measured yet; the register has no such figure on record.",
      ],
      challenge:
        "Four report families, each with its own revaluation and provisioning logic, had to be reconciled to a workbook that was never built to be reverse-engineered — it was built to be edited by hand, one month at a time. Matching a deterministic engine's output to that workbook column-by-column, at scale (hundreds of thousands of underlying formula-equivalents across the four families), and reaching exact or near-exact matches on the majority of columns before Finance had even seen the tool, is the actual engineering work — not the SQL, but the business-rule archaeology underneath it.",
      statusDisclosure:
        "Status: Prototype, in User Acceptance Testing. Capacity and workbook-integrity checks have passed. The most recent end-to-end run matched the customer's own workbook exactly on the majority of compared columns, with the remainder within a small tolerance. Finance sign-off has not yet been given: a provisioning-rule gap and several other items remain open queries. This page will be updated when that status changes. We do not describe this as \"SAP-integrated\" (it consumes export files, not a live SAP connection) or as \"deployed\" (it has not left UAT).",
    },
    relatedCaseStudies: ["intelligent-inventory-reconciliation", "enterprise-data-quality-reconciliation-engine"],
    relatedCapabilities: ["sap-data-integration-analytics", "enterprise-data-engineering"],
  },

  // 2 — reference
  {
    slug: "enterprise-data-foundation-manufacturing",
    title: "Enterprise Data Foundation for Manufacturing",
    tagline:
      "The layered schema and migration discipline behind our delivered manufacturing data engines — and the cloud-warehouse extension point we'd build next, not yet delivered.",
    category: "reference",
    statusLabel: "Reference architecture",
    pillar: "data-engineering",
    disclosure: DISCLOSURE.reference,
    architecture: [
      "File extract intake",
      "stg — staging",
      "ctl / ref — control & reference",
      "core — cleaned facts",
      "calc — business rules",
      "[extension: cloud warehouse — pattern only]",
      "rpt — reporting views",
    ],
    sections: {
      businessContext:
        "Manufacturers running SAP close financial and operational periods against data that leaves SAP as a file and lands wherever the next person puts it — a shared drive, a workbook, a one-off staging table. Two of our delivered engines (a finance MIS rebuild and an inventory reconciliation build, both for manufacturers, both on SQL Server) share the same underlying data foundation: a layered schema and a versioned migration discipline, not a one-off script per report. This page describes that foundation as a pattern on its own terms, independent of either delivery.",
      operationalProblem:
        "A report pipeline built report-by-report accumulates staging tables with no shared shape, migrations nobody tracked, and no agreed place to put a lookup value versus a calculated one. Every new report family means a new ad hoc table, and nobody can say with confidence which table fed which number six months later.",
      whyInsufficient:
        "Spreadsheet-era staging — a CSV dump into one flat table, or a workbook used as a database — has no schema versioning, no separation between reference data and transactional facts, and no way to replay a migration to prove what the schema looked like when a given report ran. A cloud warehouse bought before this foundation exists just moves the same lack of structure onto a more expensive platform.",
      proposedSolution:
        "A layered schema pattern — control (ctl), reference (ref), staging (stg), core (core), calculation (calc), and reporting (rpt) — implemented with versioned, tested migrations, so every table has a declared role, every schema change is reviewable history rather than a silent ALTER, and procedures are checked against an independent oracle before being trusted with real data. Delivered today on SQL Server and PostgreSQL. Where a client's scale or tooling calls for a cloud warehouse or lakehouse, the same layering extends upward — that extension is a pattern we're prepared to build, not something we've delivered yet.",
      architectureDiagram: `
 SAP ECC/S4 or other       File export / extract
 source systems      ───────────────────────────▶  Extract files (.csv/.xlsx/flat)
                                                             │
                                                             ▼
                                                ┌─────────────────────────┐
                                                │  stg — staging schema    │
                                                │  raw load, hash-checked  │
                                                └─────────────────────────┘
                                                             │
                                  ┌──────────────────────────┼──────────────────────────┐
                                  ▼                          ▼                          ▼
                        ┌──────────────┐          ┌──────────────┐           ┌──────────────┐
                        │ ctl           │          │ ref           │           │ core          │
                        │ run control,  │          │ lookups,      │           │ cleaned       │
                        │ config,       │          │ mappings,     │           │ transactional │
                        │ lineage       │          │ master data   │           │ facts         │
                        └──────────────┘          └──────────────┘           └──────┬───────┘
                                                                                     ▼
                                                                          ┌──────────────┐
                                                                          │ calc          │
                                                                          │ business-rule │
                                                                          │ calculations  │
                                                                          └──────┬───────┘
                                                                                 ▼
                                                       ┌────────────────────────────────┐
                                                       │  [ extension point: cloud        │
                                                       │   warehouse / lakehouse —        │
                                                       │   pattern only, not delivered    │
                                                       │   experience ]                   │
                                                       └────────────────────────────────┘
                                                                                 │
                                                                                 ▼
                                                                          ┌──────────────┐
                                                                          │ rpt           │
                                                                          │ reporting     │
                                                                          │ views         │
                                                                          └──────┬───────┘
                                                                                 ▼
                                                                          BI / reporting
                                                                          (Power BI, Excel,
                                                                           a built workbook)`,
      integrations:
        "Input: file-based extracts from SAP or another source system — the pattern assumes files in, the same integration posture as our delivered engines, not a live system connection. Internal: SQL Server or PostgreSQL hosts all six schema layers; an orchestration tool (n8n on delivered engines) stages files and sequences runs. Extension point: a cloud warehouse or lakehouse — Snowflake, Databricks, Microsoft Fabric — could sit between calc and rpt, or replace rpt outright, if a client already licenses one or needs cross-plant consolidation at a volume SQL Server or PostgreSQL alone would strain. We have not built this extension for a client; it's architecture, not delivered experience. Human-facing: BI tooling or a purpose-built reporting workbook reads from rpt, never from stg or core directly.",
      techStack: [
        "SQL Server and PostgreSQL (delivered)",
        "Versioned migrations (15-18 sequential, tested scripts on our SQL Server builds)",
        "Python-written oracle scripts, independently re-implementing calculation logic",
        "Pattern only, not delivered: Snowflake, Databricks, Microsoft Fabric",
      ],
      workflow: [
        { step: "Hash-check", detail: "Source files land and are hash-checked on arrival; a run is recorded in ctl before anything else happens." },
        { step: "Stage raw", detail: "Raw rows load into stg unmodified, so a failed run can be diagnosed against exactly what arrived." },
        { step: "Resolve lookups", detail: "Reference data (ref) resolves lookups and master-data mappings needed to interpret the staged rows." },
        { step: "Clean facts", detail: "Cleaned, typed facts move into core." },
        { step: "Apply rules", detail: "calc applies the business rules specific to the report or calculation — each rule traceable to a logged decision, not an assumption." },
        { step: "Extend (optional)", detail: "If a cloud warehouse extension exists for this client, calc output lands there next; otherwise it goes straight to rpt." },
        { step: "Report", detail: "rpt exposes the views BI tooling or a reporting workbook actually reads." },
      ],
      methodology:
        "Every migration is written, reviewed, and run in sequence — never a direct schema edit against a live database. Every calculation procedure that matters is mirrored by an independently written Python oracle, built from the same business rules but in a different language, and the two outputs are diffed; a match is what earns trust in the SQL implementation, not code review alone. The same discipline is behind the reconciliation engine described in its own case study — not unique to this page, and not optional when a schema change can silently alter a number Finance reports on.",
      security:
        "ctl carries run and lineage metadata separately from ref and core, so access to configuration and audit trail can be controlled apart from the data itself. No live SAP credentials are needed because the pattern ingests files, which narrows the integration surface at the cost of a manual export step. Any cloud warehouse extension would need its own access model — IAM roles, network boundary, data-residency decision — unresolved by design, because no client engagement has required it yet.",
      deployment:
        "Delivered experience is on SQL Server and PostgreSQL, on-prem or in a client's own cloud tenant — the same posture as our delivered MIS and inventory engines. Snowflake, Databricks, and Microsoft Fabric are described as an architecture pattern we're prepared to extend to, not delivered experience: we have not stood up, migrated to, or operated any of the three for a client. A client choosing this pattern today gets the schema-layering and migration discipline on a platform we've proven; the cloud-warehouse extension point is a scoped, later decision, not a prerequisite.",
      benefits: [
        "A schema with a declared role for every table instead of one more ad hoc staging dump per report.",
        "Migrations that are reviewable history instead of silent changes.",
        "A foundation that doesn't need to be rebuilt if a client later adopts a cloud warehouse, because the extension point is designed in rather than retrofitted.",
        "No time or cost figure for this pattern in isolation — no client has run it as a standalone engagement; see the delivered engines' own case studies for their realized benefits.",
      ],
      challenge:
        "Keeping ref and core honestly separate is harder than it sounds under deadline pressure — lookup values that should live in ref have a way of getting hard-coded into calc the first time a deadline is tight, eroding the schema's honesty one shortcut at a time. Designing the cloud-warehouse extension point without having built it yet means committing to an interface — what calc hands off, in what shape — that has to hold up the first time a real client scale-and-tooling requirement arrives, not be redesigned from scratch.",
      statusDisclosure:
        "Status: Reference architecture. Delivered experience is SQL Server and PostgreSQL: the layered schema (ctl/ref/stg/core/rpt/calc), versioned migrations, and oracle-verified calculation logic are the same pattern used in two delivered engines (see the SAP Exports and Data Quality Reconciliation Engine case studies for project-specific status). Snowflake, Databricks, and Microsoft Fabric are an architecture pattern we're prepared to extend to, not delivered experience — no implementation of any of the three exists for a client today. We do not describe this page as \"built\" or \"deployed\" as a standalone product; it's the data-foundation pattern underneath work that has been built, offered here as something a client can commission on its own terms.",
    },
    relatedCaseStudies: ["sap-exports-manufacturing-intelligence-platform", "enterprise-data-quality-reconciliation-engine"],
    relatedCapabilities: ["enterprise-data-engineering"],
  },

  // 3 — implementation
  {
    slug: "enterprise-data-quality-reconciliation-engine",
    title: "Enterprise Data Quality and Reconciliation Engine",
    tagline:
      "Dual-implementation proof — an independent Python oracle diffed against production SQL — embedded in two delivered pipelines.",
    category: "implementation",
    statusLabel: "Embedded in two pipelines — each in validation/UAT",
    pillar: "data-engineering",
    disclosure: DISCLOSURE.implementation,
    architecture: [
      "Layered schema, versioned migrations",
      "SQL Server engine",
      "Python independent oracle",
      "Diff",
      "Hash-verified lineage",
      "Run ledger (ctl)",
    ],
    sections: {
      businessContext:
        "Two of our delivered data engines — a finance management-information-system (MIS) rebuild and an inventory reconciliation build, both for manufacturers, both on SQL Server — needed the same thing underneath the business logic: proof that a calculation is correct before anyone downstream has to trust it blind. That proof mechanism is its own piece of engineering, reused across both builds rather than written twice, and is the subject of this page.",
      operationalProblem:
        "A calculation engine that replaces a spreadsheet inherits the spreadsheet's real risk: a wrong number that looks right. SQL can compute a plausible-looking total from a logic error just as easily as a correct one, and a single code review does not catch every case — especially under the volume and edge-case density of real month-end data across hundreds of thousands of formula-equivalents.",
      whyInsufficient:
        "Code review and unit tests check that code does what the author intended; neither checks that the author's intention matches the actual business rule reliably at scale. A single implementation, however carefully reviewed, has no independent witness. And once a schema evolves — tables added, columns renamed, retention runs applied — there has to be a way to prove nothing was silently lost or duplicated in the process.",
      proposedSolution:
        "A reconciliation engine built on three independent layers of proof: a layered schema with versioned migrations so every structural change is reviewable; a Python-written oracle for each calculation that matters, built independently from the same business rules and diffed against the SQL engine's own output; and hash-verified lineage so every row's journey from staging to final output can be checked, not just assumed.",
      architectureDiagram: `
                         ┌───────────────────────────┐
                         │  Layered schema             │
                         │  (ctl / ref / stg / core /   │
                         │   calc / rpt)                │
                         │  15-18 versioned migrations  │
                         └──────────────┬────────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    ▼                                          ▼
         ┌────────────────────┐                   ┌────────────────────┐
         │  SQL Server          │                   │  Python oracle       │
         │  calculation engine   │  ── diff ──────▶  │  independent         │
         │  (production logic)   │                   │  re-implementation   │
         └────────────────────┘                   └────────────────────┘
                    │
                    ▼
         ┌────────────────────┐
         │  Hash-verified         │
         │  lineage: every row     │
         │  traceable staging →    │
         │  core → output          │
         └────────────────────┘
                    │
                    ▼
         ┌────────────────────┐
         │  Run ledger            │
         │  (ctl schema): every    │
         │  run, retention action, │
         │  protected run_id        │
         │  logged                 │
         └────────────────────┘`,
      integrations:
        "Input: staged transactional data from each host pipeline (in our two deliveries: SAP export-derived finance and inventory data) — the engine is schema-aware, not source-specific. Internal: the SQL Server calculation engine and its Python oracle run against the same staged input independently; a diff step compares their outputs row by row. Governance: a run ledger in the ctl schema records every pipeline run and every retention or cleanup action taken against staging, with protected run_ids that a retention process must not touch.",
      techStack: [
        "SQL Server (calculation engine, layered schema)",
        "Python (independent oracle — a separate reimplementation, not a thin SQL wrapper)",
        "Versioned SQL migrations",
        "Hash-based row verification for lineage",
      ],
      workflow: [
        { step: "Stage", detail: "Transactional data stages into the layered schema (stg), hash-recorded on arrival." },
        { step: "Compute (SQL)", detail: "The SQL Server engine computes the business-rule output for the run." },
        { step: "Compute (oracle)", detail: "Independently, the Python oracle computes the same output from its own implementation of the same rules." },
        { step: "Diff", detail: "The two outputs are diffed; any mismatch is logged as an open discrepancy, not silently resolved either way." },
        { step: "Verify lineage", detail: "Lineage hashes are checked end to end — staging row to core row to final output — to confirm nothing was dropped or duplicated." },
        { step: "Retain safely", detail: "Retention and cleanup actions against staging run only against run_ids not flagged as protected; protections are enforced by the retention logic itself." },
        { step: "Log", detail: "Every run, match result, and retention action is written to the run ledger." },
      ],
      methodology:
        "The oracle is not generated from the SQL, and the SQL is not generated from the oracle — each is written independently from the same documented business rule, specifically so a bug in one implementation's interpretation is unlikely to reproduce itself identically in the other. Where the two disagree, that disagreement is the finding, not a race to decide which one is \"right\" by assumption. Retention runs against staging are themselves treated as a governed action requiring the same discipline as a schema migration, not a one-off cleanup script.",
      security:
        "The run ledger is append-only and lives in the ctl schema, separated from the transactional data it describes, so audit history can't be edited by the same process that produced the data. The engine's one approved retention run to date deleted 2.17 million rows from staging tables that had grown to roughly 1 million rows each across the host pipelines, while protecting 66 run_ids from deletion — those protections are enforced by the retention logic, not by a person remembering which runs matter. That run is the clearest proof on record that this engine has handled production-representative volume, not a demonstration figure.",
      deployment:
        "The engine is embedded inside two delivered pipelines rather than offered as a standalone product today: a finance MIS rebuild (validated end to end in a developer replica environment) and an inventory reconciliation build (advanced UAT, Finance sign-off pending). Both run on SQL Server, on-prem or in a client-controlled environment — no cloud dependency in the reconciliation layer itself.",
      benefits: [
        "A number that disagrees between two independently written implementations surfaces before it reaches a customer or a Finance reviewer, not after.",
        "A retention run that might otherwise risk deleting the wrong data instead runs against logic-enforced protections.",
        "No defect-catch rate or hours-saved figure is stated — no such measurement exists on record; the retention volumes and dual-implementation method above are what the engine has handled, not a claimed outcome.",
      ],
      challenge:
        "Writing a second, independent implementation of the same business logic is slower than writing it once and testing it — that's the point, and also why most teams skip it. Doing this across hundreds of thousands of formula-equivalents, where the two implementations have to agree not approximately but to the row, meant the oracle had to be built with the same rule-by-rule rigor as the production engine, not as an afterthought cross-check. Designing a retention process that can delete millions of rows safely, with specific run_ids structurally protected rather than manually remembered, is the same problem as the reconciliation itself: proving a destructive action did only what it was supposed to, before and after it runs.",
      statusDisclosure:
        "Status: Implemented, embedded in two delivered pipelines, each independently in validation or UAT. The engine itself — layered schema, versioned migrations, dual-implementation reconciliation, hash-verified lineage, governed retention — is in active use inside both; it is not offered or deployed as a separable product on its own today. The one approved retention run on record processed roughly 1-million-row staging tables, deleted 2.17 million rows, and protected 66 run_ids; that is what the engine has handled, not a client-facing outcome metric. Finance sign-off on the host pipelines' calculated output is tracked separately in each pipeline's own case study and has not been given as of this page's last update.",
    },
    relatedCaseStudies: ["sap-exports-manufacturing-intelligence-platform", "enterprise-data-foundation-manufacturing", "intelligent-inventory-reconciliation"],
    relatedCapabilities: ["enterprise-data-engineering"],
  },

  // 4 — reference
  {
    slug: "enterprise-knowledge-intelligence-mcp",
    title: "Enterprise Knowledge Intelligence using Custom MCP",
    tagline:
      "A permission-aware retrieval architecture that resolves Active Directory access before any document reaches the model — proposed, not built.",
    category: "reference",
    statusLabel: "Reference architecture — proposed, not built",
    pillar: "ai-engineering",
    disclosure: DISCLOSURE.reference,
    architecture: [
      "On-prem file estate + Active Directory",
      "Site-to-site VPN",
      "Document AI ingest",
      "Qdrant vector index",
      "Cloud SQL (metadata, permission cache, audit)",
      "Cloud Run — 7 MCP tools",
      "Enterprise AI client",
    ],
    sections: {
      businessContext:
        "A large enterprise's institutional knowledge sits in an on-premises file estate — years of documents, spread across shared drives, with access controlled by Active Directory group membership built up over time. Employees need to ask natural-language questions across that estate and get answers with sources, without any document becoming visible to someone whose AD group wouldn't already let them open it directly.",
      operationalProblem:
        "Search across a large, permission-stratified file estate today means either a flat keyword search tool that ignores permissions — a compliance problem — or no cross-document search at all, leaving people to know which folder to look in and open each document by hand. Neither gives a governed, conversational answer backed by citations.",
      whyInsufficient:
        "A generic enterprise search index that respects folder permissions still doesn't answer a question — it returns documents, not synthesis. A chatbot layered over a vector store without permission-awareness is faster to demo and wrong to ship: it can surface content to a user whose AD group was never granted access to the source document, which is precisely the failure an enterprise knowledge tool cannot have.",
      proposedSolution:
        "A permission-aware retrieval layer exposed to an enterprise AI client through the Model Context Protocol (MCP): a gateway inside the client's own network that mediates between on-premises Active Directory and a cloud-hosted retrieval service, so every query is filtered by the requesting user's actual AD group membership before any document content reaches the model, and seven purpose-built MCP tools give the AI client structured actions — search, retrieve, list-accessible, summarize-with-citation, and similar — rather than unrestricted access to a datastore.",
      architectureDiagram: `
   On-premises                         VPN                      GCP (cloud)
 ┌───────────────────┐        ┌──────────────┐        ┌──────────────────────────────┐
 │ File estate         │        │                │        │                                │
 │ (shared drives,      │───────▶│  Site-to-site   │───────▶│  Document AI                   │
 │  document stores)     │        │  VPN tunnel     │        │  (ingest, parse, extract)       │
 │                       │        │                │        │              │                  │
 │ Active Directory      │        │                │        │              ▼                  │
 │ (group membership,    │◀───────│                │◀───────│  Pub/Sub (change/ingest events)  │
 │  permission source     │        │                │        │              │                  │
 │  of truth)             │        │                │        │              ▼                  │
 │                       │        │                │        │  Qdrant on GCE (vector index)     │
 │ On-prem Windows        │        │                │        │              │                  │
 │ gateway: AD lookups,    │        │                │        │              ▼                  │
 │ permission resolution   │        │                │        │  Cloud SQL (metadata,             │
 └──────────┬────────────┘        └──────────────┘        │  permission cache, audit log)     │
            │                                              │              │                  │
            │ permission-filtered                           │              ▼                  │
            │ query/response                                │  Cloud Run: MCP server            │
            └──────────────────────────────────────────────▶│  (7 MCP tools)                    │
                                                              │              │                  │
                                                              │              ▼                  │
                                                              │  Scheduler (incremental            │
                                                              │  re-index, permission-cache         │
                                                              │  refresh)                           │
                                                              └──────────────┬──────────────────┘
                                                                             │
                                                                             ▼
                                                                  Enterprise AI client
                                                                  (consumes the 7 MCP tools)`,
      integrations:
        "Input: the client's existing file estate, read via the on-prem gateway, never copied wholesale to the cloud — ingestion is incremental and permission-tagged at the point of indexing. Identity: Active Directory is the single source of truth for permissions; the gateway resolves a requesting user's group membership on-prem before any query crosses the VPN, and a permission cache in Cloud SQL avoids a round-trip to AD on every call while staying on a scheduled refresh. AI client: an enterprise AI client connects to the Cloud Run-hosted MCP server and calls its seven tools; the MCP server never exposes a raw query interface to the underlying vector store.",
      techStack: [
        "On-premises Windows gateway (AD integration, permission resolution)",
        "Site-to-site VPN",
        "Google Cloud Platform: Cloud Run (MCP server), Qdrant on Compute Engine (vector index)",
        "Cloud SQL (metadata, permission cache, audit log), Pub/Sub, Cloud Scheduler",
        "Document AI (parsing and extraction)",
        "Seven purpose-built MCP tools",
      ],
      workflow: [
        { step: "Ask", detail: "A user asks a question through the enterprise AI client, connected to the MCP server as a tool provider." },
        { step: "Resolve identity", detail: "The MCP server calls the on-prem gateway to resolve the user's current AD group membership, or reads a fresh cache entry." },
        { step: "Retrieve & filter", detail: "The MCP server queries Qdrant for semantically relevant document chunks, then filters results to only those the user's permissions actually allow." },
        { step: "Assemble answer", detail: "Document AI's extracted content and Cloud SQL metadata assemble a cited answer; the AI client presents it with source references the user could open themselves." },
        { step: "Keep current", detail: "Pub/Sub and Scheduler keep the index current as documents change on-prem, without a full re-ingestion each time." },
        { step: "Audit", detail: "Every query and the permission decision behind it are logged to Cloud SQL for audit." },
      ],
      methodology:
        "Permission-awareness was designed as the first constraint, not a layer added after retrieval worked: the architecture resolves access before a document chunk is retrieved, not after, so a permission gap fails closed — nothing returned — rather than failing open. The seven MCP tools were scoped narrowly and individually, one tool per distinct action, rather than one general-purpose \"query\" tool, so the AI client's capability surface is auditable tool by tool.",
      security:
        "Active Directory remains the permission source of truth; the cloud retrieval layer never becomes an independent, unsynced permission store. The on-prem gateway and VPN mean no direct AD exposure to the public internet. Every retrieval call, including denied ones, is logged with the requesting identity. The design assumes read-only retrieval throughout — no MCP tool in this architecture writes back to the source file estate.",
      deployment:
        "This is a designed architecture, priced and proposed to a real enterprise client, not an implementation. No MCP server, gateway, Qdrant instance, or AI-client integration from this design has been built, tested, or demonstrated — the proposal covers architecture and cost, not a working system. Anyone adopting this pattern should expect the first build phase to validate the AD-permission-cache design under real group-membership complexity before anything else.",
      benefits: [
        "A permission-aware answer layer would let employees ask questions instead of guessing which folder holds the answer, with verifiable citations.",
        "A system that cannot show a user something their own AD membership wouldn't already let them open.",
        "Stated as design intent, not a measured result — nothing has been deployed to measure.",
      ],
      challenge:
        "Making permission-awareness fast enough for conversational use, without caching AD state so aggressively that a revoked permission stays effectively granted longer than acceptable, is the central design tension — the Cloud SQL cache plus Scheduler refresh is the proposed answer, not yet load-tested against real AD query volume. Scoping exactly seven tools — not three, not twenty — that give the AI client enough capability to answer most questions, without a catch-all tool that would undermine the permission-filtering design, required naming each capability precisely before any code existed.",
      statusDisclosure:
        "Status: Reference architecture. This design was proposed to an enterprise client as a priced solution document; it has not been built, piloted, or deployed. No MCP server, no Qdrant instance, no AD-permission-cache implementation, and no AI-client integration described above currently exists for any client. We label every component \"designed\" or \"proposed,\" never \"built\" or \"live,\" and will update this page if that changes.",
    },
    relatedCaseStudies: ["enterprise-ai-deployment-existing-it", "enterprise-data-ai-platform-architecture"],
    relatedCapabilities: ["custom-mcp-server-development"],
  },

  // 5 — reference
  {
    slug: "industrial-ai-vision-manufacturing-quality",
    title: "Industrial AI Vision for Manufacturing Quality",
    tagline:
      "An anomaly-first vision pattern for inspecting every unit at takt time, generalised from a real marking-depth monitoring concept — no pilot has run.",
    category: "reference",
    statusLabel: "Reference architecture / concept — no pilot",
    pillar: "ai-engineering",
    disclosure: DISCLOSURE.reference,
    architecture: [
      "3D laser profiler / 2D camera",
      "Anomaly-first edge model",
      "Operating point: pass / flag / reject",
      "Bounded PLC closed-loop compensation",
      "Quality dashboard",
    ],
    sections: {
      businessContext:
        "A manufacturing line produces a visible or dimensional quality characteristic that matters enough to inspect every unit — a surface mark, a dimensional tolerance, a coating thickness — but inspecting it by hand is slow, inconsistent between operators, and happens after the part has already moved several stations down the line. This page describes a vision-based quality monitoring pattern we designed for that kind of problem, generalized from a real concept document we produced for a marking-depth monitoring application. It is a pattern, not a delivered system.",
      operationalProblem:
        "Manual or sample-based inspection catches some defects late and misses others entirely between samples. A line running at takt time has no human time budget to inspect every unit thoroughly, and a defect that escapes inspection becomes a customer-facing problem or a recall exposure well after the line has moved on.",
      whyInsufficient:
        "Fixed-threshold machine vision — a single pass/fail rule on brightness or edge position — breaks the first time lighting drifts, a new part variant appears, or the defect mode is subtler than the rule anticipated. A system also can't be trained the normal supervised-learning way on \"defect\" examples, because a well-run line is designed to produce as few defects as possible — real defect samples are scarce precisely because the process is working, the opposite of what a conventional classifier needs to learn well.",
      proposedSolution:
        "An anomaly-first vision model: train primarily on what a good part looks like, from 3D and/or 2D sensing appropriate to the characteristic being checked, and flag deviation from that learned baseline rather than requiring a large labelled set of defect examples. Pair the model with a defined operating point — a confusion matrix at a chosen threshold, not a single accuracy number — so a plant can see the actual trade-off between false rejects (good parts flagged bad) and escapes (bad parts missed) and choose where to sit on that curve. Where the inspected characteristic can be corrected in-process, add a bounded closed-loop compensation step that adjusts the process within defined limits, never open-ended.",
      architectureDiagram: `
  Line station                 Edge compute                    Plant / enterprise
┌─────────────────┐    ┌───────────────────────────┐   ┌───────────────────────────┐
│ 3D laser profiler │    │ Anomaly-first model          │   │ Quality dashboard           │
│ and/or 2D camera   │───▶│ (trained on conforming        │──▶│ confusion matrix at the      │
│ at the inspected   │    │ parts; flags deviation)       │   │ chosen operating point,       │
│ characteristic     │    │                               │   │ trend over time               │
└─────────────────┘    │ Decision at the chosen        │   └───────────────────────────┘
                          │ operating point:              │
                          │ pass / flag / reject           │
                          └──────────────┬────────────┘
                                          │
                        flagged within bounded limits
                                          ▼
                          ┌───────────────────────────┐
                          │ PLC closed-loop compensation │
                          │ (bounded recipe adjustment —  │
                          │  only within pre-defined       │
                          │  safe limits, logged every     │
                          │  time it acts)                 │
                          └───────────────────────────┘`,
      integrations:
        "Sensing: a 3D laser line profiler, a 2D vision camera, or both, chosen by what the inspected characteristic actually requires. Edge inference: the model runs at or near the line, because a reject or compensation decision at takt time can't tolerate a cloud round-trip; model artefacts are versioned and the operating point is a config value, not a hard-coded constant. Process control: where closed-loop compensation applies, the edge system writes a bounded adjustment to the PLC, which enforces hard limits independent of the model. Reporting: confusion-matrix and trend data roll up to a plant dashboard for quality engineering, not just a pass/fail count.",
      techStack: [
        "3D laser line profiling hardware",
        "2D machine-vision camera",
        "Anomaly-detection model (one-class or similarity-based)",
        "Edge inference hardware co-located with the line",
        "PLC integration for closed-loop action",
        "Confusion-matrix and trend reporting layer",
      ],
      workflow: [
        { step: "Sense", detail: "Each unit passes the sensing station; 3D and/or 2D data is captured at line speed." },
        { step: "Score", detail: "The edge-hosted anomaly model scores the unit against its learned baseline of conforming parts." },
        { step: "Decide", detail: "The score is compared to the operating point for that line and defect class; the unit is passed, flagged for review, or rejected." },
        { step: "Compensate (bounded)", detail: "If closed-loop compensation is configured, a bounded adjustment is proposed to the PLC, which enforces its own independent safety limits before applying it." },
        { step: "Log", detail: "Every decision and any compensation action is logged with the sensor data that produced it, for traceability and retraining review." },
        { step: "Track drift", detail: "Confusion-matrix performance at the chosen operating point is tracked over time on the quality dashboard, so drift shows up before it becomes a complaint." },
      ],
      methodology:
        "The model design starts from the constraint, not the ambition: real defect examples will be rare on a well-run line, so the model has to learn what \"normal\" looks like first and treat deviation as the signal, rather than waiting for enough labelled defects to train a conventional classifier. The operating point is chosen deliberately and shown as a confusion matrix — true positive, false positive, true negative, false negative counts at that threshold — because a single accuracy percentage hides exactly the trade-off a plant needs to see before accepting the system. Any closed-loop action is scoped to a bounded adjustment range agreed before deployment, never an open-ended \"let the model tune the process.\"",
      security:
        "Inference stays at the edge, so sensor imagery and process parameters don't have to leave the plant network for a pass/fail decision to be made. Closed-loop compensation is bounded independently of the model — the limits live in the PLC or a supervisory layer the model cannot override — so a model failure mode degrades to \"flag for human review,\" not \"push the process somewhere unsafe.\" Every decision is logged against the sensor data that produced it, which is what makes a later root-cause investigation possible.",
      deployment:
        "This is a concept, generalized from a real solution-concept document we produced for a marking-depth monitoring application in an automotive context. No code, model, dataset, or hardware pilot has been built from this design for any client, in automotive or any other manufacturing sector. Standing this up for a real line would start with a short feasibility phase: define the defect taxonomy and the cost of a false reject versus an escape for that specific characteristic, capture a real dataset of conforming (and, if available, non-conforming) parts, and only then commit to model architecture and the edge hardware it needs to run on.",
      benefits: [
        "Inspecting every unit rather than a sample, at a stated and chosen operating point rather than an unexplained pass/fail.",
        "Earlier defect detection and a quantified basis for deciding how aggressive to set the inspection threshold.",
        "Describing intent, not a measured result — no pilot has run, so there is no accuracy, false-reject-rate, or cost figure to report yet.",
      ],
      challenge:
        "Anomaly-first modeling is harder to validate than ordinary supervised classification precisely because there usually isn't a large defect dataset to validate against — the model's real test is how it behaves on the rare defect examples that do exist and on drift in the conforming baseline over time, not a held-out test split that looks like training data. Choosing and defending an operating point that balances false rejects against escapes requires the inspected characteristic's actual cost structure, not a default threshold, and that number comes from the client's process, not from the model. Bounding a closed-loop compensation step so it helps without ever becoming open-ended process control is as much a controls-engineering problem as a modeling one.",
      statusDisclosure:
        "Status: Reference architecture / concept. The pattern above generalizes a real solution-concept document produced for a marking-depth monitoring application in an automotive context; no model, code, dataset, or hardware pilot has been built or tested from it, for that application or any other manufacturing-quality application. We label this page \"concept\" throughout and will not describe it as built, deployed, or piloted until a real engagement produces one of those.",
    },
    relatedCapabilities: ["industrial-ai-vision", "quality-assurance-automation"],
  },

  // 6 — illustrative
  {
    slug: "multi-agent-enterprise-workflows",
    title: "Multi-Agent Enterprise Business Workflows",
    tagline:
      "Narrowly scoped agents triage a purchase-to-pay exception queue; every consequential action still waits on a named human — illustrative, not deployed.",
    category: "illustrative",
    statusLabel: "Illustrative scenario — not deployed",
    pillar: "ai-engineering",
    disclosure: DISCLOSURE.illustrative,
    architecture: [
      "SAP: PO / GRN / invoice / QM data (read-only)",
      "Exception Intake Agent",
      "Three-Way-Match & Quality-Hold Agent",
      "Vendor/Internal Query Drafting Agent",
      "Human checkpoint (approve / edit / reject)",
      "Release Preparation Agent",
    ],
    sections: {
      businessContext:
        "A mid-size manufacturer buys raw material and components against purchase orders raised in SAP, receives them against a goods-receipt note, and pays against a matching invoice — the standard three-way match. When all three agree, payment is routine. When they don't — a price variance, a quantity short-ship, a late invoice, or a quality hold on incoming material — someone in Procurement, Finance, or Quality has to chase it down, today over email, with no shared view of where a given exception actually is. No manufacturer named or implied in this scenario is a real client.",
      operationalProblem:
        "A purchase-to-pay exception touches three functions that don't share a single queue: Procurement knows the PO and vendor history, Finance knows the invoice and payment terms, Quality knows whether an incoming-material hold is still open. An exception sits in whichever inbox someone last looked at, and a payment can get released before a quality hold clears, or held indefinitely after a hold has actually been lifted, simply because nobody connected the two events.",
      whyInsufficient:
        "A shared spreadsheet or a generic ticketing queue can hold the exception list, but someone still has to read each PO, GRN, and invoice, decide what kind of exception it is, check whether a quality hold applies, and draft whatever chaser email or clarification is needed — the triage work, not just the tracking, is what consumes the time. Automating the match itself is good practice, but it doesn't handle the judgment calls: is this variance within tolerance, is this vendor worth chasing by phone instead of email, does this hold block payment or just the goods-receipt step.",
      proposedSolution:
        "A small set of narrowly scoped agents, each with read access to specific SAP data and a specific, limited action it can take, cooperating on one exception queue, with a named human approver who must sign off before anything the agents propose leaves the sandbox — before a vendor email sends, before a PO amendment is applied, before a payment batch releases. No agent in this pattern has standing write access to SAP; every write is a human-approved action the agent prepares but does not execute. Gartner's research puts the agentic-AI failure rate in context: more than 40% of agentic AI projects are expected to be cancelled before the end of 2027, largely over unclear value and inadequate risk controls — that finding shapes this design directly. Every agent below has a narrow tool scope and a human checkpoint before anything leaves the sandbox, not broad autonomy for its own sake.",
      architectureDiagram: `
                         ┌─────────────────────────────┐
                         │  SAP: PO, GRN, invoice,        │
                         │  QM inspection-lot data          │
                         │  (read-only access for agents)   │
                         └───────────────┬─────────────┘
                                          │
                                          ▼
              ┌────────────────────────────────────────────┐
              │  Exception Intake Agent                       │
              │  tool scope: read PO/GRN/invoice, classify      │
              │  exception type, write to exception queue       │
              │  (no SAP writes, no outbound email)              │
              └───────────────────┬────────────────────────┘
                                   ▼
              ┌────────────────────────────────────────────┐
              │  Three-Way-Match & Quality-Hold Agent          │
              │  tool scope: read-only SAP query (PO/GRN/       │
              │  invoice variance, QM inspection-lot status),    │
              │  write variance detail + hold status to queue   │
              └───────────────────┬────────────────────────┘
                                   ▼
              ┌────────────────────────────────────────────┐
              │  Vendor/Internal Query Drafting Agent           │
              │  tool scope: draft clarification email or        │
              │  internal note from queue data — draft only,      │
              │  cannot send; output lands in a human's outbox     │
              └───────────────────┬────────────────────────┘
                                   ▼
                      ┌─────────────────────────┐
                      │   HUMAN CHECKPOINT          │
                      │   named approver reviews:   │
                      │   draft, variance, hold       │
                      │   status — approves, edits,   │
                      │   or rejects                  │
                      └────────────┬────────────┘
                                   ▼  (approved only)
              ┌────────────────────────────────────────────┐
              │  Release Preparation Agent                     │
              │  tool scope: assemble the approved payment      │
              │  batch or PO-amendment package for SAP —         │
              │  prepares only; a human in Finance executes       │
              │  the release/amendment inside SAP itself           │
              └────────────────────────────────────────────┘`,
      integrations:
        "Input: SAP purchase order, goods-receipt, invoice, and QM inspection-lot data, read-only for every agent in this pattern. Internal: an exception queue — a structured datastore, not a shared inbox — that every agent reads from and writes structured updates to rather than passing free-text between agents. Human-facing: an approval interface where the named approver sees exactly what each agent found and drafted, with one-click approve, edit, or reject. Outbound: vendor and internal emails send only after human approval; no agent holds outbound-send permission.",
      techStack: [
        "Orchestration layer coordinating four narrowly scoped agents",
        "Structured exception-queue datastore",
        "Read-only SAP integration (no write-back path in this design)",
        "Human-approval interface with full audit logging",
      ],
      workflow: [
        { step: "Classify", detail: "A three-way mismatch or quality hold appears in SAP; the Exception Intake Agent reads the relevant records and classifies the exception type (price variance, quantity variance, late invoice, quality hold, or a combination)." },
        { step: "Check", detail: "The Three-Way-Match & Quality-Hold Agent pulls the specific variance figures and checks whether an open QM inspection-lot hold applies, writing both to the exception queue." },
        { step: "Draft", detail: "The Vendor/Internal Query Drafting Agent drafts the appropriate communication from the queue data, and stops." },
        { step: "Approve", detail: "The named human approver reviews the classification, variance, hold status, and draft together, and approves, edits, or rejects." },
        { step: "Release (approved only)", detail: "Only on approval does a communication send, or does the Release Preparation Agent assemble a payment-batch or PO-amendment package." },
        { step: "Execute (human)", detail: "A human in Finance or Procurement executes the actual SAP action — no agent in this pattern has that permission." },
        { step: "Audit", detail: "Every step, every agent's output, and every human decision is logged to the audit trail tied to that exception." },
      ],
      methodology:
        "Each agent's tool list was scoped before its prompt was written: what it can read, what it can write, and explicitly what it cannot do (send email, write to SAP, release payment). That scoping is the actual design artefact, not the prompt wording — a narrowly tooled agent with a mediocre prompt is safer than a broadly tooled agent with a careful one, because the tool boundary holds even when the model's judgment doesn't. The human checkpoint sits at the one place in the workflow where a wrong decision has a real cost, not scattered as a rubber-stamp step at every stage.",
      security:
        "No agent in this pattern holds write access to SAP or outbound-send permission — every consequential action is human-executed. Full audit logging ties every proposed action to the agent that produced it and the human decision that followed, which is what lets a reviewer answer \"why did this payment release\" without reconstructing the exception from email threads afterward. Tool outputs — including anything an agent reads from a vendor email or attached document, in a fuller version of this pattern — would be treated as untrusted content, not instructions, to guard against prompt injection through the documents these agents process.",
      deployment:
        "This is an illustrative scenario: no client has deployed this exact workflow, no agent described here has processed a real transaction, and no outcome below is a measured result. It is realistic in structure — the exception types, the SAP objects involved, and the agent-scoping approach reflect how we would actually build this — but it is a design exercise, written to show engineering approach, not a claim that a manufacturer is running it today.",
      benefits: [
        "Would move the triage work — classify, check, draft — to agents while keeping every consequential decision with a named human.",
        "Answers the two real fears buyers have about agentic systems: that an agent might do something costly on its own, and that nobody could explain afterward why it did.",
        "No time-saved or cost-saved figure is stated — this is a scenario, not a deployment, and no figure would be honest to publish.",
      ],
      challenge:
        "Scoping four agents narrowly enough that each is individually auditable, while still having them cooperate on one exception without constant human hand-offs between every step, is a genuine design tension — too narrow and a human has to stitch the pieces together manually anyway; too broad and the tool-boundary discipline that makes the pattern trustworthy erodes. Treating documents and emails the agents read as untrusted content, not instructions, matters precisely because a vendor's email or attached invoice is exactly the kind of external input an attacker, or an honest mistake, could use to try to manipulate an agent's next action — the drafting agent's inability to send, and the approver's checkpoint, are what contain that risk even if an individual agent is fooled.",
      statusDisclosure:
        "Status: Illustrative scenario — not a completed customer deployment. No manufacturer has deployed this workflow; the scenario is fictional-but-realistic, built to show how we would scope and govern a cooperating multi-agent system for a real enterprise exception-handling problem, not to claim a delivered result. Every number and outcome above is a design intention, not a measurement. We would only describe a version of this as \"deployed\" after a real client engagement produced one.",
    },
    relatedCapabilities: ["ai-agentic-systems"],
  },

  // 7 — implementation
  {
    slug: "intelligent-inventory-reconciliation",
    title: "Intelligent Inventory Reconciliation",
    tagline:
      "The Finance-facing review workflow that decides whether to trust an automated number — the operational-workflow view of the SAP exports engagement.",
    category: "implementation",
    statusLabel: "Prototype — in User Acceptance Testing",
    pillar: "ai-operations-automation",
    disclosure: DISCLOSURE.implementation,
    architecture: [
      "Engine output workbook",
      "Customer's own workbook",
      "Finance UAT interface — column match",
      "Open-query log",
      "Sign-off gate (not yet passed)",
    ],
    sections: {
      businessContext:
        "A manufacturer closes inventory every month against four SAP-export-driven report families (ageing, inventory holding, finished-goods-and-bulk, carriage inwards). A calculation engine now produces those reports automatically — see the companion case study, SAP Exports to Manufacturing Intelligence Platform, for the underlying data platform. Producing the numbers and getting Finance to accept them are two different problems; this page is about the second one.",
      operationalProblem:
        "An automated engine replacing a manual spreadsheet process doesn't earn trust by running — it earns trust by being checked, the same way a new analyst's first month of output would be checked. Before this workflow existed, the only way Finance could verify an automated number was to re-derive it by hand, which defeats the purpose of automating it in the first place.",
      whyInsufficient:
        "Spot-checking a handful of rows and calling a month \"probably fine\" is not a close process a finance function can stand behind. A systematic review needs to cover every column, not a sample, and it needs to produce a record of what was checked, what disagreed, and why — not a verbal \"looks right\" that evaporates the next month when someone asks how a number was reached.",
      proposedSolution:
        "A dedicated Finance-facing review workflow that runs a column-by-column match between the engine's output and the customer's own workbook for the same period, routes every discrepancy into an open-query log tagged to a specific rule or data gap, and gates sign-off behind Finance explicitly accepting the result — nothing is treated as final until that happens.",
      architectureDiagram: `
  Calculation engine output          Customer's own workbook
  (see companion case study)          (same period, independent)
            │                                   │
            └───────────────┬───────────────────┘
                             ▼
                  ┌─────────────────────────┐
                  │  Finance UAT interface    │
                  │  column-by-column match   │
                  └─────────────────────────┘
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
         Columns match              Columns disagree
         (exact or within                 │
          tolerance)                      ▼
                 │              ┌─────────────────────┐
                 │              │  Open-query log       │
                 │              │  tagged to a rule or   │
                 │              │  data gap              │
                 │              └─────────────────────┘
                 │                       │
                 │              Finance reviews: confirm
                 │              the rule, or flag for a
                 │              decision
                 ▼                       ▼
            ┌─────────────────────────────────┐
            │     Sign-off gate (not yet passed) │
            └─────────────────────────────────┘`,
      integrations:
        "Input: the engine's reconciled output workbook for a given period, and the customer's own workbook for the same period — two independent sources of the same month, not one trusted blindly. Internal: the UAT interface runs the column match and writes discrepancies into the open-query log, each entry tagged to a specific rule or input believed responsible. Human-facing: Finance reviews the open-query log directly, closes queries by confirming the rule behind them, or leaves them open and flagged for a decision that hasn't been made yet.",
      techStack: [
        "Purpose-built Finance UAT web interface",
        "Sits on top of the engine output from the companion case study",
        "Deterministic value comparison with defined tolerance bands — no model in the matching logic",
      ],
      workflow: [
        { step: "Run engine", detail: "The calculation engine completes a run for the period (see the companion case study for how)." },
        { step: "Build workbook", detail: "The workbook-builder produces the reconciled report workbook." },
        { step: "Load both", detail: "The UAT interface loads that workbook alongside the customer's own workbook for the same period." },
        { step: "Match columns", detail: "A column-by-column match runs: exact matches, near-matches within tolerance, and mismatches are each flagged distinctly." },
        { step: "Open queries", detail: "Every mismatch opens an entry in the query log, tagged to the rule or input believed responsible." },
        { step: "Finance review", detail: "Finance works the open-query log: confirms the rule is correct and closes the query, or leaves it open pending a decision." },
        { step: "Track open items", detail: "As of the most recent run, 9 Finance queries remain open. One is material: a gap in the provisioning rule that affects the result enough to block sign-off on its own. No figure for that gap's size is disclosed on record." },
        { step: "Sign off (pending)", detail: "A month's output is only treated as accepted once the query log clears and Finance signs off explicitly. That point has not yet been reached." },
      ],
      methodology:
        "The discipline is the same one described in the companion case study: every rule the engine applies was extracted and logged individually from the customer's existing workbook logic, not reverse-engineered in bulk and assumed correct. This page extends that discipline into the review step — a discrepancy is routed to the rule it implicates, not dismissed as noise or waved through because the deadline is close.",
      security:
        "No SAP credentials or connectivity are involved in this workflow — it compares two already-produced workbooks. Every query opened and closed is logged against the specific rule it concerns, so the review record shows not just that a month was checked, but exactly what was checked and what was found.",
      deployment:
        "This workflow runs alongside the existing manual close, not in place of it, while Finance builds confidence in the engine's output. It has not replaced the manual process and has not reached production sign-off.",
      benefits: [
        "A systematic, repeatable verification step instead of ad hoc spot-checking.",
        "Every disagreement between the engine and the customer's own workbook gets a name, an owner, and a resolution path instead of disappearing into \"that's just how the close has always worked.\"",
        "No time or cost figure is stated — none has been measured, and none exists on record for this workflow.",
      ],
      challenge:
        "The review has to scale to a workbook built from hundreds of thousands of formula-equivalents without collapsing back into \"someone looks at everything by hand,\" which is the exact problem the engine was built to remove. Making every discrepancy legible — which rule, which input, which period — rather than presenting Finance with an unexplained wall of mismatched numbers is the actual engineering work in this layer.",
      statusDisclosure:
        "Status: Prototype, in User Acceptance Testing — the same status as the companion data-platform case study, because this is the review layer of that same engagement, not a separate delivered project. Nine Finance queries are currently open, one of them material (a provisioning-rule gap). Finance sign-off has not been given. This page will be updated when that status changes. We do not describe this workflow as \"signed off\" or \"in production\" — it is not yet either.",
    },
    relatedCaseStudies: ["sap-exports-manufacturing-intelligence-platform", "enterprise-data-quality-reconciliation-engine"],
    relatedCapabilities: ["intelligent-automation"],
  },

  // 8 — implementation (financial-intelligence-platform — existing live slug, corrected content)
  {
    slug: "financial-intelligence-platform",
    title: "Finance Intelligence and Automated Financial Operations",
    tagline:
      "A deterministic-first pipeline that turns scattered bank alerts and statement PDFs into one dashboard — for an individual managing several personal businesses.",
    category: "implementation",
    statusLabel: "Implemented and in use",
    pillar: "ai-operations-automation",
    disclosure: DISCLOSURE.implementation,
    architecture: [
      "Gmail inboxes + statement PDFs",
      "n8n trigger / router",
      "Regex-first parser, LLM fallback",
      "Dedupe + merchant-memory categorisation",
      "Supabase backend (RLS)",
      "10-module dashboard",
    ],
    sections: {
      businessContext:
        "The client is an individual managing multiple personal businesses, each generating its own stream of bank alerts, card statements, and email notifications across separate accounts. Financial visibility was split across inboxes and PDFs, with no single place to see spend across accounts and businesses together. This page replaces an earlier public version of this case study, which stated an unsupported monthly time-saved figure and an unsupported fee-leakage detection claim. Neither claim is supported by anything on record — no time study, log, or client statement exists for the first, and no leakage-detection logic was found for the second. Both are withdrawn here, not restated. The client is also corrected: this is not an enterprise finance team.",
      operationalProblem:
        "Tracking transactions by hand across several accounts and businesses means re-reading alert emails and statement PDFs one at a time, categorising each charge from memory, and trying to reconstruct a current picture of spend that nobody keeps reliably up to date. A missed alert means a transaction with no record until the statement eventually arrives.",
      whyInsufficient:
        "Bank and card portals each show their own slice of activity; none of them shows transactions across multiple accounts and businesses in one place. Manual categorisation drifts — the same merchant gets tagged differently over time depending on who's doing it and when — and there is no systematic way to catch a transaction that was never recorded at all.",
      proposedSolution:
        "A pipeline that watches the inboxes themselves for bank alerts and statement PDFs, extracts transaction data deterministically wherever possible, falls back to an LLM only for cases the deterministic parser can't resolve with confidence, remembers how a merchant has been categorised before, and writes everything into a single backend that a purpose-built dashboard reads from.",
      architectureDiagram: `
  Gmail inboxes              Bank/card statement PDFs
       │                              │
       └───────────┬──────────────────┘
                    ▼
        ┌─────────────────────────┐
        │  Trigger / router         │
        │  workflow (n8n)            │
        └─────────────────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │  Regex-first parser        │
        │  LLM fallback for          │
        │  genuinely ambiguous cases │
        └─────────────────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │  Dedupe + merchant-memory  │
        │  categorisation            │
        └─────────────────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │  Supabase backend          │
        │  (schema, RLS)              │
        └─────────────────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │  10-module dashboard        │
        │  transactions, statements, │
        │  categories, merchants,    │
        │  clients, accounts,        │
        │  credit cards, analytics,  │
        │  drill-down, CSV export    │
        └─────────────────────────┘`,
      integrations:
        "Input: Gmail-delivered bank/card alerts and statement PDFs — not a manual upload step. Internal: a regex-first extraction layer handles the common, well-structured case deterministically; an LLM (Gemini) is invoked only as a fallback for cases the regex parser can't resolve with confidence; a dedupe check and merchant-memory layer apply before anything is written to Supabase. Human-facing: a 10-module dashboard — transactions, statements, categories, merchants, clients, accounts, credit cards, analytics, drill-down, and CSV export, with cross-filtering across modules. Coverage: the project's own requirements call for coverage across multiple card issuers and inboxes — a design requirement, not a confirmed delivered count; this page states it as \"designed to cover multiple card issuers and inboxes,\" not a specific number.",
      techStack: [
        "n8n (inbox-triggered ingestion and routing)",
        "Regex-first deterministic parsing core",
        "Gemini as an LLM fallback for ambiguous parses only",
        "Supabase (Postgres with row-level security, user-scoped writes)",
        "Purpose-built frontend dashboard",
      ],
      workflow: [
        { step: "Arrive", detail: "A bank alert or statement PDF lands in a watched inbox." },
        { step: "Route", detail: "A router workflow triggers ingestion." },
        { step: "Parse", detail: "The regex-first parser attempts extraction." },
        { step: "Fallback", detail: "Cases the parser can't resolve with confidence fall back to the LLM." },
        { step: "Dedupe", detail: "A dedupe check runs against existing records." },
        { step: "Categorise", detail: "Merchant-memory applies prior categorisation if the merchant has been seen before; if not, it's categorised and the categorisation is remembered for next time." },
        { step: "Write", detail: "The record is written to Supabase." },
        { step: "Dashboard", detail: "The dashboard reads live from Supabase across its 10 modules, with drill-down, CSV export, and cross-filtering." },
      ],
      methodology:
        "The core design decision is deterministic-first parsing: regex handles the common, well-structured case, and the LLM is invoked only where the parser genuinely cannot resolve a case with confidence. This keeps most transactions traceable to a parsing rule rather than to a model inference, which matters both for auditability and for cost and latency. Multi-issuer and multi-inbox coverage is built into the design as a requirement; it is not restated here as a delivered, confirmed count.",
      security:
        "Supabase row-level security scopes data access per user. Because the client is a single individual across several personal businesses rather than a shared enterprise team, the access model reflects that scope rather than a multi-seat organisational permission structure.",
      deployment:
        "The platform is implemented and in use by the client. Hosting details and day-to-day production operating status beyond \"in use\" are not confirmed on the record available to us — this page states that plainly rather than implying a fuller operational picture than is known.",
      benefits: [
        "A single place to see transactions across accounts and businesses, instead of per-portal visibility.",
        "Categorisation applied consistently through merchant memory instead of manual re-tagging each time a statement arrives.",
        "No time-saved or leakage-detection figure is stated — neither has been measured, and this page does not repeat the earlier unsupported claims.",
      ],
      challenge:
        "Building a parser robust enough across the different formats used by different card issuers and alert templates that the common case resolves deterministically, while reserving the LLM — with its added cost, latency, and audit overhead — for the genuinely ambiguous remainder. Keeping merchant memory accurate as new merchants and new statement formats appear over time is an ongoing part of that same problem, not a one-time build task.",
      statusDisclosure:
        "Status: Implemented and in use by the client. The client is an individual managing multiple personal businesses — not an enterprise finance team, and this page does not describe it that way. Hosting and day-to-day production status beyond \"in use\" are unconfirmed; this page will be updated once that is established. This page no longer states the unsupported monthly time-saved figure or the unsupported fee-leakage detection claim that appeared on an earlier public version of this case study — neither is supported by anything on record.",
    },
    relatedCapabilities: ["finance-operations", "intelligent-automation"],
  },

  // 9 — illustrative
  {
    slug: "ai-assisted-pharmaceutical-documentation-qa",
    title: "AI-Assisted Pharmaceutical Documentation and QA",
    tagline:
      "A drafting assistant for deviation and CAPA reports — never a disposition engine — grounded in draft EU GMP Annex 22 and 21 CFR Part 11. No real deployment exists.",
    category: "illustrative",
    statusLabel: "Illustrative scenario — not deployed",
    pillar: "ai-operations-automation",
    disclosure: DISCLOSURE.illustrative,
    architecture: [
      "New deviation logged in QMS",
      "Classification model (static, version-pinned)",
      "Similarity search over history",
      "LLM draft root-cause + CAPA (version-pinned)",
      "Human QA reviewer: edit / approve / reject",
      "Immutable audit record",
    ],
    sections: {
      businessContext:
        "A pharmaceutical manufacturer logs a quality deviation — a batch parameter out of range, a process step missed, a specification not met. Someone in QA has to classify it, check whether anything similar has happened before, draft a root-cause narrative and a CAPA (corrective and preventive action) outline, and route it for review. This is the scenario this page designs for. No pharmaceutical QA or documentation project exists on our record; this page describes how we would design such a system, with no real client, deployment, or measured outcome implied anywhere below.",
      operationalProblem:
        "Deviation drafting starts from a blank page each time, even when a similar deviation happened six months ago under a different batch number. Finding that prior case usually depends on whether the reviewer remembers it or happens to search for the right term. Backlogs build when drafting time competes with actual investigation time.",
      whyInsufficient:
        "A QMS stores deviation records, but storing them is not the same as surfacing the right prior case at the moment a new one is logged. Manual keyword search misses paraphrased or differently-categorised prior deviations. None of this is a data problem the quality unit can fix by working harder — it's a retrieval and drafting problem, and retrieval and drafting are exactly what decision-support tooling is for, within a hard boundary on what it's allowed to decide.",
      proposedSolution:
        "A drafting assistant, not a disposition engine. A new deviation report triggers: a suggested classification, a ranked list of similar historical deviations, and a draft root-cause and CAPA outline — all presented to a human QA reviewer as a first pass to edit, approve, or reject. Nothing produced by the system enters the real quality record until a qualified reviewer has acted on it. This boundary is a design principle, not a disclaimer: the system never disposes a deviation and never approves a CAPA. It drafts. Every draft is attributable to a specific model version, a specific prompt, and the human who reviewed it. That boundary tracks the draft EU GMP Annex 22 position directly: generative AI and LLMs are not proposed for critical GMP applications, and are permitted for non-critical applications only with a qualified human responsible for the outcome. Deviation/CAPA drafting is treated here as the non-critical, human-in-loop case Annex 22's draft text describes.",
      architectureDiagram: `
  New deviation report logged in QMS
                │
                ▼
     ┌─────────────────────────┐
     │  Classification model     │
     │  (static, version-pinned) │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  Similarity search over   │
     │  historical deviation      │
     │  records                   │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  Draft root-cause + CAPA   │
     │  outline (LLM, version-    │
     │  pinned, prompt logged)    │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  Human QA reviewer:         │
     │  edit / approve / reject    │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  Immutable audit record:   │
     │  model version, prompt,    │
     │  reviewer, timestamp        │
     └─────────────────────────┘
                │
                ▼
     Only on approval: enters the real QMS record`,
      integrations:
        "Input: a new deviation record as logged in the client's existing QMS (illustrative examples of the kind of system this would sit beside include Veeva Vault QMS, TrackWise, or MasterControl — we are not a QMS vendor and this design does not replace a validated system). Internal: a static, version-pinned classification model; a similarity search index over historical deviation records; an LLM used only for the drafting step, with its model version and exact prompt logged alongside every draft. Human-facing: a review interface where the QA reviewer sees the draft, the similar-case evidence behind it, and edits, approves, or rejects — nothing is auto-submitted.",
      techStack: [
        "Static, locked classification model (no in-production learning)",
        "Similarity-search layer over historical deviation text",
        "Version-pinned LLM for narrative drafting only",
        "Immutable audit-trail store satisfying 21 CFR Part 11 and ALCOA+",
      ],
      workflow: [
        { step: "Log", detail: "A deviation is logged in the QMS as it is today — no change to how the deviation itself is captured." },
        { step: "Suggest category", detail: "The classification model suggests a category; it is a suggestion, not a final field write." },
        { step: "Find similar cases", detail: "The similarity search surfaces ranked historical deviations judged relevant to the new one." },
        { step: "Draft", detail: "The LLM drafts a root-cause narrative and a CAPA outline from the deviation text and the similar cases retrieved." },
        { step: "Present", detail: "The draft, the similar-case evidence, the model version, and the exact prompt used are all presented together to a human QA reviewer." },
        { step: "Review", detail: "The reviewer edits, approves, or rejects the draft. Rejection sends it back with no record entered." },
        { step: "Enter record (approved only)", detail: "Only on approval does anything enter the real deviation/CAPA record — attributed to the reviewer, the model version, and the prompt that produced the draft they approved." },
        { step: "Audit", detail: "The audit record itself (model version, prompt, retrieved context, output, reviewer, timestamp) is written immutably, exportable for inspection." },
      ],
      methodology:
        "Static, version-pinned models throughout — no component that learns or adapts in production without a controlled change-control step, the posture the draft Annex 22 text and GAMP guidance on AI both point toward. Every drafting step logs its inputs and outputs before the human ever sees them, so the audit record exists regardless of what the reviewer ultimately decides. The system is scoped narrowly on purpose: drafting and retrieval, never disposition.",
      security:
        "21 CFR Part 11 and EU Annex 11 apply to AI-assisted records within predicate-rule scope: audit trails, access control, and record retention are treated as first-class requirements, not an afterthought. ALCOA+ governs every record the system touches — nothing is silently overwritten, and every draft is attributable to a model version and a human. Vendor-hosted model weights and prompts can change on the provider's schedule; any such change is treated as a controlled change-control event, because accountability for the output stays with the manufacturer's quality unit regardless of which model produced the draft.",
      deployment:
        "This is designed to sit beside an existing QMS as a non-critical, human-in-loop drafting layer — not to replace the QMS, and not to touch release or disposition decisions, which the draft Annex 22 text treats as requiring static, deterministic, human-governed handling. As an illustrative scenario, no deployment exists; this section describes how it would be deployed, not how it has been.",
      benefits: [
        "Reviewers would start from a structured first draft and the relevant prior cases instead of a blank page and a manual search.",
        "The intended effect of the design, not a measured result.",
        "No deployment exists, so no time, backlog-reduction, or accuracy figure is claimed here, measured or otherwise.",
      ],
      challenge:
        "Keeping a similarity-search and drafting layer genuinely useful — surfacing cases that are actually relevant, not just lexically similar — without letting it drift into being treated as the real decision by a reviewer under deadline pressure. Keeping model-version, prompt, and reviewer attribution intact across every single draft, including rejected ones, so the audit trail is complete regardless of outcome.",
      statusDisclosure:
        "Status: Illustrative scenario. Not a real deployment, not a real client, and no measured outcome exists for this page. It is grounded in real regulatory text in draft at the time of writing (EU GMP draft Annex 22, with the final text targeted for Q4 2026 and its AI-in-GMP boundary still under discussion) and in established requirements (21 CFR Part 11, ALCOA+). This page will be revisited if that regulatory text finalises in a materially different form, and relabelled if a real deployment of this kind is ever built.",
    },
    relatedCapabilities: ["quality-assurance-automation", "document-intelligence"],
  },

  // 10 — implementation
  {
    slug: "spreadsheet-to-intelligent-business-applications",
    title: "Spreadsheet-Dependent Operations to Intelligent Business Applications",
    tagline:
      "Reverse-engineering a 25-tab, 17,061-formula workbook into a documented, oracle-verified pipeline — 95 logged decisions, nothing assumed.",
    category: "implementation",
    statusLabel: "Implemented and ongoing",
    pillar: "custom-software-development",
    disclosure: DISCLOSURE.implementation,
    architecture: [
      "Original workbook (25 tabs, 17,061 formulas)",
      "Formula-by-formula forensic review",
      "Decision log (D-001..D-095)",
      "Open-business-rule register",
      "Independent oracle re-implementation",
      "Diff vs. original output",
    ],
    sections: {
      businessContext:
        "A monthly reporting process ran entirely inside a single spreadsheet, built up incrementally over years by whoever needed the next number next month. The workbook: 25 tabs, 17,061 formulas, two native pivot tables. It was never built to be read or audited by anyone other than the person who last edited it. This case study covers the reverse-engineering discipline behind one of our governed-pipeline builds; a different angle on the same underlying platform migration — the baseline-and-cutover story — is covered in the companion case study, Legacy ERP Process Modernisation.",
      operationalProblem:
        "Nobody other than the workbook's original author could say with confidence what a given number in it actually depended on. Formulas referenced other formulas across tabs with no documentation of intent, and a pivot table's behaviour under edge cases was understood, if at all, only by trial and error. The workbook worked — until someone needed to know why it worked, or needed it to run somewhere else.",
      whyInsufficient:
        "Copying the formulas into a new system and calling it \"migrated\" would silently inherit every undocumented assumption and every past mistake as permanent logic. There was no independent way to check the workbook against anything other than itself — it was both the process and the only record of the process, a single point of failure dressed up as a reporting tool.",
      proposedSolution:
        "Treat the spreadsheet as a specification to be reverse-engineered rule by rule, not copied. Every confirmed calculation rule is logged individually in a decision log — D-001 through D-095, roughly 95 logged decisions — rather than assumed correct in bulk. Anything ambiguous or undocumented in the original workbook is logged in an open-business-rule register and raised for the client to decide, never silently guessed. Every logged rule is then independently re-implemented in a separate oracle and diffed against the workbook's own output, so nothing is trusted on a single transcription.",
      architectureDiagram: `
   Original workbook
   (25 tabs, 17,061 formulas,
    2 native pivots)
            │
            ▼
  ┌──────────────────────────┐
  │  Formula-by-formula          │
  │  forensic review              │
  └──────────────────────────┘
            │
   ┌────────┴────────┐
   ▼                   ▼
 Confirmed rule     Ambiguous / undocumented
   │                   │
   ▼                   ▼
 Decision log       Open-business-rule register
 (D-001..D-095)      (raised for client decision)
   │
   ▼
 Independent oracle re-implementation
   │
   ▼
 Diff against original workbook's own output
   │
   ▼
 Confirmed rule carried into the production pipeline`,
      integrations:
        "The reverse-engineering process works from the original workbook's own formulas and output as the ground truth to match against. Confirmed rules are carried into a governed pipeline that consumes the same inputs the spreadsheet process consumed; the decision log and open-rule register are maintained as living documents alongside the build, not a one-time artefact produced and then discarded.",
      techStack: [
        "Formula-forensics documentation process",
        "Independent oracle re-implementation of each confirmed rule, built separately so it can be diffed rather than assumed to agree",
        "Decision log and open-business-rule register as structured, versioned documents",
      ],
      workflow: [
        { step: "Examine", detail: "Each tab and each pivot table in the original workbook is examined formula by formula." },
        { step: "Log confirmed rules", detail: "Every confirmed rule is logged individually and numbered (D-001 through D-095)." },
        { step: "Flag ambiguity", detail: "Where the workbook's intent is ambiguous or undocumented, the rule goes into the open-business-rule register instead of being guessed, and is raised for the client to resolve." },
        { step: "Re-implement independently", detail: "Each logged, confirmed rule is independently re-implemented in a separate oracle — not just transcribed once from the formula and trusted." },
        { step: "Diff", detail: "The oracle's output is diffed against the original workbook's own output, column by column; a mismatch triggers investigation before the rule is marked confirmed." },
        { step: "Promote", detail: "Only rules that pass this round trip are carried into the production pipeline. Everything still open stays open until the client decides it." },
      ],
      methodology:
        "The governing rule is: never transcribe a formula once and trust it. Every rule that makes it into the decision log was independently re-implemented and diffed against the original workbook's actual output, not just read and copied. This produces a decision log that is itself the audit trail of the reverse-engineering work — separate from, and prior to, whatever run-time logging the resulting pipeline produces once it's operating.",
      security:
        "The decision log and open-business-rule register are durable, individually traceable artefacts. There is no single undocumented \"migration completed\" assertion standing in for proof — each of the roughly 95 logged decisions can be checked against the specific formula and the specific oracle diff that confirmed it.",
      deployment:
        "The resulting pipeline is implemented and operating against the confirmed rule set; items still logged in the open-business-rule register remain open until the client resolves them, and are not silently treated as settled in the meantime.",
      benefits: [
        "A spreadsheet that could only be trusted by the person who built it becomes a system whose every calculation traces to a numbered, confirmed decision.",
        "Unresolved questions are visible and logged rather than buried inside a formula nobody remembers writing.",
        "No time or error-reduction figure is stated — none has been measured and none exists on record for this engagement.",
      ],
      challenge:
        "Reverse-engineering 17,061 formulas across 25 tabs and two native pivots without silently inheriting the original author's undocumented assumptions requires treating every single rule as unproven until independently re-implemented and diffed — not reading the formula once and moving on. At this scale, the discipline of logging roughly 95 individual decisions rather than one bulk \"formulas reviewed\" sign-off is the actual engineering work, not a formality layered on top of it.",
      statusDisclosure:
        "Status: Implemented and ongoing. The decision log, the open-business-rule register, and the rule-to-oracle diffing described above are complete for the rules logged to date, and the resulting pipeline operates against that confirmed rule set. No measured customer outcome — time saved, error reduction, or otherwise — exists on record for this engagement. This page will be updated if that changes.",
    },
    relatedCaseStudies: ["legacy-erp-process-modernisation"],
    relatedCapabilities: ["custom-software"],
  },

  // 11 — implementation
  {
    slug: "legacy-erp-process-modernisation",
    title: "Legacy ERP Process Modernisation",
    tagline:
      "A dated baseline, a documented source-to-target mapping, and parity-tested cutover — moving a reporting layer off Google Sheets without touching SAP.",
    category: "implementation",
    statusLabel: "Implemented and ongoing",
    pillar: "custom-software-development",
    disclosure: DISCLOSURE.implementation,
    architecture: [
      "Old platform: Google Sheets / Apps Script",
      "Dated baseline snapshot (M0-Baseline)",
      "Source-to-target mapping",
      "New platform: Microsoft / SQL Server",
      "Parity test harness",
      "Acceptance criteria gate → cutover",
    ],
    sections: {
      businessContext:
        "A monthly reporting process sitting downstream of SAP export data had grown up inside a particular platform — a Google Sheets and Apps Script environment — over an extended period. That platform needed replacing with a more governed stack, without changing SAP itself and without losing continuity with what the process had always produced. Scope boundary, stated precisely: this modernises the reporting/process layer that sits on top of SAP export data — not SAP itself, and not any ERP code. \"ERP\" in this title refers to the legacy platform this reporting process depended on, not a change inside the ERP system of record. A different angle on this same underlying platform — the reverse-engineering of the reporting logic itself — is covered in the companion case study, Spreadsheet-Dependent Operations to Intelligent Business Applications.",
      operationalProblem:
        "The existing process's logic lived inside a specific platform's live definitions, with no durable, dated record of exactly what version of that logic was running at a given point in time. Migrating a process like that \"by eye\" — rebuild it on the new platform and hope it matches — risks silently changing the output in a way nobody notices until a month-end number doesn't reconcile.",
      whyInsufficient:
        "Without a frozen baseline of what the old platform actually produced for a given input, there is nothing fixed to test a new platform against. A migration with no baseline has no way to prove, after the fact, that nothing changed — only an assertion that it probably didn't.",
      proposedSolution:
        "Capture a dated baseline of the old platform's live definitions and execution payloads before any migration work starts. Build a documented source-to-target mapping as the platform changes. Write a migration plan with explicit, stated acceptance criteria. Run parity tests that confirm the new platform reproduces the old platform's output on the same inputs before cutover is permitted to happen.",
      architectureDiagram: `
   Old platform (Google Sheets / Apps Script)
   live definitions + execution payloads
                │
                ▼
     ┌─────────────────────────┐
     │  Dated baseline snapshot   │
     │  (M0-Baseline, captured    │
     │  before migration work)    │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  Source-to-target mapping  │
     │  (Google → Microsoft)      │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  New platform              │
     │  (Microsoft / SQL Server   │
     │  stack)                     │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  Parity test harness:       │
     │  same inputs through both  │
     │  platforms, outputs diffed │
     └─────────────────────────┘
                │
                ▼
     ┌─────────────────────────┐
     │  Acceptance criteria gate   │
     └─────────────────────────┘
                │
                ▼
             Cutover`,
      integrations:
        "Input: the same SAP export files the reporting layer already consumed before migration — no change to SAP, no new SAP connectivity introduced by this project. Baseline: a dated snapshot of the old platform's live definitions and execution payloads, captured before any migration work began. Mapping: a documented source-to-target mapping translating the old platform's sheet- and script-level constructs to their equivalents on the new platform.",
      techStack: [
        "Old platform: Google Sheets and Apps Script (migration source)",
        "New platform: a Microsoft/SQL Server stack",
        "Dated baseline-capture artefact",
        "Documented source-to-target mapping",
        "Parity-test harness (field-by-field comparison)",
        "Migration plan with stated acceptance criteria",
      ],
      workflow: [
        { step: "Capture baseline", detail: "A dated baseline snapshot of the old platform's live definitions and execution payloads is captured before any migration work starts (recorded snapshot: 2026-10-21)." },
        { step: "Map", detail: "A source-to-target mapping documents how each old-platform construct maps to its equivalent on the new platform." },
        { step: "Plan", detail: "A migration plan sets out scope, sequencing, and explicit, stated acceptance criteria for what \"done\" means." },
        { step: "Build", detail: "The new platform is built against that mapping." },
        { step: "Run parity tests", detail: "Parity tests run the same inputs through both platforms and compare outputs directly." },
        { step: "Investigate", detail: "Discrepancies are investigated against the baseline snapshot and the mapping — not guessed at or waved through." },
        { step: "Cut over", detail: "Cutover is gated on meeting the documented acceptance criteria. The baseline and the parity tests are the proof that cutover is safe, not a sign-off given on faith." },
      ],
      methodology:
        "The baseline is captured before touching anything, because without a frozen \"before\" state there is nothing fixed to prove the \"after\" state against. This is the same governance instinct as the reverse-engineering work covered in the companion case study — never trust a single pass at matching old to new; capture it first, map it explicitly, then test it against the frozen record rather than against memory of how the old platform behaved.",
      security:
        "The baseline snapshot, the source-to-target mapping, and the migration plan with its acceptance criteria are durable, dated artefacts — not a single undocumented claim that the migration \"went fine.\" No SAP credentials or SAP system access are touched by this work; the boundary is explicit: this is the reporting/process layer sitting on top of SAP exports, not SAP itself.",
      deployment:
        "Cutover from the old platform to the new one is gated on the documented acceptance criteria being met, confirmed by parity testing against the baseline — not on a target date alone. The scope is, again, the reporting/process layer only; no ERP code or SAP configuration is in scope for this migration.",
      benefits: [
        "A reporting process no longer dependent on the continued existence of one specific platform.",
        "A documented, provable path from the old platform's behaviour to the new one's, rather than an undocumented one-time swap.",
        "No time or cost figure is stated — none has been measured, and none exists on record for this engagement.",
      ],
      challenge:
        "Capturing a faithful baseline of a live, organically-grown process — not just its formulas, but its actual execution payloads at a point in time — before it changes under you during the migration itself, and then proving equivalence between two different platforms field by field rather than asserting that a rebuild \"looks right.\" Doing this at the scale of a reporting process this large, with a dated snapshot as the anchor, is what separates a provably safe cutover from a hopeful one.",
      statusDisclosure:
        "Status: Implemented and ongoing. A dated baseline snapshot, a documented source-to-target mapping, and a migration plan with stated acceptance criteria exist; parity testing has been used to validate the new platform's output against the old platform's output ahead of cutover. No measured customer outcome — time saved, error reduction, or otherwise — exists on record for this engagement. This is the modernisation of the reporting/process layer built on top of SAP export data; it is not a change to SAP itself or to any ERP code, and this page does not describe it as such.",
    },
    relatedCaseStudies: ["spreadsheet-to-intelligent-business-applications"],
    relatedCapabilities: ["legacy-application-modernisation", "custom-software"],
  },

  // 12 — reference
  {
    slug: "enterprise-ai-deployment-existing-it",
    title: "Enterprise AI Deployment in Existing IT Environments",
    tagline:
      "Three deployment shapes — on-premise, hybrid, cloud-native — that all resolve access through the client's own identity provider, never a parallel one.",
    category: "reference",
    statusLabel: "Reference architecture",
    pillar: "enterprise-ai-architecture-deployment",
    disclosure: DISCLOSURE.reference,
    architecture: [
      "Client's existing AD/IAM + network perimeter",
      "Identity-aware access layer (no parallel directory)",
      "On-premise shape",
      "Hybrid shape (gateway + VPN)",
      "Cloud-native shape (client's own tenancy)",
      "Monitoring, logging, rollback path",
    ],
    sections: {
      businessContext:
        "Most enterprises evaluating AI already have an IT estate: an identity provider, a network perimeter, a set of systems of record, and a security team that owns all three. The question they bring to an AI vendor is rarely \"can this model work\" — it's \"where does this sit relative to everything I already run, and who has to rebuild their access-control model to use it.\" That second question is the one this page answers. This page generalises Theme 4's real proposal pattern (on-prem Windows gateway, VPN, GCP services, AD-permission-aware retrieval) into a pattern-level page about how we design AI deployments into a client's existing IT estate — it is not a claim that any of the three deployment shapes below has been built for a real client; it is the standard we design to, stated plainly as a standard rather than a delivered result.",
      operationalProblem:
        "AI tooling is frequently sold as a drop-in SaaS layer: sign up, connect a data source, go. For a regulated or security-conscious enterprise, that shape is the problem, not the solution. A new login system means a second place for an ex-employee's access to linger. A new data connector means a second system that knows what's in the ERP. A new vendor means a new attack surface the security team didn't choose and can't fully audit. The operational problem isn't \"can AI read our data\" — it's \"can AI read our data without becoming a parallel IT estate that nobody asked for.\"",
      whyInsufficient:
        "The default alternative — a general-purpose SaaS AI product pointed at an export of enterprise data — solves the demo and fails the audit. It typically wants its own user accounts rather than the client's AD/IAM groups, its own copy of the data rather than scoped, live access to the system of record, and its own log of who asked what, kept outside the client's existing audit tooling. Each of those is a reasonable shortcut for a vendor trying to ship fast. None of them is acceptable to a security team that has already built an identity and access model and does not want a second one bolted on beside it.",
      proposedSolution:
        "A deployment pattern, not a product: AI capability that reuses the client's existing identity provider for who can ask what, sits inside or alongside the client's existing network boundary rather than requiring a new one, and is designed from day one around the operational disciplines — monitoring, observability, a rollback path — that the client's existing production systems already expect. We design to three deployment shapes depending on what the client already has: on-premise, hybrid, and cloud-native. None of the three is the \"right\" answer in the abstract; the right answer is whichever shape matches the estate the client has already built.",
      architectureDiagram: `
                         Client's existing IT estate (unchanged ownership)
                         ───────────────────────────────────────────────
                          AD / IAM            Network perimeter
                         (existing groups,    (existing VPN, firewall,
                          existing roles)      segmentation)
                               │                       │
                               ▼                       ▼
                    ┌─────────────────────────────────────────┐
                    │        Identity-aware access layer        │
                    │  requests carry the client's own identity;│
                    │  no parallel user directory is created    │
                    └─────────────────────────────────────────┘
                                       │
                 ┌─────────────────────┼─────────────────────┐
                 ▼                     ▼                     ▼
       ┌─────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
       │  On-premise shape │  │   Hybrid shape        │  │  Cloud-native shape   │
       │  gateway runs      │  │   on-prem gateway +   │  │   managed compute in  │
       │  inside the         │  │   VPN tunnel to a     │  │   the client's own    │
       │  client's own       │  │   cloud AI service     │  │   cloud tenancy        │
       │  network; no data   │  │   (e.g. Cloud Run);    │  │   (AWS/Azure/GCP),     │
       │  leaves the         │  │   access control        │  │   same AD/IAM         │
       │  perimeter          │  │   decisions stay on-   │  │   federation applied   │
       │                      │  │   prem                 │  │                         │
       └─────────────────┘  └─────────────────────┘  └─────────────────────┘
                 │                     │                     │
                 └─────────────────────┼─────────────────────┘
                                       ▼
                    ┌─────────────────────────────────────────┐
                    │   Monitoring, logging, rollback path       │
                    │   (same operational bar as the client's   │
                    │   existing production systems)             │
                    └─────────────────────────────────────────┘`,
      integrations:
        "Identity: the client's existing AD/IAM is the source of truth for who can access what — we do not stand up a second user directory or a parallel permission model. Network: the on-premise and hybrid shapes route through the client's existing network boundary rather than opening a new, separately-managed ingress; the cloud-native shape applies the same identity federation inside the client's own cloud tenancy rather than a vendor-hosted one. Data access: read-scoped by default against the systems of record the client designates; no silent duplication of data into a new store the client's security team hasn't reviewed.",
      techStack: [
        "Stack-agnostic at the identity and network layer — sits on whatever AD/IAM and network tooling the client already runs",
        "AWS, Azure, and GCP as deployment targets for hybrid/cloud-native shapes",
        "Serverless/managed-container services (e.g. Cloud Run) for the AI workload",
        "No specific client runs this pattern in production today — stack choices describe what we design and price, not a live system",
      ],
      workflow: [
        { step: "Assess the estate", detail: "Identify the client's existing identity provider, network topology, and which systems of record the AI layer needs to read from." },
        { step: "Pick the shape", detail: "On-premise where data residency or network policy rules out any external hop; hybrid where some AI workload can run off-prem behind a controlled tunnel; cloud-native where the client already operates in a cloud tenancy." },
        { step: "Wire identity first", detail: "Access resolves against the client's existing AD/IAM groups before any data path is built — identity is the first integration, not an afterthought." },
        { step: "Scope data access narrowly", detail: "Read access only, scoped to the systems and fields the engagement actually requires, not a blanket export." },
        { step: "Build the operational layer alongside", detail: "Monitoring, logging, and a rollback path are designed in the same phase as the AI capability itself, not added after a pilot succeeds." },
      ],
      methodology:
        "We treat identity and network integration as the first deliverable, not the last. A pilot that proves a model answers questions well but authenticates through a throwaway login is not a pilot we'd call production-ready — it has proven the easy half of the problem. This mirrors the governance discipline applied across our data pipeline work: the parts that look boring (access control, logging, rollback) are exactly the parts a security review will actually check, so they're built first, not retrofitted.",
      security:
        "No parallel identity system — every access decision reuses the client's existing AD/IAM. Network boundary respected, not routed around — the on-premise and hybrid shapes are designed so the client's existing perimeter controls still apply to the AI workload. Least-privilege data access — read-scoped by default; any write path back into a system of record requires an explicit, separately reviewed approval gate, the same discipline applied in our MCP and agentic-systems work. Auditability — every request is attributable to the identity that made it, using the client's own identity provider's existing logging.",
      deployment:
        "We are describing deployment considerations, not a deployment that has happened. \"Production-ready,\" in this pattern, means the AI workload is held to the same operational bar as the client's existing production systems before it is called ready: monitoring through channels the client's operations team already watches, observability without requiring a new tool to diagnose an incident, and a defined rollback path decided and tested before launch. None of this has been operated in a real client's production environment yet — it is the standard we design to, stated as a standard, not a track record.",
      benefits: [
        "A deployment a client's existing security and IT operations teams can actually approve, because it doesn't ask them to trust a second identity system or open a new, unmanaged network path.",
        "Faster security review, because the integration points are ones the client's team already knows how to audit.",
        "No new standing infrastructure to staff and patch beyond what the chosen shape requires.",
        "No measured reduction in review time or deployment timeline is stated — no engagement has gone through this pattern end to end yet to measure one.",
      ],
      challenge:
        "The hard part is not making a model answer questions correctly — it's making every one of three structurally different deployment shapes (on-premise, hybrid, cloud-native) resolve access through the same identity source without the integration code diverging into three different trust models. Getting on-premise, VPN-tunnelled hybrid, and cloud-native deployments to all defer identity decisions to one AD/IAM source, rather than each shape inventing its own lighter-weight stand-in \"because it's just a pilot,\" is the actual engineering discipline this pattern requires — and the discipline most AI deployments skip under schedule pressure.",
      statusDisclosure:
        "Status: Reference architecture. This page describes a pattern we design and are prepared to build, generalised from a real architecture proposal (on-premises gateway, VPN, GCP services, AD-permission-aware retrieval) that was priced and documented for a client engagement but not implemented. No version of the on-premise, hybrid, or cloud-native shape described here has been deployed into a real client's production environment. We do not say \"built,\" \"deployed,\" \"live,\" or \"in production\" anywhere on this page, because none of those are true yet.",
    },
    relatedCaseStudies: ["enterprise-knowledge-intelligence-mcp", "enterprise-data-ai-platform-architecture"],
  },

  // 13 — reference
  {
    slug: "enterprise-data-ai-platform-architecture",
    title: "Enterprise Data and AI Platform Architecture",
    tagline:
      "The capstone map: how a real, delivered governed data layer connects to where an AI layer would attach, with an IAM boundary between them.",
    category: "reference",
    statusLabel: "Reference architecture",
    pillar: "enterprise-ai-architecture-deployment",
    disclosure: DISCLOSURE.reference,
    architecture: [
      "Source systems (SAP exports)",
      "Staging → Core → Calc → Reporting (delivered pattern)",
      "Governance / IAM boundary",
      "AI / agent layer (read-only, reporting layer only)",
    ],
    sections: {
      businessContext:
        "Enterprises that have already invested in a governed data layer — staging, core, calculation and reporting tables with versioned migrations and reconciliation controls — eventually ask the same follow-up question: can an AI or agent layer sit on top of this without undoing the governance it took years to build. That question is what this page answers architecturally. It is a map, not a story: it shows how the real, delivered data-layer pattern (layered SQL Server/Postgres schema, versioned migrations, oracle-verified, hash-lineage) connects to where an AI/agent layer would attach, and where governance/IAM sits between the two.",
      operationalProblem:
        "A governed data platform earns trust because every number in the reporting layer traces to a rule, a migration, and a reconciliation check. An AI or agent layer bolted on carelessly threatens exactly that property: if an agent can write back into core tables, or read from staging before reconciliation has run, every guarantee the platform was built to provide is now conditional on trusting the agent too. The operational problem is architectural placement — where, specifically, does an AI layer attach without becoming a second, ungoverned write path into the system of record.",
      whyInsufficient:
        "Treating \"add AI\" as a bolt-on integration task — give the model a database credential and a prompt — skips the question that actually matters: which layer of the data platform is the model allowed to see, and is it ever allowed to write. A credential with broad read/write access to the full schema collapses the layering the platform was built with. The fix isn't a smarter prompt; it's an architectural boundary decided before the model is given any access at all.",
      proposedSolution:
        "Attach the AI/agent layer at the reporting layer only, reading from the same reconciled, oracle-verified output that a human report-consumer would see — never from staging or core, and never with a write path back into the reconciliation controls. Identity and access management sits as an explicit boundary between the data layer and the AI layer, resolving what a given agent or user is permitted to read before any query reaches the platform, using the same AD/IAM pattern described in the Enterprise AI Deployment case study.",
      architectureDiagram: `
   Source systems                Governed data layer (delivered pattern — Theme 7)
   (SAP exports, etc.)            ─────────────────────────────────────────────
         │                         staging → core → calc → reporting
         ▼                         (versioned migrations, hash-verified
   ┌───────────┐                   lineage, oracle-reconciled on every run)
   │  Staging   │──────▶ Core ──────▶ Calc ──────▶ Reporting
   └───────────┘                                        │
                                                          │  read-only
                                                          ▼
                                          ┌─────────────────────────────┐
                                          │   Governance / IAM boundary   │
                                          │   resolves what this agent/   │
                                          │   user may read, before any   │
                                          │   query reaches the platform  │
                                          └─────────────────────────────┘
                                                          │
                                                          ▼
                                          ┌─────────────────────────────┐
                                          │       AI / agent layer         │
                                          │  reads reporting-layer data;   │
                                          │  drafts, summarises, triages;  │
                                          │  NEVER writes around           │
                                          │  reconciliation controls       │
                                          └─────────────────────────────┘`,
      integrations:
        "The AI layer integrates at exactly one point: the reporting layer's already-reconciled output. It never queries staging or core directly, and it never holds a write credential to any layer. Any action an agent proposes based on what it reads is routed back through the client's existing approval workflow — the same human-review gate described in our AI & Agentic Systems capability — not executed directly against the platform.",
      techStack: [
        "Data layer: SQL Server and PostgreSQL, versioned migrations, hash-verified lineage, independent reconciliation controls (real, delivered)",
        "AI layer and the IAM boundary between them: architecture we design and are prepared to build — not deployed together with the data layer for a real client yet",
        "No Snowflake, Databricks, or cloud-warehouse experience claimed — where a client's platform runs on one instead, the same layering principle applies as a pattern we'd extend to, not delivered experience",
      ],
      workflow: [
        { step: "Resolve identity", detail: "A request for AI-assisted analysis or drafting resolves through the IAM boundary first." },
        { step: "Read reporting layer only", detail: "The request then reads only from the reporting layer — never staging, core, or calc." },
        { step: "Return for review", detail: "It returns a draft or summary for human review; it never triggers a write back into staging, core, or calc." },
      ],
      methodology:
        "The methodology question that actually mattered was deciding the attachment point before any model access was granted: we treat \"which layer can the AI read\" as an architecture decision made in the same design pass as the data platform's own layering, not a question answered after the fact by whatever credential was easiest to issue.",
      security:
        "Security and governance follow directly from the attachment boundary — read-only access, scoped by the client's existing IAM (see the Enterprise AI Deployment case study), with every read attributable to the identity that made it.",
      deployment:
        "The data-layer half of this diagram is real and delivered — see the Enterprise Data Foundation and Enterprise Data Quality Reconciliation Engine case studies for that evidence. The AI-layer half, the IAM boundary between them, and the combination of the two as a single operating platform are a reference architecture: a pattern we are prepared to build, not a system we have built or deployed as described here.",
      benefits: [
        "A platform where adding an AI layer never requires loosening the governance the data layer was built to provide.",
        "Not a time or cost figure — no engagement has combined these two layers for a real client yet.",
      ],
      challenge:
        "The main technical difficulty is holding the reporting-layer-only boundary under pressure to make the agent \"more useful\" by letting it see raw or in-flight data before reconciliation has finished; the architecture explicitly refuses that shortcut, because a number an agent cites from an unreconciled table is a number nobody can actually defend later.",
      statusDisclosure:
        "Status: Reference architecture. The data-layer half of this diagram (staging → core → calc → reporting, versioned migrations, oracle reconciliation) is real and delivered — see the Enterprise Data Engineering and Enterprise Data Quality case studies for that evidence. The AI-layer half, the IAM boundary between them, and the combination of the two as a single operating platform are a reference architecture: a pattern we are prepared to build, not a system we have built or deployed as described here. We do not say \"built,\" \"deployed,\" \"live,\" or \"in production\" for the AI layer or the combined platform anywhere on this page.",
    },
    relatedCaseStudies: [
      "sap-exports-manufacturing-intelligence-platform",
      "enterprise-data-quality-reconciliation-engine",
      "enterprise-ai-deployment-existing-it",
      "enterprise-knowledge-intelligence-mcp",
    ],
    relatedCapabilities: ["enterprise-data-engineering"],
  },
];

export const caseStudyBySlug = (s: string) => caseStudies.find((c) => c.slug === s);
