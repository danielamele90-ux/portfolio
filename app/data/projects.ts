export type Summary = {
  status: string;
  problem: string;
  decision: string;
  result: string;
  visual: string;
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  title: string;
  line: string;
  tags: string[];
  summary?: Summary;
  placeholder?: string;
};

export const projects: Project[] = [
  {
    slug: "the-morrow-hotel",
    name: "The Morrow Hotel",
    title: "One flooring system for a 203-room hotel",
    line: "Translated a hotel's time-of-day concept into custom rugs and carpets for every type of space — the interior won Interior Design's 2023 Best of Year.",
    tags: ["Real client", "Systems", "Hospitality"],
    summary: {
      status: "Real client work · Textile Design Prime at Loloey, with Rottet Studio",
      problem:
        "A 203-room Curio Collection by Hilton hotel in Washington, D.C. needed a distinctive upscale identity that stayed coherent across rooms, suites, lobbies and event spaces — in custom rugs and carpets that also had to meet hospitality durability and large-scale production.",
      decision:
        "One system instead of one-off rugs: a time-of-day framework (morning → night) set colour, pattern and texture for each type of space.",
      result:
        "A production-ready flooring system, manufactured in China and India after sampling rounds and on-site mock-ups. The hotel interior won Interior Design's 2023 Best of Year (Boutique Hotel).",
      visual: "The four time-of-day palettes",
    },
  },
  {
    slug: "mab",
    name: "MAB — Medical booking",
    title: "Book first, account later",
    line: "Redesigned a medical booking flow with a 40% drop-off: all 12 valid testers reached confirmation.",
    tags: ["Concept", "AI-assisted prototyping", "Live prototype"],
    summary: {
      status: "Concept project · Solo · AI-assisted prototyping",
      problem:
        "A medical booking platform (fictional brief) lost 40% of users during booking, around time-slot selection and confirmation. Mandatory account creation interrupted first-time users before they had secured an appointment.",
      decision:
        "Book first, account later. A 3-step flow (select → review → confirm) with one primary action per step; account creation moved after confirmation and framed as a benefit.",
      result:
        "Unmoderated test with 14 participants: all 12 valid sessions reached confirmation.",
      note: "A directional signal only — no control group, and account conversion was not measured.",
      visual: "Select · Review · Confirm",
    },
  },
  {
    slug: "meetfit",
    name: "MeetFIT",
    title: "Fitness as a shared experience",
    line: "Shaped a community-driven service for a gym chain losing members, tested across digital booking and the real-world activity.",
    tags: ["Educational project", "Service journey", "Mobile"],
    placeholder:
      "This case study is being rebuilt around an AI-assisted live prototype of the booking experience.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
