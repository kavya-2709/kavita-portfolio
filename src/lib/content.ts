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

export const experience = [
  {
    role: "User Experience Designer",
    company: "Clean4Wheels",
    period: "Jan 2025 – Jun 2025",
    points: [
      "Redesigned the end-to-end booking flow across 6 screens, simplifying a 9-step process to 5 steps and cutting task turnaround time by 40%.",
      "Built and documented a scalable Figma design system — typography, color tokens, reusable components — across a multi-role platform (customer, washer, admin).",
    ],
  },
  {
    role: "Product Designer (Full Time)",
    company: "Aumraa",
    period: "Feb 2026 – May 2026",
    points: [
      "Designed 15+ end-to-end flows across discovery, onboarding, Panchang, Puja booking, reminders, and My Pujas for a B2C faith-tech app.",
      "Ensured WCAG 2.1 alignment and design consistency across platforms, working with PMs and engineers in bi-weekly reviews.",
    ],
  },
  {
    role: "UI Design Intern",
    company: "NioPractice",
    period: "Dec 2024 – Jan 2025",
    points: [
      "Redesigned Practice Hub and Dashboard IA to reduce cognitive load and simplify exam prep.",
      "Introduced guided learning and difficulty-based progress tracking — 28% increase in test completion, 35% growth in DAU.",
    ],
  },
  {
    role: "Product Intern",
    company: "BrandContext",
    period: "Oct 2025 – Feb 2026",
    points: [
      "Partnered with product & engineering across 3 feature cycles, translating requirements into wireframes and interactive prototypes.",
    ],
  },
  {
    role: "User Experience Design Intern",
    company: "KnowYourColleges",
    period: "Jun 2024 – Jan 2025",
    points: [
      "Conducted user research and prototypes to improve task clarity and navigation in the college discovery process.",
    ],
  },
];

/* ── About page ──────────────────────────────────────────────────────
   Three environments: the surface (hero), the shallows (career), the
   depths (life tiles). Copy only — the page itself is pages/AboutPage.tsx. */
export const aboutPage = {
  eyebrow: "India · UTC+5:30",
  /** The opening claim. Reframes the CS degree as the differentiator. */
  statement: "I trained as an engineer. Now I design the products people have to live with.",
  intro: [
    "Four years of computer science taught me how systems break. Design taught me that people give up long before the system does — somewhere around step seven of a nine-step form.",
    "I've spent that time shipping 10+ products end to end across car care, exam prep, faith-tech and property — research and problem framing through flows, design systems and developer handoff. Work that's reached over a lakh people.",
    "What I'm actually good at: taking something tangled, sitting with it until the real problem surfaces, and making the next step obvious.",
  ],
  experienceTitle: "Where I've worked",
  experienceLead: "Five teams, four industries, one throughline: shipping flows that measurably move.",
  educationTitle: "How I got here",
  skillsTitle: "What I work with",
  depthsTitle: "Below the surface",
  depthsLead: "The parts that don't fit on a CV.",
  cue: "Everything below the waterline is true, and mostly unemployable.",
};

/**
 * Square "life tiles" — the personal half of the About page.
 *
 * Only edit the strings; the page renders each `kind` as its own widget.
 * TODO(kavita): the two tiles marked below are placeholders — swap in your
 * real quote and the song, and drop photos into `public/life/` for the stack.
 */
export const lifeTiles = {
  photos: {
    label: "Off the clock",
    year: "2026",
    // TODO(kavita): add real photos to public/life/ and list them here, e.g.
    // ["/life/one.jpg", "/life/two.jpg", "/life/three.jpg"].
    // Empty renders the avatar three times; a missing file falls back to it too.
    images: [] as string[],
    fallback: "/avatar.png",
  },
  todo: {
    day: "Saturday",
    title: "This weekend",
    // TODO(kavita): replace with your actual list.
    items: [
      "Finish the Clean4Wheels write-up",
      "Redraw the koi, properly this time",
      "Long walk, no podcast",
      "Call home",
    ],
  },
  song: {
    label: "On repeat",
    // TODO(kavita): your song and artist.
    track: "Still not decided",
    artist: "Ask me again tomorrow",
    duration: "-3:12",
  },
  quote: {
    // TODO(kavita): swap for the line you actually live by.
    text: "Make the next step obvious.",
    author: "The whole job, honestly",
  },
  coded: {
    label: "Recently coded",
    title: "A pond that ripples when you touch it",
    detail: "Canvas water sim — domain-warped fBm, pointer trail, a koi that follows the scroll. It's the front page of this site.",
    cta: "Go poke it",
    href: "/",
  },
  status: {
    label: "Currently",
    title: "Available for work",
    detail: "Product & UX design roles — remote or India.",
    cta: "Let's talk",
    href: "#contact",
  },
};

/** Selected work cards — copy and imagery pulled from the Framer portfolio. */
export const workIndex = {
  eyebrow: "Case studies",
  title: "Work",
  subhead:
    "Three products, three industries — car care, exam prep and property hunting. Different users, same job: making the next step obvious.",
  cta: "Read case study",
  outro: "More work — side projects, motion and experiments — lives in the Playground.",
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
    summary: "15+ end-to-end flows for a B2C faith-tech app — discovery, onboarding, Puja booking & reminders.",
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
