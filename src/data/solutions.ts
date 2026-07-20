export type Solution = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  lead: string;
  capabilities: string[];
  workflow: { step: string; detail: string }[];
  outcomes: string[];
};

export const solutions: Solution[] = [
  {
    slug: "intelligent-automation",
    title: "Intelligent Automation",
    eyebrow: "Capability",
    tagline: "Eliminate repetitive work and connect the systems your business already depends on.",
    lead: "We map the manual handoffs across your operations, then rebuild them as a single automated flow — moving information between email, documents, CRM, finance and internal tools without the copy-paste in between.",
    capabilities: [
      "Workflow Automation",
      "Finance Operations",
      "Email & Document Processing",
      "CRM Automation",
      "Back-Office Automation",
      "Cross-System Integrations",
    ],
    workflow: [
      { step: "Trigger", detail: "An email, form, upload or system event starts the flow." },
      { step: "Understand", detail: "AI parses and structures the input, whatever the format." },
      { step: "Decide", detail: "Business rules and AI decide the right next action." },
      { step: "Execute", detail: "The system takes action across your tools." },
      { step: "Update Systems", detail: "Every system of record stays in sync automatically." },
    ],
    outcomes: [
      "Hours of repetitive work removed per week",
      "Fewer errors from manual data entry",
      "Faster cycle times across operations",
    ],
  },
  {
    slug: "ai-agentic-systems",
    title: "AI & Agentic Systems",
    eyebrow: "Capability",
    tagline: "Intelligent systems that understand context, make decisions and take action across real business workflows.",
    lead: "We build agentic systems that reason across your data and tools — not chatbots. Voice, document intelligence, decision support and multi-step agents deployed into real operational workflows.",
    capabilities: [
      "AI Agents",
      "Voice Agents",
      "Document Intelligence",
      "Knowledge Systems",
      "AI Decision Support",
      "Agentic Workflows",
    ],
    workflow: [
      { step: "Input", detail: "Request enters via email, call, form or another system." },
      { step: "Reason", detail: "The agent gathers context from your knowledge and data." },
      { step: "Invoke Tools", detail: "It calls the right internal tools to complete the task." },
      { step: "Act", detail: "It executes the outcome and confirms with the right people." },
      { step: "Return", detail: "Structured result written back to your systems." },
    ],
    outcomes: [
      "Consistent decisions at scale",
      "24/7 coverage for high-volume workflows",
      "Humans focused on exceptions, not repetition",
    ],
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
  },
];

export const solutionBySlug = (s: string) => solutions.find((x) => x.slug === s);