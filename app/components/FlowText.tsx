"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

// Words surface one after another like a wave: quick, readable, once.
export function FlowText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.035,
              ease: "easeOut",
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
