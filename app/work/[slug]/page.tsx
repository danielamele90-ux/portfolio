import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { getProject, projects } from "@/app/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.name} — Daniela Mele` : "Daniela Mele",
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
            {/* Visual placeholder — replaced by the real image */}
            <div className="mt-10 flex aspect-[16/9] items-center justify-center rounded-xl bg-white text-sm text-muted">
              {s.visual}
            </div>
          </section>
        ) : (
          <section className="mt-12 rounded-2xl bg-surface p-6 md:p-10">
            <p className="text-lg leading-relaxed">{project.line}</p>
            <p className="mt-6 text-muted">{project.placeholder}</p>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
