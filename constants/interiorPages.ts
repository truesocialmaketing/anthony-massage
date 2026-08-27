import type { PageHeroVariant } from "@/constants/pageHero";
import { Routes } from "@/constants/routes";

import type { DividerBlock } from "@/components/interior-sections/DividerSection";

export interface InteriorSectionData {
  id: string;
  eyebrow: string;
  title: string;
  blocks: DividerBlock[];
}

export interface InteriorFooterOverride {
  sub?: string;
  cta?: string;
  ctaHref?: string;
}

export interface InteriorPageData {
  route: Routes;
  srTitle: string;
  heroVariant: PageHeroVariant;
  heroEyebrow: string;
  heroCaption: string;
  lead: { eyebrow: string; title: string; paragraphs: string[] };
  sections: InteriorSectionData[];
  footer?: InteriorFooterOverride;
}

export const APPROACH_PAGE: InteriorPageData = {
  route: Routes.APPROACH,
  srTitle: "Approach | Anthony Massage Works",
  heroVariant: "opening",
  heroEyebrow: "Rising",
  heroCaption: "The body beginning to open.",
  lead: {
    eyebrow: "Approach",
    title: "This isn't a routine. It's a conversation with your body.",
    paragraphs: [
      "I'm not interested in a technique that looks the same on everyone. Two people with the same complaint can have completely different reasons for it.",
      "What follows is less a philosophy and more a way of paying attention.",
    ],
  },
  sections: [
    {
      id: "restriction",
      eyebrow: "How I Think About Restriction",
      title: "The pain is rarely the whole story.",
      blocks: [
        {
          type: "p",
          text: "Fascia — the connective web wrapping every muscle, bone, nerve, and organ — tightens and adheres in response to injury, repetition, stress, or simply time. The pattern conforms. Layers form on layers.",
        },
        {
          type: "p",
          text: "The place that hurts isn't always where the problem began. My work is finding that beginning, not just addressing where it hurts now.",
        },
      ],
    },
    {
      id: "individualized",
      eyebrow: "Every Session Is Different",
      title: "The work changes too.",
      blocks: [
        {
          type: "p",
          text: "I don't walk in with a plan already decided. Each session starts by listening — to what you tell me, and to what your body shows me once we begin.",
        },
        {
          type: "p",
          text: "As your body changes over a series of sessions, the work changes with it. What helped in the first session may not be what's needed in the fourth.",
        },
      ],
    },
    {
      id: "technique",
      eyebrow: "What Guides My Hands",
      title: "Patience, not force.",
      blocks: [
        {
          type: "p",
          text: "Sustained, specific contact lets tissue soften and reorganize on its own terms. It isn't forced open — it's given the conditions to release.",
        },
        {
          type: "p",
          text: "Sometimes that's gentle. Sometimes it's deep. The goal is never to overpower a restriction, only to meet it patiently enough that it no longer needs to hold on.",
        },
      ],
    },
  ],
};

