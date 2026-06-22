import { Link } from "@tanstack/react-router";

export function Nav() {
  const linkCls = "text-sm tracking-wide text-white/75 hover:text-white transition";
  const activeProps = { className: "text-white font-medium" };

  return (
    <header className="sticky top-0 z-50 surface-dark border-b border-white/10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-[0.25em] text-white">
          HIGHBALL CLUB
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className={linkCls} activeOptions={{ exact: true }} activeProps={activeProps}>Home</Link>
          <Link to="/flavors" className={linkCls} activeProps={activeProps}>Smaken</Link>
          <Link to="/story" className={linkCls} activeProps={activeProps}>Verhaal</Link>
          <Link to="/wachtlijst" className={linkCls} activeProps={activeProps}>Wachtlijst</Link>
        </nav>
        <Link
          to="/wachtlijst"
          className="btn-premium inline-flex items-center rounded-full px-5 py-2 text-sm font-medium"
        >
          Proef als eerste
        </Link>
      </div>
    </header>
  );
}
