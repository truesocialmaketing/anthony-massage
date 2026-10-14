// Verbatim from Anthony's v39 your-body.html — don't reword in place.
// Icons are the inner markup of the original 24×24 line-art SVGs.

export interface BodyRecognition {
  phrase: string;
  threshold: string;
  lead: string;
  paragraphs: string[];
  quote: string;
}

export interface BodyRegion {
  title: string;
  icon: string;
  label: string;
  recognitions: BodyRecognition[];
}

export interface LibraryShelf {
  title: string;
  icon: string;
  note: string;
  topics: { name: string; desc: string }[];
}

export const YOUR_BODY_INTRO = {
  title: "Your body",
  paragraphs: [
    "Pain is rarely a single event. More often, it’s the result of patterns that develop over time.",
    "Below are some of the ways people describe what they’re experiencing. You may recognize part of your own story.",
  ],
  whisper: "Wherever you are in your journey, you’re in the right place.",
};

export const BODY_REGIONS: BodyRegion[] = [
  {
    title: "Neck & Shoulders",
    icon: '<circle cx="12" cy="6" r="3"/><path d="M6 21c0-4 2.5-7 6-7s6 3 6 7"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "My shoulders always feel tight.",
        threshold: "What this often means",
        lead: "Shoulders that never quite release are usually holding more than muscle. They tend to carry the shape of long days — leaning toward a screen, bracing against stress, staying a little on guard.",
        paragraphs: [
          "Over time, that holding can start to feel like simply who you are, rather than something the body took on and can set down.",
        ],
        quote:
          "Every body is different, and this may not be exactly what’s happening for you. But if it feels familiar, there is often more room to change than it currently feels like.",
      },
      {
        phrase: "I can’t turn my head very far.",
        threshold: "What this often means",
        lead: "When looking over your shoulder feels limited, the neck usually isn’t the whole story. The upper back and shoulder blades share that rotation, and when they stiffen, the neck is asked to do more than its share.",
        paragraphs: [
          "The restriction you feel in one place is frequently being shaped by something nearby that’s stopped contributing.",
        ],
        quote:
          "This is only one way it can go, and your body may be telling a different story. But movement that feels lost is often movement that can be found again.",
      },
      {
        phrase: "The headaches keep coming back.",
        threshold: "What this often means",
        lead: "Recurring tension headaches often trace to the base of the skull, the neck, and the jaw. Tightness there can refer upward, and the pattern can quietly repeat until the surrounding tension finally has somewhere to go.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be what’s happening for you. But patterns that keep returning are often patterns that can be interrupted.",
      },
      {
        phrase: "I wake up stiff every morning.",
        threshold: "What this often means",
        lead: "Mornings can reveal what the day has been holding. A body that spends its waking hours braced doesn’t always know how to fully rest, and stiffness on waking can be the echo of that unspent tension.",
        paragraphs: [],
        quote:
          "This may not be exactly your experience. But ease in the morning is often more possible than it seems from inside the stiffness.",
      },
      {
        phrase: "It feels like I’m carrying the world on my shoulders.",
        threshold: "What this often means",
        lead: "Sometimes the phrase we reach for is the most honest map. Shoulders that feel weighed down are often carrying stress, posture, and long days all at once — the body keeping a quiet record of what we’ve been through.",
        paragraphs: [],
        quote:
          "Your experience is your own, and this is only one path. But a load the body has learned to carry is a load it can also learn to release.",
      },
    ],
  },
  {
    title: "Low Back",
    icon: '<path d="M12 3v18"/><path d="M8 8c0 3 8 5 8 8"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "It hurts until I get moving.",
        threshold: "What this often means",
        lead: "Pain that eases once you’re up and moving often points to a back that stiffens at rest rather than one harmed by movement. The first steps are the hardest because the tissue hasn’t yet remembered how to move freely that day.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be your story. But a back that loosens with movement is often a back with more capacity than the morning suggests.",
      },
      {
        phrase: "My low back tightens after sitting.",
        threshold: "What this often means",
        lead: "Long hours of sitting ask the hips and low back to hold one shape for a long time. The tightness afterward is often less about weakness and more about a body waiting to be let out of a position it’s been keeping.",
        paragraphs: [],
        quote:
          "This is only one possibility, and your body may be saying something else. But tension built from stillness often responds to the right kind of movement.",
      },
      {
        phrase: "I feel it more on one side.",
        threshold: "What this often means",
        lead: "One-sided pain often carries a story of balance — a way the body has learned to favor, compensate, or protect. The side that hurts isn’t always the side that started it.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be exactly what’s happening. But patterns of imbalance are often patterns that can gently rebalance.",
      },
    ],
  },
  {
    title: "Hips",
    icon: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "My hips feel tight when I stand up.",
        threshold: "What this often means",
        lead: "Hips that feel locked on standing are often responding to hours spent folded in a chair. The muscles at the front of the hip shorten to that position, and standing asks them to lengthen again before they’re ready.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be your story. But a hip that’s adapted to sitting can usually re-learn a fuller range.",
      },
      {
        phrase: "Something catches or pinches in front.",
        threshold: "What this often means",
        lead: "A catch at the front of the hip is often less about the joint itself and more about how the surrounding muscles are sharing the work. When some go quiet, others grip, and the movement stops feeling smooth.",
        paragraphs: [],
        quote:
          "This is only one possibility. But when the load is shared more evenly, a hip that catches often begins to glide again.",
      },
      {
        phrase: "My hips feel uneven.",
        threshold: "What this often means",
        lead: "A sense of unevenness in the hips usually reflects a pattern the whole body is holding — the way you stand, carry, or favor one side. The hips are often reporting a story that begins elsewhere.",
        paragraphs: [],
        quote:
          "Your body may be telling a different story than this one. But patterns of holding, once noticed, are often patterns that can ease.",
      },
    ],
  },
  {
    title: "Knees",
    icon: '<path d="M9 3v6l-2 6 3 6"/><path d="M15 3v6l2 6-3 6"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "My knee hurts going down stairs.",
        threshold: "What this often means",
        lead: "Pain on the way down stairs often has less to do with the knee alone and more with how the hip and ankle are sharing the descent. When they don’t take their part, the knee absorbs the difference.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be your story. But a knee that’s been absorbing extra load often eases when the load is redistributed.",
      },
      {
        phrase: "It aches after I’ve been still.",
        threshold: "What this often means",
        lead: "A knee that aches after stillness and eases with gentle movement is often asking for circulation and motion rather than rest. Joints are nourished by moving, and a little tends to go a long way.",
        paragraphs: [],
        quote:
          "This is only one possibility. But an ache that softens with movement often has more room to improve than it first suggests.",
      },
      {
        phrase: "My knees feel weak or unsteady.",
        threshold: "What this often means",
        lead: "A sense of the knee giving way is often about coordination as much as strength — the muscles around the joint not quite firing in time. The body can be strong and still feel unsteady if the timing is off.",
        paragraphs: [],
        quote: "Your experience is your own. But steadiness is often something the body can relearn, step by step.",
      },
    ],
  },
  {
    title: "Headaches & Jaw",
    icon: '<circle cx="12" cy="9" r="4"/><path d="M8 21v-3a4 4 0 018 0v3"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "I clench my jaw without noticing.",
        threshold: "What this often means",
        lead: "Clenching is often the body’s quiet response to stress, held in one of its strongest muscles. It can run all day beneath awareness, and the jaw, temples, and neck can all keep the tab.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be your story. But tension held out of habit is often tension that can be unlearned.",
      },
      {
        phrase: "The pain sits behind my eyes or temples.",
        threshold: "What this often means",
        lead: "Tension that gathers at the temples and behind the eyes frequently begins lower — in the neck and jaw — and refers upward along familiar lines. Where it hurts and where it begins are often not the same place.",
        paragraphs: [],
        quote: "This is only one way it can go. But when the source eases, the pattern above it often quiets too.",
      },
      {
        phrase: "My jaw clicks or feels tight.",
        threshold: "What this often means",
        lead: "A jaw that clicks or tires easily is often carrying uneven tension in the muscles that move it. The joint is small and works constantly, and small imbalances there can be surprisingly loud.",
        paragraphs: [],
        quote:
          "Your body may be telling a different story. But a jaw held in tension is often one that can learn to rest.",
      },
    ],
  },
  {
    title: "Stress & Recovery",
    icon: '<path d="M12 21C7 17 3 13 3 8.5A3.5 3.5 0 0112 6a3.5 3.5 0 019 2.5C21 13 17 17 12 21z"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "I can’t seem to fully relax.",
        threshold: "What this often means",
        lead: "When rest never quite arrives, the nervous system is often still running in a low, protective gear. The body can look still and stay braced, waiting for a signal that it’s safe to let go.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be your story. But the state of holding on is one the body can be helped to leave.",
      },
      {
        phrase: "I hold my stress in my body.",
        threshold: "What this often means",
        lead: "Stress rarely stays an idea. It settles into the shoulders, the jaw, the breath — the body carrying what the mind hasn’t set down. Over time those places can hold tension long after the reason has passed.",
        paragraphs: [],
        quote: "This is only one path. But tension the body is holding is tension it can also be invited to release.",
      },
      {
        phrase: "I’m tired but I sleep poorly.",
        threshold: "What this often means",
        lead: "Being tired yet sleeping poorly often points to a system that hasn’t fully downshifted. When the body stays subtly activated, deep rest is harder to reach even when you long for it.",
        paragraphs: [],
        quote:
          "Your experience is your own. But as the body softens, deeper rest often becomes more available than it has felt.",
      },
    ],
  },
  {
    title: "Athletic Performance",
    icon: '<path d="M4 18l5-9 3 4 3-7 5 12"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "I keep getting the same injury.",
        threshold: "What this often means",
        lead: "An injury that keeps returning to the same place is often a sign that the underlying pattern was never fully addressed — the tissue healed, but the load that strained it kept arriving the same way.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be your story. But a recurring injury often eases once the pattern beneath it changes.",
      },
      {
        phrase: "One side is stronger or looser than the other.",
        threshold: "What this often means",
        lead: "Side-to-side differences are common in bodies that train, and they aren’t inherently a problem — until one side quietly takes on work the other has stopped doing. Then the imbalance starts to cost something.",
        paragraphs: [],
        quote:
          "This is only one possibility. But asymmetries the body has built are often ones it can be helped to even out.",
      },
      {
        phrase: "I feel restricted at the end of my range.",
        threshold: "What this often means",
        lead: "A hard stop at the end of a movement is often the body protecting a range it doesn’t fully trust. The restriction can be less about tight tissue and more about a nervous system guarding the edge.",
        paragraphs: [],
        quote:
          "Your body may be telling a different story. But range that’s being guarded can often be opened as trust returns.",
      },
    ],
  },
  {
    title: "Mobility",
    icon: '<path d="M3 12c3-4 15-4 18 0M3 12c3 4 15 4 18 0"/>',
    label: "People often describe",
    recognitions: [
      {
        phrase: "I don’t move like I used to.",
        threshold: "What this often means",
        lead: "The sense of moving less freely than before is rarely one big change. It’s usually many small adaptations, layered quietly over years, until the body’s range has narrowed without a single moment to point to.",
        paragraphs: [],
        quote:
          "Every body is different, and this may not be your story. But range lost gradually can often be regained gradually too.",
      },
      {
        phrase: "I feel stiff getting up and down.",
        threshold: "What this often means",
        lead: "Stiffness moving between the floor and standing often reflects ranges the body has simply stopped visiting. What we don’t ask of the body regularly, it slowly stops offering — not from damage, but from disuse.",
        paragraphs: [],
        quote:
          "This is only one possibility. But ranges the body has set aside are often ones it can be invited back into.",
      },
      {
        phrase: "I want to stay ahead of aging.",
        threshold: "What this often means",
        lead: "Wanting to keep moving well isn’t about fighting age — it’s about keeping the ranges and ease you already have. Much of what we call aging is really accumulated holding that was never cleared.",
        paragraphs: [],
        quote:
          "Your path is your own. But maintaining ease is often more possible, and simpler, than it’s made to seem.",
      },
    ],
  },
];

