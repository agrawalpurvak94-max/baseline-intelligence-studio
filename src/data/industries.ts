export type Industry = {
  slug: string;
  name: string;
  hero: string;
  lead: string;
  pains: string[];
  opportunities: string[];
  before: string[];
  after: string[];
  // --- new, optional (featured enterprise industries only) ---
  featured?: boolean;
  pov?: { broken: string; different: string; boundary: string };
  painPracticeOutcome?: { pain: string; practice: string; outcome: string }[];
  faq?: { q: string; a: string }[];
  notAFit?: string;
  caseStudies?: string[]; // case-study slugs
  relatedCapabilities?: string[]; // solution slugs
};

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    featured: true,
    hero: "ERP exports, Excel and the shop floor — reconciled into one number you can trust.",
    lead: "Most mid-size plants run their ERP and the shop floor as two separate truths, bridged once a month by hand in Excel. We build the layer that makes them agree: a plant MIS that reconciles to SAP or whatever ERP you run, inventory intelligence that explains its exceptions instead of just listing them, and governed agents that draft the answer before someone has to assemble it.",
    pains: [
      "The daily production and OEE number is hand-logged at shift end, not computed from source",
      "SAP trial-balance and inventory data get exported, then rebuilt by hand into the monthly report",
      "MRP throws hundreds of exception messages a week, and planners triage by gut",
      "Slow-moving and obsolete stock sits unflagged until someone notices at month-end",
      "Vendor OTIF is chased over email and WhatsApp, disconnected from what the ERP already knows",
      "The ERP is over-customised, and standardising anything feels risky",
    ],
    opportunities: [
      "Plant MIS & SAP reporting",
      "Inventory & MRP exception intelligence",
      "Supplier OTIF scorecards",
      "Governed plant data agents",
      "SAP data integration & analytics",
      "Legacy Excel/SAP-export modernisation",
      "Enterprise data engineering",
    ],
    before: [
      "SAP trial-balance exported, then rebuilt by hand into a 25-tab workbook",
      "OEE guessed from paper shift logs, not computed from source",
      "MRP exceptions triaged by gut feel, with no stated priority",
    ],
    after: [
      "One reconciled management report, computed once and checked against an independent path",
      "A daily number traced back to the ERP or shop-floor record it came from",
      "Exceptions grouped and ranked by a rule you can see, not a feeling",
    ],
    pov: {
      broken:
        "Most mid-size manufacturers run their core ERP — often SAP ECC or S/4HANA — and the plant floor as two separate truths, reconciled by hand once a month in a workbook nobody but its author fully understands. AI vendors answer with a chat-your-data demo that skips the actual mess underneath: the exports, the Z-reports, the reconciliation nobody currently trusts enough to automate blind.",
      different:
        "We start from the export your team already pulls, not a platform migration or a new ERP module. Every number the system produces is computed once and checked against an independent calculation path before anyone reports on it. We hand over the audit trail and the decision log alongside the dashboard, not instead of it.",
      boundary:
        "We don't replace your ERP, MES or QMS, and we don't make unreviewed changes to a validated system. Everything we build defaults to read-only. Any action that writes back to a system of record needs an explicit human approval step and leaves an audit trail — by design, not by policy we hope holds.",
    },
    painPracticeOutcome: [
      {
        pain: "OEE and daily production numbers are hand-logged at shift end, then re-typed into Excel",
        practice: "Enterprise Data Engineering",
        outcome:
          "Every number is computed once, in a versioned pipeline, traced back to the ERP or shop-floor record it came from — not re-typed.",
      },
      {
        pain: "SAP trial-balance and inventory data are exported, then rebuilt by hand into the monthly management report",
        practice: "SAP Data Integration & Analytics",
        outcome:
          "The same SAP export drives a deterministic calculation engine, independently reconciled against the manual version, line by line.",
      },
      {
        pain: "MRP throws hundreds of exception messages a week; planners triage by gut",
        practice: "Intelligent Process Automation",
        outcome:
          "Exceptions are grouped and ranked by a stated rule, not a model's mood — every ranking traceable to the rule that produced it.",
      },
      {
        pain: "Vendor OTIF and chasing live in email and WhatsApp, disconnected from the ERP",
        practice: "Intelligent Process Automation",
        outcome:
          "OTIF is computed from ERP schedule-line and goods-receipt data, with chaser drafts a human sends — not a bot that emails your vendors.",
      },
      {
        pain: "A 25-tab, 17,000-formula workbook is the only documentation of how month-end close actually works",
        practice: "Legacy Application Modernisation",
        outcome:
          "The workbook's logic is reverse-engineered into a decision log and a tested pipeline — every formula traced to a rule, every ambiguous one logged for your team to decide, not guessed.",
      },
      {
        pain: "Leadership wants to ask the plant a question instead of waiting for next week's report",
        practice: "Enterprise AI & Agentic Systems",
        outcome:
          "A read-only agent answers from governed metric definitions with its query shown — it drafts, people decide, and nothing writes back to the ERP without approval.",
      },
    ],
    faq: [
      {
        q: "Will this touch our validated or production ERP system (SAP or otherwise)?",
        a: "No, by default. We extract read-only — delta-based, off-peak, from a scoped service account — and don't write custom ABAP into your core. Anything that would ever write back to SAP sits behind an explicit approval step.",
      },
      {
        q: "We're on SAP ECC and not moving to S/4 soon — does this even apply to us?",
        a: "Yes. We build the data and reporting layer to be decoupled from which SAP version you're on, so it's useful now and survives a future S/4 cutover as a source-switch, not a rebuild.",
      },
      {
        q: "Our ERP is heavily customised — will you need to touch our Z-objects?",
        a: "No. We start from the export or report your team already produces. Rationalising Z-reports is a separate, later conversation if you want it — we don't need it to deliver the first reconciled report.",
      },
      {
        q: "Will our operators need to type more into another system?",
        a: "Depends on what we're solving. We start from your ERP, MES and whatever shift logs already exist rather than adding a new data-entry burden by default, and we say upfront when a use case genuinely needs new capture.",
      },
      {
        q: "What's the first deliverable, and how fast?",
        a: "We're not going to put an unsourced number here. Our Manufacturing MIS Automation and SAP Inventory Automation builds (linked below) show the shape and depth of a full engagement — look at those before asking us for a timeline on yours.",
      },
      {
        q: "Why not just use SAP Joule or Microsoft Fabric's manufacturing copilot?",
        a: "Those work inside SAP or inside Fabric. Most of the mess sits across SAP, MES, QMS, Excel and email at once — that cross-system reconciliation is the actual job, and it's where the native copilots stop.",
      },
    ],
    notAFit:
      "If you need a certified MES/QMS replacement with its own validation framework, you need that vendor — we integrate with what you have, we don't replace it. If you need real-time PLC-level control-loop software, that's not our layer. If the project needs a 50-person delivery team and a multi-year SI contract, we're the wrong size on purpose. And if you need live SAP OData/RFC posting into production SAP today, say so clearly: our SAP work right now is export-and-extract driven, not a live system connection, and we won't pretend otherwise.",
    caseStudies: [
      "sap-exports-manufacturing-intelligence-platform",
      "intelligent-inventory-reconciliation",
      "spreadsheet-to-intelligent-business-applications",
      "legacy-erp-process-modernisation",
    ],
    relatedCapabilities: [
      "sap-data-integration-analytics",
      "enterprise-data-engineering",
      "intelligent-automation",
      "ai-agentic-systems",
      "legacy-application-modernisation",
    ],
  },
  {
    slug: "pharmaceuticals-life-sciences",
    name: "Pharmaceuticals & Life Sciences",
    featured: true,
    hero: "Decision-support AI for regulated plants — never the one approving the batch.",
    lead: "Pharma manufacturers run on SAP, a QMS and a quality unit that signs everything. We build the reporting, review-triage and data-integrity layer around that reality — read-only, audit-logged, and deliberately kept out of GxP-critical decisions.",
    pains: [
      "Batch record review means reading the entire record, not just the exceptions",
      "Deviations and CAPAs back up, and repeat deviations are spotted by memory, not by search",
      "Data-integrity findings are the single most common thing in recent FDA warning letters, and Indian sites are cited at a markedly higher rate",
      "Revised Schedule M is forcing documentation and CAPA discipline onto a budget most MSME units don't have",
      "Quality teams won't trust a tool that can't show an inspector its audit trail",
      "Management and quality KPIs are rebuilt by hand from SAP and the QMS every reporting cycle",
    ],
    opportunities: [
      "Plant MIS & quality KPIs on SAP and QMS data",
      "Deviation/CAPA triage and drafting assistant",
      "Audit and inspection-readiness packs",
      "Data-integrity and ALCOA+ governed pipelines",
      "SAP data integration & analytics",
      "Enterprise data engineering",
    ],
    before: [
      "QA reads the full batch record because review-by-exception isn't built",
      "Repeat deviation patterns are spotted by memory, not by search",
      "Quality and MIS KPIs are rebuilt by hand from SAP and the QMS each cycle",
    ],
    after: [
      "Completeness gaps and cross-field inconsistencies surfaced for the reviewer, who still reviews",
      "Similar and repeat deviations flagged with the supporting evidence attached",
      "A quality and MIS report traced to source, every run logged",
    ],
    pov: {
      broken:
        "Pharma quality teams keep hearing that AI will speed up batch review and deviation handling, from vendors who don't mention Part 11, ALCOA+, or who's accountable when the model is wrong. The EU's draft GMP Annex 22 is drawing a hard line on this: dynamic or generative AI models should not be used in critical GMP applications. Most \"AI for pharma\" pitches skip that line entirely, or bury it in a footnote.",
      different:
        "We design to the boundary instead of around it. Every output we produce is attributable to a model version, a prompt, and a named human reviewer. Nothing we build makes a GxP-critical decision on its own — not because a regulator told us to say that, but because it's the actual scope of what we offer.",
      boundary:
        "We do not propose generative AI for GxP-critical decisions. Our pharma work is human-reviewed, audit-logged, decision-support only: batch-record pre-checks, deviation/CAPA triage and drafting, reporting, and data-integrity tooling. Never automated disposition, never automated release.",
    },
    painPracticeOutcome: [
      {
        pain: "QA reviews the entire batch record because review-by-exception isn't built",
        practice: "Enterprise AI & Agentic Systems",
        outcome:
          "A pre-check surfaces completeness gaps and cross-field inconsistencies for the reviewer to act on; the reviewer still reviews and signs.",
      },
      {
        pain: "Deviations and CAPAs back up, and repeat patterns are spotted by memory",
        practice: "Enterprise AI & Agentic Systems",
        outcome:
          "Similar-event search and a drafted narrative go to QA for edit and approval — the triage step is logged, the decision stays human.",
      },
      {
        pain: "Quality and management KPIs are rebuilt by hand from SAP and the QMS every cycle",
        practice: "SAP Data Integration & Analytics",
        outcome:
          "Cycle time, right-first-time and deviation ageing are computed once from the same extracts your team already pulls, reconciled against the manual version.",
      },
      {
        pain: "Data-integrity gaps are the most commonly cited warning-letter finding, and no one has time to self-audit for them",
        practice: "Enterprise Data Engineering",
        outcome:
          "Every pipeline we build ships with independent reconciliation controls, hash-verified lineage and a run ledger — an audit trail an inspector can follow.",
      },
      {
        pain: "MSME units face Revised Schedule M's documentation and CAPA bar on a tight budget",
        practice: "Legacy Application Modernisation",
        outcome:
          "Excel- and SAP-export-driven quality processes are reverse-engineered into a documented, tested pipeline instead of a new system you have to buy and validate from scratch.",
      },
    ],
    faq: [
      {
        q: "Is this validated, and will an inspector accept it?",
        a: "We're not a validated QMS, MES or LIMS vendor, and we won't claim to be. What we provide is an intended-use statement, audit logs, model version-pinning and traceability evidence — the inputs your quality unit needs to make its own validation and acceptance call. Accountability for that call stays with you, as it should.",
      },
      {
        q: "Does this use generative AI to review or release batches?",
        a: "No. Read the boundary above again — that's not a simplification for the FAQ, it's the actual scope. Decision-support and drafting only; a named human reviews and signs everything that matters.",
      },
      {
        q: "What about Part 11, Annex 11 and ALCOA+?",
        a: "Every AI input and output — prompt, retrieved context, model version, reviewer, timestamp — is attributable and retained in an immutable store, never silently overwritten. That's the design pattern, not a compliance claim we're making on your behalf; your quality unit still owns the formal assessment.",
      },
      {
        q: "Where does our data go? Can it leave the plant?",
        a: "Our default posture is client-tenant or on-prem deployment, with no training on client data. Confirm specifics for your engagement — we're not going to give you a universal answer that doesn't hold for every deployment shape.",
      },
      {
        q: "Is the EU's Annex 22 ban on generative AI in critical GMP final?",
        a: "No — as of our most recent research, it was still in draft, with final text targeted for later in 2026 and the exact boundary still being discussed by regulators. We've built our posture to the stricter draft reading regardless of how the final text lands.",
      },
      {
        q: "Do you replace our QMS, LIMS or MES — Veeva, TrackWise, MasterControl, Werum PAS-X?",
        a: "No. We are not a QMS/MES/LIMS vendor and we integrate with what you already run, we don't replace it.",
      },
    ],
    notAFit:
      "If you want AI to make or recommend a batch disposition or release decision, that's off the table under our own stated boundary — not a regulatory technicality we might relax. If your first requirement is a certified, vendor-validated QMS/LIMS/MES replacement, you need that vendor, not us. And if your plant is paper-only with no SAP or QMS extract to start from, the data-integration groundwork has to come before any of this.",
    caseStudies: [
      "sap-exports-manufacturing-intelligence-platform",
      "intelligent-inventory-reconciliation",
    ],
    relatedCapabilities: [
      "sap-data-integration-analytics",
      "enterprise-data-engineering",
      "ai-agentic-systems",
      "legacy-application-modernisation",
    ],
  },
  {
    slug: "automotive-mobility",
    name: "Automotive & Mobility",
    featured: true,
    hero: "PPM, OTIF and traceability — read straight from your ERP and quality systems, not rebuilt from memory.",
    lead: "Tier-1 and Tier-2 suppliers live on customer scorecards, PPAP paperwork and schedule volatility. We build the layer that turns ERP, quality and dispatch data into a scorecard you can defend before the customer calls.",
    pains: [
      "Customer scorecards — PPM, OTIF, premium freight — get assembled by hand before every review",
      "PPAP/APQP documentation load slows down SOP dates",
      "Schedule changes and call-offs hit MRP faster than planners can re-plan",
      "SPC data sits stranded in CMMs and Excel, disconnected from the ERP lot",
      "Traceability from raw material to shipment spans ERP, MES and paper",
      "Tier-2 suppliers lag Tier-1 on IATF depth and digitisation, and it shows at audit",
    ],
    opportunities: [
      "Customer & supplier scorecard automation",
      "Schedule-change impact intelligence",
      "Traceability & recall-readiness layer",
      "SPC analytics tied to ERP lots",
      "PPAP/APQP document assembly",
      "ERP & quality-system data integration",
    ],
    before: [
      "Scorecard built by hand from ERP, quality and dispatch exports",
      "SPC data stuck in the CMM, disconnected from the ERP lot",
      "A schedule change means a planner manually re-checking MRP",
    ],
    after: [
      "PPM, OTIF and premium freight computed from source, with drill-down to root cause",
      "SPC and Cpk tied back to the ERP lot that produced it",
      "Schedule-change impact drafted for a planner to review, not re-derived from scratch",
    ],
    pov: {
      broken:
        "A scorecard breach or a quality escape usually surfaces after the fact — assembled the night before the review from a dispatch export, a quality system and the ERP, each pulled by hand. Vision and AI vendors mostly sell the camera station; almost nobody connects it to the ERP lot, the control plan, or the recall drill that actually matters when something goes wrong.",
      different:
        "We start from the ERP and quality data already in your systems and make the scorecard, the traceability chain and the exception list reconcile to it — before any vision or sensor layer gets added.",
      boundary:
        "We don't put an unvalidated AI vision system into a customer's control plan, and we don't replace the SPC/MSA tooling your IATF audits already trust. Where vision comes up, it's a feasibility exercise with your quality team's sign-off built in from the start — not a drop-in inspection product we're selling you.",
    },
    painPracticeOutcome: [
      {
        pain: "Customer scorecards are assembled by hand from ERP, quality and dispatch data before every review",
        practice: "ERP Data Integration & Analytics",
        outcome:
          "PPM, OTIF and premium freight are computed from the same ERP schedule-line and goods-receipt data every time, with drill-down to the lot or line that caused it.",
      },
      {
        pain: "Schedule changes and call-offs outrun a planner's ability to re-check MRP by hand",
        practice: "Intelligent Process Automation",
        outcome:
          "Impact on material and capacity is computed and drafted for the planner to review — the planner still decides; nothing auto-orders.",
      },
      {
        pain: "Traceability runs across ERP, MES and paper, and a recall drill means a manual search",
        practice: "Enterprise Data Engineering",
        outcome:
          "Lot and serial genealogy is modelled once, versioned and queryable — a recall-readiness check becomes a query, not a scramble.",
      },
      {
        pain: "SPC data sits in the CMM, disconnected from the ERP lot it came from",
        practice: "Legacy Application Modernisation",
        outcome:
          "CMM and Excel-based SPC logic is reverse-engineered and tied back to the ERP lot, with every rule traced to its source instead of re-typed.",
      },
      {
        pain: "PPAP/APQP packages are assembled document by document under SOP-date pressure",
        practice: "Enterprise AI & Agentic Systems",
        outcome:
          "A gap checker assembles the package and flags what's missing; a human still signs it off.",
      },
    ],
    faq: [
      {
        q: "Will the customer accept an AI vision inspection in our control plan?",
        a: "That's a decision for your quality team and your customer, gated by MSA and attribute agreement — we won't pretend otherwise. What we offer today is a feasibility exercise, not a drop-in gauge. We have one solution concept on record — an in-line marking-depth monitoring blueprint, prepared for an automation OEM serving automotive customers — concept stage, with no code, model, pilot or hardware test behind it yet, not a running line.",
      },
      {
        q: "Our SPC tools already work — why touch them?",
        a: "We're not replacing them. We tie their output back to the ERP lot so Cpk and your ERP data agree, instead of living in two places that drift apart.",
      },
      {
        q: "How fast can we produce a suspect-lot list in a recall drill?",
        a: "That depends on how clean your traceability data already is. The real first step is modelling the genealogy chain once — after that, a recall drill becomes a query instead of a multi-system search. We're not going to put an unsourced speed number against this.",
      },
      {
        q: "Does this touch our ERP system or MRP directly?",
        a: "Read-only by default. Schedule-change impact goes to a planner as a draft; nothing auto-places or changes an order without an approval step.",
      },
      {
        q: "We're a Tier-2 without a big IT team — is this out of our league?",
        a: "No — this is built for exactly that gap. It starts from the ERP and Excel you already run, not a platform purchase you'd need a bigger team to manage.",
      },
      {
        q: "What about EDI 830/862 schedule feeds from our OEM?",
        a: "EDI and portal release mechanics vary by OEM and by program, and we don't have independently verified integration depth to cite yet. We scope this per customer rather than claim one universal connector.",
      },
    ],
    notAFit:
      "If you need a camera-and-PLC inspection system shipped and warranted by a single vendor on day one, that's a hardware-and-vision specialist's job — we'd rather point you there than pretend we're that vendor. And if your ERP or quality data isn't extractable at all yet — genuinely paper-only — the digitisation step has to come before a scorecard or traceability layer makes sense.",
    relatedCapabilities: [
      "industrial-ai-vision",
      "sap-data-integration-analytics",
      "enterprise-data-engineering",
      "legacy-application-modernisation",
      "ai-agentic-systems",
      "industrial-ai-vision",
    ],
  },
  {
    slug: "industrial-equipment-oem-suppliers",
    name: "Industrial Equipment & OEM Suppliers",
    featured: true,
    hero: "MRP exceptions and inventory reconciliation, turned into one governed report.",
    lead: "Tier-1/2 precision and component manufacturers run month-end inventory and MRP out of ERP exports (commonly SAP) and Excel. We build the calculation engine and reconciliation layer that makes those numbers defensible to Finance — without touching your live ERP system.",
    pains: [
      "Month-end inventory ageing, holding and valuation are rebuilt by hand from ERP exports",
      "MRP exceptions pile up faster than planners can triage them by gut",
      "Stock accuracy drifts from backflush errors and substitutions, unflagged until month-end",
      "Operational reports are a patchwork of Excel macros one person understands",
      "Legacy VB/Access/Excel tools carry process knowledge no one has documented",
      "Finance questions a number and nobody can show exactly how it was calculated",
    ],
    opportunities: [
      "ERP data integration & analytics",
      "Inventory & MRP exception intelligence",
      "Enterprise data engineering",
      "Legacy application modernisation",
      "Finance/MIS reconciliation reporting",
      "Enterprise AI & agentic systems",
    ],
    before: [
      "Inventory ageing rebuilt by hand from four separate ERP exports",
      "MRP exceptions triaged by gut feel, no stated priority",
      "A legacy Excel macro is the only record of how a report is built",
    ],
    after: [
      "Four report families computed by one engine, reconciled column by column against the existing workbook",
      "Exceptions grouped and ranked by a rule you can see",
      "The old workbook's logic documented, tested and traceable to source",
    ],
    pov: {
      broken:
        "Inventory and MRP reporting at most OEM and component suppliers runs on ERP exports — commonly SAP — rebuilt in Excel by whoever inherited the spreadsheet. The logic lives in formulas, not documentation, and every month-end close is one formula error away from a number Finance can't defend.",
      different:
        "We reverse-engineer the existing workbook into a tested, documented pipeline before we change anything, then run the two side by side until they agree. Finance signs off on reconciliation, not a leap of faith.",
      boundary:
        "We work from your ERP's export files (commonly SAP), not a live system connection — that's the honest scope today. We don't post anything back into your ERP, and we don't touch MRP parameters without a human approving the change.",
    },
    painPracticeOutcome: [
      {
        pain: "Month-end inventory ageing, holding and valuation are rebuilt by hand from ERP exports",
        practice: "ERP Data Integration & Analytics",
        outcome:
          "A SQL Server engine computes the same report families from the same exports, reconciled column by column against the workbook it replaces.",
      },
      {
        pain: "MRP exceptions pile up faster than planners can triage them",
        practice: "Intelligent Process Automation",
        outcome:
          "Exceptions are grouped and ranked by a stated rule, with the reasoning shown — not a black-box score.",
      },
      {
        pain: "Stock accuracy drifts from backflush errors and substitutions, unflagged until month-end",
        practice: "Enterprise Data Engineering",
        outcome:
          "Staged, versioned ingestion with reconciliation controls surfaces variance hotspots as they happen, not at close.",
      },
      {
        pain: "A legacy Excel macro or Access tool is the only documentation of how a report actually works",
        practice: "Legacy Application Modernisation",
        outcome:
          "The logic is reverse-engineered into a decision log and a tested pipeline — every formula traced, every ambiguous rule logged for your team to decide.",
      },
      {
        pain: "Finance questions a number and nobody can show how it was calculated",
        practice: "Enterprise Data Engineering",
        outcome: "Every number traces to a versioned rule and a run ledger — an audit trail, not a shrug.",
      },
    ],
    faq: [
      {
        q: "Does this connect to our live ERP system?",
        a: "Not yet. Today it's ERP-export driven (commonly SAP). Live ERP integration — OData, RFC, or an equivalent API — is on our roadmap, not something we've delivered, and we'll keep saying that plainly rather than let \"ERP data integration\" imply more.",
      },
      {
        q: "What happens to the old Excel workbook?",
        a: "We run the new engine in parallel against it until reconciliation holds. After that, retiring the old one is your call, not ours.",
      },
      {
        q: "Who signs off on the numbers before go-live?",
        a: "Your Finance team, against a documented reconciliation. In our own SAP Inventory Automation build, the engine matched the customer's own workbook on 18 of 29 compared columns exactly, with 11 more within 0.5% — that's the discipline we apply, not a promise about what your specific data will show.",
      },
      {
        q: "Do you change our MRP parameters or safety-stock settings?",
        a: "No. We surface parameter-review recommendations; any actual change is yours to approve and make.",
      },
      {
        q: "We don't have an IT team to manage this — what's the ongoing burden?",
        a: "We don't have sourced data yet on typical ongoing support effort for this kind of engagement — an honest answer needs real engagement history, not a guess.",
      },
      {
        q: "Why not just buy an MRP/MES add-on module instead?",
        a: "Those modules assume clean master data and a platform budget most mid-size suppliers don't have yet. We start from the export you already have and the reconciliation discipline underneath it — often the missing piece regardless of which platform you eventually buy.",
      },
    ],
    notAFit:
      "If you need live ERP posting or OData/RFC integration today, say so clearly: that's not delivered yet, and we won't oversell it. And if the goal is really a platform purchase — a new MRP or MES module — start with that vendor; come back to us for the reconciliation and governance layer around whatever you choose.",
    caseStudies: [
      "intelligent-inventory-reconciliation",
      "spreadsheet-to-intelligent-business-applications",
      "legacy-erp-process-modernisation",
    ],
    relatedCapabilities: [
      "sap-data-integration-analytics",
      "enterprise-data-engineering",
      "legacy-application-modernisation",
      "intelligent-automation",
    ],
  },
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
