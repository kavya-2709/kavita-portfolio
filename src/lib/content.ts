export const profile = {
  name: "Kavita Yadav",
  title: "Product & UX Designer",
  subtitle: "AI Products · Interaction Design",
  tagline: "I turn ambiguous problems into shipped experiences people actually love.",
  location: "India",
  email: "kavyacanvas@gmail.com",
  phone: "+91 9670605924",
  stats: [
    { value: "40%", label: "Less time to finish a booking" },
    { value: "1,00,000+", label: "People reached across shipped work" },
    { value: "10+", label: "Products shipped end-to-end" },
  ],
  links: {
    behance: "https://www.behance.net/kavitayadav21",
    linkedin: "https://www.linkedin.com/in/kavita-yadav-6b1759255/",
    twitter: "https://x.com/CanvasInMotion7",
  },
};

export const companies = [
  "Clean4Wheels",
  "Aumraa",
  "NioPractice",
  "BrandContext",
  "KnowYourColleges",
];

/**
 * The career, grouped into the three things it actually was: one full-time
 * role, a run of client and internship work, and the incubator programme.
 *
 * Six separate rows read as a long trail with two identical "2024/25"
 * labels next to each other, which is what made the old version confusing.
 * Grouping keeps the client names visible (Clean4Wheels and NioPractice are
 * both case studies, so burying them under "various clients" would break the
 * link to the work) while collapsing the dates to one span per row.
 *
 * Spans are derived from the real dates below, not from the old Framer copy,
 * which had the client work at 2022–2024. It actually runs 2024 to 2026.
 *
 * `roles` is the underlying detail. It isn't rendered; it's kept because the
 * case studies will want it.
 */
export const experience = [
  {
    id: "aumraa",
    years: "2026",
    org: "Aumraa",
    role: "Product Designer",
    kind: "Full-time",
    tags: ["End to end flows", "Design systems", "Accessibility"],
    roles: [
      {
        role: "Product Designer",
        period: "Feb 2026 to May 2026",
        points: [
          "Designed 15+ end-to-end flows across discovery, onboarding, Panchang, Puja booking, reminders, and My Pujas for a B2C faith-tech app.",
          "Ensured WCAG 2.1 alignment and design consistency across platforms, working with PMs and engineers in bi-weekly reviews.",
        ],
      },
    ],
  },
  {
    id: "clients",
    years: "2024 to 2026",
    org: "Clean4Wheels, NioPractice, BrandContext, KnowYourColleges",
    role: "Design internships and client work",
    kind: "Contract",
    tags: ["Booking platforms", "EdTech", "UX research"],
    roles: [
      {
        role: "Product Intern, BrandContext",
        period: "Oct 2025 to Feb 2026",
        points: [
          "Partnered with product & engineering across 3 feature cycles, translating requirements into wireframes and interactive prototypes.",
        ],
      },
      {
        role: "User Experience Designer, Clean4Wheels",
        period: "Jan 2025 to Jun 2025",
        points: [
          "Redesigned the end-to-end booking flow across 6 screens, simplifying a 9-step process to 5 steps and cutting task turnaround time by 40%.",
          "Built and documented a scalable Figma design system across a multi-role platform (customer, washer, admin).",
        ],
      },
      {
        role: "UI Design Intern, NioPractice",
        period: "Dec 2024 to Jan 2025",
        points: [
          "Redesigned Practice Hub and Dashboard IA to reduce cognitive load and simplify exam prep.",
          "Introduced guided learning and difficulty-based progress tracking, with a 28% increase in test completion and 35% growth in DAU.",
        ],
      },
      {
        role: "UX Design Intern, KnowYourColleges",
        period: "Jun 2024 to Jan 2025",
        points: [
          "Conducted user research and prototypes to improve task clarity and navigation in the college discovery process.",
        ],
      },
    ],
  },
  {
    id: "incubator",
    years: "2023 to 2025",
    org: "Software Incubator",
    role: "Product design, incubation programme",
    kind: "Programme",
    tags: ["MVP design", "Product ideation", "Startup collaboration"],
    roles: [
      {
        role: "Product Design, Incubation Program",
        period: "2023 to 2025",
        points: [
          "Built and shipped MVPs alongside startup founders in a structured product incubation programme.",
          "Contributed to product ideation, rapid prototyping and cross-functional collaboration, designing real products from scratch.",
        ],
      },
    ],
  },
];

/* ── About page ──────────────────────────────────────────────────────
   Three environments: the surface (hero), the shallows (career), the
   depths (life tiles). Copy only — the page itself is pages/AboutPage.tsx. */
