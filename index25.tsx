import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "./src/lib/gsap";
import { CanModel } from "./src/components/CanModel";

import canLemon from "../assets/canLemon.png";
import canYuzu from "../assets/canYuzu.png";
import canGinger from "../assets/canGinger.png";
import story1 from "../assets/story1.png";
import story2 from "../assets/story2.png";
import story3 from "../assets/story3.jpeg";

export const Route = createFileRoute("/index25")({
  head: () => ({
    meta: [
      { title: "HIGHBALL CLUB — Niet elke avond verdient om vergeten te worden" },
      { name: "description", content: "Craft whiskey-highball in blik. Lemon, Yuzu, Ginger. 5% ABV, 109 kcal, 2g suiker." },
    ],
  }),
  component: HomePage,
});

const flavors = [
  { key: "lemon",  name: "Lemon",  tag: "Fris & licht",      blurb: "Zonnige citroen met een zachte whiskey-finish.",  img: canLemon,  tint: "var(--lemon)" },
  { key: "yuzu",   name: "Yuzu",   tag: "Citrus & verfijnd", blurb: "Japanse yuzu met een elegante, droge afdronk.",   img: canYuzu,   tint: "var(--yuzu)" },
  { key: "ginger", name: "Ginger", tag: "Kruidig & warm",    blurb: "Gember met een subtiele kick en warme finish.",   img: canGinger, tint: "var(--ginger)" },
];

function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // useGSAP(
  //   () => {
  //     if (prefersReducedMotion()) return;

  //     gsap.from(".hero-fade", {
  //       y: 24, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.08,
  //     });

  //     gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
  //       gsap.from(el, {
  //         y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
  //         scrollTrigger: { trigger: el, start: "top 85%" },
  //       });
  //     });
  //   },
  //   { scope: scrollRef }
  // );

  return (
    <div ref={scrollRef}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-bg" style={{ backgroundImage: `url(${story1})` }} />
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
           <CanModel className="absolute inset-0 cursor-grab active:cursor-grabbing" />
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
            <div key={s.v} className="rounded-2xl bg-card text-card-foreground p-6 shadow-[var(--shadow-soft)]">
              <div className="font-display text-3xl">{s.v}</div>
              <div className="mt-1 text-sm text-card-foreground/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>)
   }