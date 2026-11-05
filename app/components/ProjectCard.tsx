import { CoverImage } from "@/app/components/CoverImage";
import Link from "next/link";
import type { Project } from "@/app/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col rounded-2xl p-2 transition-colors hover:bg-surface/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
        {project.cover ? (
          <CoverImage
            cover={project.cover}
            sizes="(min-width: 768px) 480px, 100vw"
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : null}
      </div>
      <p className="mt-5 px-2 text-xs uppercase tracking-widest text-muted">
        {project.name}
      </p>
      <div className="px-2 pb-2 pt-2">
        <h3 className="font-display text-2xl font-semibold leading-snug group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 text-muted">{project.line}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-surface px-3 py-1 text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
