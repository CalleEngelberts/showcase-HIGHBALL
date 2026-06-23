// import { createFileRoute } from "@tanstack/react-router";
// import { useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
// import { gsap, prefersReducedMotion } from "../lib/gsap";

// export const Route = createFileRoute("/wachtlijst")({
//   head: () => ({
//     meta: [
//       { title: "Wachtlijst & Contact — HIGHBALL CLUB" },
//       { name: "description", content: "Meld je aan voor de wachtlijst en proef als eerste. Of neem contact op met Highball Club." },
//     ],
//   }),
//   component: WachtlijstPage,
// });

// function WachtlijstPage() {
//   const scope = useRef<HTMLDivElement>(null);
//   const [submitted, setSubmitted] = useState(false);

//   useGSAP(() => {
//     if (prefersReducedMotion()) return;
//     gsap.from(".w-fade", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 });
//   }, { scope });

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <div ref={scope}>
//       <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 text-center">
//         <p className="w-fade text-xs tracking-[0.3em] text-foreground/60">PROEF ALS EERSTE</p>
//         <h1 className="w-fade mt-3 text-5xl md:text-6xl">Sluit je aan bij de club.</h1>
//         <p className="w-fade mt-4 text-muted-foreground max-w-xl mx-auto">
//           De eerste batch is beperkt. Schrijf je in voor de wachtlijst en ontvang als eerste bericht zodra we lanceren — of stuur ons een bericht.
//         </p>
//       </section>

//       <section className="mx-auto max-w-6xl px-6 pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
//         {/* Form */}
//         <div className="w-fade rounded-3xl surface-dark p-8 md:p-12 shadow-[var(--shadow-premium)]">
//           {submitted ? (
//             <div className="py-12 text-center text-white">
//               <div className="font-display text-4xl">Bedankt.</div>
//               <p className="mt-3 text-white/70">Je staat op de lijst. We laten van ons horen zodra de eerste batch klaar is.</p>
//             </div>
//           ) : (
//             <form onSubmit={onSubmit} className="space-y-5">
//               <h2 className="font-display text-3xl text-white">Wachtlijst & contact</h2>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <Field label="Naam" name="name" required />
//                 <Field label="E-mail" name="email" type="email" required />
//               </div>
//               <Field label="Onderwerp" name="subject" placeholder="Wachtlijst / Horeca / Pers / Anders" />
//               <div>
//                 <label className="block text-xs tracking-[0.2em] text-white/60 mb-2">BERICHT (OPTIONEEL)</label>
//                 <textarea
//                   name="message" rows={4}
//                   className="w-full rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition"
//                   placeholder="Vertel ons iets — waar wil je dit drinken?"
//                 />
//               </div>
//               <label className="flex items-start gap-3 text-xs text-white/65">
//                 <input type="checkbox" required className="mt-0.5 accent-white" />
//                 Ik ben 18 jaar of ouder en wil updates ontvangen van Highball Club.
//               </label>
//               <button type="submit" className="btn-premium w-full rounded-full py-3.5 text-sm font-medium">
//                 Meld me aan
//               </button>
//             </form>
//           )}
//         </div>

//         {/* Contact info */}
//         <div className="w-fade space-y-4">
//           <InfoCard title="E-mail" body="hello@highballclub.nl" />
//           <InfoCard title="Pers & samenwerkingen" body="press@highballclub.nl" />
//           <InfoCard title="Horeca" body="Wil je Highball Club schenken? Neem contact op via horeca@highballclub.nl" />
//           <InfoCard title="Studio" body={"Prinsengracht 263\n1016 GV Amsterdam"} />
//           <div className="rounded-2xl bg-card text-card-foreground p-6 shadow-[var(--shadow-soft)]">
//             <div className="text-xs tracking-[0.2em] text-card-foreground/60">VOLG</div>
//             <div className="mt-3 flex gap-4 text-sm">
//               <a href="#" className="underline underline-offset-4">Instagram</a>
//               <a href="#" className="underline underline-offset-4">LinkedIn</a>
//               <a href="#" className="underline underline-offset-4">TikTok</a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// function Field({ label, name, type = "text", required, placeholder }: {
//   label: string; name: string; type?: string; required?: boolean; placeholder?: string;
// }) {
//   return (
//     <div>
//       <label className="block text-xs tracking-[0.2em] text-white/60 mb-2">{label.toUpperCase()}{required && " *"}</label>
//       <input
//         type={type} name={name} required={required} placeholder={placeholder}
//         className="w-full rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition"
//       />
//     </div>
//   );
// }

// function InfoCard({ title, body }: { title: string; body: string }) {
//   return (
//     <div className="rounded-2xl bg-card text-card-foreground p-6 shadow-[var(--shadow-soft)]">
//       <div className="text-xs tracking-[0.2em] text-card-foreground/60">{title.toUpperCase()}</div>
//       <div className="mt-2 whitespace-pre-line">{body}</div>
//     </div>
//   );
// }
