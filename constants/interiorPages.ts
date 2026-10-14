import type { PageHeroVariant } from "@/constants/pageHero";
import { Routes } from "@/constants/routes";

import type { DividerBlock } from "@/components/interior-sections/DividerSection";

// All copy below is taken verbatim from Anthony's v39 handover
// (handover/v39/*.html). Edit it there first, then mirror it here — please
// don't reword it in place.

export interface InteriorSectionData {
  id: string;
  eyebrow: string;
  title: string;
  blocks: DividerBlock[];
}

export interface TherapistCardData {
  id: keyof typeof THERAPIST_PUBLISHED;
  name: string;
  role: string;
  line: string;
  portrait: string;
  alt: string;
  paragraphs: string[];
  linkLabel: string;
  href: Routes;
}

// Which therapist pages are live. Per Anthony (first-round feedback, 6.3–6.5):
// only Anthony is bookable at launch. Song Ying's page is built but stays
// off until he confirms her start; Cole has no page until he is licensed.
// Flip a value to true to publish that page and link it from the roster.
export const THERAPIST_PUBLISHED = {
  anthony: true,
  "cole-francis": false,
  "song-ying": false,
} as const;

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
  heroAriaLabel: string;
  lead: { eyebrow: string; title: string; paragraphs: string[] };
  therapists?: TherapistCardData[];
  sections: InteriorSectionData[];
  footer?: InteriorFooterOverride;
}

export const APPROACH_PAGE: InteriorPageData = {
  route: Routes.APPROACH,
  srTitle: "Approach | Anthony Massage Works",
  heroVariant: "rising",
  heroEyebrow: "Rising",
  heroCaption: "The body beginning to open.",
  heroAriaLabel:
    "A billboard for Anthony Massage Works stands over a quiet street at dusk. On it, an anatomical figure kneels and reaches upward, the torso beginning to rise, the spine lengthening. A soft light moves once across the board before settling.",
  lead: {
    eyebrow: "Approach",
    title: "This isn’t a routine. It’s a conversation with your body.",
    paragraphs: [
      "I’m not interested in a technique that looks the same on everyone. Two people with the same complaint can have completely different reasons for it.",
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
          text: "The place that hurts isn’t always where the problem began. My work is finding that beginning, not just addressing where it hurts now.",
        },
      ],
    },
    {
      id: "technique",
      eyebrow: "What Guides My Hands",
      title: "I can only meet it.",
      blocks: [
        {
          type: "p",
          text: "One of the things I’ve come to appreciate is that massage isn’t something that’s given to someone. The best sessions often feel like a conversation between your body and my hands.",
        },
        {
          type: "p",
          text: "Sustained, specific contact lets tissue soften and reorganize on its own terms. It isn’t forced open — it’s given the conditions to release.",
        },
        {
          type: "p",
          text: "Sometimes that’s gentle. Sometimes it’s deep. The goal is never to overpower a restriction, only to meet it patiently enough that it no longer needs to hold on.",
        },
        { type: "p", text: "Early on, I reached for change before the body was ready. It usually didn’t stick." },
        { type: "p", text: "It took me a while to stop." },
        {
          type: "p",
          text: "I can’t make a nervous system do anything. I can only meet it. And when it’s ready, it comes halfway.",
        },
      ],
    },
    {
      id: "your-half",
      eyebrow: "Your Half",
      title: "You don’t have to do it right.",
      blocks: [
        {
          type: "p",
          text: "Some people settle into the table almost immediately. Others need a little more time. Some people have no trouble letting go. Others have been holding on for so long that they don’t even realize they’re doing it anymore.",
        },
        { type: "p", text: "Neither is right or wrong." },
        { type: "p", text: "It’s simply what is." },
        {
          type: "p",
          text: "Whatever you bring in with you isn’t something to fix before we begin. It’s where we begin.",
        },
        {
          type: "p",
          text: "You don’t have to know how to relax perfectly. You don’t have to wonder if you’re doing it right.",
        },
        {
          type: "p",
          text: "Sometimes the only thing to do is notice your breathing, allow your shoulders to drop, and let yourself be supported by the table.",
        },
        { type: "p", text: "Sometimes that happens quickly." },
        { type: "p", text: "Sometimes it takes a while." },
        { type: "p", text: "There’s no hurry here." },
      ],
    },
    {
      id: "what-shifts",
      eyebrow: "What Shifts",
      title: "When the body settles.",
      blocks: [
        { type: "p", text: "When the nervous system begins to settle, something changes." },
        {
          type: "p",
          text: "Your attention isn’t pulled in as many directions. Your body becomes easier to listen to, and the work begins to feel less like something that’s being done to you and more like something you’re part of.",
        },
        {
          type: "p",
          text: "In my experience, that’s when the body often becomes more receptive to change. Movement begins to appear where there wasn’t much before. Tension starts to soften. Things that felt like they couldn’t change begin to feel a little more possible.",
        },
        {
          type: "p",
          text: "This is what’s often called the parasympathetic state. It’s where I’ve seen some of the most meaningful changes begin.",
        },
      ],
    },
    {
      id: "individualized",
      eyebrow: "Working Together",
      title: "The work changes too.",
      blocks: [
        {
          type: "p",
          text: "I don’t walk in with a plan already decided. Each session starts by listening — to what you tell me, and to what your body shows me once we begin.",
        },
        {
          type: "p",
          text: "If your body begins to soften, I’ll follow that. If it isn’t ready yet, I’ll listen to that too. Both tell us something.",
        },
        {
          type: "p",
          text: "As your body changes over a series of sessions, the work changes with it. What helped in the first session may not be what’s needed in the fourth.",
        },
        { type: "p", text: "Some sessions are quiet. Some are more conversational." },
        {
          type: "p",
          text: "We’ll meet your body wherever it is and see where it leads us. From there, we’ll simply work together and see what’s possible.",
        },
      ],
    },
  ],
  footer: {
    sub: "Whatever brought you here, I’d love to help you begin listening to what your body’s been trying to tell you.",
    cta: "Book your first session.",
  },
};

