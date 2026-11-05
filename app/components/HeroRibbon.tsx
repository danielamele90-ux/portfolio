"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// Approved in Notion ("Hero ribbon: fragments to approve").
// Insights from Daniela's case studies, styled as notes, not quotes.
const FRAGMENTS = [
  "new users drop off more often",
  "account creation appears mid-booking",
  "the flow doesn't show progress",
  "unclear what happens after booking",
  "wanted somewhere to manage the appointment",
  "need: recharge",
  "struggle: time",
  "who else is joining?",
  "can I trust the coach?",
  "qualifications alone weren't enough",
  "a clear sense of place",
  "rest, work, gathering, transition",
  "coherent, but not uniform",
];

const FLOWS = [
  "Select → Review → Confirm",
  "Discover → Book → Meet → Return",
  "Morning → Midday → Afternoon → Night",
];

const SEP = "      ";
const leftText = FRAGMENTS.join(SEP) + SEP;
const rightText = FLOWS.join(SEP + "·" + SEP) + SEP + "·" + SEP;

// Geometry (viewBox 1440 × 260): a loose curve into the node, a clean band out of it.
const NODE = { x: 720, y: 190 };
const LEFT_PATH = "M -120 110 C 120 30, 330 250, 520 180 S 660 190, 720 190";
const RIGHT_PATH = "M 720 190 C 920 190, 1150 140, 1560 70";

const SPEED_LEFT = 55; // user units per second
const SPEED_RIGHT = 70;

export function HeroRibbon() {
  const reduceMotion = useReducedMotion();
  const leftRef = useRef<SVGTextPathElement>(null);
  const rightRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    // Each text holds two identical copies; shifting by one copy loops seamlessly.
    const copyLen = (el: SVGTextPathElement) =>
      (el.parentElement as unknown as SVGTextElement).getComputedTextLength() /
      2;
    const lLen = copyLen(left);
    const rLen = copyLen(right);

    const place = (t: number) => {
      left.setAttribute(
        "startOffset",
        String(-lLen + ((t * SPEED_LEFT) % lLen)),
      );
      right.setAttribute(
        "startOffset",
        String(-rLen + ((t * SPEED_RIGHT) % rLen)),
      );
    };

    if (reduceMotion) {
      place(lLen / SPEED_LEFT / 2);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      place((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div
      aria-hidden
      className="relative left-1/2 mt-14 w-screen -translate-x-1/2 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="xMidYMid slice"
        className="block h-[190px] w-full md:h-[260px]"
      >
        <defs>
          <path id="ribbon-left" d={LEFT_PATH} />
          <path id="ribbon-right" d={RIGHT_PATH} />
        </defs>

        {/* Messy input: light, muted, loose */}
        <text
          style={{ whiteSpace: "pre" }}
          className="fill-muted"
          fontSize={19}
          opacity={0.55}
          letterSpacing={0.3}
        >
          <textPath ref={leftRef} href="#ribbon-left" startOffset={0}>
            {leftText + leftText}
          </textPath>
        </text>

        {/* Clean output: one Primary band with white text */}
        <path
          d={RIGHT_PATH}
          fill="none"
          strokeWidth={46}
          strokeLinecap="butt"
          className="stroke-primary"
        />
        <text
          style={{ whiteSpace: "pre" }}
          className="fill-white"
          fontSize={19}
          fontWeight={600}
          dominantBaseline="central"
        >
          <textPath ref={rightRef} href="#ribbon-right" startOffset={0}>
            {rightText + rightText}
          </textPath>
        </text>

        {/* The node: where insights become a flow */}
        <g transform={`translate(${NODE.x} ${NODE.y})`}>
          <rect
            x={-58}
            y={-34}
            width={116}
            height={68}
            rx={34}
            className="fill-white stroke-primary"
            strokeWidth={3}
          />
          <g
            className="animate-heartbeat"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <image
              href="/images/heart-pink.png"
              x={-19}
              y={-17}
              width={38}
              height={34}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
