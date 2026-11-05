"use client";

import Link from "next/link";
import { MotionConfig, motion } from "motion/react";

// Each icon plays once when it scrolls into view. MotionConfig skips the
// movement for visitors with reduced motion turned on.
const inView = { once: true, amount: 0.6 } as const;

function CroppedIcon() {
  // Noise around one shape; crop marks close in and the noise fades away.
  const noise = [
    { x: 6, y: 8, w: 6, h: 4 },
    { x: 36, y: 6, w: 5, h: 6 },
    { x: 4, y: 34, w: 7, h: 5 },
    { x: 38, y: 36, w: 5, h: 5 },
  ];
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className="size-20"
      initial="start"
      whileInView="end"
      viewport={inView}
    >
      {noise.map((n) => (
        <motion.rect
          key={`${n.x}-${n.y}`}
          x={n.x}
          y={n.y}
          width={n.w}
          height={n.h}
          rx={1}
          className="fill-muted"
          variants={{ start: { opacity: 0.6 }, end: { opacity: 0 } }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      ))}
      <rect
        x={18}
        y={18}
        width={12}
        height={12}
        rx={2}
        className="fill-primary"
      />
      {[
        { d: "M14 20 V14 H20", from: { x: -8, y: -8 } },
        { d: "M28 14 H34 V20", from: { x: 8, y: -8 } },
        { d: "M34 28 V34 H28", from: { x: 8, y: 8 } },
        { d: "M20 34 H14 V28", from: { x: -8, y: 8 } },
      ].map((c) => (
        <motion.path
          key={c.d}
          d={c.d}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          className="stroke-primary"
          variants={{ start: c.from, end: { x: 0, y: 0 } }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </motion.svg>
  );
}

function SignedIcon() {
  // A hesitant scribble fades while a confident wave is drawn over a baseline.
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className="size-20"
      initial="start"
      whileInView="end"
      viewport={inView}
    >
      <line
        x1={4}
        y1={36}
        x2={44}
        y2={36}
        strokeWidth={1.5}
        className="stroke-surface"
      />
      <motion.path
        d="M4 24 L9 21 L12 27 L17 20 L21 26 L26 22 L30 28 L35 21 L39 25 L44 23"
        fill="none"
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="stroke-muted"
        variants={{ start: { opacity: 0.6 }, end: { opacity: 0 } }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M4 24 C9 14, 14 14, 17 24 S 25 34, 30 24 S 39 14, 44 24"
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        className="stroke-primary"
        variants={{ start: { pathLength: 0 }, end: { pathLength: 1 } }}
        transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
      />
    </motion.svg>
  );
}

function TruedIcon() {
  // Scattered points settle onto one line, evenly spaced.
  const offsets = [-14, 6, -20, -6, -16];
  return (
    <motion.svg
      viewBox="0 0 48 48"
      className="size-20"
      initial="start"
      whileInView="end"
      viewport={inView}
    >
      <line
        x1={4}
        y1={34}
        x2={44}
        y2={34}
        strokeWidth={2}
        className="stroke-primary"
      />
      {offsets.map((dy, i) => (
        <motion.circle
          key={i}
          cx={6 + i * 9}
          cy={34}
          r={2.5}
          className="fill-primary"
          variants={{ start: { y: dy }, end: { y: 0 } }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "backOut" }}
        />
      ))}
    </motion.svg>
  );
}

const principles = [
  {
    Icon: CroppedIcon,
    word: "Cropped",
    title: "Remove the noise",
    text: "Identify what matters most. Uncover user needs, friction points, and behavioural patterns across complex journeys.",
    tagline: "From complexity to clarity.",
    project: { label: "MAB", href: "/work/mab" },
  },
  {
    Icon: SignedIcon,
    word: "Signed",
    title: "Make intentional decisions",
    text: "Shape a clear direction by connecting user needs, business priorities, and design decisions.",
    tagline: "From insights to intention.",
    project: { label: "The Morrow Hotel", href: "/work/the-morrow-hotel" },
  },
  {
    Icon: TruedIcon,
    word: "Trued",
    title: "Bring everything into alignment",
    text: "Align touchpoints, interactions, and stakeholders to create coherent end-to-end experiences.",
    tagline: "From fragmented to connected.",
    project: { label: "MeetFIT", href: "/work/meetfit" },
  },
];

export function HowIWork() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="how-i-work"
        aria-labelledby="how-i-work-title"
        className="border-t border-surface py-24 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-muted">
          How I work
        </p>
        <h2
          id="how-i-work-title"
          className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl"
        >
          From complexity to connected experiences.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Three words built from the letters of Product Designer.
        </p>
        <ol className="mt-14 grid gap-14 md:grid-cols-3 md:gap-10">
          {principles.map(
            ({ Icon, word, title, text, tagline, project }, i) => (
              <li key={word} className="flex flex-col items-center">
                <Icon />
                <p className="mt-6 text-sm text-muted">0{i + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">
                  <span className="uppercase tracking-wide text-primary">
                    {word}
                  </span>
                </h3>
                <p className="mt-1 font-semibold">{title}</p>
                <p className="mt-3 max-w-xs leading-relaxed text-muted">
                  {text}
                </p>
                <p className="mt-3 text-sm text-muted">
                  {tagline}
                  <br />
                  See it in{" "}
                  <Link
                    href={project.href}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {project.label}
                  </Link>
                </p>
              </li>
            ),
          )}
        </ol>
      </section>
    </MotionConfig>
  );
}
