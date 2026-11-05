import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
      <Link href="/" className="font-display text-lg font-semibold">
        Daniela Mele
      </Link>
      <nav className="flex gap-6 text-sm text-muted">
        <Link href="/#work" className="hover:text-primary">
          Work
        </Link>
        <Link href="/#about" className="hover:text-primary">
          About
        </Link>
        <Link href="/#contact" className="hover:text-primary">
          Contact
        </Link>
      </nav>
    </header>
  );
}
