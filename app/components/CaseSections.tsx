import Image from "next/image";
import type { Block, Img, Section } from "@/app/data/caseStudies";
import { MABPrototype } from "@/app/components/MABPrototype";

function Figure({ img, sizes }: { img: Img; sizes: string }) {
  return (
    <figure>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes={sizes}
        className="h-auto w-full rounded-xl bg-surface"
      />
      {img.caption && (
        <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>
      )}
    </figure>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="space-y-4">
          {block.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      );
    case "list":
      return (
        <div>
          {block.intro && <p className="mb-3 text-lg">{block.intro}</p>}
          <ul className="space-y-2">
            {block.items.map((i) => (
              <li key={i} className="flex gap-3 text-lg leading-relaxed">
                <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary pl-5 font-display text-xl leading-snug md:text-2xl">
          {block.text}
        </blockquote>
      );
    case "note":
      return <p className="text-sm text-muted">{block.text}</p>;
    case "columns":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {block.columns.map((c) => (
            <div key={c.title} className="rounded-xl bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {c.title}
              </p>
              <ul className="mt-3 space-y-2">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "images": {
      const cols = block.cols ?? 1;
      const grid = cols === 1 ? "" : cols === 2 ? "sm:grid-cols-2" : "grid-cols-3";
      return (
        <div className={`grid gap-4 ${grid}`}>
          {block.images.map((img) => (
            <Figure
              key={img.src}
              img={img}
              sizes={cols === 1 ? "(min-width: 768px) 720px, 100vw" : "(min-width: 768px) 360px, 100vw"}
            />
          ))}
        </div>
      );
    }
    case "steps":
      return (
        <div className="space-y-12">
          {block.steps.map((s) => (
            <div key={s.title} className="grid items-center gap-6 sm:grid-cols-[1fr_160px]">
              <div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{s.text}</p>
              </div>
              {s.image && (
                <div className="mx-auto w-40 sm:w-full">
                  <Figure img={s.image} sizes="160px" />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case "prototype":
      return null;
    case "leadText":
      return (
        <div className="space-y-4">
          {block.items.map((it) => (
            <p key={it.lead} className="text-lg leading-relaxed">
              <strong className="font-semibold">{it.lead}</strong> {it.text}
            </p>
          ))}
        </div>
      );
  }
}

function SplitSection({ section }: { section: Section }) {
  const textBlocks = section.blocks.filter((b) => b.kind !== "prototype");
  const hasPrototype = section.blocks.some((b) => b.kind === "prototype");
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-surface px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="text-sm text-muted">{section.label}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">
            {section.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {textBlocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        </div>
        {hasPrototype && (
          <div className="mt-10 md:mt-0">
            <MABPrototype />
          </div>
        )}
      </div>
    </section>
  );
}

export function CaseSections({ sections }: { sections: Section[] }) {
  return (
    <div className="mt-20 space-y-20">
      {sections.map((s) =>
        s.layout === "split" ? (
          <SplitSection key={s.label} section={s} />
        ) : (
          <section key={s.label}>
            <p className="text-sm text-muted">{s.label}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">
              {s.heading}
            </h2>
            <div className="mt-6 space-y-8">
              {s.blocks.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
