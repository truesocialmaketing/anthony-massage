export const PHASE_DOT_LABELS = [
  "Phase 1: Compressed",
  "Phase 2: Light enters",
  "Phase 3: Rising",
  "Phase 4: Open and renewed",
] as const;

export const HOME_EXPERIENCE_FOOTER = {
  position: 9,
  eyebrow: "Final Invitation",
  title: "Ready to imagine feeling different?",
  sub: "I look forward to meeting you, meeting your body where it is, and seeing what’s possible for you.",
  cta: "Book your first session.",
  fine: "Anthony Massage Works — Release. Realign. Renew.",
};

export type HomeStoryBlock =
  | { type: "p"; text: string; spaced?: boolean }
  | { type: "quiet"; text: string }
  | { type: "list"; items: string[] };

export interface HomeStoryChapter {
  id: string;
  /** Colour stop on the scroll spine (exp-pos-*). v39 runs 1, 2, 2b, 3–6, 8. */
  position: string;
  eyebrow: string;
  heading: string;
  blocks: HomeStoryBlock[];
}

// Verbatim from Anthony's v39 index.html — don't reword in place.
export const HOME_EXPERIENCE_SECTIONS: HomeStoryChapter[] = [
  {
    id: "philosophy",
    position: "1",
    eyebrow: "Possibility",
    heading: "Life has a way of settling into the body.",
    blocks: [
      { type: "p", text: "Sometimes it feels like pain." },
      { type: "p", text: "Sometimes it’s tension." },
      { type: "p", text: "Sometimes it’s stress that never quite lets go." },
      { type: "p", text: "Sometimes it’s simply the feeling that your body doesn’t move the way it used to." },
      { type: "p", text: "Whatever brings you here, I’m glad you’re here." },
      {
        type: "p",
        text: "One of the things I’ve come to appreciate over the years is that our bodies are always trying to tell us something. Sometimes they’re asking for rest. Sometimes they’re asking for movement. Sometimes they’re simply asking us to pay attention.",
      },
      {
        type: "p",
        text: "Massage, to me, isn’t just about working on muscles. It’s about listening to what your body has been trying to communicate and helping move you in the direction of your goal.",
      },
      { type: "p", text: "Some people come in hoping to get out of pain." },
      { type: "p", text: "Others want to move more freely." },
      { type: "p", text: "Some simply need a place to slow down for a while." },
      { type: "p", text: "Wherever you’re starting from…" },
      { type: "p", text: "we begin there." },
    ],
  },
  {
    id: "story",
    position: "2",
    eyebrow: "Understanding",
    heading: "Pain has a story.",
    blocks: [
      { type: "p", text: "In my experience, pain is rarely random." },
      { type: "p", text: "Sometimes it follows an injury." },
      { type: "p", text: "Sometimes it’s years of repetitive movement." },
      { type: "p", text: "Sometimes it’s the quiet accumulation of everyday life." },
      { type: "p", text: "The place that hurts isn’t always where the pattern begins." },
      { type: "p", text: "When someone comes in with a sore shoulder, I don’t always start at the shoulder." },
      {
        type: "p",
        text: "I’m interested in understanding how the rest of the body may be contributing to what you’re feeling.",
      },
      { type: "p", text: "Finding those relationships is often where meaningful change begins." },
      { type: "p", text: "That’s one of the things we’ll explore." },
    ],
  },
  {
    id: "known",
    position: "2b",
    eyebrow: "Understanding",
    heading: "I know what it feels like.",
    blocks: [
      {
        type: "p",
        text: "One of the reasons this work means so much to me is that my interest in pain didn’t begin in a classroom.",
      },
      { type: "p", text: "It began by living with it." },
      {
        type: "p",
        text: "For a long time, I lived with pain that changed the way I moved through life. I eventually went to massage school hoping to heal my own body and find a way out of it.",
      },
      { type: "p", text: "Along the way, I discovered something I wasn’t fully expecting." },
      {
        type: "p",
        text: "I developed a deep passion for helping people who are living with pain because I know what it feels like.",
      },
      { type: "p", text: "I know what it’s like to wonder if things will ever feel different." },
      { type: "p", text: "I know that change is possible." },
      { type: "p", text: "That’s the possibility I hold onto for every person who comes to see me." },
    ],
  },
  {
    id: "adapting",
    position: "3",
    eyebrow: "Understanding",
    heading: "Your body is always adapting.",
    blocks: [
      { type: "p", text: "One of the things I find most remarkable is how adaptable the body really is." },
      { type: "p", text: "When movement becomes restricted, the body doesn’t simply stop moving." },
      { type: "p", text: "It finds another way." },
      { type: "p", text: "Other muscles begin helping." },
      { type: "p", text: "Movement patterns slowly change." },
      { type: "p", text: "Over time, those adaptations can become so familiar that they simply feel like you." },
      { type: "p", text: "Until they don’t." },
      { type: "p", text: "Helping your body feel better isn’t usually about forcing change." },
      { type: "p", text: "It’s about helping it rediscover options it may have forgotten were still there." },
    ],
  },
  {
    id: "work",
    position: "4",
    eyebrow: "Understanding",
    heading: "Every body tells a different story.",
    blocks: [
      { type: "p", text: "No two people move the same." },
      { type: "p", text: "No two bodies compensate the same." },
      { type: "p", text: "No two sessions are the same." },
      { type: "p", text: "Every session begins by listening to what your body is presenting that day." },
      { type: "p", text: "From there, the work follows what your body is ready to show us." },
      { type: "p", text: "As things change…" },
      { type: "p", text: "the session changes too." },
      { type: "p", text: "You don’t have to know what’s causing the problem." },
      { type: "p", text: "You don’t have to know the names of the muscles." },
      { type: "p", text: "I’d rather discover it with you." },
    ],
  },
  {
    id: "movement",
    position: "5",
    eyebrow: "Hope",
    heading: "Helping your body move again.",
    blocks: [
      { type: "p", text: "I’m not chasing symptoms." },
      { type: "p", text: "I’m looking for where movement has gradually become restricted." },
      { type: "p", text: "As movement begins returning, people often notice changes they weren’t expecting." },
      { type: "p", text: "Pain begins to ease." },
      { type: "p", text: "Breathing feels easier." },
      { type: "p", text: "Movement requires less effort." },
      { type: "p", text: "Sometimes posture changes." },
      { type: "p", text: "Sometimes sleep improves." },
      { type: "p", text: "Sometimes people simply tell me," },
      { type: "p", text: "“I forgot what this felt like.”" },
      { type: "p", text: "In my experience, the body often knows what to do once it has room to do it." },
      { type: "p", text: "Part of my job is helping create that room." },
    ],
  },
  {
    id: "sessions",
    position: "6",
    eyebrow: "Hope",
    heading: "Making room.",
    blocks: [
      { type: "p", text: "One of the things I’ve learned is that lasting change usually isn’t something we force." },
      { type: "p", text: "It’s something we make room for." },
      { type: "p", text: "Sometimes the work is deep." },
      { type: "p", text: "Sometimes it isn’t." },
      {
        type: "p",
        text: "I’m always working toward the deepest place your body can genuinely receive without guarding.",
      },
      { type: "p", text: "Sometimes the most important thing happening during a session isn’t the pressure at all." },
      {
        type: "p",
        text: "It’s the moment your body realizes it no longer has to keep holding on. When your nervous system softens, the body often becomes more receptive to change.",
      },
      { type: "p", text: "There’s no hurry." },
      {
        type: "p",
        text: "We’ll simply meet your body where it is, listen to what it’s ready to tell us, and go from there.",
      },
    ],
  },
  {
    id: "continues",
    position: "8",
    eyebrow: "Hope",
    heading: "The work doesn’t end when the session does.",
    blocks: [
      { type: "p", text: "Your body continues adapting after you leave." },
      { type: "p", text: "Sometimes the changes are immediate." },
      { type: "p", text: "Sometimes they unfold over the next several days." },
      { type: "p", text: "Each session becomes the starting point for the next." },
      { type: "p", text: "Little by little, your body begins remembering how to move with greater ease again." },
    ],
  },
];

export const HOME_EXPERIENCE_HERO_FRAMES = [
  "/images/hero/frame1.jpg",
  "/images/hero/frame2.jpg",
  "/images/hero/frame3.jpg",
  "/images/hero/frame4.jpg",
];

export const HOME_EXPERIENCE_HERO_FRAMES_ISO = [
  "/images/hero/frame1-iso.jpg",
  "/images/hero/frame2-iso.jpg",
  "/images/hero/frame3-iso.jpg",
  "/images/hero/frame4-iso.jpg",
];

export const HOME_EXPERIENCE_HERO_FRAMES_SPILL = [
  "/images/hero/frame1-spill.jpg",
  "/images/hero/frame2-spill.jpg",
  "/images/hero/frame3-spill.jpg",
  "/images/hero/frame4-spill.jpg",
];
