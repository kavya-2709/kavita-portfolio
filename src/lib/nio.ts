/**
 * NioPractice case-study copy.
 *
 * Same arrangement as [[clean4wheels]]: re-exported from `content.ts` so
 * imports stay in one place, kept separate only for length.
 *
 * Copy is the Figma case study's, with the site's rules applied (no em
 * dashes, no trailing full stops on headings, sentence case, no emoji).
 * Three things were corrected rather than copied:
 *
 *  - The chart legend named the personas "Ambitious Anjali" and "Struggling
 *    Sameer", while the intro sentence and both persona cards call them
 *    "Ambitious Ansh" and "Struggling Sameera". The legend was the outlier,
 *    so the study now uses one pair of names throughout.
 *  - "research &empathy" was missing a space.
 *  - "What broke the experience!" lost its exclamation mark.
 */
export const nio = {
  slug: "niopractice",
  tags: ["UX design", "Web interface design"],
  client: "NioPractice",
  logo: "/work/nio/logo.svg",
  title: "Designed a GATE prep experience that makes student-centric practice more engaging",
  deck: "A student opens an exam app holding ten thousand questions and no idea which one to answer first. One month to turn that from overwhelming into a plan.",
  facts: [
    { label: "My role", value: "UX/UI Designer" },
    { label: "Duration", value: "1 month" },
    { label: "Industry", value: "Edtech" },
  ],

  glance: [
    {
      label: "Context",
      value:
        "An AI-powered exam prep platform for IIT-JEE, NEET, GATE, CLAT and UPSC, holding 10,000+ questions, past papers and mock tests.",
    },
    {
      label: "Problem",
      value:
        "Two very different aspirants failing the same way: too many choices, no sense of progress, and no reliable way to tell which topics were weak.",
    },
    {
      label: "What I did",
      value:
        "Rebuilt the Practice Hub and Dashboard around difficulty and topic-level modules, then added multimodal explanations and a faster test builder.",
    },
    {
      label: "Result",
      value:
        "28% increase in test completion rate and 35% improvement in daily active users across the GATE and JEE modules.",
    },
  ],

  metrics: [
    {
      value: "28%",
      label: "Test completion rate",
      note: "Practice Hub broken into topic-level modules",
    },
    {
      value: "35%",
      label: "Daily active users",
      note: "Dashboard restructured around difficulty",
    },
  ],

  challenge: {
    n: "1",
    eyebrow: "Challenge",
    title: "What broke the experience",
    lead: "NioPractice is an AI-powered exam preparation platform supporting students across competitive exams like IIT-JEE, NEET, GATE, CLAT and UPSC. It offers 10,000+ questions, past papers, mock tests and an AI chatbot, all aimed at smart practice, topic-level mastery and real-time performance tracking.",
    problems: [
      {
        n: "01",
        body: "Users feel overwhelmed and need clearer guidance to make confident choices.",
      },
      {
        n: "02",
        body: "Students seek better retention tools like audio notes and guided practice.",
      },
      {
        n: "03",
        body: "Mobile users need smoother image interactions and a clutter-free experience.",
      },
    ],
  },

  research: {
    n: "2",
    eyebrow: "Research and empathy",
    title: "The aspirant journey",
    lead: "The journey of a GATE aspirant is marked by high stakes, immense pressure and a vast syllabus. The challenge was to turn the platform into something that does not just deliver content, but actively reduces cognitive load and makes learning less stressful.",
    personas: [
      {
        name: "Ambitious Ansh",
        summary: "Goal-oriented learner seeking complete control over preparation",
        traits: [
          "Completes practice consistently and tracks progress regularly.",
          "Prefers customizable tests to target weak subjects efficiently.",
          "Expects quick insights, analytics and minimal friction in workflows.",
        ],
      },
      {
        name: "Struggling Sameera",
        summary: "Guidance-driven learner building confidence through structured practice",
        traits: [
          "Feels overwhelmed by lengthy preparation and too many choices.",
          "Relies on guided study plans and personalized recommendations.",
          "Needs clear progress tracking and regular motivation to stay consistent.",
        ],
      },
    ],
    chart: {
      title: "Primary pain points of GATE aspirants",
      caption:
        "The two personas struggle in almost opposite places, which is why one guided path could not serve both.",
      axisLabel: "Pain point severity (score)",
      max: 150,
      ticks: [150, 125, 100, 75, 50, 25],
      series: [
        { key: "ansh", name: "Ambitious Ansh" },
        { key: "sameera", name: "Struggling Sameera" },
      ],
      /**
       * Read off the Figma chart's own geometry: bar heights against a
       * 356px plot on a 0-150 axis. The source chart prints no data labels,
       * so these are rounded to the nearest 5 and shown as approximate
       * rather than presented as exact measurements.
       */
      groups: [
        { label: "Information overload", ansh: 105, sameera: 125 },
        { label: "Difficulty staying motivated", ansh: 90, sameera: 145 },
        { label: "Identifying weak topics", ansh: 120, sameera: 100 },
        { label: "Time management", ansh: 130, sameera: 65 },
      ],
    },
  },

  statement:
    "Focusing on aspirants overwhelmed by preparation, I reduced cognitive load, simplified the critical workflows and built a guided experience that turns uncertainty into confident learning.",

  screens: {
    n: "3",
    eyebrow: "Screens redesign",
    title: "Designs that solve, not just shine",
    lead: "Interfaces shaped through research, rapid iteration and interaction design, aimed at making the next step obvious.",
    items: [
      {
        label: "Practice Hub",
        title: "Structured prep in manageable steps",
        body: "Restructured the Practice Hub to break broad subjects into bite-sized, topic-level modules, so students can plan, track and complete preparation without facing the whole syllabus at once.",
        image: "/work/nio/practice-hub.webp",
        alt: "Practice Hub broken into topic-level modules",
      },
      {
        label: "Dashboard",
        title: "Clarity through a difficulty-led layout",
        body: "Structured the Dashboard around difficulty, from basic to intermediate to advanced, with colour-coded tiles for progress and revision. A clean hierarchy and clear dual CTAs make it obvious whether to practise or revise.",
        image: "/work/nio/dashboard.webp",
        alt: "Dashboard with difficulty-led colour-coded tiles",
      },
      {
        label: "AI-powered learning",
        title: "Multimodal explanations for every learner",
        body: "Integrated voice-assisted learning that pairs auto-explanations with relevant visual diagrams, supporting different learning styles and reinforcing retention through more than one channel.",
        image: "/work/nio/ai-learning.webp",
        alt: "Voice-assisted explanation paired with a visual diagram",
      },
      {
        label: "Test creation",
        title: "Icon-driven topic selection at speed",
        body: "Subjects are presented as fast, icon-driven tiles for quick recognition. Selected topics are visually marked, so customisation stays intuitive while the grid keeps navigation effortless across subjects.",
        image: "/work/nio/test-creation.webp",
        alt: "Test creation interface with icon-driven subject tiles",
      },
    ],
  },

  learnings: {
    n: "4",
    eyebrow: "Key learnings",
    title: "What this project taught me",
    quote:
      "The best product decisions were not about redesigning interfaces, they were about understanding",
    quoteAccent: "how aspirants learn, stay motivated and build confidence over time.",
    items: [
      {
        n: "01",
        title: "Simplicity reduces cognitive load",
        body: "Breaking complex workflows into guided steps makes users feel more confident and increases task completion.",
      },
      {
        n: "02",
        title: "Visible progress builds consistency",
        body: "Actionable feedback and performance insights encourage long-term learning habits.",
      },
      {
        n: "03",
        title: "Data should guide, not overwhelm",
        body: "Performance analytics become valuable only when presented as clear, actionable insights instead of raw numbers.",
      },
    ],
  },
};
