import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

import story1 from "../assets/story1.png";
import story2 from "../assets/story2.png";
import story3 from "../assets/story3.jpeg";
import story4 from "../assets/story4.png";
import story5 from "../assets/story5.png";
import story6 from "../assets/story6.png";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Verhaal — HIGHBALL CLUB" },
      { name: "description", content: "Waarom we Highball Club hebben opgericht — voor de bewuste genieter." },
      { property: "og:image", content: story6 },
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
            een rustigere manier van uitgaan, zonder in te leveren op smaak.
          </p>
        </div>
        <div className="relative h-[460px] rounded-3xl overflow-hidden">
          <img src={story6} alt="Highball Club rooftop" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* IMG ROW 1 */}
      <section className="mx-auto max-w-7xl px-6 grid grid-cols-3 gap-4">
        {[story1, story2, story3].map((s, i) => (
          <div key={i} className="s-reveal aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={s} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
          </div>
        ))}
      </section>

      {/* BRAND STORY GENERAL */}
      <section className="s-reveal mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-4xl md:text-5xl mb-6">Het merk</h2>
        <div className="space-y-5 text-foreground/80 leading-relaxed">
          <p>
          <h2>Waarom — De reden dat we bestaan</h2> 
          De manier waarop mensen drinken verandert. Steeds meer mensen kiezen voor 
          kwaliteit boven kwantiteit. Ze willen iets dat bij de avond past, smaakt alsof het met zorg is gemaakt, en hen de volgende ochtend niet met een kater laat zitten.
          Die verschuiving verdient een drankje dat daaraan voldoet. Geen afgezwakt 
          alternatief, maar iets wat écht verfrissend is, licht genoeg om vrijuit van te 
          drinken en karaktervol genoeg om echt van te genieten.
          </p>
          <i>'Wij geloven dat goed drinken niet gaat over meer drinken. 
          Het gaat over beter kiezen.' Daarom bestaat HIGH-BALL.'</i>
          <p></p>

          <p>
          <h2>Hoe — De manier waarop we het doen</h2> 
          We lieten ons inspireren door Japan. De highball is al decennialang een begrip in Tokio: whisky, spuitwater, ijs en een frisse touch. Toegankelijk en gemaakt om van te genieten.
          We namen dat idee en bouwden onze eigen versie. Echte ambachtelijke whisky. Spuitwater. Drie smaken gekozen op smaak, niet op trend: Lemon, Yuzu en Ginger.
          We houden het eerlijk: 5% alcohol, 100 kcal, 2 gram suiker. We maken het niet omdat het gezond is. We maken het omdat het goed smaakt.
          </p>
          <i>'Het vakmanschap zit in het product. Niet in hoe ingewikkeld we het laten klinken.'</i>
          <p></p>

          <p>
          <h2>Wat — Wat je in je hand houdt</h2> 
          HIGH-BALL is een premium sparkling whiskycocktail in een blikje. Geen glas nodig, geen kennis vereist.
          Het is het drankje waardoor je net wat langer op het terras wil blijven. Het drankje dat doorloopt na het dessert. En het drankje voor de avond waarop je iets wil drinken dat de moeite waard is, geen zware whisky of een zoete mixdrank.
          Wij zijn geen feestdrankje. Geen hard seltzer met een premium etiket. En geen whiskymerk voor mannen in pak. HIGH-BALL is voor mensen die drinken om de juiste redenen.
          </p>
          <i>'Niet elke avond hoeft groot te zijn. Maar sommige avonden verdienen een drankje dat gewoon klopt.'</i>
          <p></p>
        </div>
      </section>

      {/* IMG ROW 2 */}
      <section className="mx-auto max-w-7xl px-6 grid grid-cols-3 gap-4">
        {[story4, story5, story6].map((s, i) => (
          <div key={i} className="s-reveal aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={s} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
          </div>
        ))}
      </section>

      {/* PERSONAL */}
      <section className="s-reveal mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-4xl md:text-5xl mb-6">Persoonlijk</h2>
        <div className="space-y-5 text-foreground/80 leading-relaxed">
           <p>
          <h2>Waarom — De overtuiging erachter</h2> 
          Vijf vrienden. Verschillende steden: Utrecht, Amsterdam, Amersfoort, Enschede. We leerden elkaar kennen als studenten in Enschede, en zijn sindsdien vrienden gebleven.
          In de loop der jaren begonnen we allemaal anders te drinken. Minder rondes, meer nadenken over wat er eigenlijk in het glas zat. En ergens in die verschuiving merkten we allemaal hetzelfde op, onafhankelijk van elkaar: het juiste drankje voor dat gevoel bestond nog niet.
          </p>
          <i>'Dat irriteerde ons genoeg om er iets aan te doen.'</i>
          <p></p>
           <p>
          <h2>Hoe — De manier waarop we het hebben opgebouwd</h2> 
           De hard seltzer-hype liet ons iets echts zien: mensen waren klaar voor een lichtere optie. De schappen vulden zich snel, en veel mensen maakten de overstap. Maar hoe meer we keken, hoe duidelijker het werd dat er nog iets ontbrak. Een drankje dat licht en laagdrempelig was, maar ook echt premium. Iets dat je koos omdat het goed smaakte.
          We vonden ons antwoord in Japan. De whisky highball is al decennialang onderdeel van het dagelijks leven in Tokio — geen cocktail voor bijzondere gelegenheden, maar een eenvoudig, goed gemaakt drankje voor elk moment dat er eentje verdient. Dat idee voelde goed.
          Dus bouwden we onze eigen versie. Echte ambachtelijke whisky. Spuitwater. Drie smaken die we zelf zouden bestellen: Lemon, Yuzu en Ginger. We hielden de cijfers eerlijk — 5% alcohol, 109 kcal, 2 gram suiker — niet als verkoopargument, maar omdat een weloverwogen drankje er nu eenmaal zo uitziet.</p>
          <i>'Vijf mensen die iets beters in de koelkast wilden, en besloten het er zelf in te zetten.'</i>
          <p></p>
          <p>
          <h2>Wat — Wat we hebben gemaakt</h2> 
          HIGH-BALL is een premium sparkling whiskycocktail in een blikje. Geboren in Enschede. Gebouwd over vijf steden. Gemaakt voor iedereen die drinkt om de juiste redenen. Voor het drankje na het werk. Het terras waar je net wat langer blijft. De avond die geen groot feest hoeft te zijn, maar toch iets verdient om op te proosten.
          We zijn geen doorgewinterde mensen uit de industrie. We zijn geen distillateurs van beroep. We zijn vijf vrienden in de twintig die opgroeiden met drinken wat er was, en uiteindelijk meer gingen vragen. HIGH-BALL is ons antwoord.
          </p><i>'Niet elke avond hoeft groot te zijn. Maar sommige avonden verdienen een drankje dat gewoon klopt.'</i>
          <p></p>
        </div>
      </section>
    </div>
  );
}