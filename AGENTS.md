# AGENTS.md — i5.xyz Landing Page

## Project Identity

**i5.xyz** — "Weaponized Signals": a dark-themed, neon-cyan-green marketing landing page for an intelligence-native crypto trading network. Single-page app with 8 sections (Hero, AlphaFeed, IntelligenceStack, CoreFeatures, Edge, BuiltForTraders, IntelligenceNetwork, Footer). Deployed to GitHub Pages at `/i5_20` basename.

## Essential Commands

| Command | Action |
|---------|--------|
| `bun install` | Install deps (uses Bun, not npm/pnpm/yarn) |
| `bun run dev` | Vite dev server with HMR |
| `bun run build` | `tsc -b && vite build` (type-check **then** build) |
| `bun run lint` | ESLint flat config |
| `bun run preview` | Vite preview of production build |

**CI**: GitHub Actions on push to `main` — runs `bun install --frozen-lockfile`, then `bun run build`, deploys `./dist` to GitHub Pages.

## Architecture & Key Patterns

```
src/
├── api/            Axios instance + interceptors (logs via logger)
├── assets/         Images, SVGs, MP4/WebM videos
├── components/     Reusable: Navbar, ThemeProvider, ThemeToggleButton, Button
├── hooks/          useUser (TanStack Query + Zod validation)
├── layouts/        RootLayout (Navbar + Outlet + CRT/noise overlays)
├── lib/            logger.ts (structured console with groupCollapsed)
├── pages/          HomePage + NotFoundPage
│   └── homepage/sections/   8 section components
├── providers/      QueryProvider (TanStack, staleTime=5min, retry=1)
├── store/          Zustand with persist (localStorage)
└── types/          Zod schemas (User, LoginForm) + inferred TS types
```

### GSAP Animation Pattern (Critical Gotchas)

Every section follows this exact pattern:

```tsx
gsap.registerPlugin(ScrollTrigger);

function Section() {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ... animations ...
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => { /* desktop animations */ });
      mm.add("(max-width: 767px)", () => { /* mobile animations */ });
    }, containerRef);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200); // layout shift workaround
    return () => { ctx.revert(); clearTimeout(timer); };
  }, []);
}
```

**Known gotchas from git history:**
- **Don't mix React `isMobile` state with GSAP animations** for visibility/opacity — use `gsap.matchMedia()` instead. React re-renders cause race conditions with ScrollTrigger timeline playheads.
- **Mobile overflow containers + row GSAP animations = opacity conflicts**. On mobile, bypass row-level animations entirely (only animate the parent container) when the section uses horizontal scroll (`overflow-x-auto`).
- **ScrollTrigger scoping**: Both `trigger` and the animation target selector must resolve within the correct container. When sections are inside a flex/grid column layout, `trigger: containerRef.current` can mis-scope. Double-check by adding `ScrollTrigger.refresh()` after a timeout.
- All sections use `start: 'top 85%'`, `toggleActions: 'play none none none'`.

### Responsive Design

- **Zoom content utility** (`src/index.css:239`): On desktop viewports between 1024px-1600px, `.zoom-content { zoom: 0.82 }` scales down sections (excluding Navbar/Footer). Affects all page content inside the HomePage wrapper.
- **Breakpoint**: `md` (768px) is the primary responsive breakpoint for layout switches between desktop grid and mobile stack/scroll views.
- **Navbar**: Fixed top, `h-16` mobile / `h-20` desktop. Scroll offsets account for this: `navOffset = window.innerWidth < 768 ? 64 : 80`.

### Tailwind v4 Specifics

- Uses `@import "tailwindcss"` (v4 syntax), **not** `@tailwind` directives.
- Custom `@theme` block with OKLCH color variables — note the values use raw OKLCH components (e.g., `--primary: 0.88 0.25 165`), not standard hex/rgb.
- Custom animations defined in `@theme`: marquee, scanline, flicker, noise.
- Fonts: `font-display` (Archivo Black), `font-heading` (Syne, uppercase), `font-body` (Space Grotesk), `font-mono` (Share Tech Mono), `font-inter` (Inter).
- Design aesthetic utilities in `index.css`: `.text-glitch`, `.crt-scanline`, `.terminal-grain`, `.dapp-grid`, `.glow-cyan-green`, `.stack-layer-card`.

### State & Persistence

- **Zustand stores** in `src/store/` use `persist` middleware to localStorage.
- Theme is **locked to `'dark'` by default** — `useThemeStore` initializes `theme: 'dark'`, and `RootLayout` also adds `document.documentElement.classList.add('dark')` on mount.
- CRT mode: default `true`, toggles scanline overlay + flicker animation.
- localStorage keys: `theme-storage`, `app-storage`.

### Styling Conventions

- Sections use `border-b border-white/10` dividers, `bg-black` or near-black variants (`bg-[#030304]`).
- Primary color (`#00ffcc`) applied as both Tailwind class `text-primary` / `bg-primary` and inline shadow effects.
- Each section has a full-viewport-width background with `max-w-7xl mx-auto` centered content.
- Character scrambling animation (`ScrambleText` component in Edge.tsx) used for HUD telemetry effect.

### Commit Style

Conventional commits: `type(scope): description`
- Types observed: `fix`, `style`
- Scopes: `sections`, `Edge`, `BuiltForTraders`, `Navbar`, `HeroSection`, `IntelligenceStack`

## Non-Obvious Details

- **No test framework** exists — don't try to run tests.
- **`App.css`** contains legacy template styles from the Vite starter. It is imported but much of it is unused by the actual app. Don't assume it reflects current styling.
- **ESLint** uses flat config (`eslint.config.js`) with `typescript-eslint` recommended rules.
- **Router basename**: `import.meta.env.DEV ? '/' : '/i5_20'` — local dev uses `/`, production GitHub Pages uses repo name prefix.
- **TypeScript strict**: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `verbatimModuleSyntax: true`, `erasableSyntaxOnly: true`.
- Video autoplay workaround in HeroSection: listens for first user interaction (click/touch/scroll/keydown) to unmute/play videos blocked by browser autoplay policy.
- `offpkg_docs/` contains generated package reference docs — not part of the app source code.
- API is stubbed (base URL `https://api.example.com`) — not a real backend endpoint in this repo.
