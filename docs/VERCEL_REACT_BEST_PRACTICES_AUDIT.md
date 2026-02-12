# Vercel React Best Practices – Project Audit

Audit of andyradburn.co.uk against the Vercel React Best Practices skill (AGENTS.md).  
**Date:** 2026-02-12.

---

## Executive summary

- **Server-side:** Good use of `React.cache()` and `.toSorted()`; layout data is sync and cached.
- **Critical gaps:** Analytics blocks the initial bundle; optional improvements for RSC parallelism and barrel imports.
- **Client-side:** Scroll listeners use passive option; some small wins possible (e.g. Analytics subscriptions).

---

## 1. Eliminating waterfalls

### 1.1–1.4 Defer await / parallelization / API routes

- **Status:** Mostly N/A (static export, sync file-based data).
- **Detail:** No API routes. Data in `lib/data.ts` is synchronous (YAML + markdown from disk). `getMenu`, `getMetaData`, `getSectionsConfig` are wrapped in `React.cache()` for per-request deduplication.

### 1.5 Strategic Suspense boundaries

- **Status:** Partial.
- **Detail:** Layout wraps `<Analytics />` in `<Suspense fallback={null}>`, but Analytics is still a direct import (see Bundle, below). Section content (posts, gigs, videos) is rendered as sibling async components on e.g. `app/home/page.tsx`; in the RSC tree they run **sequentially** (SectionPostFeedContent → SectionGigsContent → SectionVideosContent), so at build time (or in a future SSR scenario) there is a server-side “waterfall” of data + markdown work.
- **Recommendation (optional):** For future SSR or faster builds, consider:
  - Fetching section data in parallel at the page level (e.g. `Promise.all([postsPromise, gigsPromise, videosPromise])`) and passing results into presentational components, or
  - Wrapping each section in its own `<Suspense>` and letting each async section stream independently (faster first paint, possible layout shift).

---

## 2. Bundle size optimization

### 2.1 Avoid barrel file imports

- **Status:** Review.
- **Detail:**
  - **react-social-icons:** `import { SocialIcon } from "react-social-icons"` in `Footer.tsx` and `app/about/page.tsx`. If this package re-exports many icons, it can pull in extra modules.
  - **GSAP:** Imports use `gsap`, `gsap/ScrollTrigger`, `@gsap/react` — subpath imports are good.
- **Recommendation:** Add `optimizePackageImports` in `next.config.ts` for any barrel-heavy packages (e.g. `react-social-icons` if applicable), so you can keep a single import while Next optimizes at build time. See [Next.js optimizePackageImports](https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports).

### 2.3 Defer non-critical third-party libraries

- **Status:** **Needs change.**
- **Detail:** In `app/layout.tsx`, Analytics is imported directly: `import Analytics from "@/components/Analytics"`. That component loads and initializes Swetrix in `useEffect`, but the **Swetrix module is still part of the main client bundle** and can delay TTI/LCP.
- **Recommendation:** Load Analytics after hydration with `next/dynamic` and `ssr: false`:

```tsx
import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@/components/Analytics").then((m) => m.default),
  { ssr: false }
);
```

Then keep `<Suspense fallback={null}><Analytics /></Suspense>` so the chunk loads without blocking the initial shell.

### 2.4 Dynamic imports for heavy components

- **Status:** OK for current scope.
- **Detail:** No heavy editors or large below-the-fold widgets were found. GSAP + ScrollTrigger are used for core scroll UX; lazy-loading them would likely hurt first interaction. Optional: if you add a heavy “extra” (e.g. a chart or editor), load it with `next/dynamic` and `ssr: false`.

---

## 3. Server-side performance

### 3.1 Authenticate server actions

- **Status:** N/A.
- **Detail:** No `"use server"` Server Actions in the project.

### 3.2 Avoid duplicate serialization in RSC props

- **Status:** OK.
- **Detail:** No cases found where the same list/object is passed twice in different shapes (e.g. `usernames` and `usernamesOrdered`) from server to client.

### 3.4 Minimize serialization at RSC boundaries

- **Status:** OK.
- **Detail:** Layout passes `menu` and `meta` to Header/Footer; these are used for nav and logo. If `MenuData`/`MetaData` grow large, consider passing only the fields Header/Footer need.

### 3.5 Parallel data fetching with composition

- **Status:** See §1.5.
- **Detail:** Section components are composed as siblings but execute sequentially in the RSC tree. Parallelization at page level or per-section Suspense would align with this guideline.

### 3.6 Per-request deduplication with React.cache()

- **Status:** **Good.**
- **Detail:** `getMenu`, `getMetaData`, and `getSectionsConfig` in `lib/data.ts` are wrapped with `cache()`. Other helpers (`getPostsByCategory`, etc.) are sync and build on cached config where relevant.

### 3.7 after() for non-blocking work

