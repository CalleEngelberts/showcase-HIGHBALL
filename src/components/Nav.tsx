import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-[0.2em] text-foreground">
          HIGHBALL CLUB
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <Link to="/flavors" className="hover:text-accent-foreground/70 transition" activeProps={{ className: "text-foreground font-medium" }}>Smaken</Link>
          <Link to="/story" className="hover:text-accent-foreground/70 transition" activeProps={{ className: "text-foreground font-medium" }}>Verhaal</Link>
          <a href="#momenten" className="hover:text-accent-foreground/70 transition">Momenten</a>
          <a href="#waitlist" className="hover:text-accent-foreground/70 transition">Wachtlijst</a>
        </nav>
        <a
          href="#waitlist"
          className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition"
        >
          Proef als eerste
        </a>
      </div>
    </header>
  );
}
