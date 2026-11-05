"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, useLayoutEffect, useRef, useState } from "react";

const ROLE = ["Product", "Designer"];
const REST = " focused on complex user journeys";
const LETTERS = ROLE.join("").split("");
const COUNT = LETTERS.length;

// Timing (seconds). Total ≈ 3.9 s; about 3 letters in flight at once, so it reads.
const ARRIVE = 0.5; // letters appear, upright, in shuffled slots
const STAGGER = 0.2; // gap between letters moving into place, left to right
const MOVE = 0.6; // each letter's move into its own slot

// Fixed shuffle so server and client agree; no letter starts in its own slot.
function shuffled(n: number) {
  const order = Array.from({ length: n }, (_, i) => i);
  let seed = 7;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  for (let i = 0; i < n; i++) {
    if (order[i] === i) {
      const k = (i + 1) % n;
      [order[i], order[k]] = [order[k], order[i]];
    }
  }
  return order;
}
const ORDER = shuffled(COUNT);

type Offset = { x: number; y: number };

export function HeroTitle() {
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [offsets, setOffsets] = useState<Offset[] | null>(null);
  const [interactive, setInteractive] = useState(false);

  // Letters wait upright and shuffled on a row just above the title, then drop
  // into their own slot one by one, left to right, so the word reads as it forms.
  useLayoutEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !titleRef.current) return;
      const box = titleRef.current.getBoundingClientRect();
      const rects = refs.current.map((el) => el!.getBoundingClientRect());
      const lineHeight = rects[0].height;
      const rowY = rects[0].top - lineHeight * 1.05 + lineHeight / 2;
      const slotWidth = box.width / COUNT;
      setOffsets(
        rects.map((r, i) => ({
          x: box.left + (ORDER[i] + 0.5) * slotWidth - (r.left + r.width / 2),
          y: rowY - (r.top + r.height / 2),
        })),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  const ready = reduceMotion || offsets !== null;
  let index = 0;

  return (
    <h1
      ref={titleRef}
      className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
      <span className="sr-only">Product Designer</span>
      <span aria-hidden className="text-primary">
        {ROLE.map((word, w) => (
          <Fragment key={word}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char) => {
                const i = index++;
                const o = offsets?.[i];
                const start = ARRIVE + i * STAGGER;
                const total = start + MOVE;
                const canDrag = interactive || !!reduceMotion;

                return (
                  <motion.span
                    key={`${char}-${i}-${o ? "go" : "wait"}`}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    className={`inline-block select-none ${canDrag ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
                    style={{ opacity: ready ? undefined : 0 }}
                    initial={o ? { x: o.x, y: o.y - 12, opacity: 0 } : false}
                    animate={
                      o
                        ? {
                            x: [o.x, o.x, o.x, 0],
                            y: [o.y - 12, o.y, o.y, 0],
                            opacity: [0, 1, 1, 1],
                          }
                        : undefined
                    }
                    transition={
                      o
                        ? {
                            duration: total,
                            times: [0, ARRIVE / total, start / total, 1],
                            ease: ["easeOut", "linear", "backOut"],
                          }
                        : undefined
                    }
                    onAnimationComplete={
                      o && i === COUNT - 1 ? () => setInteractive(true) : undefined
                    }
                    drag={canDrag}
                    dragSnapToOrigin
                    dragElastic={0.6}
                    whileDrag={{ scale: 1.12 }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
            {w === 0 ? " " : null}
          </Fragment>
        ))}
      </span>
      {REST}
    </h1>
  );
}