export const CONDITIONS_PAGE: InteriorPageData = {
  route: Routes.CONDITIONS,
  srTitle: "Conditions | Anthony Massage Works",
  heroVariant: "compressed",
  heroEyebrow: "Where it begins",
  heroCaption: "The fully contracted figure.",
  lead: {
    eyebrow: "Conditions",
    title: "This is where many people begin.",
    paragraphs: [
      "Not because they know exactly what's wrong — but because something isn't moving the way it used to, and they've stopped waiting for it to resolve on its own.",
      "The place that hurts isn't always where the problem lives. Below are the patterns I see most often, and roughly where they tend to begin.",
    ],
  },
  sections: [
    {
      id: "neck-back",
      eyebrow: "Neck, Shoulders & Back",
      title: "Held tension, familiar pain.",
      blocks: [
        { type: "list", items: ["Neck and shoulder pain", "Headaches", "Jaw tension", "Low back pain", "Postural strain"] },
        {
          type: "p",
          spaced: true,
          text: "A shoulder that won't release may have nothing to do with the shoulder. A headache may begin in the jaw, or the neck, or years of the way you carry a desk job in your body.",
        },
      ],
    },
    {
      id: "hips-mobility",
      eyebrow: "Hips, Legs & Mobility",
      title: "Where movement quietly narrows.",
      blocks: [
        { type: "list", items: ["Hip restriction", "Sciatica", "Limited mobility", "Athletic recovery"] },
        {
          type: "p",
          spaced: true,
          text: "Compensation is intelligent — the body finds a way to keep moving even when something is restricted. Over time, that workaround becomes the new normal. It doesn't have to stay that way.",
        },
      ],
    },
    {
      id: "stress",
      eyebrow: "Stress & the Nervous System",
      title: "When the body won't put it down.",
      blocks: [
        { type: "list", items: ["Stress and nervous system overload", "Chronic tension", "Restricted, shallow breathing"] },
        {
          type: "p",
          spaced: true,
          text: "Some restriction isn't purely mechanical. The body holds vigilance the way it holds an old injury — quietly, persistently, until something helps it feel safe enough to let go.",
        },
      ],
    },
    {
      id: "not-listed",
      eyebrow: "If yours isn't here",
      title: "That's okay.",
      blocks: [
        { type: "p", text: "The body doesn't organize itself into categories. People don't either." },
        {
          type: "p",
          text: "If something has been quietly limiting how you move — however you'd describe it — that's a reasonable place to start a conversation.",
        },
      ],
    },
  ],
};

