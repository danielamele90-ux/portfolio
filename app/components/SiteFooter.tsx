const links = [
  { label: "danielamele90@gmail.com", href: "mailto:danielamele90@gmail.com" },
  { label: "+49 178 2492716", href: "tel:+491782492716" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danielamele" },
  {
    label: "CV",
    href: "https://drive.google.com/file/d/1_3ZJvVpMfUzA-WYkOxn45IMXkrGr53tK/view?usp=drive_link",
  },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto bg-footer text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">
          Let&apos;s talk about your next product.
        </h2>
        <p className="mt-3 text-white/80">
          Available for work · Berlin · Milan · Remote
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="underline-offset-4 hover:underline"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-white/60">
          © 2026 Daniela Mele
        </p>
      </div>
    </footer>
  );
}
