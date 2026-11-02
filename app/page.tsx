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
            I turn complex briefs into simple, logical flows.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">
            Product Designer in Berlin. I work on UX, interaction design and
            user journeys — with an interior designer&apos;s eye for balance
            and colour.
          </p>
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
