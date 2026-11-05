import Image from "next/image";
import { HeroTitle } from "@/app/components/HeroTitle";
import { HowIWork } from "@/app/components/HowIWork";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { ProjectCard } from "@/app/components/ProjectCard";
import { projects } from "@/app/data/projects";

const aboutLinks = [
  {
    label: "CV",
    href: "https://drive.google.com/file/d/1_3ZJvVpMfUzA-WYkOxn45IMXkrGr53tK/view?usp=drive_link",
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danielamele" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-6">
        <section className="py-20 md:py-28">
          <HeroTitle />
          <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">
            I connect user needs with business priorities to design clear,
            cohesive experiences, aligning teams around a shared vision.
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

        <section
          id="about"
          className="grid scroll-mt-8 gap-10 border-t border-surface py-24 md:grid-cols-[280px_1fr] md:gap-16"
        >
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full bg-surface md:w-full">
            <Image
              src="/images/portrait-front.webp"
              alt="Portrait of Daniela Mele"
              fill
              sizes="(min-width: 768px) 280px, 224px"
              className="object-cover"
            />
            <Image
              src="/images/portrait-tilt.webp"
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 280px, 224px"
              className="animate-portrait-tilt object-cover opacity-0"
            />
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted">
              About
            </h2>
            <p className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
              From materials to product.
            </p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed">
              <p>
                Before product design, I designed for physical spaces. As
                Textile Design Prime at Loloey, I turned interior concepts into
                custom flooring systems for hotels, balancing creative intent
                with engineering and production constraints across
                international teams.
              </p>
              <p>
                That work taught me to design the rules, not just the objects.
                It&apos;s what I bring to product design today: understanding
                how a system works in its real context, then turning that
                complexity into flows people can follow with confidence.
              </p>
              <p className="text-muted">
                Outside work, you&apos;ll find me doing aerial arts,
                illustrating, or rethinking interiors.
              </p>
            </div>
            <ul className="mt-8 flex gap-6">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <HowIWork />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
