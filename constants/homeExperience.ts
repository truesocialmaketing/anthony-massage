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
  sub: "If you're curious what your body has been trying to tell you, I'd love to help you begin listening.",
  cta: "Book your first session.",
  fine: "Anthony Massage Works — Release. Realign. Renew.",
};

export type HomeStoryBlock =
  | { type: "p"; text: string; spaced?: boolean }
  | { type: "quiet"; text: string }
  | { type: "list"; items: string[] };

export interface HomeStoryChapter {
  id: string;
  position: number;
  eyebrow: string;
  heading: string;
  blocks: HomeStoryBlock[];
}

export const HOME_EXPERIENCE_SECTIONS: HomeStoryChapter[] = [
  {
    id: "philosophy",
    position: 1,
    eyebrow: "Possibility",
    heading: "Life has a way of changing the body.",
    blocks: [
      { type: "p", text: "Stress. Injury. Repetitive movement. Long hours at a desk. Years of adapting." },
      { type: "p", text: "Over time, those patterns can become restriction." },
      {
        type: "p",
        text: "Restriction can become pain. Pain can begin to shape the way you move through everyday life.",
      },
      { type: "p", text: "The goal isn't simply to help you feel better today." },
      { type: "p", text: "It's to help you move toward lasting change." },
    ],
  },
  {
    id: "story",
    position: 2,
    eyebrow: "Understanding",
    heading: "Pain has a story.",
    blocks: [
      { type: "p", text: "Pain is rarely random. The place that hurts isn't always where the problem begins." },
      {
        type: "p",
        text: "A shoulder can become restricted because of the chest. A headache may begin in the neck or jaw. Persistent low back pain often has roots in the hips, legs, or years of compensation.",
      },
      { type: "p", text: "Finding where the pattern begins is often the first step toward changing it." },
    ],
  },
  {
    id: "adapting",
    position: 3,
    eyebrow: "Understanding",
    heading: "Your body is always adapting.",
    blocks: [
      {
        type: "p",
        text: "The body is remarkably intelligent. When movement becomes restricted, it doesn't simply stop moving. It adapts.",
      },
      { type: "p", text: "Other muscles begin working harder. Posture changes. Movement patterns shift." },
      { type: "p", text: "Over time, those compensations become so familiar they begin to feel normal." },
      { type: "p", text: "Until they don't." },
    ],
  },
  {
    id: "work",
    position: 4,
    eyebrow: "Understanding",
    heading: "Every body tells a different story.",
    blocks: [
      { type: "p", text: "No two people move the same." },
      { type: "p", text: "No two bodies compensate the same." },
      { type: "p", text: "No two sessions should be the same." },
      {
        type: "p",
        text: "Rather than following a routine, each session begins by listening to how your body moves today.",
      },
      { type: "p", text: "From there, the work follows the restriction." },
      { type: "p", text: "As your body changes, the session changes with it." },
    ],
  },
  {
    id: "movement",
    position: 5,
    eyebrow: "Hope",
    heading: "Helping your body move again.",
    blocks: [
      { type: "p", text: "The goal isn't to chase symptoms." },
      { type: "p", text: "It's to restore movement where it has gradually become restricted." },
      { type: "p", text: "As movement begins returning, many people notice changes they weren't expecting." },
      { type: "p", text: "Less pain." },
      { type: "p", text: "Easier breathing." },
      { type: "p", text: "Greater mobility." },
      { type: "p", text: "Improved posture." },
      { type: "p", text: "A sense that everyday movement requires less effort." },
      { type: "quiet", text: "The body often knows what to do once it has room to do it." },
    ],
  },
  {
    id: "sessions",
    position: 6,
    eyebrow: "Hope",
    heading: "What a session feels like.",
    blocks: [
      { type: "p", text: "This isn't rushed work." },
      { type: "p", text: "It's thoughtful." },
      { type: "p", text: "Specific." },
      { type: "p", text: "Patient." },
      { type: "p", text: "Sometimes gentle." },
      { type: "p", text: "Sometimes deep." },
      { type: "p", text: "Always intentional." },
      { type: "p", text: "Every technique has a purpose." },
      { type: "p", text: "Every decision is guided by what your body is asking for." },
      { type: "p", text: "The goal isn't to force change." },
      { type: "p", text: "It's to create the conditions where change can happen." },
    ],
  },
  {
    id: "conditions",
    position: 7,
    eyebrow: "Hope",
    heading: "Conditions I commonly work with.",
    blocks: [
      { type: "p", text: "Many people come in because something simply isn't moving the way it used to." },
      { type: "p", text: "Common reasons include:" },
      {
        type: "list",
        items: [
          "Neck and shoulder pain",
          "Headaches",
          "Low back pain",
          "Hip restriction",
          "Sciatica",
          "Jaw tension",
          "Postural strain",
          "Athletic recovery",
          "Limited mobility",
          "Stress and nervous system overload",
        ],
      },
      { type: "p", text: "If your experience isn't listed, that's okay.", spaced: true },
      { type: "p", text: "The body doesn't organize itself into categories." },
      { type: "p", text: "People don't either." },
    ],
  },
  {
    id: "continues",
    position: 8,
    eyebrow: "Hope",
    heading: "The work doesn't end when the session does.",
    blocks: [
      { type: "p", text: "Your body continues adapting after you leave." },
      { type: "p", text: "Sometimes the changes are immediate." },
      { type: "p", text: "Sometimes they unfold over the next several days." },
      { type: "p", text: "Each session becomes the starting point for the next." },
      { type: "p", text: "The goal isn't temporary relief." },
      { type: "p", text: "It's helping your body remember how to move with greater ease again." },
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
  "/images/hero/frame4-spill-1.png",
];

export const HOME_EXPERIENCE_HERO_FRAMES_SPILL = [
  "/images/hero/frame1-spill.jpg",
  "/images/hero/frame2-spill.jpg",
  "/images/hero/frame3-spill.jpg",
  "/images/hero/frame4-spill-1.png",
];