- **Status:** N/A.
- **Detail:** No route handlers or server actions that do post-response logging/analytics; when you add them, use `after()` so the response is not blocked.

---

## 4. Client-side data fetching

- **Status:** N/A for SWR/global listeners.
- **Detail:** No client-side data fetching (useSWR, etc.); no shared global event subscriptions. Analytics is the only “client data” concern (see §5.2 and §2.3).

---

## 5. Re-render optimization

### 5.2 Defer state reads to usage point

- **Status:** **Improvement possible.**
- **Detail:** `components/Analytics.tsx` uses `usePathname()` and `useSearchParams()` and has an effect that runs when `[pathname, searchParams]` change to call `Swetrix.trackViews()`. If the only goal is to track on route change, you can avoid subscribing to `searchParams` (and extra re-renders on query changes) by reading the URL inside the effect, e.g. `window.location.pathname` and `window.location.search`, and passing them into the tracking call. Then the effect can depend only on `pathname` or a single “route key” you derive.

### 5.3–5.12 useMemo / derived state / setState / refs

- **Status:** OK.
- **Detail:** Header uses `useCallback` with stable deps; no unnecessary `useMemo` for simple primitives found. `SubsectionBackgroundLayers` uses `useMemo` for `entries` (non-trivial `.map().filter()` on config) — appropriate. No obvious derived state in effects that should be computed in render; no scroll/position stored in state where a ref would be better.

---

## 6. Rendering performance

### 6.2 content-visibility for long lists

- **Status:** Optional.
- **Detail:** If any page has very long lists (e.g. many gigs or videos), consider `content-visibility: auto` and `contain-intrinsic-size` on list items to reduce initial layout/paint.

### 6.8 Explicit conditional rendering

- **Status:** OK.
- **Detail:** Section content uses explicit ternaries (e.g. `gigsWithHtml.length !== 0 ? ... : ...`). No `count && <Badge />`-style patterns that could render `0`.

### 6.9 useTransition over manual loading state

- **Status:** N/A.
- **Detail:** No client-side search/filter with manual `isLoading` state; when you add such flows, prefer `useTransition` for non-urgent updates.

---

## 7. JavaScript performance

### 7.12 toSorted() instead of sort()

- **Status:** **Good.**
- **Detail:** `lib/data.ts` uses `.toSorted()` in `getPostsFromDirs`; no `.sort()` on props/state found.

### 7.1–7.11 Layout thrashing / Maps / caching / early returns

- **Status:** OK.
- **Detail:** No interleaved read/write layout patterns found. Scroll handler in `SubsectionBackgroundLayers` uses `getBoundingClientRect()` and then applies GSAP updates; no repeated forced reflows in hot paths. No obvious hot loops that would clearly benefit from index Maps or storage caching in the audited code.

---

## 8. Advanced patterns

### 8.1 Initialize app once

- **Status:** OK.
- **Detail:** Analytics runs in `useEffect` and Swetrix is initialized there; no app-wide “run once” logic that would double-run on Strict Mode remounts. If you add such init, use a module-level guard.

### 8.2–8.3 Event handlers in refs / useEffectEvent

- **Status:** OK.
- **Detail:** Scroll/resize in `SubsectionBackgroundLayers` are set up in `useGSAP` with a stable scope; dependencies are narrow. No obvious need for `useEffectEvent` in the current code.

---

## 9. Other checks

### Passive event listeners (4.2)

- **Status:** **Good.**
- **Detail:** `SubsectionBackgroundLayers.tsx` uses `scrollerEl.addEventListener("scroll", handler, { passive: true })`. Scroll performance guideline is satisfied.

### Hydration

- **Status:** OK.
- **Detail:** No client-only theme or localStorage used in a way that would cause SSR/hydration mismatch or flicker in the audited components.

---

## 10. Prioritized action list

| Priority | Action | Rule / section |
|----------|--------|-----------------|
| **High** | Load Analytics with `next/dynamic(..., { ssr: false })` in layout | §2.3 |
| ~~**Medium**~~ | ~~Optionally reduce Analytics re-renders by reading path/search inside effect instead of useSearchParams~~ **Done:** effect now depends only on `pathname`; `useSearchParams` removed. | §5.2 |
| **Low** | Add `optimizePackageImports` for `react-social-icons` (or switch to direct imports) if the package is a barrel | §2.1 |
| **Low** | For SSR or faster builds: parallelize section data (Promise.all or Suspense per section) on home/section pages | §1.5, §3.5 |

---

## References

- Vercel React Best Practices: `.cursor/skills/vercel-react-best-practices/AGENTS.md`
- Next.js: [optimizePackageImports](https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports), [dynamic](https://nextjs.org/docs/app/api-reference/react/components/dynamic)
- React: [you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect), [useTransition](https://react.dev/reference/react/useTransition)