export const aboutPage = {
  eyebrow: "About me",
  /** Two lines. The turn happens on the full stop. */
  statement: "I trained as an engineer, now I design what people actually touch",
  intro: [
    "Engineering taught me how systems break. Design taught me that people give up long before the system does, usually somewhere around step seven of a nine-step form.",
    "Two years, ten products, four industries: car care, exam prep, faith-tech and property. Different users, same job. Find the knot, pull the right thread, make the next step obvious.",
    "Along the way, a Smart India Hackathon win and work that reached over a hundred thousand people.",
  ],
  /** The four credentials a hiring manager scans for first. */
  badges: [
    "AI-Assisted Design",
    "B.Tech Computer Science",
    "2+ Years Experience",
    "Web & Mobile",
  ],
  cta: "See the work",

  /** Dive stations — the labels on the depth rail. */
  stations: ["Surface", "What I do", "Track record", "Off the clock"],

  experienceTitle: "Where I've worked",
  experienceLead:
    "Four industries, one throughline: flows that measurably move.",

  beyondTitle: "Beyond the screen",
  beyondLead:
    "I sketch, I go looking for new places, and I look after two very small animals. The sketchbook keeps me grounded, the rest keeps me curious.",
  /** Matches the reel's actual behaviour — it pauses under the cursor. */
  cue: "Hover to pause",
};

/**
 * The reflective beat between the intro and the process — deliberately the
 * quietest thing on the page.
 *
 * `photo` is the one photograph in the scrapbook composition. Swap it for a
 * portrait when one is available in `public/life/`; the coastal photo is
 * standing in because it matches the collected-from-a-shoreline idea.
 */
export const personalInterlude = {
  label: "About me",
  heading: ["Curious by nature", "Intentional by design"],
  body: "I pay attention to the small things: why people hesitate, what makes an interaction click, and how an idea turns into something worth using.",
  /** The second paragraph earns the first one — this is the credibility beat. */
  bodyTwo:
    "Engineering taught me how systems break. Design taught me that people give up long before the system does, usually somewhere around step seven of a nine-step form.",
  /** The line on the small paper note pinned into the composition. */
  note: "why does this feel hard?",
};

/**
 * The scattered photo pile in the About opener. Back to front.
 *
 * `x`/`y` are percentages of each photo's OWN size, not the container — so
 * the arrangement holds its proportions at every breakpoint instead of
 * needing a second set of numbers for mobile.
 *
 * The step is 40% across and 50% down. That leaves each photo overlapped by
 * the next across 60% of its width and 50% of its height — 30% covered, so
 * **70% of every photo stays visible**, and the step is large enough that
 * photo 1 and photo 3 never touch (80% across, 100% down = no overlap).
 * Measured in-browser rather than eyeballed; a smaller step buried the back
 * two photos at 40%.
 */
export const photoScatter = [
  {
    src: "/life/me-snow.jpeg",
    alt: "Kavita in a red beanie, throwing peace signs below a snowline in Himachal",
    tilt: -7,
    x: "0%",
    y: "0%",
  },
  {
    src: "/life/me-flowers.jpeg",
    alt: "Kavita holding a handful of white blossom on a mountain path",
    tilt: 5,
    x: "40%",
    y: "50%",
  },
  {
    src: "/life/me-sea.jpeg",
    alt: "Kavita standing in breaking surf at sunset",
    tilt: -3,
    x: "80%",
    y: "100%",
  },
];

/**
 * How the work actually goes. Four cards pegged to a thread — the order is
 * how she moves through a problem, not a list of services.
 *
 * `tilt` and `drop` place each card by hand: `drop` is the vertical offset in
 * pixels that breaks the four-column grid into something hung, not aligned.
 */
export const howIWork = {
  label: "How I work",
  heading: ["Ask first", "Then make it real"],
  body: "I move from questions to prototypes, turning messy problems into products that feel clear and useful.",
  /**
   * Four parts of one practice, not four services. They overlap on the page
   * because they overlap in the work, and focusing one brings that part
   * forward without the others going away. That is the whole metaphor.
   *
   * `tilt` is the resting rotation, `drop` the resting vertical offset (lg
   * and up only), `paper` the surface tone. Keep the copy this short: the
   * section has about ten seconds to land.
   */
  cards: [
    {
      id: "why",
      title: "I start with why",
      body: "I dig into people, context, and the messy bits before drawing the first screen.",
      tilt: -4,
      drop: 0,
      paper: "bg-white",
      sticker: "/life/sticker-why.webp",
      stickerAlt: "Sticker of a startled cat captioned HUH!?",
      stickerTilt: -12,
    },
    {
      id: "simple",
      title: "I make complexity feel simple",
      body: "I turn tangled journeys into clear flows that feel natural to use.",
      tilt: 2,
      drop: 34,
      paper: "bg-mist-gray",
      sticker: "/life/sticker-problem.png",
      stickerAlt: "Sticker of a pleased cat giving a thumbs up",
      stickerTilt: 8,
    },
    {
      id: "details",
      title: "I care about the details",
      body: "Systems, hierarchy, motion, and tiny interactions make the experience feel like one product.",
      tilt: -2,
      drop: 12,
      paper: "bg-solar-wash/40",
      sticker: "/life/sticker-detail.webp",
      stickerAlt: "Sticker of a cat in reading glasses studying a document",
      stickerTilt: -6,
    },
    {
      id: "repeat",
      title: "I make, test, repeat",
      body: "I prototype ideas early, learn from feedback, and keep refining until the experience clicks.",
      tilt: 4,
      drop: 42,
      paper: "bg-peach-wash/35",
      sticker: "/life/sticker-repeat.png",
      stickerAlt: "Sticker of a cat pressing a keyboard key labelled perfect",
      stickerTilt: 14,
    },
  ],
};

