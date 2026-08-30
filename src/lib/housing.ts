/**
 * Housing.com Chats case-study copy.
 *
 * Same arrangement as [[clean4wheels]] and [[nio]]: re-exported from
 * `content.ts`, kept separate for length.
 *
 * Copy is the Figma study's, with the site's rules applied (no em dashes, no
 * trailing full stops on headings, sentence case, no emoji). Four things
 * were corrected rather than copied:
 *
 *  - The section eyebrow read "Booking Redesign", which is left over from the
 *    Clean4Wheels file. Nothing here is a booking flow.
 *  - The headline said "elevate user engagement in an engaging in-app chat
 *    experience". The stutter is fixed to "with".
 *  - "What broke the experience!" lost its exclamation mark.
 *  - The learnings quote ended "what the user finds helpful about product",
 *    which is missing a word. Closed as "what users actually find helpful".
 *
 * The hero frame in Figma ("image 24") exports as an empty layer and the
 * phone mockups over it are clipping masks with no content, so the hero uses
 * the redesigned screens instead of that composition.
 */
export const housing = {
  slug: "housing",
  prototype:
    "https://www.figma.com/proto/3Z5N6yOnPQ8UOZ7O1mD2NY/Housing-Assignment?node-id=7-18&scaling=scale-down&content-scaling=fixed&starting-point-node-id=7%3A18&page-id=2%3A5",
  tags: ["UX design", "Mobile interface design"],
  client: "Housing.com",
  logo: "/work/housing-chats/housing-com-logo.png",
  product: "Housing Chats",
  title: "Revamping key UI flows to elevate user engagement with an in-app chat experience",
  deck: "Renters were handing their phone number to strangers just to ask about a flat, then getting called at work. Two days to design a way to talk that nobody has to opt out of.",
  facts: [
    { label: "My role", value: "UX/UI Designer" },
    { label: "Duration", value: "2 days" },
    { label: "Industry", value: "Real estate" },
  ],
  /**
   * Shown next to the duration. A two-day self-directed concept is a
   * different claim from a shipped product, and a reviewer who assumes the
   * latter and finds out otherwise stops trusting the rest of the page.
   */
  natureTag: "Self-directed concept",
  hero: [
    { src: "/work/housing-chats/after-1.webp", alt: "Redesigned property search entry point" },
    { src: "/work/housing-chats/after-2.webp", alt: "Property details visible before contact" },
    { src: "/work/housing-chats/after-3.webp", alt: "In-app chat with expressive replies" },
  ],
  impact:
    "The redesigned flow improves discoverability, builds trust, and makes property communication feel more intuitive and human.",

  glance: [
    {
      label: "Context",
      value:
        "Post-pandemic, renting and buying moved online. Fewer site visits and less face-to-face contact left the conversation itself carrying the trust.",
    },
    {
      label: "Problem",
      value:
        "Contact meant handing over a phone number. Buyers felt exposed, owners drowned in spam calls, and both repeated the same questions.",
    },
    {
      label: "What I did",
      value:
        "Designed an in-app chat with onboarding, persistent property context and expressive replies, so nobody has to leave the app or share a number.",
    },
    {
      label: "Result",
      value:
        "A communication flow that keeps the property in view, keeps the user in the app and keeps the phone number private.",
    },
  ],

  challenge: {
    n: "1",
    eyebrow: "Challenge",
    title: "What broke the experience",
    lead: "Post-pandemic, the way people buy or rent property shifted. With fewer site visits and limited face-to-face interaction, the platform had to offer a more human and expressive way to communicate. Instead, it pushed people to the phone.",
    problems: [
      {
        n: "01",
        body: "Privacy concerns from sharing personal phone numbers with multiple brokers and owners.",
      },
      {
        n: "02",
        body: "Users had to switch between browsing and calling, creating friction in the journey.",
      },
      {
        n: "03",
        body: "New users struggled to understand chat capabilities without proper onboarding.",
      },
    ],
  },

  research: {
    n: "2",
    eyebrow: "Research and empathy",
    title: "The story behind the stats",
    lead: "Through a dual lens of numbers and narratives, I looked at both the scale of the frustration and the emotion driving it, so the solution would be data-backed and still recognisably human.",
    concernsTitle: "Concerns that shape design",
    concernsLead: "Real voices reveal the everyday frustrations of people navigating property conversations.",
    concernsBoard: "/work/housing-chats/concerns.webp",
    concernsBoardAlt:
      "Six recorded user concerns about waiting for replies, being forced to call, lack of expressive replies, spam enquiries, sharing a phone number, and losing track of which property a chat refers to",
    illustration: "/work/housing-chats/illustration.webp",
    concerns: [
      "Why do I have to wait so long for responses or repeat the same questions again and again?",
      "Why am I forced to call when I would rather chat directly in the app?",
      "Why can't I use emojis or stickers to express myself better in chats?",
      "Why do irrelevant or spammy inquiries take up so much of my time?",
      "Why do I have to share my phone number with so many strangers just to ask about a property?",
      "Why can't property details stay visible in chat so I don't lose track of which home we're talking about?",
    ],
    statsTitle: "Connecting the dots with data",
    statsLead: "Every number adds context. Together these outline the shift toward safer, more expressive digital conversations.",
    statsBoard: "/work/housing-chats/data.webp",
    statsBoardAlt:
      "Channel preference split: in-app chat 62 percent, messaging apps 23 percent, direct calls 15 percent",
    stats: [
      { label: "In-app chat", value: 62 },
      { label: "Messaging apps", value: 23 },
      { label: "Direct calls", value: 15 },
    ],
    statsNote:
      "The majority of users prefer in-app chat, which is what validated building a secure integrated system. Direct calls remain the least favoured, and privacy is why.",
  },

  personas: {
    n: "3",
    eyebrow: "Defining personas",
    title: "Who are we designing for",
    lead: "Two representative users on opposite sides of the same conversation, one trying to find a home without exposing themselves, the other trying to reach genuine buyers without the noise.",
    people: [
      {
        role: "The privacy-conscious renter",
        name: "Rohan Mehta",
        tagline: "Finding home without losing privacy",
        meta: [
          { k: "Occupation", v: "IT consultant at an MNC" },
          { k: "Location", v: "Bangalore, India" },
          { k: "Age", v: "28" },
          { k: "Income", v: "₹8 to 10 LPA" },
        ],
        bio: "Rohan recently moved to Bangalore for work and is looking for a 1BHK. With long hours he has little time to visit properties in person and prefers handling everything online. He values quick, secure, private communication and avoids unnecessary calls.",
        goals: [
          "Find an apartment quickly within budget and desired location.",
          "Have all property details consolidated in one place.",
          "Communicate instantly with sellers for faster decision-making.",
        ],
        pains: [
          "Feels unsafe when his phone number is shared with multiple strangers.",
          "Has to repeat the same questions about rent, amenities and location.",
          "Direct calls feel intrusive, especially during work hours.",
        ],
        motivations: ["Privacy and security", "Speed of response", "Price"],
        board: "/work/housing-chats/persona-renter.webp",
        boardAlt:
          "Persona board for Rohan Mehta, 28, IT consultant in Bangalore on 8 to 10 lakh a year. Goals: find a 1BHK quickly within budget, keep all property details in one place, and reach sellers instantly. Pains: his number being shared with strangers, repeating the same questions about rent and amenities, and intrusive calls during work hours. Motivated by privacy and security, speed of response, and price.",
        takeaway:
          "Designing for Rohan means a secure, intuitive channel where he can browse, connect and decide with confidence.",
      },
      {
        role: "The efficient seller",
        name: "Neha Sharma",
        tagline: "Reaching genuine buyers without the noise",
        meta: [
          { k: "Occupation", v: "Property owner" },
          { k: "Age", v: "34" },
          { k: "Segment", v: "Upper middle class" },
        ],
        bio: "Neha is a small business owner who rents out property for additional income. She finds it exhausting to deal with irrelevant calls and is wary of giving her number to strangers. She values trust and efficiency, and wants a system that filters serious buyers.",
        goals: [
          "Connect with genuine buyers without wasting time on spam calls.",
          "Avoid repeatedly answering the same questions about property details.",
          "Showcase her property details clearly and professionally.",
        ],
        pains: [
          "Must explain the same property features multiple times.",
          "Receives spam calls or inquiries from non-serious buyers.",
          "Hesitant to share her mobile number publicly due to privacy risks.",
        ],
        motivations: ["Quick deals", "Engagement with buyers", "Privacy and security"],
        board: "/work/housing-chats/persona-seller.webp",
        boardAlt:
          "Persona board for Neha Sharma, 34, property owner renting for extra income. Goals: reach genuine buyers without spam calls, stop repeating property details, and present the listing clearly. Pains: explaining the same features over and over, non-serious enquiries, and hesitancy about sharing her number publicly. Motivated by quick deals, buyer engagement, and privacy and security.",
        takeaway:
          "Designing for Neha means a streamlined, trustworthy experience that cuts her effort while increasing meaningful engagement.",
      },
    ],
  },

  statement:
    "Focusing on users' need for secure and meaningful conversations, I designed an in-app chat experience that protects privacy, simplifies communication and gives people room to express themselves.",

  redesign: {
    n: "4",
    eyebrow: "Interface redesign",
    title: "Redefining the communication flow",
    lead: "The old UI forced users into phone calls and number sharing, creating insecurity and drop-offs. The new one introduces direct in-app chat with stickers and emojis, turning communication into something safe and engaging.",
    before: {
      label: "Before",
      caption: "Old UI, friction and anxiety",
      notes: [
        "The CTA compromises privacy.",
        "WhatsApp takes users out of the app.",
        "Contact exposes the user to unwanted calls.",
      ],
      board: "/work/housing-chats/old-ui.webp",
      boardAlt:
        "The old Housing.com flow across five screens: a listing with no welcome or direction, a call-first contact prompt, a bare chat interface, a contact sheet offering phone and WhatsApp, and the property listing itself. Every route out of the listing asks the user to give up a phone number.",
      screens: [
        { src: "/work/housing-chats/before-1.webp", title: "No welcome, no direction" },
        { src: "/work/housing-chats/before-2.webp", title: "Forced to call" },
        { src: "/work/housing-chats/before-3.webp", title: "Bare chat interface" },
        { src: "/work/housing-chats/before-4.webp", title: "Contact options" },
        { src: "/work/housing-chats/before-5.webp", title: "Property listing" },
      ],
    },
    after: {
      label: "After",
      caption: "New UI, clarity and confidence",
      notes: [
        "Property context stays visible throughout the conversation.",
        "Expressive replies reduce friction and keep users inside the app.",
      ],
      board: "/work/housing-chats/new-ui.webp",
      boardAlt:
        "The redesigned flow across four screens: search your way, know before you go, conversations made simple with property context pinned above the thread, and action at first sight. Chat happens inside the app, with stickers and quick replies, and no number is exchanged.",
      screens: [
        { src: "/work/housing-chats/after-1.webp", title: "Search your way" },
        { src: "/work/housing-chats/after-2.webp", title: "Know before you go" },
        { src: "/work/housing-chats/after-3.webp", title: "Conversations made simple" },
        { src: "/work/housing-chats/after-4.webp", title: "Action at first sight" },
      ],
    },
    flows: [
      {
        title: "Onboarding flow",
        body: "Introduces users to the chat feature with clear messaging and visuals, so adoption does not depend on guessing.",
        src: "/work/housing-chats/flow-onboarding.webp",
        alt: "Onboarding flow screens introducing the chat feature",
      },
      {
        title: "In-app chat flow",
        body: "Property details stay pinned to the conversation, with quick replies, emojis and stickers doing the work a phone call used to.",
        src: "/work/housing-chats/flow-chat.webp",
        alt: "In-app chat flow screens with property context and quick replies",
      },
    ],
  },

  learnings: {
    n: "5",
    eyebrow: "Key learnings",
    title: "What this project taught me",
    quote:
      "The most significant decisions on this project were not about what to design, they were about",
    quoteAccent: "what users actually find helpful.",
    items: [
      {
        n: "01",
        title: "Friction kills interest",
        body: "Repeated detail sharing, or being pushed to a third-party app, creates frustration. Streamlining the flow keeps users exploring and conversing for longer.",
      },
      {
        n: "02",
        title: "Privacy is a deal-maker",
        body: "Users read number sharing as unsafe. In-app chat without phone disclosure builds trust and makes them far more willing to start a conversation.",
      },
      {
        n: "03",
        title: "Context builds confidence",
        body: "Keeping property details visible during chat reassures users and reduces confusion. Emojis, stickers and quick replies turn bland text into a conversation.",
      },
    ],
  },
};
