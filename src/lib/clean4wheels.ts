/**
 * Clean4Wheels case-study copy.
 *
 * Convention is that copy lives in `content.ts`, and this is re-exported from
 * there so imports still come from one place. It sits in its own module only
 * because it is longer than everything else in `content.ts` combined.
 *
 * The words are kept as written in the Figma case study: these are research
 * findings and numbers agreed with the client, so they are not ours to
 * paraphrase. Only sentence casing and the site's copy rules (no em dashes,
 * no trailing full stops on headings) have been applied.
 *
 * Imagery is the exported Figma frames, re-encoded to WebP under
 * `public/work/clean4wheels/` (8.4MB of PNG became 948KB).
 */
export const clean4Wheels = {
  slug: "clean4wheels",
  /** The Figma prototype this study is written about. */
  prototype:
    "https://www.figma.com/proto/BTNwIUMJRvUMms43gM60bm/Clean4Wheels?node-id=449-44158&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=449%3A44158&page-id=23%3A2",
  tags: ["UX design", "Service design"],
  client: "Clean4Wheels",
  logo: "/work/clean4wheels/logo.svg",
  title: "Designed a connected service ecosystem for customer, valet and manager",
  /**
   * The through-line, stated before anything else. Without it the argument
   * only assembles itself around the halfway mark, and most readers do not
   * get that far.
   */
  deck: "A car-care company thought it had a website problem. Five months of research said it had a visibility problem, and fixing that meant designing for three users nobody had designed for.",
  facts: [
    { label: "My role", value: "Product Designer" },
    { label: "Team", value: "Sole designer, with founder, CTO and ops" },
    { label: "Duration", value: "5 months" },
    { label: "Scope", value: "Customer, Valet, Admin" },
  ],
  hero: "/work/clean4wheels/hero.webp",

  /**
   * The whole arc in four lines, for the reader who gives the page a minute.
   * Everything below is the evidence for these four claims.
   */
  glance: [
    {
      label: "Context",
      value:
        "A subscription doorstep car-care service, running an offline operation on software that had stopped matching how the business worked.",
    },
    {
      label: "Problem",
      value:
        "Customers went dark after paying, managers could not see the field, and valets reported by hand. One root cause: nobody could see anything.",
    },
    {
      label: "What I did",
      value:
        "Reframed a website redesign as a three-sided service ecosystem, then designed the booking journey, a verification loop and a field app on one system.",
    },
    {
      label: "Result",
      value:
        "Verification became the product's differentiator, the thing no competitor offered.",
    },
  ],

  metrics: [
    {
      value: "28%",
      label: "Booking completion",
      note: "Guided 5-step flow vs fragmented journey",
    },
    {
      value: "22%",
      label: "Customer retention",
      note: "Trust loop via transparency and verification",
    },
    {
      value: "75%",
      label: "Operational visibility",
      note: "Centralised workforce tracking platform",
    },
  ],
  /**
   * Shown on every metric card, not just in a footnote underneath. These are
   * modelled numbers; presenting them as measured would be the fastest way to
   * lose a reader who knows the difference.
   */
  metricsTag: "Projected",
  metricsNote:
    "These are projected outcomes, modelled with stakeholders from UX benchmarks rather than measured after launch.",

  ecosystem: {
    n: "1",
    eyebrow: "Service ecosystem",
    title: "Beyond a booking platform",
    /* Trimmed: the summary above now carries the setup, so this only has to
       explain the dependency between the three roles. */
    lead: "Every successful booking depends on three people staying in step: the customer, the manager dispatching work, and the valet doing it. As the business grew, the software stopped keeping up with that coordination.",
    steps: [
      { name: "Customer", note: "Initiates the service request" },
      { name: "Booking", note: "Customer initiates a service booking" },
      { name: "Manager", note: "Manager oversees the operational workflow" },
      { name: "Valet", note: "Valet receives task and executes service" },
      { name: "Verification", note: "Proof collection and service quality check" },
      { name: "Retention", note: "Final stage ensuring customer loyalty" },
    ],
    quote:
      "Treating this as a connected service ecosystem rather than an isolated booking flow is what surfaced the opportunities: the ones that made operations more efficient were the same ones that built customer trust.",
  },

  context: {
    n: "2",
    eyebrow: "Business context",
    title: "Operational gaps across the service ecosystem",
    /* The setup moved to the summary block, so this section opens straight on
       the tension: one broken system, four people feeling it differently. */
    lead: "One disconnected system, felt four different ways.",
    gaps: [
      {
        area: "Customer experience",
        title: "The black hole of booking confirmation",
        body: "Zero post-booking visibility created a psychological trust gap. Customers felt ignored between payment and arrival.",
        pain: "Anxiety-driven cancellations due to opaque arrival times.",
        opportunity: "Real-time GPS tracking and SMS status notifications.",
        impact: "40% fewer cancellations",
      },
      {
        area: "Operations management",
        title: "Cognitive overload in manual dispatching",
        body: "Fleet managers juggled 4+ tools to sync bookings, valet availability and traffic data manually.",
        pain: "Information silos leading to inefficient route dispatching.",
        opportunity: "Unified command centre for live logistics monitoring.",
        impact: "25% more capacity",
      },
      {
        area: "Field workforce",
        title: "Liability risk and verification fragmentation",
        body: "Valets relied on fragmented communication and manual reporting to complete daily tasks.",
        pain: "High risk of data loss and inconsistent service quality.",
        opportunity: "Native field app with guided checklists and photo uploads.",
        impact: "100% data integrity",
      },
      {
        area: "Business growth",
        title: "Disconnected ecosystem",
        body: "Operations were disconnected, resulting in service promotions where no valets were available.",
        pain: "Customer frustration from service-not-available errors.",
        opportunity: "Dynamic pricing and capacity-aware scheduling engine.",
        impact: "15% more revenue per user",
      },
    ],
    /** The designed four-quadrant board, replacing the rebuilt cards. */
    board: "/work/clean4wheels/business-context.webp",
    boardAlt:
      "Operational gaps across four areas: customer experience, operations management, field workforce and business growth, each with its pain point, opportunity and potential impact",
    realisationLabel: "Core realisation",
    realisation:
      "Every stakeholder experienced a different symptom, but each issue originated from the same root cause: disconnected information flow across the service lifecycle.",
  },

  discovery: {
    n: "3",
    eyebrow: "Discovery and research",
    title: "Understanding the system before redesigning it",
    /**
     * Kept short on purpose. The constraint is the interesting part, and the
     * four methods are labelled below anyway, so listing them twice only
     * lengthened the heaviest section on the page.
     */
    lead: "The platform was live and customer interviews were not possible, so I worked from the people who could see the system: stakeholders, the product itself, and the market around it.",
    stakeholder: {
      label: "3.1 Stakeholder discovery",
      title: "The business behind the product",
      roles: [
        {
          role: "Founder",
          focus: "Business objectives, customer pain points, operational priorities",
        },
        {
          role: "CTO",
          focus: "System architecture, implementation constraints, product limitations",
        },
        {
          role: "Operations team",
          focus: "Daily workflow challenges, coordination issues, reporting practices",
        },
      ],
      findings: [
        "Customer issues concentrated after payment, not before booking",
        "Managers lacked centralised visibility into field operations",
        "Valets depended on manual reporting for task updates",
        "Customers had no reliable proof services were completed",
        "Trust issues stemmed from limited visibility, not poor quality",
      ],
    },
    audit: {
      label: "3.2 Existing product audit",
      title: "Where the existing product failed users",
      image: "/work/clean4wheels/audit.webp",
      stats: [
        { value: "3", label: "Critical issues" },
        { value: "2", label: "Major issues" },
        { value: "6", label: "Screens audited" },
      ],
      columns: ["Screen", "Observation", "User impact"],
      rows: [
        [
          "Homepage",
          "No trust indicators, value clarity or social proof on first load",
          "High bounce rate, users leave before exploring services",
        ],
        [
          "Booking form",
          "Vehicle, address and schedule combined in one long form",
          "Cognitive overload, 67% drop-off at this step",
        ],
        [
          "Package selection",
          "Three plans listed without comparison structure or feature differences",
          "Decision paralysis, unclear which plan fits their needs",
        ],
        [
          "Scheduling",
          "Calendar accepts any date, no slot availability logic shown",
          "Post-booking rejection, customers choose unavailable times",
        ],
        [
          "Post-booking",
          "No tracking, no status updates after payment confirmation",
          "Trust collapse, customers do not know what happens next",
        ],
        [
          "Order summary",
          "Pricing scattered across sections, no next-step confirmation",
          "Last-minute uncertainty, abandonment at checkout",
        ],
      ],
    },
    heuristics: {
      label: "3.3 Heuristic evaluation",
      title: "Scored against Nielsen's usability principles",
      quote:
        "We discovered users trusted phone calls more than the product because there was no visibility after booking. That insight changed the direction of the redesign.",
      rows: [
        {
          principle: "Visibility of system status",
          finding: "Limited feedback after booking confirmation",
          verdict: "Needs work",
        },
        {
          principle: "Match between system and real world",
          finding: "Scheduling terminology lacked clarity",
          verdict: "Partial",
        },
        {
          principle: "Recognition rather than recall",
          finding: "Users repeatedly entered known information",
          verdict: "Needs work",
        },
        {
          principle: "Consistency and standards",
          finding: "Inconsistent form patterns across booking steps",
          verdict: "Partial",
        },
        {
          principle: "Error prevention",
          finding: "Limited validation and recovery during booking",
          verdict: "Needs work",
        },
      ],
    },
    benchmark: {
      label: "3.4 Competitive benchmark",
      title: "The market gap that became the product's differentiator",
      board: "/work/clean4wheels/competitive-analysis.webp",
      boardAlt:
        "Competitive matrix comparing Clean4Wheels against competitors on guided booking, package comparison, saved addresses, real-time slots, service tracking and photo proof",
      columns: ["Feature", "Clean4Wheels", "Competitors", "Opportunity"],
      /** `has` values: "yes" | "no" | "partial", rendered as a legend-backed mark. */
      rows: [
        {
          feature: "Guided booking flow",
          ours: "no",
          theirs: "yes",
          opportunity: "Simplify journey",
        },
        {
          feature: "Service package comparison",
          ours: "no",
          theirs: "yes",
          opportunity: "Improve decision-making",
        },
        {
          feature: "Saved addresses and vehicle",
          ours: "no",
          theirs: "yes",
          opportunity: "Reduce repetitive input",
        },
        {
          feature: "Real-time slot availability",
          ours: "no",
          theirs: "partial",
          opportunity: "Increase scheduling confidence",
        },
        {
          feature: "Service tracking",
          ours: "no",
          theirs: "partial",
          opportunity: "Introduce progress visibility",
        },
        {
          feature: "Photo proof of completion",
          ours: "no",
          theirs: "no",
          opportunity: "Build trust via verification",
        },
      ],
      notes: [
        "Competitors guiding users step by step have measurably lower abandonment at booking.",
        "Service tracking exists in only one competitor, and it is the highest-rated feature in their reviews.",
        "Nobody in the market proves the service happened. That gap became the differentiator.",
      ],
      gap: "The gap is not just a feature gap. It is a trust gap, and no competitor has addressed it directly.",
    },
  },

  synthesis: {
    n: "4",
    eyebrow: "Research synthesis",
    title: "Six insights, one root cause: nobody could see anything",
    lead: "Across five research methods a consistent pattern emerged. The operational blindspot was the underlying cause of every major problem.",
    featured: {
      label: "Insight 03",
      title: "Trust was the missing product feature.",
      titleAccent: "Not a usability problem.",
      body: "The competitive matrix, stakeholder interviews and workflow analysis all pointed to the same gap: there was no mechanism connecting service delivery to customer confidence.",
      sources: ["Stakeholder", "Audit", "Benchmark"],
    },
    insights: [
      {
        label: "Insight 01",
        title: "Friction concentrated in post-payment, not booking itself",
        action: "Design a post-booking service lifecycle experience.",
        sources: ["Stakeholder"],
      },
      {
        label: "Insight 02",
        title: "Managers could not see what was happening in the field at any given time",
        action: "Build a real-time operational visibility layer for managers.",
        sources: ["Workflow"],
      },
      {
        label: "Insight 04",
        title: "Valets had no structured way to log attendance or report completion",
        action: "Create structured task and verification workflows for field teams.",
        sources: ["Workflow", "Ops"],
      },
      {
        label: "Insight 05",
        title: "No product in the market offers proof that a service was completed",
        action: "Establish verification as a first-class product feature.",
        sources: ["Benchmark"],
      },
      {
        label: "Insight 06",
        title: "Retention relied on service quality, but trust broke at the visibility layer",
        action: "Close the loop, connecting service execution to customer awareness.",
        sources: ["Stakeholder", "Heuristic"],
      },
    ],
  },

  statement:
    "Focusing on users' need for effortless booking and complete service visibility, I designed an end-to-end service ecosystem that connects customers, managers and field workers while reducing operational friction and building trust through verification.",

  booking: {
    n: "5",
    eyebrow: "Booking redesign",
    title: "Designing for decisions, not forms",
    board: "/work/clean4wheels/booking-flow.webp",
    boardAlt:
      "The redesigned six-step booking flow end to end, from vehicle context through location, package, scheduling and review to the post-booking tracking loop",
    lead: "The booking journey was optimised for collecting information rather than helping users make confident decisions. I reframed it as a six-decision journey.",
    steps: [
      {
        n: "01",
        featured: true,
        title: "Vehicle context",
        image: "/work/clean4wheels/step-01.webp",
        why: "First impressions shape the rest of the journey. Reducing the opening ask to one decision removes early cognitive load.",
        decision:
          "A dedicated first step using recognition over recall: brand, then model, then registration, selected progressively.",
        outcome: "Cleaner task focus. A stronger foundation for each subsequent step.",
      },
      {
        n: "02",
        title: "Location friction",
        image: "/work/clean4wheels/step-02.webp",
        why: "Repeated manual entry is a known retention killer. Every second of unnecessary effort increases drop-off probability.",
        decision:
          "Saved locations with a primary address concept, and smart autocomplete for new entries.",
        outcome: "60% less address entry effort. Returning users complete in one tap.",
      },
      {
        n: "03",
        title: "Package decision complexity",
        image: "/work/clean4wheels/step-03.webp",
        why: "Decision confidence determines selection. Structure does more than content volume ever can.",
        decision:
          "Redesigned comparison with a consistent information hierarchy: feature list, duration, price and clear differentiation.",
        outcome: "45% better package clarity. Faster time to selection.",
      },
      {
        n: "04",
        title: "Scheduling awareness",
        image: "/work/clean4wheels/step-04.webp",
        why: "Showing unavailability builds trust. Hiding it creates post-booking frustration when slots are rejected.",
        decision:
          "A time-aware slot picker showing real availability. Blocked slots are displayed rather than hidden, so honesty builds trust.",
        outcome: "Eliminated post-submission slot conflicts. Raised scheduling confidence.",
      },
      {
        n: "05",
        featured: true,
        title: "Booking confidence",
        image: "/work/clean4wheels/step-05.webp",
        why: "The summary is the last moment before commitment. Every second of clarity here reduces post-payment regret.",
        decision:
          "Consolidated vehicle, package, location, schedule and pricing into one structured review checkpoint with edit access.",
        outcome: "28% higher booking completion. Reduced cancellation rates.",
      },
      {
        n: "06",
        featured: true,
        title: "Post-booking loop",
        image: "/work/clean4wheels/step-06.webp",
        why: "Trust is built in the spaces between transactions. The moment after payment is the product's most fragile trust point.",
        decision:
          "Confirmation became the start of the service tracking journey, with live status, assigned valet and ETA visible immediately.",
        outcome: "Eliminated the post-payment gap. Started the trust loop.",
      },
    ],
  },

  verification: {
    n: "6",
    eyebrow: "Service verification",
    title: "Trust became the product feature",
    lead: "I rebuilt the post-booking experience as an observable lifecycle: a loop that closes every transaction and turns operational transparency into something the customer can actually see.",
    audiences: [
      {
        who: "For customers",
        what: "Real-time status from booking to verified completion. No more guessing what happened after payment.",
      },
      {
        who: "For valets",
        what: "A structured task lifecycle with photo upload at completion. Accountability without unnecessary friction.",
      },
      {
        who: "For managers",
        what: "Instant visibility into every active service. No more chasing updates through informal channels.",
      },
    ],
  },

  platform: {
    n: "7",
    eyebrow: "Cleaner platform",
    title: "The valet is a user, not an admin",
    board: "/work/clean4wheels/cleaner-platform.webp",
    boardAlt:
      "The valet and manager platform: daily assignments, booking status, photo verification and the operational dashboard",
    lead: "Valets and managers were treated as primary users, not admin accounts. Their daily efficiency was what the customer ultimately felt.",
    images: [
      "/work/clean4wheels/valet-dashboard.webp",
      "/work/clean4wheels/valet-app-a.webp",
      "/work/clean4wheels/valet-app-b.webp",
    ],
    points: [
      {
        title: "Workforce visibility",
        body: "Photo verification and location confirmation established accountability, replacing ad-hoc WhatsApp coordination.",
      },
      {
        title: "Structured daily operations",
        body: "Daily assignments, booking status and service updates consolidated into a single workflow.",
      },
      {
        title: "Performance transparency",
        body: "Operational dashboards surfaced attendance trends, task completion history and service metrics.",
      },
    ],
  },

  system: {
    n: "8",
    eyebrow: "Design system",
    title: "A system, not screens",
    lead: "One visual language, with reusable components and defined tokens, scaling across all three platforms.",
    image: "/work/clean4wheels/design-system.webp",
  },

  learnings: {
    n: "9",
    eyebrow: "Key learnings",
    title: "What this project taught me",
    quote:
      "The most significant decisions on this project were not about what to design, they were about",
    quoteAccent: "what the brief was not saying.",
    items: [
      {
        n: "01",
        title: "Scope expansion requires stakeholder confidence, not just research",
        body: "Reframing a website redesign into a full service ecosystem redesign required demonstrating business value through early research evidence. Stakeholders supported expansion when the reasoning was grounded in operational data, not assumptions.",
      },
      {
        n: "02",
        title: "Service design thinking unlocks product opportunities",
        body: "Mapping stakeholder journeys across three roles revealed system-level patterns that individual user research alone would have missed. The operational gap came from thinking about the valet experience, not just the customer experience.",
      },
      {
        n: "03",
        title: "Trust is designed in the spaces between transactions",
        body: "The biggest trust improvements were not in the booking flow, they were in the moments after a customer finished placing an order. Designing for what happens between transactions turned out to be more valuable than optimising the transactions themselves.",
      },
    ],
  },
};
