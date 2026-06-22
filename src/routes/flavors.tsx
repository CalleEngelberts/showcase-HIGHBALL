import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { CanModel } from "../components/CanModel";

import canLemon from "../assets/canLemon.png.asset.json";
import canYuzu from "../assets/canYuzu.png.asset.json";
import canGinger from "../assets/canGinger.png.asset.json";

const searchSchema = z.object({
  flavor: z.enum(["lemon", "yuzu", "ginger"]).optional(),
});

export const Route = createFileRoute("/flavors")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Smaken — HIGHBALL CLUB" },
      { name: "description", content: "Lemon, Yuzu, Ginger. Drie sparkling cocktails in balans." },
    ],
  }),
  component: FlavorsPage,
});

type FlavorKey = "lemon" | "yuzu" | "ginger";

const flavors: Record<FlavorKey, {
  name: string; tag: string; tint: string; hex: string; img: string;
  info: string;
  profile: { freshness: number; sweet: number; sour: number };
  stats: { calories: number; sugar: string; sweetness: number; sour: number; bitterness: number; refreshing: number };
}> = {
  lemon: {
    name: "Lemon", tag: "Fris & licht", tint: "var(--lemon)", hex: "#f4c430", img: canLemon.url,
    info: "Een heldere citroen-highball met zachte whiskey-tonen. Knapperig, droog, en eindeloos verfrissend — bedoeld voor late middagen die overgaan in lange avonden.",
    profile: { freshness: 90, sweet: 35, sour: 70 },
    stats: { calories: 109, sugar: "2g", sweetness: 2, sour: 4, bitterness: 2, refreshing: 5 },
  },
  yuzu: {
    name: "Yuzu", tag: "Citrus & verfijnd", tint: "var(--yuzu)", hex: "#7ac142", img: canYuzu.url,
    info: "Japanse yuzu ontmoet een elegante, droge afdronk. Floraal, complex, en toch licht — onze meest gevraagde smaak voor diners die net iets later worden.",
    profile: { freshness: 85, sweet: 45, sour: 60 },
    stats: { calories: 105, sugar: "2g", sweetness: 3, sour: 3, bitterness: 3, refreshing: 5 },
  },
  ginger: {
    name: "Ginger", tag: "Kruidig & warm", tint: "var(--ginger)", hex: "#d4a574", img: canGinger.url,
    info: "Verse gember met een subtiele kick en een warme, kruidige finish. De keuze voor wie houdt van een Moscow Mule met meer karakter.",
    profile: { freshness: 70, sweet: 50, sour: 40 },
    stats: { calories: 90, sugar: "2g", sweetness: 3, sour: 2, bitterness: 4, refreshing: 4 },
  },
};

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{label}</span><span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function Dots({ n, max = 5, color }: { n: number; max?: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ background: i < n ? color : "color-mix(in oklab, var(--foreground) 12%, transparent)" }}
        />
      ))}
    </div>
  );
}

function FlavorsPage() {
  const { flavor } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [active, setActive] = useState<FlavorKey>(flavor ?? "yuzu");
  const sectionsRef = useRef<HTMLDivElement>(null);

  const onTab = (k: FlavorKey) => {
    setActive(k);
    navigate({ search: { flavor: k } });
    document.getElementById(`flavor-${k}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".f-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    },
    { scope: sectionsRef }
  );

  return (
    <div ref={sectionsRef}>
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs tracking-[0.25em] text-muted-foreground mb-3">SPARKLING COCKTAILS</p>
          <h1 className="text-5xl md:text-6xl">Drie smaken,<br/>één filosofie.</h1>
          <p className="mt-4 text-muted-foreground max-w-md">
            Minder, maar beter. Elke smaak is een eigen cocktail — gebalanceerd, droog,
            en gemaakt om gedeeld te worden.
          </p>
          <div className="mt-6 inline-flex rounded-full bg-foreground/5 p-1">
            {(Object.keys(flavors) as FlavorKey[]).map((k) => (
              <button
                key={k}
                onClick={() => onTab(k)}
                className={`px-4 py-2 text-sm rounded-full transition ${
                  active === k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {flavors[k].name}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[440px]">
          <CanModel tint={flavors[active].hex} interactive className="h-full w-full" />
        </div>
      </section>

      {/* FLAVOR SECTIONS */}
      <div className="mx-auto max-w-7xl px-6 space-y-24 py-12">
        {(Object.keys(flavors) as FlavorKey[]).map((k, i) => {
          const f = flavors[k];
          const reverse = i % 2 === 1;
          return (
            <section
              id={`flavor-${k}`}
              key={k}
              className={`f-reveal grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative h-[480px] rounded-3xl overflow-hidden" style={{ background: `color-mix(in oklab, ${f.hex} 14%, transparent)` }}>
                <CanModel tint={f.hex} interactive className="absolute inset-0" />
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] mb-2" style={{ color: f.hex }}>{f.tag.toUpperCase()}</p>
                <h2 className="text-5xl">{f.name}</h2>
                <p className="mt-4 text-muted-foreground max-w-lg">{f.info}</p>

                <div className="mt-8 space-y-4 max-w-md">
                  <Bar label="Freshness" value={f.profile.freshness} color={f.hex} />
                  <Bar label="Sweet"     value={f.profile.sweet}     color={f.hex} />
                  <Bar label="Sour"      value={f.profile.sour}      color={f.hex} />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* COMPARE */}
      <section className="f-reveal mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl md:text-5xl mb-8">Vergelijk de smaken</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-foreground/[0.04] text-left">
                <th className="p-4 font-medium text-muted-foreground">Compare flavors</th>
                {(Object.keys(flavors) as FlavorKey[]).map((k) => (
                  <th key={k} className="p-4 font-display text-lg" style={{ color: flavors[k].hex }}>{flavors[k].name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Calories",  get: (f: typeof flavors.lemon) => `${f.stats.calories}` },
                { label: "Sugar",     get: (f: typeof flavors.lemon) => f.stats.sugar },
                { label: "Sweetness", dots: (f: typeof flavors.lemon) => f.stats.sweetness },
                { label: "Sour",      dots: (f: typeof flavors.lemon) => f.stats.sour },
                { label: "Bitterness",dots: (f: typeof flavors.lemon) => f.stats.bitterness },
                { label: "Refreshing",dots: (f: typeof flavors.lemon) => f.stats.refreshing },
              ].map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="p-4 text-muted-foreground">{row.label}</td>
                  {(Object.keys(flavors) as FlavorKey[]).map((k) => (
                    <td key={k} className="p-4">
                      {row.dots ? <Dots n={row.dots(flavors[k])} color={flavors[k].hex} /> : row.get!(flavors[k])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
