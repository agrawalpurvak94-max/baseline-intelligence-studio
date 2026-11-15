export type Solution = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  lead: string;
  capabilities: string[];
  workflow: { step: string; detail: string }[];
  outcomes: string[];
  // Pillar slug this solution rolls up into — see src/data/pillars.ts
  pillar?: string;
  detailCaseSlugs?: string[];
  diagramTitle?: string;
  // --- new, optional (structured deep-dive content; renders conditionally in solutions.$slug.tsx) ---
  deepDive?: {
    // Engineering lifecycle — pipeline stages, or the vision engineering lifecycle
    lifecycle?: { stage: string; detail: string }[];
    // Plain-text diagram, same convention as case-studies.ts sections.architectureDiagram
    architectureDiagram?: string;
    // Data/AI platform deep-dives (Fabric, Databricks, Snowflake, etc.)
    platforms?: {
      name: string;
      when: string;
      useCases: string[];
      evidenceNote: string; // explicit "architecture pattern, not a completed customer implementation" per platform
    }[];
    // Indicative platform-selection patterns, not absolute rules
    selectionFramework?: string[];
    // Named practical scenarios (business question → data sources → approach → platform options → users)
    scenarios?: {
      name: string;
      businessQuestion: string;
      dataSources: string;
      approach: string;
      platformOptions: string;
      users: string;
    }[];
    // Prototype vs. pilot vs. production explainer (used on the AI Deployment entry)
    prototypeVsPilotVsProduction?: { stage: string; detail: string }[];
  };
};

