import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

import rooftop from "../assets/rooftop.jpg.asset.json";
import story1 from "../assets/story1.jpg.asset.json";
import story2 from "../assets/story2.jpg.asset.json";
import story3 from "../assets/story3.jpg.asset.json";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Verhaal — HIGHBALL CLUB" },
      { name: "description", content: "Waarom we Highball Club hebben opgericht — voor de bewuste genieter." },
      { property: "og:image", content: rooftop.url },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".s-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs tracking-[0.25em] text-muted-foreground mb-3">ONS VERHAAL</p>
          <h1 className="text-5xl md:text-6xl">Goede nachten<br/>beginnen makkelijk.</h1>
          <p className="mt-4 text-muted-foreground max-w-md">
            Highball Club is geboren uit een simpele gedachte: een cocktail die past bij
            een rustigere manier van uitgaan — zonder in te leveren op smaak.
          </p>
        </div>
        <div className="relative h-[460px] rounded-3xl overflow-hidden">
          <img src={rooftop.url} alt="Highball Club rooftop" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* IMG ROW 1 */}
      <section className="mx-auto max-w-7xl px-6 grid grid-cols-3 gap-4">
        {[story1, story2, story3].map((s, i) => (
          <div key={i} className="s-reveal aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={s.url} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
          </div>
        ))}
      </section>

      {/* BRAND STORY GENERAL */}
      <section className="s-reveal mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-4xl md:text-5xl mb-6">Het merk</h2>
        <div className="space-y-5 text-foreground/80 leading-relaxed">
          <p>
            We zagen vrienden minder drinken — maar niet minder genieten. Ze wilden geen
            zoete seltzer en geen aftershave-achtige hard-seltzer. Ze wilden iets met diepte:
            een cocktail die op zichzelf staat, maar lichter is dan een glas op de bar.
          </p>
          <p>
            Highball Club werkt met echte whiskey, natuurlijke smaken en vakmensen die hun
            ambacht serieus nemen. Geen kunstmatige zoetstoffen, geen kleurstoffen, geen
            shortcuts. Wel een blik dat in je hand past en dat je trots op tafel zet.
          </p>
          <p>
            Voor lange terrassen, rooftops met uitzicht en diners die vanzelf iets later worden.
            Voor momenten die er écht toe doen — bewust drinken, zonder in te leveren op smaak en beleving.
          </p>
        </div>
      </section>

      {/* IMG ROW 2 */}
      <section className="mx-auto max-w-7xl px-6 grid grid-cols-3 gap-4">
        {[story3, story1, story2].map((s, i) => (
          <div key={i} className="s-reveal aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={s.url} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
          </div>
        ))}
      </section>

      {/* PERSONAL */}
      <section className="s-reveal mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-4xl md:text-5xl mb-6">Persoonlijk</h2>
        <div className="space-y-5 text-foreground/80 leading-relaxed">
          <p>
            Het begon op een dakterras in Amsterdam, met een fles whiskey die te zwaar voelde
            voor het uur en een seltzer die te dun voelde voor het moment. Tussenin lag iets
            wat nog niet bestond — dus maakten we het zelf.
          </p>
          <p>
            Eerst voor onszelf. Toen voor vrienden. Toen vroegen vreemden wat het was. Highball
            Club is voor iedereen die het kleine moment serieus neemt.
          </p>
          <p className="font-display text-2xl text-foreground pt-4">
            "Good nights start easy."
          </p>
        </div>
      </section>
    </div>
  );
}