export const YOUR_SESSION_PAGE: InteriorPageData = {
  route: Routes.YOUR_SESSION,
  srTitle: "Your Session | Anthony Massage Works",
  heroVariant: "entering",
  heroEyebrow: "Light entering",
  heroCaption: "Warmth begins to enter.",
  lead: {
    eyebrow: "Your Session",
    title: "What it's like to be on my table.",
    paragraphs: [
      "I'm interested in how you got here.",
      "We'll spend the first few minutes just talking about what's been going on, what you're feeling, and what you'd like out of today's session. I'm not listening for the perfect explanation. I'm trying to understand your experience and get a sense of the lay of the land.",
    ],
  },
  sections: [
    {
      id: "both-sides",
      eyebrow: "From Both Sides",
      title: "I've been there too.",
      blocks: [
        {
          type: "p",
          text: "If you've been living with pain for a while, you might know this feeling: lying on the table, hoping the therapist stops right there. Hoping they find the spot. Hoping they don't glide past it.",
        },
        {
          type: "p",
          text: "I've lived with pain too. I know that hope from the other side of the table. It's part of why I won't glide past it.",
        },
      ],
    },
    {
      id: "on-the-table",
      eyebrow: "On the Table",
      title: "Where the work goes.",
      blocks: [
        {
          type: "p",
          text: "Once you're on the table, my attention shifts to how your body is responding. Pain has a way of getting our attention, but it isn't always the place that needs the most attention. Sometimes we spend the whole session right where it hurts, and sometimes we need to relieve tension somewhere else in the body to help the places in pain.",
        },
        {
          type: "p",
          text: "Throughout the session, my goal is always to help move you in the direction of your goal. Sometimes that means staying right where it hurts. Sometimes it means following what your body is presenting somewhere completely different. If we end up working somewhere you weren't expecting, I'll usually tell you what I'm finding and why we're going there, so you understand what we're exploring together. Unless you're the type to sleep through this kind of work. That's okay too.",
        },
      ],
    },
    {
      id: "depth",
      eyebrow: "Depth",
      title: "Without bracing.",
      blocks: [
        {
          type: "p",
          text: "There's a particular depth I'm always working toward: as far in as I can go without your body bracing against it. Sometimes that depth is deep pressure. Sometimes it isn't. The real question isn't how much pressure you can tolerate. It's how much your nervous system can actually receive without guarding.",
        },
      ],
    },
    {
      id: "your-voice",
      eyebrow: "Your Voice",
      title: "Tell me what you feel.",
      blocks: [
        {
          type: "p",
          text: "Most of the time I can feel that under my hands. Every now and then, though, your experience tells me something mine can't.",
        },
        {
          type: "p",
          text: "If you're noticing something, tell me. Especially if it's connected to something you've been trying to work through. You feel everything from the inside. I don't.",
        },
        {
          type: "p",
          text: "Sometimes the worry of waiting to see if I'll find “the spot” can become part of what your body is holding onto. Sometimes just saying it out loud is enough to change things. It gives us another way in.",
        },
        {
          type: "p",
          text: "Not everyone needs this. Plenty of people would rather surrender and let me work. Both are good. It depends on what you're working through, and what feels right to you.",
        },
      ],
    },
    {
      id: "the-moment",
      eyebrow: "The Moment",
      title: "That's it.",
      blocks: [
        {
          type: "p",
          text: "Then there's the moment you'll say, “That's it… right there.” Not because I found a sore spot, but because we found something your body has been asking us to notice.",
        },
        {
          type: "p",
          text: "From there, it's all about your body leading. It has stories to tell. Some places soften quickly. Others take time. Little by little, your nervous system settles, and we move in the direction of your goal.",
        },
      ],
    },
    {
      id: "before-you-come",
      eyebrow: "Before You Come In",
      title: "Begin where you are.",
      blocks: [
        {
          type: "p",
          text: "One thing I'd like you to know before you come in is that you don't need to have everything figured out. You don't have to know exactly what's causing the pain, or even be able to describe it perfectly. That's part of what we'll explore together.",
        },
        {
          type: "p",
          text: "No two sessions are the same. Your body is always changing. Because of that, I don't expect every session to unfold the same way. We simply begin with what your body is presenting that day and go from there.",
        },
      ],
    },
  ],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const WORKING_TOGETHER_PAGE: InteriorPageData = {
  route: Routes.WORKING_TOGETHER,
  srTitle: "Working Together | Anthony Massage Works",
  heroVariant: "opening",
  heroEyebrow: "Steady",
  heroCaption: "The body meets the light halfway.",
  lead: {
    eyebrow: "Working Together",
    title: "You're part of the work.",
    paragraphs: [
      "One of the things I've noticed over the years is that every person is different.",
      "Some people settle into the table almost immediately. Others need a little more time. Some people have no trouble letting go. Others have been holding on for so long that they don't even realize they're doing it anymore.",
      "Neither is right or wrong.",
      "It's simply what is.",
      "Whatever you bring in with you isn't something to fix before we begin. It's where we begin.",
    ],
  },
  sections: [
    {
      id: "meeting-halfway",
      eyebrow: "Meeting Halfway",
      title: "I can only meet it.",
      blocks: [
        {
          type: "p",
          text: "One of the things I've come to appreciate is that massage isn't something that's simply given to someone. The best sessions often feel like a conversation between your body and my hands.",
        },
        {
          type: "p",
          text: "Throughout the session, I'll be paying attention to what your body is presenting and helping move you in the direction of your goal. If your body begins to soften, I'll follow that. If it isn't ready yet, I'll listen to that too. Both tell us something.",
        },
        { type: "p", text: "Early on, I reached for change before the body was ready. It usually didn't stick." },
        { type: "p", text: "It took me a while to stop." },
        {
          type: "p",
          text: "I can't make a nervous system do anything. I can only meet it. And when it's ready, it comes halfway.",
        },
      ],
    },
    {
      id: "your-half",
      eyebrow: "Your Half",
      title: "You don't have to do it right.",
      blocks: [
        {
          type: "p",
          text: "You don't have to know how to relax perfectly. You don't have to wonder if you're doing it right.",
        },
        {
          type: "p",
          text: "Sometimes the only thing to do is notice your breathing, allow your shoulders to drop, and let yourself be supported by the table.",
        },
        { type: "p", text: "Sometimes that happens quickly." },
        { type: "p", text: "Sometimes it takes a while." },
        { type: "p", text: "There's no hurry here." },
      ],
    },
    {
      id: "what-shifts",
      eyebrow: "What Shifts",
      title: "When the body settles.",
      blocks: [
        { type: "p", text: "One of the things I've noticed is that when the nervous system begins to settle, something changes." },
        {
          type: "p",
          text: "Your attention isn't pulled in as many directions. Your body becomes easier to listen to, and the work begins to feel less like something that's being done to you and more like something you're part of.",
        },
        {
          type: "p",
          text: "In my experience, that's when the body often becomes more receptive to change. Movement begins to appear where there wasn't much before. Tension starts to soften. Things that felt like they couldn't change begin to feel a little more possible.",
        },
        {
          type: "p",
          text: "This is what's often called the parasympathetic state. It's where I've seen some of the most meaningful changes begin.",
        },
      ],
    },
    {
      id: "however-you-arrive",
      eyebrow: "However You Arrive",
      title: "Every body has its own pace.",
      blocks: [
        {
          type: "p",
          text: "Some sessions are quiet. Some are more conversational. Some people want to understand everything I'm finding. Others would rather close their eyes and simply receive. Both are good.",
        },
        {
          type: "p",
          text: "We'll meet your body wherever it is and see where it leads us. From there, we'll simply work together and see what's possible.",
        },
      ],
    },
  ],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const RESOURCES_PAGE: InteriorPageData = {
  route: Routes.RESOURCES,
  srTitle: "Resources | Anthony Massage Works",
  heroVariant: "opening",
  heroEyebrow: "Steady",
  heroCaption: "The body learning to stay open.",
  lead: {
    eyebrow: "Resources",
    title: "[Page title to come.]",
    paragraphs: ["[Opening lines for this page. Purpose and content to be defined.]"],
  },
  sections: [
    {
      id: "s1",
      eyebrow: "Section One",
      title: "[Title]",
      blocks: [{ type: "p", text: "[Content for this section.]" }],
    },
    {
      id: "s2",
      eyebrow: "Section Two",
      title: "[Title]",
      blocks: [{ type: "p", text: "[Content for this section.]" }],
    },
  ],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const BOOK_PAGE: InteriorPageData = {
  route: Routes.BOOK,
  srTitle: "Book | Anthony Massage Works",
  heroVariant: "arrived",
  heroEyebrow: "Arrived",
  heroCaption: "The unfolding has arrived.",
  lead: {
    eyebrow: "Book",
    title: "Let's find a time.",
    paragraphs: ["Your session, on your schedule. Scheduling is on its way."],
  },
  sections: [
    {
      id: "schedule",
      eyebrow: "Choose a Time",
      title: "Your calendar, coming soon.",
      blocks: [{ type: "schedule" }],
    },
    {
      id: "pricing",
      eyebrow: "Pricing",
      title: "Straightforward, by session length.",
      blocks: [
        { type: "list", items: ["90 minutes — $175", "120 minutes — $240", "180 minutes — $325"] },
        {
          type: "p",
          spaced: true,
          text: "Specialty work — hot stones, intraoral release, CBD-infused oil — is included where it's part of the session, not billed separately.",
        },
      ],
    },
    {
      id: "specialty",
      eyebrow: "Specialty Work",
      title: "Tailored as needed.",
      blocks: [
        {
          type: "list",
          items: ["Stretching and mobility work", "Intraoral (jaw) release", "Hot stones", "CBD-infused oil, where appropriate"],
        },
        {
          type: "p",
          spaced: true,
          text: "These aren't a menu to choose from in advance. They're tools I bring in when your body is asking for them — you don't need to know which ones you'll need before you arrive.",
        },
      ],
    },
    {
      id: "faqs",
      eyebrow: "A Few Common Questions",
      title: "What to expect.",
      blocks: [
        {
          type: "qa",
          items: [
            {
              q: "What should I wear?",
              a: "Comfortable clothing you can move in. We'll discuss what's appropriate to remove, if anything, based on the work.",
            },
            {
              q: "How many sessions will I need?",
              a: "Most people feel a difference after the first. Lasting change usually comes from a short series, spaced out to let your body integrate each one.",
            },
            {
              q: "Do you work with athletes / old injuries / chronic pain?",
              a: "Yes — see the Conditions page for the patterns I work with most often, or just reach out and ask.",
            },
          ],
        },
      ],
    },
    {
      id: "cancellation",
      eyebrow: "Cancellation Policy",
      title: "Life happens.",
      blocks: [
        {
          type: "p",
          text: "I ask for at least [24 hours'] notice if you need to reschedule or cancel. Sessions cancelled with less notice may be subject to a fee, at my discretion.",
        },
      ],
    },
    {
      id: "find-me",
      eyebrow: "Where to Find Me",
      title: "Easy to arrive.",
      blocks: [
        { type: "p", text: "[Studio address]" },
        { type: "p", text: "[City, State ZIP]" },
        { type: "p", spaced: true, text: "[A line or two on how to find the entrance, or notable landmarks nearby.]" },
        { type: "p", spaced: true, text: "[Details on street parking, a lot, or validation — whatever applies.]" },
      ],
    },
    {
      id: "questions",
      eyebrow: "Still Have a Question?",
      title: "Just ask.",
      blocks: [
        {
          type: "p",
          text: "You don't need to know what you need before you reach out. If something here didn't answer your question, send it along — I read every message myself.",
        },
        { type: "email", email: "hello@anthonymassageworks.com", phone: "[phone number]" },
      ],
    },
  ],
  footer: { sub: "Scheduling is on its way.", cta: "See scheduling", ctaHref: "#schedule" },
};

export const ANTHONY_PAGE: InteriorPageData = {
  route: Routes.ANTHONY,
  srTitle: "Meet Anthony | Anthony Massage Works",
  heroVariant: "present",
  heroEyebrow: "Present",
  heroCaption: "The work, and the person behind it.",
  lead: {
    eyebrow: "Anthony",
    title: "Hi — I'm Anthony.",
    paragraphs: ["[A warm opening line or two: who you are, and the simple reason you do this work.]"],
  },
  sections: [
    {
      id: "path",
      eyebrow: "My Path",
      title: "How I got here.",
      blocks: [
        {
          type: "p",
          text: "[Your background and training — what drew you to fascial release work, where you studied, how your practice took shape over time.]",
        },
      ],
    },
    {
      id: "belief",
      eyebrow: "My Belief",
      title: "Why this work matters to me.",
      blocks: [
        {
          type: "p",
          text: "[The conviction behind the practice — what you believe about the body, restriction, and release, and why you approach each session with patience rather than force.]",
        },
      ],
    },
    {
      id: "beyond",
      eyebrow: "Beyond the Table",
      title: "When I'm not working.",
      blocks: [
        {
          type: "p",
          text: "[A human note — a little of who you are outside the studio, so people feel they're meeting a person, not a profile.]",
        },
      ],
    },
  ],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const INTERIOR_PAGES = [
  APPROACH_PAGE,
  CONDITIONS_PAGE,
  YOUR_SESSION_PAGE,
  WORKING_TOGETHER_PAGE,
  RESOURCES_PAGE,
  BOOK_PAGE,
  ANTHONY_PAGE,
];

// The global Footer (rendered once in app/layout.tsx) looks up its per-page
// copy here by pathname, since each interior page overrides the default
// "Book your first session" copy slightly (Book itself swaps in scheduling
// copy entirely).
export const INTERIOR_FOOTER_COPY: Record<string, InteriorFooterOverride> = Object.fromEntries(
  INTERIOR_PAGES.filter((page) => page.footer).map((page) => [page.route, page.footer as InteriorFooterOverride])
);
