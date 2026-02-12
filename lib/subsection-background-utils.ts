import type { SectionConfig } from "./types";

/** Header height (top-16); background container starts here, so "in view" = overlaps this range. */
const CONTENT_TOP_PX = 64;

export const ENTER_END = 0.12;
export const LEAVE_START = 0.88;
export const OPACITY_MAX = 0.5;

export type SubsectionId = "about" | "posts" | "gigs" | "videos";

/** Progress 0→1: section top at viewport bottom (0) → section bottom at viewport top (1). */
export function sectionProgress(rect: DOMRect, vh: number): number {
  const range = vh + rect.height;
  if (range <= 0) return 0;
  const p = (vh - rect.top) / range;
  return Math.max(0, Math.min(1, p));
}

/** True when section overlaps the content area (below header) where the background is shown. */
export function sectionOverlapsContent(rect: DOMRect, vh: number): boolean {
  return rect.bottom > CONTENT_TOP_PX && rect.top < vh;
}

/** yPercent from progress: 100 = below view, 0 = in view, negative = above view. */
export function progressToYPercent(p: number, rect: DOMRect, vh: number): number {
  if (rect.bottom <= CONTENT_TOP_PX) return -100;
  if (rect.top >= vh) return 100;
  if (sectionOverlapsContent(rect, vh)) return 0;
  if (p <= ENTER_END) return 100 - (p / ENTER_END) * 100;
  if (p >= LEAVE_START) return ((p - LEAVE_START) / (1 - LEAVE_START)) * -100;
  return 0;
}

/** About uses same logic; explicit viewport checks ensure about layer doesn't cover section2 when scrolled past. */
export function aboutProgressToYPercent(p: number, rect: DOMRect, vh: number): number {
  if (rect.bottom <= CONTENT_TOP_PX) return -100;
  if (rect.top >= vh) return 100;
  if (sectionOverlapsContent(rect, vh)) return 0;
  if (p >= LEAVE_START) return ((p - LEAVE_START) / (1 - LEAVE_START)) * -100;
  return 0;
}

/** Progress delta that corresponds to 0.5 * viewport height of scroll. */
export function progressDeltaForHalfVh(rect: DOMRect, vh: number): number {
  const range = vh + rect.height;
  if (range <= 0) return 0;
  return (0.5 * vh) / range;
}

/** Opacity 0..OPACITY_MAX: fade in over last 0.5vh when entering, full when in view, fade out over first 0.5vh when leaving. */
export function sectionOpacity(p: number, rect: DOMRect, vh: number): number {
  const halfVh = progressDeltaForHalfVh(rect, vh);
  const enterFadeEnd = ENTER_END;
  const enterFadeStart = Math.max(0, enterFadeEnd - halfVh);
  const leaveFadeStart = LEAVE_START;
  const leaveFadeEnd = Math.min(1, leaveFadeStart + halfVh);

  if (p <= enterFadeStart) return 0;
  if (p < enterFadeEnd) return OPACITY_MAX * (p - enterFadeStart) / (enterFadeEnd - enterFadeStart);
  if (p <= leaveFadeStart) return OPACITY_MAX;
  if (p < leaveFadeEnd) return OPACITY_MAX * (1 - (p - leaveFadeStart) / (leaveFadeEnd - leaveFadeStart));
  return 0;
}

export function getBackgroundImage(
  config: SectionConfig,
  id: SubsectionId
): string | undefined {
  if (id === "about") return config.about?.["background-image"];
  const block = config[id];
  return block && typeof block === "object" && "background-image" in block
    ? (block["background-image"] as string)
    : undefined;
}
