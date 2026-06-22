import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { CanModel } from "../components/CanModel";

import canLemon from "../assets/canLemon.png.asset.json";
import canYuzu from "../assets/canYuzu.png.asset.json";
import canGinger from "../assets/canGinger.png.asset.json";
import rooftop from "../assets/rooftop.jpg.asset.json";
import story1 from "../assets/story1.jpg.asset.json";
import story2 from "../assets/story2.jpg.asset.json";
import story3 from "../assets/story3.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HIGHBALL CLUB — Niet elke avond verdient om vergeten te worden" },
      { name: "description", content: "Craft whiskey-highball in blik. Lemon, Yuzu, Ginger. 5% ABV, 109 kcal, 2g suiker." },
    ],
  }),
  component: HomePage,
});

const flavors = [
  { key: "lemon",  name: "Lemon",  tag: "Fris & licht",      blurb: "Zonnige citroen met een zachte whiskey-finish.",  img: canLemon.url,  tint: "var(--lemon)" },
  { key: "yuzu",   name: "Yuzu",   tag: "Citrus & verfijnd", blurb: "Japanse yuzu met een elegante, droge afdronk.",   img: canYuzu.url,   tint: "var(--yuzu)" },
  { key: "ginger", name: "Ginger", tag: "Kruidig & warm",    blurb: "Gember met een subtiele kick en warme finish.",   img: canGinger.url, tint: "var(--ginger)" },
];

function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".hero-fade", {
        y: 24, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.08,
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    },
    { scope: scrollRef }
  );

  return (
    <div ref={scrollRef}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-bg" style={{ backgroundImage: `url(${rooftop.url})` }} />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div className="space-y-6">
            <p className="hero-fade text-xs tracking-[0.3em] text-foreground/60">SPARKLING COCKTAIL · 5% ABV</p>
            <h1 className="hero-fade text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Niet elke avond<br/>verdient om<br/>vergeten te worden.
            </h1>
            <p className="hero-fade max-w-md text-base text-muted-foreground">
              Craft whiskey-highball in blik voor mensen die minder drinken, maar
              beter willen kiezen als ze drinken.
            </p>
            <div className="hero-fade flex flex-wrap gap-3">
              <Link to="/wachtlijst" className="btn-premium rounded-full px-6 py-3 text-sm font-medium">
                Proef als eerste
              </Link>
              <Link to="/flavors" className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground/5 transition">
                Bekijk de smaken
              </Link>
            </div>
          </div>
          <div className="hero-fade relative h-[360px] md:h-[420px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-sm border border-white/40 shadow-[var(--shadow-premium)]" />
            <CanModel tint="#7ac142" className="absolute inset-0" />
          </div>
        </div>
      </section>


      {/* INFO STRIP */}
      <section className="reveal mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "5% ABV", l: "Licht en in balans." },
            { v: "109 kcal", l: "Bewust genieten." },
            { v: "2g suiker", l: "Minder, maar beter." },
            { v: "250 ml", l: "Perfect formaat." },
          ].map((s) => (
            <div key={s.v} className="rounded-xl border border-border bg-card p-6">
              <div className="font-display text-3xl text-foreground">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FLAVORS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="reveal flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl">Drie smaken</h2>
            <p className="mt-2 text-muted-foreground max-w-md">
              Drie verfrissende smaken. Duurzaam gemaakt, heerlijk in balans.
            </p>
          </div>
          <Link to="/flavors" className="rounded-md border border-foreground/15 px-4 py-2 text-sm hover:bg-foreground/5 transition">
            Ontdek alle smaken
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {flavors.map((f) => (
            <Link
              key={f.key}
              to="/flavors"
              search={{ flavor: f.key }}
              className="reveal group rounded-2xl bg-card border border-border p-6 flex flex-col items-center text-center transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="h-72 flex items-center justify-center">
                <img src={f.img} alt={`${f.name} can`} className="h-full w-auto object-contain group-hover:scale-105 transition" />
              </div>
              <h3 className="mt-4 text-2xl">{f.name}</h3>
              <p className="text-sm font-medium" style={{ color: f.tint }}>{f.tag}</p>
              <p className="mt-2 text-sm text-muted-foreground">{f.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm underline underline-offset-4">Meer info →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* MOMENTEN */}
      <section id="momenten" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl">Voor het uur waarop<br/>het licht goud wordt.</h2>
            <p className="mt-3 text-muted-foreground">De kleine momenten die groot voelen. Daar proosten we op.</p>
          </div>
          <div className="reveal grid grid-cols-3 grid-rows-2 gap-3 h-[460px]">
            <img src={rooftop.url} className="col-span-2 row-span-1 h-full w-full object-cover rounded-xl" alt="" />
            <img src={story1.url} className="col-span-1 row-span-2 h-full w-full object-cover rounded-xl" alt="" />
            <img src={story2.url} className="col-span-1 row-span-1 h-full w-full object-cover rounded-xl" alt="" />
            <img src={story3.url} className="col-span-1 row-span-1 h-full w-full object-cover rounded-xl" alt="" />
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="bg-foreground/[0.04] border-y border-border/60">
        <div className="reveal mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl">De eerste batch komt eraan.</h2>
            <p className="mt-2 text-muted-foreground">Schrijf je in voor de wachtlijst en proef als eerste.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Bedankt! We houden je op de hoogte."); }}
            className="flex gap-2"
          >
            <input
              type="email" required placeholder="Jouw e-mailadres"
              className="flex-1 rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">Meld me aan</button>
          </form>
          <p className="md:col-span-2 text-xs text-muted-foreground">18+ · Drink bewust</p>
        </div>
      </section>
    </div>
  );
}
