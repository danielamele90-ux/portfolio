"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, useState } from "react";

const ROLE = ["Product", "Designer"];
const REST = " focused on complex user journeys";

// Deterministic pseudo-random per letter, so server and client render the same.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const INTRO_DURATION = 2.4; // seconds: fall (~40%), pause, then fall into order

export function HeroTitle() {
  const reduceMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  let index = 0;

  return (
    <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
      <span className="sr-only">Product Designer</span>
      <span aria-hidden className="text-primary">
        {ROLE.map((word, w) => (
          <Fragment key={word}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char) => {
                const i = index++;
                const r1 = rand(i + 1);
                const r2 = rand(i + 101);
                const r3 = rand(i + 201);
                const startY = -260 - r1 * 220; // above the title
                const restY = 4 + r2 * 18; // scattered on the line after landing
                const dx = (r3 - 0.5) * 70;
                const rot1 = (r1 - 0.5) * 120;
                const rot2 = (r2 - 0.5) * 50;
                const isLast = i === 14;

                return (
                  <motion.span
                    key={`${char}-${i}`}
                    className={`inline-block select-none ${interactive ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
                    initial={
                      reduceMotion
                        ? false
                        : { y: startY, x: dx, rotate: rot1, opacity: 0 }
                    }
                    animate={{
                      y: reduceMotion ? 0 : [startY, restY, restY, 0],
                      x: reduceMotion ? 0 : [dx, dx * 0.7, dx * 0.7, 0],
                      rotate: reduceMotion ? 0 : [rot1, rot2, rot2, 0],
                      opacity: 1,
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: INTRO_DURATION,
                            delay: i * 0.035,
                            times: [0, 0.38, 0.55, 1],
                            ease: ["easeIn", "linear", "backOut"],
                            opacity: { duration: 0.2, delay: i * 0.035 },
                          }
                    }
                    onAnimationComplete={
                      isLast ? () => setInteractive(true) : undefined
                    }
                    drag={interactive}
                    dragSnapToOrigin
                    dragElastic={0.6}
                    whileDrag={{ scale: 1.12, rotate: (r3 - 0.5) * 20 }}
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
