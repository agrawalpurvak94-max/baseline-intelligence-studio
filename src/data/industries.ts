export type Industry = {
  slug: string;
  name: string;
  hero: string;
  lead: string;
  pains: string[];
  opportunities: string[];
  before: string[];
  after: string[];
};

export const industries: Industry[] = [
  {
    slug: "accounting-finance",
    name: "Accounting & Finance",
    hero: "AI & automation for accounting firms",
    lead: "The work your finance team shouldn't still be doing manually — document collection, extraction, reconciliation and reporting, rebuilt as an intelligent workflow.",
    pains: [
      "Chasing clients for missing documents",
      "Manual data entry from PDFs and emails",
      "Reconciliation across bank feeds and statements",
      "Copy-pasting numbers into reports",
    ],
    opportunities: [
      "Client document collection",
      "Invoice & AP automation",
      "Reconciliation workflows",
      "Financial document extraction",
      "Client follow-ups",
      "Reporting automation",
      "AI finance assistants",
    ],
    before: ["Emails and portals scattered", "Manual PDF entry", "End-of-month scramble"],
    after: ["Documents auto-collected", "Structured data in your ledger", "Continuous close"],
  },
  {
    slug: "home-services",
    name: "Home Services",
    hero: "AI receptionists and revenue systems for home service businesses",
    lead: "Every missed call is missed revenue. We build the voice, qualification and follow-up systems that keep the pipeline moving 24/7.",
    pains: [
      "Calls going to voicemail",
      "Leads never followed up",
      "Estimates that go cold",
      "Booking chaos across channels",
    ],
    opportunities: [
      "AI voice receptionist",
      "Missed-call recovery",
      "Lead qualification",
      "Booking automation",
      "Estimate follow-up",
      "Review requests",
      "CRM automation",
      "Dormant lead reactivation",
    ],
    before: ["Missed calls", "Manual follow-ups", "Cold estimates"],
    after: ["Every call answered", "Automatic follow-up", "Booked jobs on the calendar"],
  },
  {
    slug: "financial-services",
    name: "NBFC & Financial Services",
    hero: "Operational AI for lending, KYC and customer workflows",
    lead: "Document-heavy, communication-heavy workflows redesigned with AI as a support layer for your teams — never as a replacement for regulated decisions.",
    pains: [
      "KYC document collection and verification",
      "Application intake from many channels",
      "Collections communication volume",
      "Reconciliation across systems",
    ],
    opportunities: [
      "Loan document processing",
      "KYC workflows",
      "Application intake",
      "Underwriting assistance",
      "Collections workflows",
      "Customer communication",
      "Reconciliation",
      "Compliance document intelligence",
    ],
    before: ["Manual document review", "Scattered applications", "Reactive collections"],
    after: ["AI-assisted review", "Unified intake", "Structured collections workflows"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    hero: "From RFQ to production, connected end-to-end",
    lead: "Turn the emails, spreadsheets and PDFs moving between sales, production and vendors into a single connected workflow.",
    pains: [
      "RFQs lost in inboxes",
      "Manual quotation building",
      "No visibility into order status",
      "Vendor communication over WhatsApp",
    ],
    opportunities: [
      "RFQ intake",
      "Quotation workflows",
      "Order visibility",
      "Production tracking",
      "Document processing",
      "Vendor communication",
      "Operational intelligence",
    ],
    before: ["Inbox-driven ops", "Excel handoffs", "Blind production status"],
    after: ["Structured RFQ intake", "Automated quotations", "Live production visibility"],
  },
  {
    slug: "freight-forwarding",
    name: "Freight Forwarding",
    hero: "Intelligent operations for shipment-heavy workflows",
    lead: "Shipment emails, documents and status updates handled automatically — with humans focused on exceptions.",
    pains: [
      "Shipment emails buried in inboxes",
      "Manual data entry from BLs and invoices",
      "Customer status chases",
      "Document matching across parties",
    ],
    opportunities: [
      "Shipment email processing",
      "Document extraction",
      "Booking workflows",
      "Shipment updates",
      "Invoice / document matching",
      "Customer status communication",
    ],
    before: ["Reactive inbox work", "Manual document entry", "Customer follow-ups"],
    after: ["Auto-processed shipments", "Structured document data", "Proactive updates"],
  },
  {
    slug: "supply-chain-logistics",
    name: "Supply Chain & Logistics",
    hero: "Operational intelligence across POs, suppliers and inventory",
    lead: "The paperwork and coordination behind every shipment — automated, tracked, and reported.",
    pains: [
      "PO processing across suppliers",
      "Manual invoice matching",
      "Inventory blind spots",
      "Exception handling by email",
    ],
    opportunities: [
      "Purchase order processing",
      "Supplier communication",
      "Inventory alerts",
      "Invoice matching",
      "Exception management",
      "Logistics document intelligence",
      "Operational dashboards",
    ],
    before: ["Email-based POs", "Manual matching", "Ad-hoc exceptions"],
    after: ["Structured PO flows", "Automated matching", "Managed exceptions"],
  },
  {
    slug: "professional-services",
    name: "Professional & Business Services",
    hero: "AI and automation for professional services teams",
    lead: "Client onboarding, invoicing, reporting and internal knowledge — turned into a system your team actually runs on.",
    pains: [
      "Client onboarding takes weeks",
      "Repetitive email work",
      "Reports rebuilt every month",
      "Knowledge trapped in inboxes",
    ],
    opportunities: [
      "Email automation",
      "CRM workflows",
      "Client onboarding",
      "Invoicing",
      "Reporting",
      "Document processing",
      "Internal knowledge systems",
      "Operational dashboards",
    ],
    before: ["Manual onboarding", "Repetitive email work", "Static reports"],
    after: ["Guided onboarding flows", "Automated client comms", "Live reports"],
  },
];

export const industryBySlug = (s: string) => industries.find((x) => x.slug === s);