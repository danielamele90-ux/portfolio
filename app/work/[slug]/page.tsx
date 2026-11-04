import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { getProject, projects } from "@/app/data/projects";
import { SummaryVisual } from "@/app/components/SummaryVisual";
import { CaseSections } from "@/app/components/CaseSections";
import { caseStudies } from "@/app/data/caseStudies";
import Image from "next/image";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.name} | Daniela Mele` : "Daniela Mele",
    description: project?.line,
  };
}

export default async function CaseStudy({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const s = project.summary;
  const cs = caseStudies[project.slug];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12">
        <Link href="/#work" className="text-sm text-muted hover:text-primary">
          ← All work
        </Link>
        <p className="mt-10 text-sm uppercase tracking-widest text-muted">
          {project.name}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-6xl">
          {project.title}
        </h1>

        {s ? (
          <section
            aria-label="Summary"
            className="mt-12 rounded-2xl bg-surface p-6 md:p-10"
          >
            <p className="text-sm text-muted">{s.status}</p>
            <dl className="mt-8 grid gap-8">
              {[
                ["Problem", s.problem],
                ["Decision", s.decision],
                ["Result", s.result],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {label}
                  </dt>
                  <dd className="mt-2 text-lg leading-relaxed">{text}</dd>
                </div>
              ))}
            </dl>
            {s.note && <p className="mt-6 text-sm text-muted">{s.note}</p>}
            <SummaryVisual type={s.visual} />
          </section>
        ) : null}

        {cs && (
          <>
            <section aria-label="My role" className="mt-16">
              <p className="text-sm text-muted">my role.</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {cs.role.map((r) => (
                  <li key={r} className="rounded-xl border border-surface p-4">
                    {r}
                  </li>
                ))}
              </ul>
            </section>
            <CaseSections sections={cs.sections} />
          </>
        )}

        {!s && (
          <section className="mt-12 rounded-2xl bg-surface p-6 md:p-10">
            <p className="text-lg leading-relaxed">{project.line}</p>
            <p className="mt-6 text-muted">{project.placeholder}</p>
            {project.cover && (
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