export const BODY_LIBRARY = {
  eyebrow: "A growing library",
  title: "Learning about your body",
  leads: [
    "Understanding what your body is doing can be its own kind of relief. These are the things I find myself explaining most often, gathered in one place.",
    "None of it is required reading. It’s here if you’re curious.",
  ],
  foot: "This library is still growing. I add to it as I go.",
  shelves: [
    {
      title: "How the body works",
      icon: '<circle cx="12" cy="5" r="2.4"/><path d="M12 7.4v6.2"/><path d="M7.8 10.2h8.4"/><path d="M10 13.6L8.4 20"/><path d="M14 13.6L15.6 20"/>',
      note: "The basics, in the same plain language I’d use on the table.",
      topics: [
        { name: "Anatomy", desc: "The structures involved, and what each one actually does." },
        {
          name: "Fascia",
          desc: "The connective tissue that wraps and links everything, and why it shapes how you move.",
        },
        { name: "How patterns form", desc: "Why discomfort in one place so often begins somewhere else." },
      ],
    },
    {
      title: "Practices",
      icon: '<path d="M12 4v9"/><path d="M12 13c0 4-1.8 6.4-4.6 6.4S4 16.6 4 13.6c0-2.4.9-4.2 2.2-5.2"/><path d="M12 13c0 4 1.8 6.4 4.6 6.4S20 16.6 20 13.6c0-2.4-.9-4.2-2.2-5.2"/>',
      note: "Small things that help between sessions.",
      topics: [
        { name: "Breathing", desc: "How breath changes what the nervous system is doing." },
        { name: "Walking", desc: "The most underrated thing most of us can do for our bodies." },
        { name: "Mobility", desc: "Gentle ways to keep the range you already have." },
        { name: "Self-care at home", desc: "What to reach for when something tightens up." },
      ],
    },
    {
      title: "Reading and watching",
      icon: '<path d="M12 6.5C10.4 5.2 8.4 4.6 4.5 4.6V18c3.9 0 5.9.6 7.5 1.9"/><path d="M12 6.5c1.6-1.3 3.6-1.9 7.5-1.9V18c-3.9 0-5.9.6-7.5 1.9"/><path d="M12 6.5v13.4"/>',
      note: "Longer pieces, for when you want to go further.",
      topics: [
        { name: "Articles", desc: "Written pieces on the questions that come up most." },
        { name: "Videos", desc: "Short demonstrations you can follow along with." },
        { name: "Research", desc: "What the evidence says, without the jargon." },
      ],
    },
    {
      title: "Common questions",
      icon: '<circle cx="12" cy="12" r="8.6"/><path d="M9.7 9.6a2.4 2.4 0 014.6.8c0 1.7-2.3 2-2.3 3.6"/><path d="M12 17.2h.01"/>',
      note: "The questions I hear most, answered plainly.",
      topics: [
        { name: "Before your first session", desc: "What to expect, what to wear, what to bring." },
        { name: "About the work itself", desc: "How it feels, whether it hurts, how long it takes." },
        { name: "Between sessions", desc: "How often to come in, and what helps in the meantime." },
      ],
    },
  ] as LibraryShelf[],
};

export const BODY_CLOSING_LINES = [
  "Your experience is unique, and it may not fit neatly into any category.",
  "Whatever brings you here, we’ll meet your body where it is",
  "and discover the next right step — together.",
];

export const BLOOM_LABEL = "Opening is possible";
export const BLOOM_HINT = "tap anywhere to return";
