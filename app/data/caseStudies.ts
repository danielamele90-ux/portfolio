// Full case study content. Text condensed from Daniela's original case studies;
// headings approved in "Copy drafts v2". No em dashes in visible text.

export type Img = { src: string; alt: string; w: number; h: number; caption?: string };

export type Block =
  | { kind: "text"; paragraphs: string[] }
  | { kind: "list"; items: string[]; intro?: string }
  | { kind: "quote"; text: string }
  | { kind: "images"; images: Img[]; cols?: 1 | 2 | 3; caption?: string }
  | { kind: "columns"; columns: { title: string; items: string[] }[] }
  | { kind: "steps"; steps: { title: string; text: string; image?: Img }[] }
  | { kind: "note"; text: string }
  | { kind: "prototype" };

export type Section = {
  label: string;
  heading: string;
  blocks: Block[];
  layout?: "split";
};

export type CaseStudy = { role: string[]; sections: Section[] };

export const caseStudies: Record<string, CaseStudy> = {
  mab: {
    role: [
      "Separated known information from assumptions in the brief",
      "Defined the product direction and testable hypotheses",
      "Designed and iterated the mobile flow; built the prototype",
      "Ran an unmoderated test and interpreted the results",
    ],
    sections: [
      {
        label: "problem.",
        heading: "A 40% drop-off, concentrated around time selection and confirmation",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "The brief reported a 40% drop-off during booking, strongest when users selected a time, reviewed the appointment and confirmed it. The platform had about 247.8K monthly visitors, 75.6% of them on mobile web.",
              "Business target: +10% booking completion.",
            ],
          },
        ],
      },
      {
        label: "understanding the problem.",
        heading: "The brief held assumptions, not evidence",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "The brief didn't explain why people left, and I had no access to users or analytics. So I separated what was known from what was assumed, across business, technology and experience.",
            ],
          },
          {
            kind: "list",
            intro: "Three friction areas emerged:",
            items: [
              "Clarity of progression: users couldn't see the current step, the remaining steps or the outcome.",
              "Continuity: mandatory account creation interrupted the task before the appointment was secured.",
              "Motivation: routine appointments carry little urgency, so the value of finishing now had to be clear.",
            ],
          },
        ],
      },
      {
        label: "product direction.",
        heading: "Book the appointment first; create the account only when it's useful",
        blocks: [
          {
            kind: "columns",
            columns: [
              { title: "Primary job", items: ["Book the appointment"] },
              { title: "Secondary opportunity", items: ["Create an account to manage it"] },
            ],
          },
        ],
      },
      {
        label: "design hypothesis.",
        heading: "Without sign-up blocking them, more first-time users should finish booking",
        blocks: [
          {
            kind: "quote",
            text: "If first-time users can select, review and confirm an appointment through a clear, uninterrupted step-by-step flow, without mandatory account creation, booking completion should improve.",
          },
          {
            kind: "list",
            intro: "Four design requirements:",
            items: [
              "Make progress through the flow explicit",
              "Keep the selected appointment easy to review",
              "One clear primary action per step",
              "Account creation after booking, as an optional way to manage the appointment",
            ],
          },
        ],
      },
      {
        label: "success signals.",
        heading: "Measuring only what a prototype can prove",
        blocks: [
          {
            kind: "list",
            items: [
              "Can users reach confirmation without friction?",
              "Where does abandonment occur?",
              "Do users understand the current and next step?",
              "Do users understand what happens after booking?",
            ],
          },
          { kind: "note", text: "Account conversion stayed a future product metric: the prototype didn't test what happened after the account CTA." },
        ],
      },
      {
        label: "AI exploration.",
        heading: "Two AI tools, one set of requirements: I kept solution B's patterns",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "I gave the same four requirements to two AI prototyping tools, compared the outputs and kept the interaction patterns from solution B as the starting point.",
            ],
          },
          {
            kind: "images",
            cols: 2,
            images: [
              { src: "/images/mab/solution-a.webp", alt: "AI solution A: three booking screens", w: 1600, h: 800, caption: "Solution A" },
              { src: "/images/mab/solution-b.webp", alt: "AI solution B: three booking screens", w: 1600, h: 800, caption: "Solution B, kept" },
            ],
          },
        ],
      },
      {
        label: "designing booking experience.",
        heading: "Guide, don't overwhelm",
        layout: "split",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Make progression visible. A three-step progress indicator reduces disorientation. The selected slot is visually explicit, with one clear Continue action, so the journey feels finite.",
              "Confirm before committing. A structured overview of what matters before confirming. Editable items stay visible, but Confirm is the single primary action: is everything correct before I book?",
              "Complete the user's job before asking for more. Account creation moves after confirmation. The success screen offers: check the confirmation, create an account to manage the appointment, or return home.",
            ],
          },
          { kind: "prototype" },
        ],
      },
      {
        label: "testing.",
        heading: "All 12 valid sessions reached confirmation",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Unmoderated prototype test with 14 participants, asked to book a general appointment as first-time users.",
              "Raw analytics showed a 15% drop-off at time selection. Reviewing the sessions, the two participants behind it hadn't meaningfully engaged with the task, so I classified them as invalid. All 12 valid participants completed the booking.",
              "All four participants who answered the follow-up expected an immediate next step after booking: check their inbox, create an account, or manage the appointment. The confirmation screen already offered these.",
            ],
          },
          {
            kind: "images",
            cols: 1,
            images: [
              {
                src: "/images/mab/test-results.webp",
                alt: "Maze test results across the booking steps",
                w: 1800,
                h: 900,
                caption: "Raw results across all 14 participants (85%). After excluding 2 invalid sessions, 12 of 12 completed.",
              },
            ],
          },
        ],
      },
      {
        label: "validation findings.",
        heading: "A negative metric wasn't a reason to redesign",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Once the invalid sessions were removed, time selection showed no observed friction, so I kept the interaction instead of redesigning it.",
              "Analytics signal → observed behaviour → design decision.",
            ],
          },
        ],
      },
      {
        label: "next steps.",
        heading: "Next: a controlled test against the live flow",
        blocks: [
          { kind: "note", text: "No developer handoff: this was a concept project." },
          {
            kind: "list",
            intro: "An A/B test against the current flow would measure:",
            items: [
              "Booking completion rate and drop-off by step",
              "Time to complete booking",
              "Account creation rate after booking",
              "First-time users returning to manage their appointment",
            ],
          },
        ],
      },
      {
        label: "reflections.",
        heading: "Investigate a metric before reacting to it",
        blocks: [
          {
            kind: "list",
            items: [
              "Separate assumptions from evidence, even in a detailed brief.",
              "Design around the primary user job.",
              "Make success states part of the journey: users still need to know what happens next.",
              "Keeping an interaction unchanged can be as deliberate as redesigning it.",
            ],
          },
        ],
      },
    ],
  },

  "the-morrow-hotel": {
    role: [
      "Led end-to-end design development across teams",
      "Translated spatial intent into manufacturable textile systems",
      "Balanced aesthetic direction with engineering and production constraints",
      "Secured buy-in from internal and external decision-makers",
    ],
    sections: [
      {
        label: "business problem.",
        heading: "One upscale identity across spaces with very different jobs",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "The Morrow is a 203-room upscale lifestyle hotel in the Curio Collection by Hilton, in Washington, D.C.'s NoMa district. It needed a distinctive identity with continuity across private rooms, meeting rooms and shared areas.",
              "Rottet Studio designed the interiors; Loloey had to translate that vision into custom rugs and carpets that also met durability, material, manufacturing and installation requirements.",
            ],
          },
          {
            kind: "images",
            cols: 1,
            images: [{ src: "/images/morrow/lounge.webp", alt: "A lounge at The Morrow Hotel", w: 1400, h: 910 }],
          },
        ],
      },
      {
        label: "business and guest requirements.",
        heading: "The hotel needed coherence; guests needed each space to fit its moment",
        blocks: [
          {
            kind: "columns",
            columns: [
              {
                title: "The hotel",
                items: [
                  "A distinctive upscale identity",
                  "The brand concept translated consistently across spaces",
                  "Custom design balanced with durability and production",
                ],
              },
              {
                title: "The guest",
                items: [
                  "Comfort, character and a clear sense of place",
                  "Moving between functions without losing coherence",
                  "Atmospheres right for rest, work, gathering and transition",
                ],
              },
            ],
          },
        ],
      },
      {
        label: "design hypothesis.",
        heading: "Colour, pattern and texture tuned to the time of day would set spaces apart without breaking coherence",
        blocks: [
          {
            kind: "list",
            items: [
              "Texture: material transitions and density changes support different atmospheres.",
              "Pattern: the slow rhythm of skies, clouds and constellations becomes a shared visual language.",
              "Colour: from lighter to deeper palettes to distinguish moments and functions.",
            ],
          },
        ],
      },
      {
        label: "validation.",
        heading: "Samples and on-site mock-ups reduced risk before full production",
        blocks: [
          {
            kind: "list",
            items: [
              "Pattern feasibility: machine-made and handmade samples tested whether patterns could be reproduced accurately; sample rounds refined the gradients.",
              "Texture and performance: material tests confirmed colour consistency across fibres; density and pile height were checked against hospitality durability.",
              "Spatial colour coherence: samples were compared with the furniture and material palette.",
            ],
          },
        ],
      },
      {
        label: "what we learned.",
        heading: "On-site mock-ups tested colour under the hotel's real lighting",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Testing in place, under the property's actual lighting, checked how the colours responded before manufacturing and installation.",
            ],
          },
        ],
      },
      {
        label: "solution.",
        heading: "Temporal Harmony: one system, four moments of the day",
        blocks: [
          {
            kind: "quote",
            text: "A material and chromatic system designed to align spatial experience with the natural flow of the day.",
          },
        ],
      },
      {
        label: "a system across spatial functions.",
        heading: "Morning to night: each phase sets colour, texture and rhythm",
        blocks: [
          {
            kind: "list",
            items: [
              "Morning: clarity and lightness, for function areas",
              "Midday: fluidity and softness, for suites",
              "Afternoon: warmth and transition, for public areas",
              "Night: depth and contrast, for lobbies",
            ],
          },
          {
            kind: "images",
            cols: 2,
            images: [
              { src: "/images/morrow/ballroom.webp", alt: "Ballroom carpet", w: 768, h: 500, caption: "Ballroom" },
              { src: "/images/morrow/prefunction.webp", alt: "Prefunction area carpet", w: 768, h: 500, caption: "Prefunction" },
              { src: "/images/morrow/suite.webp", alt: "Suite with custom rug", w: 768, h: 500, caption: "Suite" },
              { src: "/images/morrow/public-areas.webp", alt: "Public area with custom rug", w: 768, h: 500, caption: "Public areas" },
            ],
          },
        ],
      },
      {
        label: "how color supports different spatial functions.",
        heading: "Lighter for openness, deeper for evening immersion",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Lighter tones support openness in function areas, softer transitions create a restorative character in suites, warmer accents bring intimacy to shared spaces, and deeper contrasts make evening environments immersive. Distinct spaces stay connected without the hotel feeling uniform.",
            ],
          },
          {
            kind: "images",
            cols: 2,
            images: [
              { src: "/images/morrow/living-room.webp", alt: "Suite living room with blue rug", w: 1400, h: 933 },
              { src: "/images/morrow/living-room-2.webp", alt: "Suite living room, second view", w: 1400, h: 1120 },
            ],
          },
        ],
      },
      {
        label: "from empty space to lived environment.",
        heading: "From unfinished rooms to a calm, flexible setting",
        blocks: [
          {
            kind: "images",
            cols: 2,
            images: [
              { src: "/images/morrow/before.webp", alt: "Function area before installation", w: 588, h: 673, caption: "Before" },
              { src: "/images/morrow/after.webp", alt: "Function area in use after installation", w: 588, h: 673, caption: "After" },
            ],
          },
        ],
      },
      {
        label: "manufacturing and delivery.",
        heading: "Handmade and machine-made production in China and India, one quality standard",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Production needed close coordination between design, engineering and manufacturing partners, to keep colour gradation, texture precision and quality consistent across production methods.",
            ],
          },
          { kind: "note", text: "No post-launch guest data was collected." },
        ],
      },
      {
        label: "reflections.",
        heading: "Designing the rules, not just the objects",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "The time-based framework gave the team a clear decision system for differentiating spaces while keeping one design language. Turning it into physical products meant constant negotiation between creative intent, spatial context, material performance and manufacturing feasibility.",
              "It strengthened my systems thinking: designing the rules, relationships and validation that keep an experience coherent at scale.",
            ],
          },
        ],
      },
    ],
  },
};