export const YOUR_SESSION_PAGE: InteriorPageData = {
  route: Routes.YOUR_SESSION,
  srTitle: "Your Session | Anthony Massage Works",
  heroVariant: "session",
  heroEyebrow: "Light entering",
  heroCaption: "Warmth begins to enter.",
  heroAriaLabel:
    "A billboard for Anthony Massage Works stands over a quiet street at dusk. On it, an anatomical figure bows forward, still low and mostly contracted, as warm light begins to enter the scene. A soft light moves once across the board before settling.",
  lead: {
    eyebrow: "Your Session",
    title: "What it’s like to be on my table.",
    paragraphs: [
      "I’m interested in how you got here.",
      "We’ll spend the first few minutes just talking about what’s been going on, what you’re feeling, and what you’d like out of today’s session. I’m not listening for the perfect explanation. I’m trying to understand your experience and get a sense of the lay of the land.",
    ],
  },
  sections: [
    {
      id: "both-sides",
      eyebrow: "From Both Sides",
      title: "I’ve been there too.",
      blocks: [
        {
          type: "p",
          text: "If you’ve been living with pain for a while, you might know this feeling: lying on the table, hoping the therapist stops right there. Hoping they find the spot. Hoping they don’t glide past it.",
        },
        {
          type: "p",
          text: "I’ve lived with pain too. I know that hope from the other side of the table. It’s part of why I won’t glide past it.",
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
          text: "Once you’re on the table, my attention shifts to how your body is responding. Pain has a way of getting our attention, but it isn’t always the place that needs the most attention. Sometimes we spend the whole session right where it hurts, and sometimes we need to relieve tension somewhere else in the body to help the places in pain.",
        },
        {
          type: "p",
          text: "Throughout the session, my goal is always to help move you in the direction of your goal. Sometimes that means staying right where it hurts. Sometimes it means following what your body is presenting somewhere completely different. If we end up working somewhere you weren’t expecting, I’ll usually tell you what I’m finding and why we’re going there, so you understand what we’re exploring together. Unless you’re the type to sleep through this kind of work. That’s okay too.",
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
          text: "There’s a particular depth I’m always working toward: as far in as I can go without your body bracing against it. Sometimes that depth is deep pressure. Sometimes it isn’t. The real question isn’t how much pressure you can tolerate. It’s how much your nervous system can actually receive without guarding.",
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
          text: "Most of the time I can feel that under my hands. Every now and then, though, your experience tells me something mine can’t.",
        },
        {
          type: "p",
          text: "If you’re noticing something, tell me. Especially if it’s connected to something you’ve been trying to work through. You feel everything from the inside. I don’t.",
        },
        {
          type: "p",
          text: "Sometimes the worry of waiting to see if I’ll find “the spot” can become part of what your body is holding onto. Sometimes just saying it out loud is enough to change things. It gives us another way in.",
        },
        {
          type: "p",
          text: "Not everyone needs this. Plenty of people would rather surrender and let me work. Both are good. It depends on what you’re working through, and what feels right to you.",
        },
      ],
    },
    {
      id: "the-moment",
      eyebrow: "The Moment",
      title: "That’s it.",
      blocks: [
        {
          type: "p",
          text: "Then there’s the moment you’ll say, “That’s it… right there.” Not because I found a sore spot, but because we found something your body has been asking us to notice.",
        },
        {
          type: "p",
          text: "From there, it’s all about your body leading. It has stories to tell. Some places soften quickly. Others take time. Little by little, your nervous system settles, and we move in the direction of your goal.",
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
          text: "One thing I’d like you to know before you come in is that you don’t have to know exactly what’s causing the pain, or even be able to describe it perfectly. That’s part of what we’ll explore together.",
        },
        {
          type: "p",
          text: "No two sessions are the same. Your body is always changing. Because of that, I don’t expect every session to unfold the same way. We simply begin with what your body is presenting that day and go from there.",
        },
      ],
    },
  ],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const THERAPISTS_PAGE: InteriorPageData = {
  route: Routes.THERAPISTS,
  srTitle: "Therapists | Anthony Massage Works",
  heroVariant: "present",
  heroEyebrow: "Present",
  heroCaption: "Meet Our Therapists",
  heroAriaLabel:
    "A billboard for Anthony Massage Works stands over a quiet street at dusk. On it, an anatomical figure stands upright, calm and composed. A soft light moves once across the board before settling into quiet warmth.",
  lead: {
    eyebrow: "Therapists",
    title: "Chosen with care.",
    paragraphs: [
      "Every therapist who joins Anthony Massage Works is chosen with care.",
      "Not because they work like Anthony.",
      "They don’t.",
      "Each brings their own perspective, experience, and style.",
      "What they share is something deeper.",
      "Thoughtfulness. Integrity. Curiosity. A commitment to continual learning. A genuine desire to care well for the people who trust them.",
    ],
  },
  therapists: [
    {
      id: "anthony",
      name: "Anthony",
      role: "Founder · Massage Therapist",
      line: "I was learning how to pay attention.",
      portrait: "/images/other/portrait-anthony.jpg",
      alt: "Portrait of Anthony, massage therapist at Anthony Massage Works.",
      paragraphs: [
        "When I first began studying massage, I thought I was learning how to help people feel better. Over time, I realized I was learning something else.",
        "I’m drawn to things that become more meaningful the longer you stay with them. Bodies are like that. People are too.",
      ],
      linkLabel: "Meet Anthony",
      href: Routes.THERAPIST_ANTHONY,
    },
    {
      id: "cole-francis",
      name: "Cole Francis",
      // v39 says "Massage Therapist"; per Anthony (6.5) nothing may imply Cole
      // is currently credentialed, so the roster says when he joins instead.
      role: "Joining 2027",
      line: "[One line in Cole’s own voice.]",
      portrait: "/images/other/portrait-cole-francis.jpg",
      alt: "Portrait of Cole Francis.",
      paragraphs: [
        "[Two or three sentences introducing Cole: how he came to this work, and what a client tends to notice about the way he works.]",
        "[A second short paragraph, in his own voice, that gives a sense of who he is rather than a list of qualifications.]",
      ],
      linkLabel: "Meet Cole",
      href: Routes.THERAPIST_COLE_FRANCIS,
    },
    {
      id: "song-ying",
      name: "Song Ying",
      // per Anthony (6.4): shown as joining until her start is confirmed
      role: "Joining November",
      line: "[One line in Song Ying’s own voice.]",
      portrait: "/images/other/portrait-song-ying.jpg",
      alt: "Portrait of Song Ying.",
      paragraphs: [
        "[Two or three sentences introducing Song Ying: how she came to this work, and what a client tends to notice about the way she works.]",
        "[A second short paragraph, in her own voice, that gives a sense of who she is rather than a list of qualifications.]",
      ],
      linkLabel: "Meet Song Ying",
      href: Routes.THERAPIST_SONG_YING,
    },
  ],
  sections: [],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const THERAPIST_ANTHONY_PAGE: InteriorPageData = {
  route: Routes.THERAPIST_ANTHONY,
  srTitle: "Anthony | Anthony Massage Works",
  heroVariant: "present",
  heroEyebrow: "Present",
  heroCaption: "The work, and the person behind it.",
  heroAriaLabel:
    "A billboard for Anthony Massage Works stands over a quiet street at dusk. On it, an anatomical figure stands upright, calm and composed. A soft light moves once across the board before settling into quiet warmth.",
  lead: {
    eyebrow: "Anthony · Founder",
    title: "Hi — I’m Anthony.",
    paragraphs: [
      "When I first began studying massage, I thought I was learning how to help people feel better.",
      "Over time, I realized I was learning something else.",
      "I was learning how to pay attention.",
      "To notice what changes. What doesn’t. Where the body protects. Where it lets go. Where someone may have been carrying more than they realize.",
      "That way of seeing has shaped more than my work. It has shaped the way I move through life.",
    ],
  },
  sections: [
    {
      id: "path",
      eyebrow: "My Path",
      title: "I knew pain from the inside.",
      blocks: [
        {
          type: "p",
          text: "I was twenty when I left for Alaska to work the Bering Sea. I spent years there as a crab fisherman.",
        },
        {
          type: "p",
          text: "There were mornings I couldn’t bend over to put on my boots. I used a pair of long vice grips to reach them, because the pain shooting down my legs was too much to fold into.",
        },
        { type: "p", text: "Like a lot of people, I kept working." },
        {
          type: "p",
          text: "For a while I only wanted the pain to stop. I wanted to get away from it. None of that helped much.",
        },
        { type: "p", text: "The search led me to massage school." },
        {
          type: "p",
          text: "What I didn’t expect was that somewhere along the way, my focus began to change. I became just as interested in helping other people understand their pain as I was in understanding my own.",
        },
        { type: "p", text: "Living through it gave me something no textbook could." },
        { type: "p", text: "It gave me empathy." },
        { type: "p", text: "I know what it’s like to wonder if your body will ever feel different." },
        { type: "p", text: "And I know how meaningful it is when it finally does." },
      ],
    },
    {
      id: "belief",
      eyebrow: "Still Learning",
      title: "Every body is different.",
      blocks: [
        { type: "p", text: "People sometimes ask how long I have been doing this." },
        { type: "p", text: "It has been a while now, but the honest answer is that I am still learning." },
        {
          type: "p",
          text: "I have always been curious about people. What helps us change. What allows us to feel safe. Why we hold on. And what sometimes becomes possible when we finally have enough room to let go.",
        },
        { type: "p", text: "Every person teaches me something." },
        {
          type: "p",
          text: "Helping someone better understand what is happening within their own body remains one of the things I love most about this work.",
        },
      ],
    },
    {
      id: "beyond",
      eyebrow: "Outside the Room",
      title: "Beneath the surface.",
      blocks: [
        { type: "p", text: "Outside the treatment room, I value many of the same things." },
        { type: "p", text: "Quiet. Nature. Meaningful conversation. Time to think." },
        {
          type: "p",
          text: "I live aboard an old wooden boat, which has taught me something about patience, care, and paying attention to what is happening beneath the surface.",
        },
        { type: "p", text: "I am drawn to things that become more meaningful the longer you stay with them." },
        { type: "p", text: "Bodies are like that." },
        { type: "p", text: "People are too." },
      ],
    },
  ],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const THERAPIST_COLE_FRANCIS_PAGE: InteriorPageData = {
  route: Routes.THERAPIST_COLE_FRANCIS,
  srTitle: "Cole Francis | Anthony Massage Works",
  heroVariant: "present",
  heroEyebrow: "Present",
  heroCaption: "Cole Francis",
  heroAriaLabel:
    "A billboard for Anthony Massage Works stands over a quiet street at dusk. On it, an anatomical figure stands upright, calm and composed. A soft light moves once across the board before settling into quiet warmth.",
  lead: {
    eyebrow: "Cole Francis · Massage Therapist",
    title: "[A warm opening line in his own voice.]",
    paragraphs: [
      "[Two or three sentences: who they are, and the simple reason they do this work. Spoken, not written.]",
      "[A short second paragraph that lets a reader hear a person rather than a profile.]",
    ],
  },
  sections: [
    {
      id: "philosophy",
      eyebrow: "How I Think About the Work",
      title: "[One line in his own voice.]",
      blocks: [
        {
          type: "p",
          text: "[Their philosophy of the work, in their own words. What they believe is actually happening in a session, and why they work the way they do.]",
        },
        { type: "p", text: "[A second paragraph if it needs one. Plain, spoken, first person.]" },
      ],
    },
    {
      id: "notice",
      eyebrow: "What I Notice",
      title: "[One line in his own voice.]",
      blocks: [
        {
          type: "p",
          text: "[What this therapist naturally sees or feels in a body. The patterns they tend to pick up on before anything is said.]",
        },
        {
          type: "p",
          text: "[Where that attention came from: training, experience, or simply years of paying attention.]",
        },
      ],
    },
    {
      id: "sessions",
      eyebrow: "Sessions I Love",
      title: "[One line in his own voice.]",
      blocks: [
        {
          type: "p",
          text: "[The kinds of sessions they most enjoy giving, and why. Not a service list, a preference.]",
        },
        { type: "p", text: "[Who might feel especially at home working with them, said plainly and without selling.]" },
      ],
    },
    {
      id: "beyond",
      eyebrow: "Outside the Room",
      title: "[One line in his own voice.]",
      blocks: [
        {
          type: "p",
          text: "[A human note. A little of who they are away from the table, so a client feels they are meeting a person.]",
        },
      ],
    },
  ],
  footer: { sub: "Book your first session.", cta: "Book your first session" },
};

export const THERAPIST_SONG_YING_PAGE: InteriorPageData = {
  route: Routes.THERAPIST_SONG_YING,
  srTitle: "Song Ying | Anthony Massage Works",
  heroVariant: "present",
  heroEyebrow: "Present",
  heroCaption: "Song Ying",
  heroAriaLabel:
    "A billboard for Anthony Massage Works stands over a quiet street at dusk. On it, an anatomical figure stands upright, calm and composed. A soft light moves once across the board before settling into quiet warmth.",
  lead: {
    eyebrow: "Song Ying · Massage Therapist",
    title: "[A warm opening line in her own voice.]",
    paragraphs: [
      "[Two or three sentences: who they are, and the simple reason they do this work. Spoken, not written.]",
      "[A short second paragraph that lets a reader hear a person rather than a profile.]",
    ],
  },
  sections: [
    {
      id: "philosophy",
      eyebrow: "How I Think About the Work",
      title: "[One line in her own voice.]",
      blocks: [
        {
          type: "p",
          text: "[Their philosophy of the work, in their own words. What they believe is actually happening in a session, and why they work the way they do.]",
        },
        { type: "p", text: "[A second paragraph if it needs one. Plain, spoken, first person.]" },
      ],
    },
    {
      id: "notice",
      eyebrow: "What I Notice",
      title: "[One line in her own voice.]",
      blocks: [
        {
          type: "p",
          text: "[What this therapist naturally sees or feels in a body. The patterns they tend to pick up on before anything is said.]",
        },
        {
          type: "p",
          text: "[Where that attention came from: training, experience, or simply years of paying attention.]",
        },
      ],
    },
    {
      id: "sessions",
      eyebrow: "Sessions I Love",
      title: "[One line in her own voice.]",
      blocks: [
        {
          type: "p",
          text: "[The kinds of sessions they most enjoy giving, and why. Not a service list, a preference.]",
        },
        { type: "p", text: "[Who might feel especially at home working with them, said plainly and without selling.]" },
      ],
    },
    {
      id: "beyond",
      eyebrow: "Outside the Room",
      title: "[One line in her own voice.]",
      blocks: [
        {
          type: "p",
          text: "[A human note. A little of who they are away from the table, so a client feels they are meeting a person.]",
        },
      ],
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
  heroAriaLabel:
    "A billboard for Anthony Massage Works stands over a quiet street at dusk. On it, an anatomical figure stands fully upright, arms open, natural and balanced. A soft light moves once across the board before settling.",
  lead: {
    eyebrow: "Book",
    title: "Let’s find a time.",
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
      // v39 leaves these as $[XXX]; the figures are Anthony's own, from his
      // first-round feedback (4.1 / 5): durations, not a package menu.
      eyebrow: "Pricing",
      title: "Straightforward, by session length.",
      blocks: [
        { type: "list", items: ["90 minutes — $175", "120 minutes — $240", "180 minutes — $325"] },
        {
          type: "p",
          spaced: true,
          text: "Specialty work — hot stones, intraoral release, CBD-infused oil — is included where it’s part of the session, not billed separately.",
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
          items: [
            "Stretching and mobility work",
            "Intraoral (jaw) release",
            "Hot stones",
            "CBD-infused oil, where appropriate",
          ],
        },
        {
          type: "p",
          spaced: true,
          text: "These aren’t a menu to choose from in advance. They’re tools I bring in when your body is asking for them — you don’t need to know which ones you’ll need before you arrive.",
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
              a: "Comfortable clothing you can move in. We’ll discuss what’s appropriate to remove, if anything, based on the work.",
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
        { type: "p", text: "[Studio address]\n[City, State ZIP]" },
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
          text: "You don’t need to know what you need before you reach out. If something here didn’t answer your question, send it along — I read every message myself.",
        },
        { type: "email", email: "hello@anthonymassageworks.com", phone: "[phone number]" },
      ],
    },
  ],
  footer: { sub: "Scheduling is on its way.", cta: "See scheduling", ctaHref: "#schedule" },
};
export const INTERIOR_PAGES = [
  APPROACH_PAGE,
  YOUR_SESSION_PAGE,
  THERAPISTS_PAGE,
  THERAPIST_ANTHONY_PAGE,
  THERAPIST_COLE_FRANCIS_PAGE,
  THERAPIST_SONG_YING_PAGE,
  BOOK_PAGE,
];

// The global Footer (rendered once in app/layout.tsx) looks up its per-page
// copy here by pathname, since each interior page overrides the default
// "Book your first session" copy slightly (Book itself swaps in scheduling
// copy entirely).
export const INTERIOR_FOOTER_COPY: Record<string, InteriorFooterOverride> = Object.fromEntries(
  INTERIOR_PAGES.filter((page) => page.footer).map((page) => [page.route, page.footer as InteriorFooterOverride])
);
