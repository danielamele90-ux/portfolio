import Link from "next/link";

// Sticky, slim and calm: no hide/show or animation, so it never competes
// with the hero. "Get in touch" is the only element that asks for attention.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="font-display text-lg font-semibold">
          Daniela Mele
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted sm:gap-6">
          <Link href="/#work" className="hover:text-primary">
            Work
          </Link>
          <Link href="/#about" className="hover:text-primary">
            About
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
