import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const linkCls = "text-sm tracking-wide text-white/75 hover:text-white transition";
  const activeProps = { className: "text-white font-medium" };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 surface-dark border-b border-white/10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-[0.25em] text-white">
          HIGHBALL CLUB
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className={linkCls} activeOptions={{ exact: true }} activeProps={activeProps}>
            Home
          </Link>
          <Link to="/flavors" className={linkCls} activeProps={activeProps}>
            Smaken
          </Link>
          <Link to="/story" className={linkCls} activeProps={activeProps}>
            Verhaal
          </Link>
          <Link to="/wachtlijst" className={linkCls} activeProps={activeProps}>
            Wachtlijst
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <Link
          to="/wachtlijst"
          className="hidden md:inline-flex btn-premium items-center rounded-full px-5 py-2 text-sm font-medium"
        >
          Proef als eerste
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-white/80 transition"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-3">
            <Link
              to="/"
              className={`${linkCls} block py-2`}
              activeOptions={{ exact: true }}
              activeProps={activeProps}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              to="/flavors"
              className={`${linkCls} block py-2`}
              activeProps={activeProps}
              onClick={handleLinkClick}
            >
              Smaken
            </Link>
            <Link
              to="/story"
              className={`${linkCls} block py-2`}
              activeProps={activeProps}
              onClick={handleLinkClick}
            >
              Verhaal
            </Link>
            <Link
              to="/wachtlijst"
              className={`${linkCls} block py-2`}
              activeProps={activeProps}
              onClick={handleLinkClick}
            >
              Wachtlijst
            </Link>
            <div className="pt-4 border-t border-white/10">
              <Link
                to="/wachtlijst"
                className="btn-premium inline-flex w-full justify-center items-center rounded-full px-5 py-2 text-sm font-medium"
                onClick={handleLinkClick}
              >
                Proef als eerste
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}