import Image from "next/image";
import type { Summary } from "@/app/data/projects";

const mabScreens = [
  { src: "/images/mab/screen-1.webp", label: "Select", alt: "Select a date and time, with a 3-step progress indicator" },
  { src: "/images/mab/screen-2.webp", label: "Review", alt: "Review appointment details before confirming" },
  { src: "/images/mab/screen-3.webp", label: "Confirm", alt: "Confirmation screen with optional account creation" },
];

// Colours sampled from Daniela's original palette images.
const morrowPalettes = [
  { label: "Morning", use: "Function areas", colors: ["#e6e7dd", "#e1e1da", "#d5d5d0", "#c1c2bc", "#b3b3a9"] },
  { label: "Midday", use: "Suites", colors: ["#d8d8d6", "#c3cac8", "#809094", "#5a6d77", "#344c68"] },
  { label: "Afternoon", use: "Public areas", colors: ["#e1c38e", "#b6b4c0", "#9aa1b4", "#767f9d", "#4f577a"] },
  { label: "Night", use: "Lobbies", colors: ["#d0c7b0", "#416775", "#1e515c", "#0b2e42", "#071c23"] },
];

export function SummaryVisual({ type }: { type: Summary["visual"] }) {
  if (type === "mab-screens") {
    return (
      <figure className="mt-10 rounded-xl bg-white p-4 md:p-8">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {mabScreens.map((s) => (
            <div key={s.src} className="text-center">
              <Image
                src={s.src}
                alt={s.alt}
                width={750}
                height={1624}
                sizes="(min-width: 768px) 200px, 30vw"
                className="h-auto w-full rounded-lg border border-surface"
              />
              <p className="mt-3 text-xs uppercase tracking-widest text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </figure>
    );
  }

  return (
    <figure className="mt-10 rounded-xl bg-white p-6 md:p-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 md:gap-6">
        {morrowPalettes.map((p) => (
          <div key={p.label}>
            <div className="flex flex-col gap-1.5">
              {p.colors.map((c) => (
                <span
                  key={c}
                  className="block h-8 rounded-md md:h-10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold">{p.label}</p>
            <p className="text-xs text-muted">{p.use}</p>
          </div>
        ))}
      </div>
      <figcaption className="sr-only">
        Four colour palettes, from light morning tones to deep night tones.
      </figcaption>
    </figure>
  );
}
