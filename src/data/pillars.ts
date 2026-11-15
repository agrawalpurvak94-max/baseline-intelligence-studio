export type Pillar = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  lead: string;
  capabilities: string[];
  workflow: { step: string; detail: string }[];
  outcomes: string[];
  // Solution slugs from src/data/solutions.ts that fold into this pillar
  solutionSlugs: string[];
  // Case-study slugs from src/data/case-studies.ts linked to this pillar
  caseStudySlugs: string[];
};

export const pillars: Pillar[] = [
  {
    slug: "data-engineering",
    name: "Data Engineering",
    eyebrow: "Pillar",
    tagline: "Deterministic, auditable pipelines on SQL Server and Postgres — including SAP export-driven calculation engines reconciled against the workbook they replace.",
    lead: "We build layered data pipelines — staging, core, calculation and reporting — with versioned migrations, hash-verified lineage and independent reconciliation controls on every run. Where the source is an SAP export rather than a live table, the same discipline applies: column-by-column reconciliation against the workbook Finance already trusts, with every ambiguous rule logged for a decision instead of guessed.",
    capabilities: [
      "Layered schema design (staging / core / calc / reporting)",
      "Hash-verified, lineage-tracked ingestion",
      "Independent reconciliation controls (oracle cross-checks)",
      "SAP export and report-family calculation engines",
      "Column-level reconciliation against existing workbooks",
      "Versioned, tested migrations with run ledgers for audit",
    ],
    workflow: [
      { step: "Stage", detail: "Source extracts — SAP exports or otherwise — land in a versioned staging layer; nothing is overwritten silently." },
      { step: "Model", detail: "A layered schema separates raw, cleaned and calculated data." },
      { step: "Compute", detail: "Business logic runs in the database engine, not in a spreadsheet formula." },
      { step: "Reconcile", detail: "An independent calculation path checks every run, column by column where a legacy workbook exists." },
      { step: "Log", detail: "Every run is hash-verified and recorded in a ledger you can audit." },
    ],
    outcomes: [
      "Every pipeline run independently reconciled, not spot-checked",
      "Every figure traceable from source extract to final report",
      "No silent overwrite — every migration versioned and tested",
    ],
    solutionSlugs: ["enterprise-data-engineering", "sap-data-integration-analytics"],
    caseStudySlugs: [
      "sap-exports-manufacturing-intelligence-platform",
      "enterprise-data-foundation-manufacturing",
      "enterprise-data-quality-reconciliation-engine",
    ],
  },
  {
    slug: "ai-engineering",
    name: "AI Engineering",
    eyebrow: "Pillar",
    tagline: "Permission-aware tools, anomaly-first vision, and agents that draft and retrieve — a human still decides and still acts.",
    lead: "We build the systems that let AI reason over enterprise data and signals without becoming the thing nobody can audit: MCP tool layers scoped narrow and read-only-first, industrial computer vision — quality inspection, packaging and labelling verification, assembly checks, PPE and line monitoring, anomaly detection — designed around the engineering lifecycle rather than a dataset of defects nobody has yet, and agents that retrieve from governed data and draft the next step for a named reviewer to approve. Nothing acts on a production system without a human in the loop.",
    capabilities: [
      "Permission-aware MCP tool design (read-only-first, AD/identity-scoped)",
      "Governed retrieval over plant, SAP and QMS data for agent drafting",
      "Human-approval workflows gating any write action",
      "Anomaly-first computer vision for quality and inspection use cases",
      "Edge vs. cloud inference trade-off analysis",
      "Model version-pinning and audit logging on every output",
    ],
    workflow: [
      { step: "Map", detail: "Identify the systems, tools or sensor feeds involved, and what each one actually needs to expose." },
      { step: "Scope", detail: "Design narrow, task-shaped tools or models — not one generic connector or black-box model." },
      { step: "Retrieve or infer", detail: "The agent or model operates only on data it's scoped and permissioned to see." },
      { step: "Draft", detail: "It produces a recommendation, triage note or anomaly flag — never a final action." },
      { step: "Review and log", detail: "A named human reviews and approves; model version, input and output are logged for audit." },
    ],
    outcomes: [
      "Every tool scoped narrow enough to audit, not a generic data firehose",
      "No autonomous write action without a human approval gate",
      "Every output attributable to a model version, prompt and reviewer",
    ],
    solutionSlugs: ["custom-mcp-server-development", "industrial-ai-vision", "ai-agentic-systems"],
    caseStudySlugs: [
      "enterprise-knowledge-intelligence-mcp",
      "industrial-ai-vision-manufacturing-quality",
      "multi-agent-enterprise-workflows",
    ],
  },
  {
    slug: "ai-operations-automation",
    name: "AI Operations and Intelligent Automation",
    eyebrow: "Pillar",
    tagline: "Deterministic automation across SAP, email, documents and the systems in between — with the reconciliation discipline that makes it defensible.",
    lead: "We map the manual handoffs — SAP exports rebuilt by hand, exception lists triaged by gut, reconciliations run on faith — and replace them with a governed, rule-traceable flow. Every decision the system makes can be traced back to the rule or extract that produced it, and every run is independently reconciled before it reaches a report.",
    capabilities: [
      "SAP export, document and email processing into governed flows",
      "MRP and inventory exception triage ranked by a stated priority",
      "Reconciliation workflows with independent oracle cross-checks",
      "Cross-system data sync with full run lineage",
      "Automated test coverage on every calculation engine, not just the interface",
      "Decision logs for every ambiguous business rule, instead of a silent guess",
    ],
    workflow: [
      { step: "Trigger", detail: "An SAP export, email, upload or scheduled run starts the flow." },
      { step: "Understand", detail: "The input is parsed and structured, whatever format it arrives in." },
      { step: "Decide", detail: "Stated business rules — not a model's guess — determine the next action." },
      { step: "Execute and reconcile", detail: "The system computes, drafts or routes the result, then checks it against an independent calculation path before anyone reports on it." },
      { step: "Record", detail: "Every run is logged in an auditable ledger; ambiguous rules are flagged for a human decision, never assumed." },
    ],
    outcomes: [
      "Every number traceable to the rule and extract that produced it",
      "Every pipeline run independently reconciled, not spot-checked",
      "Exceptions ranked by a stated priority and routed to a person, not guessed at by volume",
    ],
    solutionSlugs: ["intelligent-automation", "quality-assurance-automation"],
    caseStudySlugs: [
      "intelligent-inventory-reconciliation",
      "financial-intelligence-platform",
      "ai-assisted-pharmaceutical-documentation-qa",
    ],
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    eyebrow: "Pillar",
    tagline: "When off-the-shelf platforms and spreadsheets don't fit how a business actually runs, we build the system of record that does.",
    lead: "We take the workbook, Access tool or SAP-export macro that's the only record of how a critical process really works, and turn it into traced, tested software: every formula mapped to a rule, every ambiguous one logged for a decision instead of guessed, every interface built for the team that will actually use it.",
    capabilities: [
      "Internal tools and operations dashboards tied to source systems",
      "Systems of record that replace the spreadsheet or legacy workbook",
      "Formula and business-rule reverse-engineering from the system being replaced",
      "Baseline capture and parity testing before cutover",
      "Source-to-target migration mapping with acceptance criteria",
      "Decision logs for every rule nobody remembers the reason for",
    ],
    workflow: [
      { step: "Baseline", detail: "The current workbook or tool's behaviour is captured and snapshotted before anything changes." },
      { step: "Model the domain", detail: "A schema of the real entities the operation runs on — plants, lots, vendors, SKUs — not a generic template." },
      { step: "Rebuild", detail: "Workflow, interfaces and logic rebuilt as tested, versioned code, with intelligence embedded where a decision gets made." },
      { step: "Run parallel", detail: "Old and new systems run side by side until they agree." },
      { step: "Cut over", detail: "The legacy tool retires only once parity is proven — not on a deadline." },
    ],
    outcomes: [
      "Every formula or rule traced to a documented decision, not a silent assumption",
      "A parity-tested rebuild, not a rewrite on faith",
      "One system of record a team can maintain, instead of a spreadsheet only one person understands",
    ],
    solutionSlugs: ["custom-software", "legacy-application-modernisation"],
    caseStudySlugs: [
      "spreadsheet-to-intelligent-business-applications",
      "legacy-erp-process-modernisation",
    ],
  },
  {
    slug: "enterprise-ai-architecture-deployment",
    name: "Enterprise AI Architecture and Deployment",
    eyebrow: "Pillar",
    tagline: "How AI attaches to an estate you already run — identity-aware, network-aware, held to the same operational bar as everything else in production.",
    lead: "We help organisations move AI use cases beyond a laptop prototype into secure, integrated, operationally usable enterprise systems: knowledge assistants and RAG, agents and workflow automation, MCP-based integrations, deployed across on-premise, hybrid, and cloud-native shapes on AWS, Azure or GCP. Every deployment reuses your existing AD/IAM rather than inventing a parallel one, respects your existing network boundary rather than routing around it, and is held to the same monitoring, observability and rollback standard your other production systems already meet.",
    capabilities: [
      "Enterprise AI architecture across on-premise, hybrid and cloud-native shapes",
      "AWS, Azure and GCP deployment patterns for AI workloads",
      "Identity and access management reusing the client's existing AD/IAM",
      "Data access and permissions scoped read-first, write gated behind approval",
      "MCP deployment patterns with read-only-first tool scoping",
      "Monitoring, observability and a defined rollback path before launch",
    ],
    workflow: [
      { step: "Assess", detail: "Map the client's existing identity provider, network topology and systems of record." },
      { step: "Choose the shape", detail: "On-premise, hybrid or cloud-native — matched to what the client already runs, not a default we push regardless." },
      { step: "Wire identity first", detail: "Access resolves against the client's existing AD/IAM before any data path is built." },
      { step: "Scope data access", detail: "Read-only by default, narrowed to the fields the engagement actually needs." },
      { step: "Build the operational layer", detail: "Monitoring, logging and a tested rollback path designed in the same phase as the AI capability itself." },
    ],
    outcomes: [
      "Every access decision resolves against the client's existing identity system, not a new one",
      "No AI workload goes live without a monitored path and a tested rollback",
      "A deployment shape matched to the estate the client already has, not a default we push regardless",
    ],
    solutionSlugs: ["enterprise-ai-deployment"],
    caseStudySlugs: [
      "enterprise-ai-deployment-existing-it",
      "enterprise-data-ai-platform-architecture",
    ],
  },
];

export const pillarBySlug = (s: string) => pillars.find((p) => p.slug === s);
