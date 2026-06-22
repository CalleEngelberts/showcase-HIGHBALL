export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-display tracking-[0.25em]">HIGHBALL CLUB</div>
        <div>© {new Date().getFullYear()} Highball Club. Drink bewust. 18+</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground transition">Instagram</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