/**
 * The ten capabilities, in the order a hiring manager reads them:
 * thinking first, craft second, collaboration last.
 */
export const capabilities = [
  {
    name: "Product Thinking",
    detail: "Connecting user needs to business goals across the full product lifecycle.",
  },
  {
    name: "UX Research",
    detail: "Interviews, surveys and competitive analysis to ground decisions in real user data.",
  },
  {
    name: "User Flows",
    detail: "Mapping end-to-end journeys to remove friction before pixels are touched.",
  },
  {
    name: "Wireframing",
    detail: "Rapid low-fi layouts that communicate structure and interaction logic clearly.",
  },
  {
    name: "Interaction Design",
    detail: "Micro-interactions and transitions that make interfaces feel alive and responsive.",
  },
  {
    name: "Design Systems",
    detail: "Scalable component libraries that keep design and engineering aligned and fast.",
  },
  {
    name: "Prototyping",
    detail: "Figma prototypes that validate ideas and flows before engineering begins.",
  },
  {
    name: "AI-Assisted Design",
    detail: "Using AI to accelerate ideation, synthesis and UX writing without losing the human voice.",
  },
  {
    name: "Developer Handoff",
    detail: "Clean specs and annotated files that make engineer–designer collaboration frictionless.",
  },
  {
    name: "Cross-Functional Collaboration",
    detail: "Working across product, engineering and business to deliver outcomes, not just outputs.",
  },
];

/**
 * "Beyond the screen" — real photographs from the Framer site, kept in
 * `public/life/`. `span` drives the collage: "wide" tiles take two columns.
 */
export const beyondScreen = [
  {
    src: "/life/sih-winners.jpg",
    caption: "Smart India Hackathon 2024 Grand Finale winners",
    span: "wide" as const,
  },
  {
    src: "/life/cat.jpg",
    caption: "Tiny creature no. 1",
    span: "tall" as const,
  },
  {
    src: "/life/sketchbook-mokapot.jpg",
    caption: "Sketchbook page, taking a moka pot apart",
    span: "wide" as const,
  },
  {
    src: "/life/hamster.jpg",
    caption: "Tiny creature no. 2",
    span: "tall" as const,
  },
  {
    src: "/life/birds-on-water.jpg",
    caption: "Somewhere new, at the right hour",
    span: "tall" as const,
  },
  {
    src: "/life/whiteboard-sketch.jpg",
    caption: "Thinking out loud, in marker",
    span: "wide" as const,
  },
  {
    src: "/life/software-incubator-team.jpg",
    caption: "The Software Incubator cohort",
    span: "wide" as const,
  },
  {
    src: "/life/sih-board.jpg",
    caption: "SIH 2024, Grand Finale",
    span: "tall" as const,
  },
];

/** Selected work cards — copy and imagery pulled from the Framer portfolio. */
export const workIndex = {
  eyebrow: "Case studies",
  title: "Work",
  subhead:
    "Three products across car care, exam prep and property. Different users, same job: making the next step obvious.",
  cta: "Read case study",
  outro: "Side projects, motion and experiments live in the Playground.",
};

export const selectedWork = [
  {
    index: "01",
    slug: "clean4wheels",
    meta: "Clean4Wheels",
    title:
      "Transformed car care into a seamless multi-panel digital ecosystem to boost efficiency",
    impact:
      "Reduced booking complexity by 28% through a simplified, trust-driven booking experience, and cut manual operations by 70% while increasing service transparency with end-to-end verification.",
    tags: ["Automotive services", "Multi-panel platform", "Design system"],
    mock: "clean4wheels" as const,
    image: "/work/clean4wheels.png",
    screens: null,
  },
  {
    index: "02",
    slug: "niopractice",
    meta: "NioPractice",
    title:
      "Designed test prep experience to make student-centric practice more engaging",
    impact:
      "Improved subject selection UX for custom tests, reducing drop-offs by 35%, and simplified the custom test creation flow — reducing friction and boosting quiz starts.",
    tags: ["EdTech", "Test preparation", "Information architecture"],
    mock: "niopractice" as const,
    image: "/work/nio.png",
    screens: null,
  },
  {
    index: "03",
    slug: "housing",
    meta: "Housing.com",
    title:
      "Enhanced onboarding & chat experience to improve trust and retention",
    impact:
      "Streamlined the first-time experience to highlight platform value, and built safer UX that improved user trust and retention through the in-app chat interface.",
    tags: ["PropTech marketplace", "Onboarding", "Trust & safety"],
    mock: null,
    image: "/work/housing.png",
    // real exported screens — used if the composed hero image isn't present
    screens: [
      "/work/housing-onboarding.png",
      "/work/housing-chat-intro.png",
      "/work/housing-chat.png",
    ],
  },
];