export const solutions: Solution[] = [
  {
    slug: "intelligent-automation",
    title: "Intelligent Process Automation",
    eyebrow: "Capability",
    tagline: "Deterministic automation across SAP, email, documents and the systems in between — not a new app for people to log into.",
    lead: "We map the manual handoffs — SAP exports rebuilt in Excel, exception lists triaged by gut, vendor chasers written by hand — and replace them with a governed, rule-traceable flow. Every decision the system makes can be traced back to the rule or extract that produced it.",
    capabilities: [
      "SAP export & extract processing",
      "MRP/inventory exception triage",
      "Document & email processing",
      "Reconciliation workflows",
      "Cross-system data sync",
      "Finance & operations reporting pipelines",
    ],
    workflow: [
      { step: "Trigger", detail: "An SAP export, email, upload or scheduled run starts the flow." },
      { step: "Understand", detail: "The input is parsed and structured, whatever format it arrives in." },
      { step: "Decide", detail: "Stated business rules — not a model's guess — determine the next action." },
      { step: "Execute", detail: "The system computes, drafts or routes the result; writes to source systems are gated." },
      { step: "Reconcile", detail: "Output is checked against an independent calculation path before anyone reports on it." },
    ],
    outcomes: [
      "Every number traceable to the rule and extract that produced it",
      "Exceptions ranked by a stated priority, not triaged by gut",
      "Independent reconciliation on every run, not just at month-end",
    ],
    pillar: "ai-operations-automation",
  },
  {
    slug: "ai-agentic-systems",
    title: "Agentic Workflow Automation",
    eyebrow: "Capability",
    tagline: "Decision-support systems that reason across your data and draft the next step — a human still decides.",
    lead: "We build agents that retrieve from your governed data, draft the report, the triage note or the recommendation, and hand it to a named reviewer. Nothing acts on a production system without an approval step, and every output is attributable to the model version and prompt that produced it.",
    capabilities: [
      "Deviation/CAPA and exception triage drafting",
      "Document & batch-record pre-checks",
      "Report and variance-narrative drafting",
      "Governed retrieval over plant/SAP/QMS data",
      "Human-approval workflows for any write action",
      "Model version-pinning & audit logging",
    ],
    workflow: [
      { step: "Input", detail: "A request, exception or scheduled report enters the system." },
      { step: "Retrieve", detail: "The agent pulls only from data it's scoped and permissioned to see." },
      { step: "Draft", detail: "It produces a recommendation, triage note or report draft — never a final action." },
      { step: "Review", detail: "A named human reviews, edits and approves." },
      { step: "Log", detail: "Prompt, retrieved context, output, model version and reviewer are stored for audit." },
    ],
    outcomes: [
      "Every output attributable to a model version, prompt and reviewer",
      "No autonomous write action without a human approval gate",
      "Consistent triage logic at volume, with real exceptions still escalated to a person",
    ],
    pillar: "ai-engineering",
    detailCaseSlugs: ["multi-agent-enterprise-workflows"],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    eyebrow: "Capability",
    tagline: "When off-the-shelf software doesn't fit the way your business works, we build what does.",
    lead: "Purpose-built applications shaped around your actual workflows — with AI, automation and integrations designed in from day one, not bolted on later.",
    capabilities: [
      "AI-Native Applications",
      "Internal Tools",
      "Operations Dashboards",
      "Client Portals",
      "Workflow Applications",
      "Custom Business Systems",
    ],
    workflow: [
      { step: "Data", detail: "A model of the real entities your business runs on." },
      { step: "Workflow", detail: "The steps and states work actually moves through." },
      { step: "AI Layer", detail: "Intelligence embedded where decisions are made." },
      { step: "Interfaces", detail: "Dashboards and tools your team will actually use." },
      { step: "Integrations", detail: "Connected to the systems around it." },
    ],
    outcomes: [
      "Software shaped to your business, not the other way around",
      "One system of record instead of many",
      "A foundation you can build on for years",
    ],
    pillar: "custom-software-development",
  },
  {
    slug: "finance-operations",
    title: "Finance Operations",
    eyebrow: "Solution",
    tagline: "Turn financial paperwork and reconciliation into an intelligent workflow.",
    lead: "Invoice and document intelligence, reconciliation, expense visibility and reporting — designed to remove manual finance admin without disrupting the accounting stack you already use.",
    capabilities: [
      "Invoice processing",
      "Financial document intelligence",
      "Reconciliation",
      "Expense intelligence",
      "Financial reporting",
    ],
    workflow: [
      { step: "Capture", detail: "Documents arrive from email, portals or uploads." },
      { step: "Extract", detail: "AI reads the document and structures the data." },
      { step: "Validate", detail: "Rules and matching logic check for errors and duplicates." },
      { step: "Post", detail: "The right entries flow into your finance system." },
      { step: "Report", detail: "Fresh, reliable numbers for the people who need them." },
    ],
    outcomes: [
      "Less manual data entry",
      "Fewer missed charges and duplicate payments",
      "A cleaner month-end close",
    ],
    pillar: "ai-operations-automation",
  },
  {
    slug: "document-intelligence",
    title: "Document Intelligence",
    eyebrow: "Solution",
    tagline: "Read, understand and route the documents flowing into your business.",
    lead: "PDFs, scans, emails and forms — classified, extracted, validated and routed into the right system automatically, with exceptions flagged for humans.",
    capabilities: [
      "Email extraction",
      "PDF processing",
      "Document classification",
      "Data validation",
      "System updates",
    ],
    workflow: [
      { step: "Ingest", detail: "Documents pulled from every channel in one place." },
      { step: "Classify", detail: "Each document routed by type and priority." },
      { step: "Extract", detail: "Structured fields pulled with high accuracy." },
      { step: "Validate", detail: "Business rules confirm the data is usable." },
      { step: "Update", detail: "Downstream systems updated automatically." },
    ],
    outcomes: [
      "Documents handled in minutes, not days",
      "Consistent structured data downstream",
      "Exceptions surfaced early, not at month-end",
    ],
    pillar: "ai-engineering",
  },
  {
    slug: "customer-operations",
    title: "Customer Operations",
    eyebrow: "Solution",
    tagline: "Never let a valuable customer conversation slip through the cracks.",
    lead: "AI voice agents, communication automation and intelligent routing that make every customer interaction feel handled — without adding headcount.",
    capabilities: [
      "AI voice agents",
      "Customer communication",
      "Support automation",
      "Request routing",
    ],
    workflow: [
      { step: "Contact", detail: "Call, email or message arrives on any channel." },
      { step: "Understand", detail: "Intent, urgency and context identified instantly." },
      { step: "Route", detail: "The right team or system picks it up automatically." },
      { step: "Respond", detail: "Answered, booked or escalated without delay." },
      { step: "Follow up", detail: "Nothing is forgotten — the system tracks it." },
    ],
    outcomes: [
      "Zero missed customer calls",
      "Faster response times",
      "Consistent, on-brand communication",
    ],
    pillar: "ai-operations-automation",
  },
  {
    slug: "sales-revenue",
    title: "Sales & Revenue",
    eyebrow: "Solution",
    tagline: "Turn scattered lead activity into a disciplined revenue system.",
    lead: "Lead enrichment, qualification, routing and follow-up — engineered so the right opportunities get the right attention at the right time.",
    capabilities: [
      "Lead intelligence",
      "Lead qualification",
      "CRM automation",
      "Follow-up systems",
      "Pipeline intelligence",
    ],
    workflow: [
      { step: "Capture", detail: "Every lead lands in one place, enriched automatically." },
      { step: "Qualify", detail: "AI scores and prioritises against your ICP." },
      { step: "Route", detail: "The right rep gets the right lead, immediately." },
      { step: "Follow up", detail: "Personalised sequences that adapt to responses." },
      { step: "Report", detail: "Real pipeline visibility, not spreadsheet guesses." },
    ],
    outcomes: [
      "Faster speed-to-lead",
      "Fewer opportunities lost to silence",
      "Cleaner CRM data your team trusts",
    ],
    pillar: "ai-operations-automation",
  },
  {
    slug: "enterprise-data-engineering",
    title: "Enterprise Data Engineering",
    eyebrow: "Capability",
    tagline: "The complete enterprise data pipeline — source systems to governed consumption — engineered to be deterministic, auditable and reconciled, not a dashboard on top of a mess.",
    lead: "Data engineering isn't SAP exports and a Power BI dashboard — it's the full path from source system to the person or model that consumes the number: ingestion, cleansing, business-rule transformation, data-quality checks, storage, orchestration, consumption and governance, each stage designed and auditable in its own right. We build this path on SQL Server and Postgres today, with SAP exports as one evidenced source-system pattern among several — ERP, CRM, MES, operational databases, APIs and flat files all land through the same disciplined pipeline. Where a manufacturer's architecture calls for a lakehouse or a governed cloud warehouse, we architect that too — see Modern Manufacturing Data Platforms below — stated plainly as architecture and pattern, not as delivered customer work.",
    capabilities: [
      "Multi-source ingestion (ERP, CRM, MES, databases, APIs, flat files)",
      "Layered schema design (staging / core / calc / reporting)",
      "Versioned, tested migrations with run ledgers for audit",
      "Hash-verified, lineage-tracked ingestion",
      "Data quality validation & independent reconciliation controls",
      "Orchestration — scheduling, dependencies, retries, failure handling",
      "Governed consumption for analytics, reporting and AI systems",
      "Platform architecture for Microsoft Fabric, Databricks and Snowflake",
    ],
    workflow: [
      { step: "Ingest", detail: "Source extracts — SAP, other ERP/CRM/MES, APIs, flat files — land in a versioned staging layer; nothing overwritten silently." },
      { step: "Process", detail: "Cleansing, standardisation and business-rule transformation run in the engine, not in a spreadsheet formula." },
      { step: "Validate", detail: "Independent reconciliation and completeness/consistency checks run before anyone reports on the output." },
      { step: "Store & orchestrate", detail: "A layered schema separates raw, cleaned and calculated data; scheduled runs are logged, retried and alerted on failure." },
      { step: "Govern & serve", detail: "Access control, lineage and ownership are explicit, and the result is served to analytics, operational systems or AI workloads." },
    ],
    outcomes: [
      "Every pipeline run independently reconciled, not just spot-checked",
      "Lineage you can trace from any source system to final report",
      "No silent overwrite — every migration versioned and tested",
      "A pipeline architecture that doesn't assume SAP is the only source worth engineering for",
    ],
    pillar: "data-engineering",
    detailCaseSlugs: ["enterprise-data-foundation-manufacturing"],
    deepDive: {
      lifecycle: [
        { stage: "Source systems", detail: "ERP, CRM, MES, operational databases, APIs, spreadsheets and flat files — whatever actually produces the data, not a single idealised source. SAP exports are one evidenced example; the pipeline pattern doesn't depend on SAP specifically." },
        { stage: "Ingestion", detail: "Scheduled batch pulls, API-based ingestion, or file-based drops, staged before anything touches a calculation. Incremental and change-data-capture (CDC) patterns are available where the source system supports them — we describe CDC as an architecture pattern we can build, not as something we've implemented for a client to date." },
        { stage: "Processing", detail: "Cleansing, standardisation, business-rule transformation and enrichment run as versioned, testable logic in the database engine — the same discipline whether the source is an SAP export file or a live operational table." },
        { stage: "Data quality", detail: "Validation, reconciliation against an independent calculation path, exception handling, and completeness/consistency checks run on every pipeline execution, not as a one-off audit." },
        { stage: "Storage", detail: "A layered model — staging, core, calculation, reporting — on SQL Server or Postgres today; lakehouse or cloud-warehouse storage (Databricks, Snowflake, Microsoft Fabric/OneLake) where the workload and existing investment call for it." },
        { stage: "Orchestration", detail: "Scheduling, dependency ordering, retries and failure handling, with every run recorded in an auditable ledger — not a cron job nobody watches." },
        { stage: "Consumption", detail: "The governed result feeds analytics and reporting, operational applications, and AI systems (retrieval, agents) through the same access-controlled layer, not a separate copy per consumer." },
        { stage: "Governance", detail: "Access control, lineage, auditability and explicit data ownership are designed in from the staging layer onward, not retrofitted once someone asks who changed a number." },
      ],
      architectureDiagram: `
 Source systems                    Ingestion                         Processing & quality
 ──────────────                     ─────────                        ─────────────────────
 ERP / SAP exports  ─┐                                      ┌──────────────────────────┐
 CRM                 │     Scheduled batch / API /   ┌─────▶│ Cleansing · standardise   │
 MES / operational   ├────  file-based / CDC where  ─┤      │ business rules · enrich   │
 databases           │       source supports it      │      └────────────┬─────────────┘
 APIs                │                                │                   │
 Spreadsheets /      │                                │                   ▼
 flat files         ─┘                                │      ┌──────────────────────────┐
                                                        │      │ Data quality: validation, │
                                                        │      │ reconciliation, exception │
                                                        │      │ handling, completeness    │
                                                        │      └────────────┬─────────────┘
                                                        │                   │
                                                        ▼                   ▼
                                           ┌────────────────────────────────────────┐
                                           │   Storage — staging / core / calc /      │
                                           │   reporting (SQL Server, Postgres)       │
                                           │   — or lakehouse/warehouse foundation     │
                                           │   (Databricks, Snowflake, Fabric/OneLake) │
                                           └───────────────────┬────────────────────┘
                                                                │
                                      Orchestration: scheduling, dependencies, retries, logging
                                                                │
                                                                ▼
                                           ┌────────────────────────────────────────┐
                                           │   Consumption — analytics & reporting,   │
                                           │   operational applications, AI systems   │
                                           └───────────────────┬────────────────────┘
                                                                │
                                           Governance — access control, lineage, auditability,
                                                        explicit data ownership (all stages)
`,
      platforms: [
        {
          name: "Microsoft Fabric",
          when: "The right fit for a manufacturer already running Power BI, Excel, SQL Server and the broader Microsoft stack, who wants governed, consistent reporting without replacing an existing Microsoft investment. Especially relevant where disconnected Power BI datasets and ad-hoc Excel reporting have multiplied across plants faster than governance has kept up.",
          useCases: [
            "Modernising legacy Power BI reporting and disconnected reporting datasets",
            "Governed enterprise semantic models and consistent manufacturing KPIs",
            "Consolidating production, inventory, procurement, finance and quality reporting",
            "Cross-plant and multi-entity management dashboards",
            "Integrating MES, ERP, SQL Server, Excel and operational data sources",
            "Near-real-time operational dashboards via Fabric Real-Time Intelligence, where appropriate",
            "Lakehouse/warehouse foundations in OneLake with self-service analytics under governance",
          ],
          evidenceNote: "Architecture pattern and migration path we can design and build. Not a completed Fabric customer implementation — our delivered data-engineering evidence today is SQL Server-based. Some existing Power BI/SQL Server customers are better served by modernising their current architecture than by migrating to Fabric; we say so when that's the honest answer.",
        },
        {
          name: "Databricks Lakehouse",
          when: "Appropriate when the data is high-volume, diverse or fast-moving enough that a single relational warehouse becomes the bottleneck — machine, sensor, MES and historian data at volume; joining operational data with production, quality, maintenance and business data; or building ML/AI directly on governed manufacturing data.",
          useCases: [
            "High-volume machine, sensor, MES and historian data processing",
            "Joining operational data with production, quality, maintenance and business data",
            "Predictive maintenance and equipment-failure analysis",
            "Production yield, scrap and defect root-cause analysis",
            "Demand forecasting and production planning",
            "Inventory and supply-chain optimisation",
            "Computer-vision data pipelines and industrial AI",
            "Batch and streaming data engineering; enterprise AI/ML built on governed manufacturing data",
          ],
          evidenceNote: "Architecture pattern, not a completed customer implementation. We have no delivered Databricks project to point to today — this is a platform we can architect and build toward when the workload (volume, variety, ML) genuinely calls for a lakehouse rather than a relational warehouse.",
        },
        {
          name: "Snowflake Data Cloud",
          when: "Fits enterprise data warehousing and governed data-sharing needs that span multiple plants, subsidiaries or external parties — where the core requirement is trusted, consolidated reporting and controlled sharing rather than high-volume ML workloads.",
          useCases: [
            "Enterprise data warehousing across multiple plants/subsidiaries",
            "Consolidating finance, procurement, production and supply-chain datasets",
            "Supplier performance and supply-chain analytics",
            "Inventory and demand visibility",
            "Connected-product and equipment-performance analytics",
            "Governed data sharing across suppliers, customers and business units",
            "Enterprise reporting and AI/analytics on trusted data products",
          ],
          evidenceNote: "Architecture pattern, not a completed customer implementation. No delivered Snowflake project today — presented as a platform option when cross-business consolidation and governed external data sharing are the actual requirement, not a default recommendation.",
        },
      ],
      selectionFramework: [
        "Existing Microsoft/Power BI investment needing integrated analytics and data engineering → evaluate Microsoft Fabric.",
        "Complex data engineering, high-volume industrial data, streaming or ML/AI workloads → evaluate Databricks.",
        "Enterprise data warehousing, cross-business consolidation, governed data sharing → evaluate Snowflake.",
        "An existing SQL Server/Power BI architecture that already meets current needs → modernise what exists before recommending a platform migration.",
        "These are indicative patterns, not absolute rules. Platform choice has to weigh workload shape, data volume, latency requirements, governance needs, existing investment, team skills, licensing and total cost of ownership — not a single factor in isolation.",
      ],
      scenarios: [
        {
          name: "Plant Performance Intelligence",
          businessQuestion: "What's actually driving production output, OEE and downtime by shift and machine?",
          dataSources: "MES/production logs, machine/PLC data, shift rosters, downtime codes",
          approach: "Ingest and standardise shift/machine records, compute OEE and downtime attribution in the engine, reconcile against existing shift reports before trusting the output",
          platformOptions: "SQL Server pipeline today; Fabric for cross-plant Power BI rollout; Databricks if machine/sensor volume is high",
          users: "Plant managers, operations directors",
        },
        {
          name: "Quality and Yield Analytics",
          businessQuestion: "Where are scrap, rework and defects concentrated, and do they correlate with batch or supplier?",
          dataSources: "QMS/batch records, scrap/rework logs, supplier/material batch data",
          approach: "Join quality events to batch and supplier lineage, compute yield and defect-rate trends, flag correlations for a quality engineer to investigate — not to auto-conclude",
          platformOptions: "SQL Server for structured QMS data; Databricks where batch-level and sensor data need joining at volume",
          users: "Quality managers, process engineers",
        },
        {
          name: "Inventory and Working Capital Intelligence",
          businessQuestion: "Where is working capital tied up in stock that isn't moving, and why?",
          dataSources: "ERP/SAP inventory exports, consumption history, stock-ageing data",
          approach: "The same ageing/holding calculation-engine pattern already evidenced in our SAP inventory work, extended to non-SAP ERP exports where relevant",
          platformOptions: "SQL Server pipeline (evidenced pattern); Fabric/Snowflake for multi-entity consolidation",
          users: "CFO, supply chain finance, inventory planners",
        },
        {
          name: "Supply Chain Control Tower",
          businessQuestion: "Which suppliers and inbound shipments are putting production at risk?",
          dataSources: "Purchase orders, supplier OTIF history, inbound logistics data",
          approach: "Consolidate PO and delivery data, compute supplier scorecards, surface at-risk shipments ranked by a stated priority, not a gut call",
          platformOptions: "SQL Server for a single-entity rollout; Snowflake where supplier data is shared or consolidated across business units",
          users: "Procurement, supply chain managers",
        },
        {
          name: "Finance and Operations MIS",
          businessQuestion: "How does operational performance actually connect to cost, profitability and working capital?",
          dataSources: "ERP/SAP financial exports, production and inventory data, cost allocations",
          approach: "The evidenced SAP-export-to-calculation-engine pattern — reconciled column by column against the workbook Finance already trusts — generalised to connect operational and financial data",
          platformOptions: "SQL Server pipeline (evidenced); Fabric for integrated Power BI-based MIS rollout",
          users: "CFO, FP&A, plant controllers",
        },
        {
          name: "Predictive Maintenance",
          businessQuestion: "Which machines are trending toward failure, and when should maintenance actually happen?",
          dataSources: "Machine telemetry/sensor data, maintenance history, operating conditions",
          approach: "Time-series feature engineering on telemetry joined to maintenance records, feeding a model that drafts a maintenance recommendation for a named reviewer — never an autonomous shutdown trigger",
          platformOptions: "Databricks — the volume and variety of sensor/telemetry data is the clearest fit for a lakehouse architecture here",
          users: "Maintenance planners, reliability engineers",
        },
        {
          name: "Multi-Plant Analytics",
          businessQuestion: "Are KPI definitions and reporting actually comparable across factories, or does every plant calculate 'OEE' differently?",
          dataSources: "Plant-level MES/ERP/Power BI datasets across multiple sites",
          approach: "A governed semantic layer that standardises metric definitions once, rather than reconciling disagreements after the fact in a steering-committee deck",
          platformOptions: "Fabric (governed semantic model over existing Power BI estate) or Snowflake (cross-entity warehouse) depending on the existing Microsoft investment",
          users: "Group/divisional leadership, enterprise architects",
        },
      ],
    },
  },
  {
    slug: "sap-data-integration-analytics",
    title: "SAP Data Integration & Analytics",
    eyebrow: "Capability",
    tagline: "Calculation engines built on SAP exports and extracts, reconciled to the workbook Finance already trusts. Live SAP system integration is a scoped extension.",
    lead: "We turn the SAP trial-balance, inventory and report exports your team already pulls into deterministic calculation engines, reconciled column by column against the workbook they replace. This is export-and-extract-driven work. Live SAP OData or RFC integration is a separate scope, designed and built on request for each system landscape.",
    capabilities: [
      "SAP trial-balance & export processing",
      "Inventory report-family calculation (ageing, holding, FG & Bulk, carriage inwards)",
      "Management workbook generation",
      "Column-level reconciliation against existing workbooks",
      "Finance-facing UAT interfaces",
      "ERP-version-agnostic data layer design",
    ],
    workflow: [
      { step: "Export", detail: "The same SAP export or report your Finance team already produces goes in." },
      { step: "Stage", detail: "Data lands in a versioned SQL Server staging layer." },
      { step: "Calculate", detail: "Business rules compute the report in the engine, not in formulas." },
      { step: "Reconcile", detail: "Output is checked column by column against the existing workbook." },
      { step: "Review", detail: "A Finance-facing interface carries the result to sign-off." },
    ],
    outcomes: [
      "Every figure reconciled against the workbook it replaces, not assumed correct",
      "A calculation engine decoupled from which SAP version you're on",
      "Ambiguous business rules logged for your team to decide, never guessed",
    ],
    pillar: "data-engineering",
  },
  {
    slug: "custom-mcp-server-development",
    title: "Custom MCP Server Development",
    eyebrow: "Capability — methodology",
    tagline: "A governed, read-only-first MCP layer over your SAP, MES and QMS estate — narrow, auditable tools instead of a connector to everything.",
    lead: "We design permission-aware MCP servers that expose your plant's actual metric definitions — what 'OEE', 'OTIF' or 'obsolete' mean across your systems — as narrow, auditable tools, not a generic SQL-over-everything connector. Each design is scoped to the systems and metrics the client runs, and priced and documented before any build begins.",
    capabilities: [
      "Plant/enterprise semantic layer design",
      "Read-only-first tool scoping",
      "AD/identity-aware access-control patterns",
      "Tool output filtering & audit logging design",
      "Approval-gated write-tool patterns",
      "Security posture mapped to current MCP security guidance",
    ],
    workflow: [
      { step: "Map", detail: "Identify the systems — SAP, MES, QMS, file estate — and what each metric actually means across them." },
      { step: "Scope", detail: "Design narrow, task-shaped tools, not one tool that can query anything." },
      { step: "Gate", detail: "Read-only by default; any write tool requires an explicit approval workflow." },
      { step: "Secure", detail: "Access control, logging and output filtering mapped against current MCP security guidance." },
      { step: "Document", detail: "A reference architecture and runbook your team can own and run." },
    ],
    outcomes: [
      "A documented architecture before a single line of production code",
      "Every tool scoped narrow enough to audit, not a generic data firehose",
      "No write action without an approval gate — by design, not by policy alone",
    ],
    pillar: "ai-engineering",
  },
  {
    slug: "industrial-ai-vision",
    title: "Industrial Vision AI for Manufacturing Quality",
    diagramTitle: "How We Approach Industrial Vision AI",
    eyebrow: "Capability — Industrial Vision AI",
    tagline: "Computer vision that automates visual inspection, identifies defects and improves quality monitoring across production.",
    lead: "We design and implement computer vision solutions that help manufacturers automate visual inspection, identify defects and improve quality monitoring across production processes. Every system starts from the inspection criteria agreed with quality and production stakeholders, then moves through data capture at the station, an anomaly-first model, a chosen operating point and integration with the systems that act on a result. The most developed application is in-line marking-depth verification, combining 3D laser profiling with machine-vision grading and bounded closed-loop compensation.",
    capabilities: [
      "Visual defect detection",
      "Component presence verification",
      "Assembly verification",
      "Packaging & label inspection",
      "Edge inference at the line",
      "Image processing pipelines",
      "Quality analytics & drift tracking",
      "Production system integration",
    ],
    workflow: [
      { step: "Define", detail: "Inspection criteria, defect taxonomy and the real cost of a false reject vs. an escape, agreed with QC or safety stakeholders." },
      { step: "Capture", detail: "Image/video data acquired at the station or line, starting from the normal, conforming case." },
      { step: "Model", detail: "An anomaly-first approach where defect samples are scarce by design, with model choice driven by the use case, not a default." },
      { step: "Calibrate", detail: "A threshold set at an agreed operating point, with a confusion matrix shown, not a bare accuracy number." },
      { step: "Decide", detail: "A go/no-go on deployment, informed by the feasibility report — not sold before it's earned." },
    ],
    outcomes: [
      "A stated operating point and confusion matrix, not an unverifiable accuracy claim",
      "Bounded automation: every closed-loop action stays inside limits agreed before deployment",
      "Every decision logged against the sensor data that produced it",
    ],
    pillar: "ai-engineering",
    detailCaseSlugs: ["industrial-ai-vision-manufacturing-quality"],
    deepDive: {
      lifecycle: [
        { stage: "Problem definition & inspection criteria", detail: "What counts as a defect, a presence/absence failure, a PPE violation or an anomaly is agreed explicitly with QC, safety or production stakeholders before any image is captured — not inferred from a dataset after the fact." },
        { stage: "Image & video data acquisition", detail: "Data captured at the actual station or line — lighting, angle, line speed and part variation as they really occur, starting from the conforming case since real defect samples are typically scarce." },
        { stage: "Data preparation & annotation", detail: "Cleaning, labelling and structuring the captured data against the agreed taxonomy, with an explicit decision log for any ambiguous case rather than a silent labelling convention." },
        { stage: "Model selection, training & evaluation", detail: "Model choice follows the use case — anomaly-first detection where defects are rare, classification where failure modes are well-characterised — evaluated against a stated operating point and a shown confusion matrix, not a bare accuracy number." },
        { stage: "Edge vs. cloud deployment decisions", detail: "Latency, connectivity, data-volume and line-speed constraints determine whether inference runs at the edge (on or near the line) or centrally — a trade-off made explicit, not defaulted." },
        { stage: "Integration with production systems", detail: "How a flagged frame or anomaly reaches a PLC, an MES event, an operator alert or a quarantine action — bounded and auditable, never an unconstrained write to a production system." },
        { stage: "Human review, exception handling & continuous evaluation", detail: "Flagged cases route to a named reviewer; false-reject and escape rates are tracked over time and the model is re-evaluated against drift, not deployed once and left alone." },
      ],
    },
  },
  {
    slug: "quality-assurance-automation",
    title: "Quality Assurance Automation",
    eyebrow: "Capability — pipeline QA",
    tagline: "The QA discipline we embed in every pipeline we build — not a manufacturing-floor inspection product.",
    lead: "Every data pipeline we build ships with independent reconciliation controls, deterministic calculations and full run lineage — the practice that makes a number defensible to Finance or to an inspector. This is pipeline quality discipline. Manufacturing-floor inspection is a separate capability, covered under Industrial Vision AI.",
    capabilities: [
      "Independent reconciliation controls (oracle vs. engine cross-checks)",
      "Hash-verified data lineage",
      "Automated test coverage on calculation logic",
      "Run ledgers for every pipeline execution",
      "Decision logs for ambiguous business rules",
      "Capacity/load testing before go-live",
    ],
    workflow: [
      { step: "Specify", detail: "Business rules are documented and logged, including the ones still open for a decision." },
      { step: "Build", detail: "Calculation logic is implemented independently twice and checked against itself." },
      { step: "Test", detail: "Automated tests cover the calculation engine, not just the happy path." },
      { step: "Reconcile", detail: "Every run is checked against an independent path before it's reported on." },
      { step: "Record", detail: "A run ledger and hash-verified lineage make every number traceable after the fact." },
    ],
    outcomes: [
      "Every pipeline run independently reconciled, not spot-checked",
      "A documented decision log instead of a silently guessed business rule",
      "Test coverage on the calculation engine itself, not just the interface",
    ],
    pillar: "ai-operations-automation",
  },
  {
    slug: "legacy-application-modernisation",
    title: "Legacy Application Modernisation",
    eyebrow: "Capability",
    tagline: "Reverse-engineer the spreadsheet that runs your month-end into a documented, tested pipeline — before anyone touches production.",
    lead: "We take the Excel workbook, Access tool or SAP-export macro that's the only record of how a critical process actually works, and turn it into traced logic: every formula mapped to a rule, every ambiguous one logged for a decision instead of guessed. This is process modernisation from Excel and SAP-export tooling to governed pipeline. Mainframe and large legacy-codebase modernisation sit outside our current scope.",
    capabilities: [
      "Formula & business-rule reverse-engineering",
      "Decision logs for ambiguous rules",
      "Baseline capture before migration",
      "Source-to-target mapping",
      "Parity testing (old system vs. new)",
      "Migration plan & acceptance criteria",
    ],
    workflow: [
      { step: "Baseline", detail: "The current workbook or tool's behaviour is captured and snapshotted before anything changes." },
      { step: "Reverse-engineer", detail: "Every formula and rule is traced and catalogued, including the ones nobody remembers the reason for." },
      { step: "Decide", detail: "Ambiguous rules are logged for your team to decide, not guessed at." },
      { step: "Rebuild", detail: "The logic is rebuilt as tested, versioned code." },
      { step: "Run parallel", detail: "Old and new run side by side until they agree, before the old one retires." },
    ],
    outcomes: [
      "Every formula traced to a documented rule or an explicit open decision",
      "A parity-tested rebuild, not a rewrite on faith",
      "A system someone besides its original author can maintain",
    ],
    pillar: "custom-software-development",
  },
  {
    slug: "enterprise-ai-deployment",
    title: "Enterprise AI Deployment",
    eyebrow: "Capability — methodology",
    tagline: "Moving AI from a prototype into a secure, integrated enterprise system — wired to your identity, logged for audit and handed over to run.",
    lead: "A model answering questions in a chat window is a prototype. Getting that capability wired into your identity system, scoped to the documents a given role is allowed to see, logged for audit, cost-controlled and handed over with a runbook is a different piece of engineering entirely. This page covers that methodology: enterprise knowledge assistants and RAG, AI agents and workflow automation, MCP-based enterprise integrations, model and API integration, deployment patterns across private cloud, public cloud and on-premises, identity and document-level permissions, observability and cost control, human approvals and audit trails, and production handover. Below, the permission-aware knowledge-assistant design and the three deployment shapes we apply to an existing IT estate.",
    capabilities: [
      "Enterprise knowledge assistants & retrieval-augmented generation (RAG)",
      "AI agents & workflow automation",
      "MCP-based enterprise integrations",
      "Model & API integration across providers",
      "Private cloud, public cloud & on-premises deployment patterns",
      "Identity, authentication & role-based access control",
      "Document-level permissions & enterprise data security",
      "Logging, observability & evaluation",
      "Cost & usage controls",
      "Human approvals, audit trails & exception handling",
      "Production handover & ongoing support",
    ],
    workflow: [
      { step: "Assess", detail: "Map the existing identity provider, network boundary, data estate and the systems the AI capability needs to reach." },
      { step: "Design the deployment shape", detail: "Private cloud, public cloud or on-premises — and whether access runs through RAG, agents, MCP tools or direct API/model integration — matched to the estate, not a default." },
      { step: "Wire identity & permissions", detail: "Access resolves against the client's existing AD/IAM; document-level permissions are enforced at retrieval time, not bolted on after." },
      { step: "Instrument", detail: "Logging, observability, evaluation and cost/usage controls are built in the same phase as the capability itself, not added after a cost or trust incident." },
      { step: "Gate & hand over", detail: "Human approval gates any write action or irreversible step; the system ships with an audit trail, a runbook and a named owner on the client side." },
    ],
    outcomes: [
      "A documented boundary between prototype, pilot and production — so a buyer knows which one they're being sold",
      "Every retrieval and action scoped to identity and permission, not a shared service account",
      "No autonomous write action without a human approval gate and an audit trail",
      "A production handover a client's own team can run, not a system only we understand",
    ],
    pillar: "enterprise-ai-architecture-deployment",
    detailCaseSlugs: ["enterprise-knowledge-intelligence-mcp", "enterprise-ai-deployment-existing-it"],
    deepDive: {
      prototypeVsPilotVsProduction: [
        { stage: "Prototype", detail: "Proves the model or approach can do the thing — usually a notebook, a demo script or a chat interface talking to a single data source, often on someone's laptop. No identity integration, no permission enforcement, no audit trail, no load or failure handling. Valuable for deciding whether to invest further; not something a buyer should mistake for a deployable system." },
        { stage: "Pilot", detail: "Runs with real users on real (or representative) data for a bounded period, usually behind basic access control but short of full production hardening — limited logging, a manual fallback, a small and known user group. The purpose of a pilot is to learn what breaks under real use before committing to the engineering cost of production hardening." },
        { stage: "Production", detail: "Integrated with the client's actual identity provider and document-level permissions, logged and observable, cost-controlled, gated by human approval on any write or irreversible action, and handed over with a runbook and a named owner. This is the bar our enterprise AI deployment methodology is built to reach." },
      ],
    },
  },
  {
    slug: "manufacturing-operations-visibility",
    title: "Manufacturing Operations Visibility & Optimisation",
    eyebrow: "Solution — manufacturing",
    tagline: "One governed view of plant output, equipment performance, quality, planning and material flow — built from the systems your plants already run.",
    lead: "Plant data sits in MES, PLC historians, the ERP, quality records and spreadsheets, and each system answers a different question. We engineer the pipeline that brings those sources together under shared definitions: what OEE means on every line, how a scrap event links to a batch and a supplier lot, where a planned order is slipping and why. The output is a set of reconciled, traceable views that plant, quality and finance leaders can rely on, and a foundation for predictive maintenance and planning intelligence once that data is trusted.",
    capabilities: [
      "Manufacturing operations visibility across plant, line and shift",
      "Assembly line visibility & throughput analysis",
      "OEE and equipment performance intelligence",
      "Production planning & scheduling intelligence",
      "Quality & traceability intelligence from batch to supplier lot",
      "Material flow & energy intelligence",
      "Predictive maintenance on machine and maintenance-history data",
    ],
    workflow: [
      { step: "Connect", detail: "Bring MES, historian, ERP and quality extracts into a versioned staging layer, starting with the sources that answer the first business question." },
      { step: "Define", detail: "Agree the metric definitions with plant and finance stakeholders — OEE, scrap, yield, OTIF — once, in code, rather than per spreadsheet." },
      { step: "Compute", detail: "Run the calculations in the data engine, with lineage from each figure back to its source records." },
      { step: "Reconcile", detail: "Check the output against the reports leadership already trusts before anyone acts on it." },
      { step: "Act", detail: "Surface exceptions ranked by a stated priority to a named owner, with recommendations drafted for human decision." },
    ],
    outcomes: [
      "One definition of each operating metric, shared across plants and systems",
      "Every figure traceable to the source records that produced it",
      "Exceptions routed to a named owner, not buried in a weekly report",
    ],
    pillar: "ai-operations-automation",
    deepDive: {
      lifecycle: [
        { stage: "Source systems", detail: "MES and line logs, PLC and historian signals where accessible, ERP production and inventory records, quality and batch records, maintenance history and shift rosters. We start from the sources that already exist, not from a new instrumentation project." },
        { stage: "Ingestion", detail: "Scheduled extracts, API pulls or file drops land in a versioned staging layer. Signal data is aggregated to the grain the business questions need before it reaches analytics." },
        { stage: "Standardisation", detail: "Shift, line, machine and product identifiers are mapped to one reference model, so the same asset has the same identity in every system." },
        { stage: "Metric engine", detail: "OEE, scrap, yield, downtime attribution and OTIF are computed from written definitions, versioned and tested, with an independent check on each run." },
        { stage: "Consumption", detail: "Plant, quality and finance leaders see the same figures through governed dashboards, and analytics or machine-learning workloads read from the same reconciled layer." },
        { stage: "Rollout", detail: "Start with one line or one plant, prove the figures against existing reports, then extend to further lines and sites on the same definitions." },
      ],
      architectureDiagram: `
 Sources                       Ingest & stage               Standardise & compute         Consume
 ───────                       ──────────────               ─────────────────────         ───────
 MES / line logs ─┐
 PLC / historian ─┼──▶  versioned staging   ──▶  reference model  ──▶  metric engine  ──▶  plant dashboards
 ERP production  ─┤     (raw, hash-checked)       (assets, products,    (OEE, scrap, yield,    quality traceability
 Quality / batch ─┤                                shifts, lots)         OTIF, downtime)       planning views
 Maintenance     ─┤                                                          │                 ML / predictive
 Shift rosters   ─┘                                                          ▼                 maintenance
                                                                   independent reconciliation
                                                                   and lineage on every run`,
      scenarios: [
        {
          name: "OEE and Equipment Performance",
          businessQuestion: "Which lines lose the most output to availability, performance and quality losses, and are the figures the same across plants?",
          dataSources: "MES and line logs, machine status signals, shift records, downtime codes",
          approach: "One OEE definition, computed in the engine from logged states, with downtime attributed to a reason code and reconciled against existing shift reports",
          platformOptions: "SQL Server or Postgres pipeline; Power BI for plant dashboards",
          users: "Plant managers, operations directors",
        },
        {
          name: "Assembly Line Visibility",
          businessQuestion: "Where is throughput being lost on the line, and at which station does it start?",
          dataSources: "Station cycle times, operator and line logs, takt and sequence data",
          approach: "Station-level throughput and wait analysis, aggregated per shift, with exceptions ranked for the line engineer to investigate",
          platformOptions: "SQL Server pipeline; a lakehouse where high-frequency station data needs joining at volume",
          users: "Line engineers, production supervisors",
        },
        {
          name: "Production Planning & Scheduling Intelligence",
          businessQuestion: "Which planned orders are at risk, and what is the real capacity behind the schedule?",
          dataSources: "ERP planned and released orders, capacity and routing data, actual completion records",
          approach: "Compare planned against actual completion by order and resource, flag orders at risk of slipping, and show the constraint behind each one",
          platformOptions: "SQL Server pipeline with ERP extracts; Fabric where planning reports already live in Power BI",
          users: "Planners, production control, plant managers",
        },
        {
          name: "Quality & Traceability",
          businessQuestion: "Where are scrap and rework concentrated, and do they correlate with batch or supplier lot?",
          dataSources: "Quality inspection records, batch genealogy, supplier lot data, scrap and rework logs",
          approach: "Join quality events to batch and lot lineage, compute yield and defect-rate trends, and flag correlations for a quality engineer to investigate rather than conclude",
          platformOptions: "SQL Server for structured QMS data; Databricks where batch-level sensor data needs joining at volume",
          users: "Quality managers, process engineers",
        },
        {
          name: "Material Flow & Energy Intelligence",
          businessQuestion: "Where is material waiting, and where is energy use out of line with production?",
          dataSources: "Inventory movements, goods receipts and issues, energy meter data, production volumes",
          approach: "Calculate dwell time and stock ageing by location, and energy use per unit produced, with variance flagged against a stated baseline",
          platformOptions: "SQL Server pipeline; Snowflake where multi-site consolidation is the requirement",
          users: "Supply chain, plant engineering, energy managers",
        },
        {
          name: "Predictive Maintenance",
          businessQuestion: "Which machines are trending toward failure, and when should maintenance be scheduled?",
          dataSources: "Machine telemetry, maintenance history, failure and repair records, operating conditions",
          approach: "Time-series features on telemetry joined to maintenance records, producing a recommendation a reliability engineer reviews. The system never triggers a shutdown on its own",
          platformOptions: "Databricks where telemetry volume and variety call for a lakehouse; SQL Server for a single-plant pilot of the maintenance-history analysis",
          users: "Maintenance planners, reliability engineers",
        },
      ],
    },
  },
  {
    slug: "pharmaceutical-documentation-qa",
    title: "Pharmaceutical Documentation & QA Assistant",
    eyebrow: "Solution — life sciences",
    tagline: "A drafting assistant for deviation and CAPA reports. It drafts and retrieves; a qualified reviewer decides.",
    lead: "Deviation drafting starts from a blank page each time, and finding the similar case from six months ago depends on who remembers it. We design an assistant that suggests a classification, surfaces the most relevant historical deviations and drafts a root-cause narrative and CAPA outline. Every draft goes to a human QA reviewer, who edits, approves or rejects it. The system never disposes a deviation or approves a CAPA, and every draft is attributable to a model version, a prompt and the reviewer who acted on it.",
    capabilities: [
      "Deviation classification suggestions",
      "Similar-case retrieval over historical deviation records",
      "Root-cause and CAPA drafting for reviewer approval",
      "Model version and prompt attribution on every draft",
      "Immutable audit trail aligned to 21 CFR Part 11 and ALCOA+",
    ],
    workflow: [
      { step: "Log", detail: "A deviation is logged in the QMS as it is today, with no change to how it is captured." },
      { step: "Suggest", detail: "A classification is suggested as a proposal, not written into the record." },
      { step: "Retrieve", detail: "Ranked historical deviations judged relevant to the new one are surfaced for review." },
      { step: "Draft", detail: "A root-cause narrative and CAPA outline are drafted from the deviation text and the similar cases." },
      { step: "Review", detail: "A qualified reviewer edits, approves or rejects. Only an approved draft enters the record, attributed to that reviewer." },
    ],
    outcomes: [
      "Reviewers start from a structured first draft and the relevant prior cases",
      "Nothing enters the quality record without a qualified human decision",
      "Every draft attributable to a model version, prompt, reviewer and timestamp",
    ],
    pillar: "ai-operations-automation",
    detailCaseSlugs: ["ai-assisted-pharmaceutical-documentation-qa"],
  },
  {
    slug: "enterprise-ai-architecture",
    title: "Enterprise AI Architecture",
    eyebrow: "Capability — architecture",
    tagline: "Attach AI to a governed data platform at the reporting layer, behind an identity boundary, with no second write path into the system of record.",
    lead: "Enterprises that have built a governed data layer eventually ask whether an AI layer can sit on top of it without undoing the governance behind it. The answer depends on where the AI attaches. We place it at the reporting layer, reading only reconciled output, with identity and access management as an explicit boundary before any query reaches the platform. The design below shows the data layer, the boundary and the AI layer as one architecture, with the reasons for each placement.",
    capabilities: [
      "Attachment-point design for AI on governed data",
      "Identity and access boundary between data and AI layers",
      "Read-only reporting-layer integration",
      "Human-review routing for any proposed action",
    ],
    workflow: [
      { step: "Resolve identity", detail: "A request for analysis or drafting resolves through the identity boundary first." },
      { step: "Read the reporting layer", detail: "The request reads only reconciled reporting output, never staging, core or calc." },
      { step: "Return for review", detail: "The result is a draft or summary for a human, with no write path back into the platform." },
    ],
    outcomes: [
      "Adding an AI layer does not loosen the governance the data layer was built to provide",
      "The attachment point is decided before any model is given access",
      "Every read attributable to the identity that made it",
    ],
    pillar: "enterprise-ai-architecture-deployment",
    detailCaseSlugs: ["enterprise-data-ai-platform-architecture"],
  },
];

export const solutionBySlug = (s: string) => solutions.find((x) => x.slug === s);
