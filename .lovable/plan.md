
## Stack note

The Lovable template ships with **TanStack Start (React 19 + Vite 7)**, not plain Vite + React Router. Functionally it's still Vite + React under the hood and fully supports Three.js / R3F / GSAP. I'll build on the existing TanStack Start setup (file-based routing in `src/routes/`) rather than ripping it out — swapping in plain Vite + React Router would break the template's SSR/build pipeline for no real gain. If you specifically need a plain Vite SPA scaffold, say so and I'll regenerate accordingly.

Package manager: the template uses `bun`. I'll use `bun add` (it reads `package.json` the same way npm does, so you can still `npm install` locally afterward).

## Dependencies to install

- `three`, `@react-three/fiber`, `@react-three/drei` — 3D + GLB loading (`useGLTF`)
- `gsap` — includes `ScrollTrigger` plugin; use via `@gsap/react`'s `useGSAP` hook
- `@gsap/react` — official `useGSAP` hook

## Routes (TanStack file-based)

```
src/routes/
  __root.tsx        → shared Nav + Footer, fonts, meta
  index.tsx         → Home
  flavors.tsx       → Product / Flavors page
  story.tsx         → Story page
```

Nav links: Smaken (Flavors) · Verhaal (Story). Logo → Home.

## Design system (src/styles.css)

- Palette: off-white bg `#faf8f3`, ink `#1a2e1f` (deep green), accent lime `#c4d82e`, muted gold, flavor accents: lemon `#f4c430`, yuzu `#7ac142`, ginger `#d4a574`.
- Typography: Cormorant Garamond (display serif, matches can) + Inter (body), loaded via `<link>` in `__root.tsx` head.
- Semantic tokens added: `--background`, `--foreground`, `--accent`, `--lemon`, `--yuzu`, `--ginger`, plus `--shadow-soft`.

## Page 1 — Home (`/`)

1. **Nav** — logo left, links center, "Proef als eerste" CTA right.
2. **Hero** — split: left headline "Niet elke avond verdient om vergeten te worden" + subcopy + 2 CTAs; right an **R3F `<Canvas>`** placeholder with a rotating cylinder stand-in (swap with `useGLTF('/models/can.glb')` once you drop the GLB into `public/models/`). OrbitControls disabled, slow auto-rotate.
3. **Scroll-pinned section** — GSAP ScrollTrigger pins the 3D canvas while text panels fade/slide through (the "scrolling animation" block in the wireframe). Built with `useGSAP` + `ScrollTrigger`.
4. **Info strip** — 5% ABV · 109 kcal · 2g suiker · 250 ml with line icons.
5. **Drie smaken** — 3 cards (Lemon/Yuzu/Ginger) using the uploaded can PNGs, each linking to `/flavors?flavor=lemon` etc.
6. **Momenten gallery** — bento grid using `story1/2/3` + rooftop image.
7. **Waitlist footer** — email signup (UI only, no backend), 18+ disclaimer, HBC seal.

## Page 2 — Flavors (`/flavors`)

1. Header with context copy + small 3D can; tabs Lemon / Yuzu / Ginger (URL-synced).
2. For each flavor (stacked, alternating): large interactive R3F can on one side, info card + flavor profile bars (Freshness / Sweet / Sour) on the other. GSAP scroll animations swap the active can material/tint as you scroll.
3. **Compare table** — Calories / Sugar / Sweetness / Sour / Bitterness / Refreshing across the 3 flavors (dots for intensity).

## Page 3 — Story (`/story`)

1. Header: title + subtitle + poster image (rooftop yuzu shot).
2. 3-up image row (story1/2/3).
3. **Brand Story (General)** — long-form copy block.
4. 3-up image row.
5. **Brand Story (Personal)** — founder note.
6. Footer.

## 3D integration plan

- `src/components/three/CanModel.tsx` — wraps `<Canvas>`, `Stage`, lighting, optional `OrbitControls`. Renders a placeholder `<mesh>` cylinder with the brand label as a texture until your GLB lands.
- Add a clearly-marked TODO + commented `useGLTF('/models/can.glb')` snippet so you can drop your file into `public/models/can.glb` and uncomment.
- `useGLTF.preload()` called at module level for snappy nav.

## GSAP integration plan

- Register `ScrollTrigger` once in `src/lib/gsap.ts`.
- Use `useGSAP({ scope: ref })` per section for auto cleanup.
- Reduced-motion guard: skip ScrollTriggers when `prefers-reduced-motion`.

## Assets

Upload the can PNGs + lifestyle photos via `lovable-assets` (kept out of the repo), referenced through generated `.asset.json` pointers in `src/assets/`.

## Out of scope (ask if you want them)

- Real waitlist backend (would need Lovable Cloud).
- Actual GLB file — I'll wire the loader; you drop the model in `public/models/can.glb`.
- i18n toggle (copy is Dutch like the hi-fi mock).