export const projects = [
  {
    slug: "clean4wheels",
    name: "Clean4Wheels",
    tag: "Automotive · Booking Platform",
    summary: "Simplified a 9-step booking process to 5 steps across a connected customer, washer & admin ecosystem.",
    metrics: ["40% faster task turnaround", "6 screens redesigned", "Design system shipped"],
    color: "accent",
  },
  {
    slug: "aumraa",
    name: "Aumraa",
    tag: "Faith-Tech · Mobile App",
    summary: "15+ end to end flows for a B2C faith-tech app, covering discovery, onboarding, Puja booking and reminders.",
    metrics: ["15+ flows shipped", "WCAG 2.1 aligned", "Cross-platform consistency"],
    color: "moss",
  },
  {
    slug: "niopractice",
    name: "NioPractice",
    tag: "EdTech · GATE / JEE Prep",
    summary: "Redesigned Practice Hub information architecture with guided learning and AI-assisted explanations.",
    metrics: ["28% increase in completion", "35% growth in DAU"],
    color: "sky",
  },
  {
    slug: "housing",
    name: "Housing.com",
    tag: "Marketplace · Onboarding",
    summary: "Changed UI flows to enhance onboarding and in-app chat experience for a safer, more trustworthy UX.",
    metrics: ["Improved first-time UX", "In-app chat trust layer"],
    color: "accent",
  },
];

export const sideProjects = [
  {
    name: "Buzzr",
    tag: "AI-powered Classroom Quiz Platform",
    detail: "Gamified quiz experience improving classroom participation by 30% for 1,000+ students.",
  },
  {
    name: "Doorstep Beauty",
    tag: "Mobile Beauty Services Platform",
    detail: "1,000+ downloads with a 5-star Play Store rating.",
  },
];

export const skills = {
  "UX Design": [
    "User Research", "Design Thinking", "Journey Mapping", "UX Metrics & Validation",
    "Problem Framing", "User Flows", "Information Architecture", "Wireframing",
    "Interaction Design", "Prototyping", "High-fidelity UI", "Usability Testing",
    "Design Systems", "Developer Handoff",
  ],
  "Design Tools": ["Figma", "Framer", "ProtoPie", "Webflow", "Adobe Creative Suite"],
  "AI & Motion Design": [
    "Claude", "ChatGPT", "Gemini", "Figma Make", "Google Stitch", "Relume",
    "Lovable", "Jitter", "Figma Motion", "Rive",
  ],
};

export const education = [
  { degree: "Google UX Design", school: "Coursera", period: "2023" },
  { degree: "B.Tech in CSE", school: "Ajay Kumar Garg Engineering College", period: "2022 – 2026" },
];

export const testimonials = [
  {
    quote:
      "Kavita consistently deliver creative, user-focused website designs with robust responsiveness across devices, showing strong technical and design expertise. Her professional traits responsiveness, adaptability, and excellent communication makes her a reliable and valued collaborator on any team.",
    name: "Harsh Kumar",
    role: "CTO, Clean4Wheels",
    photo: "/people/harsh-kumar.png",
  },
  {
    quote:
      "I have worked on many projects with Kavita as a designer, and it has always been a great experience. She always brings fresh ideas and helps the team see why every small detail, even a single pixel, matters. I’ve learned a lot from her, how to truly connect with users, how to think from their point of view, and how to turn feedback into better designs. She also taught me the importance of iterating fast, staying calm under tight deadlines, and keeping the focus on solving real problems rather than just creating pretty designs.",
    name: "Harsh",
    role: "Product Designer, SuperKalam",
    photo: "/people/harsh.png",
  },
  {
    quote:
      "Working with Kavita was an absolute pleasure. She brings not just strong product design skills but also a genuine curiosity that makes her stand out. Kavita has this rare ability to ask the right questions, understand both users and business needs, and then turn that into simple, effective design solutions. Beyond her work, she’s collaborative, dependable, and someone any team would be lucky to have.",
    name: "Manav Kothari",
    role: "Founder, Nioclass",
    photo: "/people/manav-kothari.png",
  },
];
