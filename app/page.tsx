import Image from "next/image";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { ProjectCard } from "@/app/components/ProjectCard";
import { projects } from "@/app/data/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-6">
        <section className="py-20 md:py-28">
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            I turn user insights into clear, meaningful experiences.
          </h1>
          <div className="mt-8 flex items-center gap-5 md:gap-6">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-surface md:size-28">
              <Image
                src="/images/portrait-front.webp"
                alt="Portrait of Daniela Mele"
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
              <Image
                src="/images/portrait-tilt.webp"
                alt=""
                aria-hidden
                fill
                sizes="112px"
                className="animate-portrait-tilt object-cover opacity-0"
              />
            </div>
            <p className="max-w-2xl text-lg text-muted md:text-xl">
              I&apos;m a Berlin-based Product Designer. I connect user needs,
              design opportunities, and business priorities to shape intuitive
              experiences and align teams around a shared vision.
            </p>
          </div>
        </section>

        <section id="work" className="pb-24">
          <h2 className="mb-8 text-sm uppercase tracking-widest text-muted">
            Selected work
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
