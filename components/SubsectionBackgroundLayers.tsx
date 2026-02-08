"use client";

import { useRef, useMemo, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SectionConfig } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const SUBSECTIONS = ["about", "posts", "gigs", "videos"] as const;
type SubsectionId = (typeof SUBSECTIONS)[number];

const ENTER_END = 0.12;
const LEAVE_START = 0.88;

/** Header height (top-16); background container starts here, so "in view" = overlaps this range. */
const CONTENT_TOP_PX = 64;

/** Progress 0→1: section top at viewport bottom (0) → section bottom at viewport top (1). */
function sectionProgress(rect: DOMRect, vh: number): number {
  const range = vh + rect.height;
  if (range <= 0) return 0;
  const p = (vh - rect.top) / range;
  return Math.max(0, Math.min(1, p));
}

/** True when section overlaps the content area (below header) where the background is shown. */
function sectionOverlapsContent(rect: DOMRect, vh: number): boolean {
  return rect.bottom > CONTENT_TOP_PX && rect.top < vh;
}

/** yPercent from progress: 100 = below view, 0 = in view, negative = above view. */
function progressToYPercent(p: number, rect: DOMRect, vh: number): number {
  if (rect.bottom <= CONTENT_TOP_PX) return -100;
  if (rect.top >= vh) return 100;
  if (sectionOverlapsContent(rect, vh)) return 0;
  if (p <= ENTER_END) return 100 - (p / ENTER_END) * 100;
  if (p >= LEAVE_START) return ((p - LEAVE_START) / (1 - LEAVE_START)) * -100;
  return 0;
}

/** About uses same logic; explicit viewport checks ensure about layer doesn't cover section2 when scrolled past. */
function aboutProgressToYPercent(p: number, rect: DOMRect, vh: number): number {
  if (rect.bottom <= CONTENT_TOP_PX) return -100;
  if (rect.top >= vh) return 100;
  if (sectionOverlapsContent(rect, vh)) return 0;
  if (p >= LEAVE_START) return ((p - LEAVE_START) / (1 - LEAVE_START)) * -100;
  return 0;
}

function getBackgroundImage(
  config: SectionConfig,
  id: SubsectionId
): string | undefined {
  if (id === "about") return config.about?.["background-image"];
  const block = config[id];
  return block && typeof block === "object" && "background-image" in block
    ? (block["background-image"] as string)
    : undefined;
}

interface SubsectionBackgroundLayersProps {
  config: SectionConfig;
}

/**
 * Renders fixed background layers, one per subsection with a background image.
 * ScrollTrigger (scrubbed to scroll) drives each layer's yPercent so the correct
 * background is shown and effectively pinned for the visible foreground section.
 */
export function SubsectionBackgroundLayers({
  config,
}: SubsectionBackgroundLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const rafIdRef = useRef<number>(0);

  const entries = useMemo(
    () =>
      SUBSECTIONS.map((id) => ({
        id,
        bg: getBackgroundImage(config, id),
      })).filter((e): e is { id: SubsectionId; bg: string } => !!e.bg),
    [config]
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      const scrollerEl = document.getElementById("main-content");
      if (!container || !scrollerEl || entries.length === 0) return;

      const getLayerBySubsectionId = (subsectionId: string) =>
        container.querySelector<HTMLDivElement>(
          `[data-subsection-id="${subsectionId}"]`
        );

      const updateLayers = (wrapper: Element) => {
        const vh = window.innerHeight;
        entries.forEach(({ id }) => {
          const layerEl = getLayerBySubsectionId(id);
          const sectionEl =
            wrapper.querySelector(`section#${id}`) ??
            wrapper.querySelector(`section[data-subsection="${id}"]`);
          if (!sectionEl || !layerEl) return;
          const rect = sectionEl.getBoundingClientRect();
          const p = sectionProgress(rect, vh);
          const y =
            id === "about"
              ? aboutProgressToYPercent(p, rect, vh)
              : progressToYPercent(p, rect, vh);
          const isInView = y === 0;
          gsap.set(layerEl, {
            y: 0,
            yPercent: y,
            zIndex: isInView ? 2 : 1,
          });
        });
      };

      entries.forEach(({ id }, i) => {
        const layerEl = getLayerBySubsectionId(id);
        if (layerEl) gsap.set(layerEl, { y: 0, yPercent: i === 0 ? 0 : 100 });
      });

      let retries = 0;
      const maxRetries = 60;
      const setup = () => {
        const wrapper = document.querySelector(".scroll-sections-wrapper");
        if (!wrapper && retries < maxRetries) {
          retries++;
          rafIdRef.current = requestAnimationFrame(setup);
          return;
        }
        if (!wrapper) return;
        const handler = () => updateLayers(wrapper);
        scrollHandlerRef.current = handler;
        updateLayers(wrapper);
        if (triggerRef.current) return;
        triggerRef.current = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scroller: scrollerEl,
          onUpdate: handler,
        });
        scrollerEl.addEventListener("scroll", handler, { passive: true });
        ScrollTrigger.refresh();
      };

      rafIdRef.current = requestAnimationFrame(() => {
        requestAnimationFrame(setup);
      });

      const onResize = () => {
        const wrapper = document.querySelector(".scroll-sections-wrapper");
        if (wrapper) updateLayers(wrapper);
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(rafIdRef.current);
        triggerRef.current?.kill();
        triggerRef.current = null;
        const handler = scrollHandlerRef.current;
        if (handler) scrollerEl.removeEventListener("scroll", handler);
        scrollHandlerRef.current = null;
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: containerRef, dependencies: [entries] }
  );

  // When this component mounts or config changes, the new section content is in the DOM.
  // Reset scroll and refresh so we reliably start at top (especially when moving to a shorter section).
  useEffect(() => {
    const scroller = document.getElementById("main-content");
    const run = () => {
      if (scroller) scroller.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
    return () => cancelAnimationFrame(rafId);
  }, [config?.title]);

  if (entries.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed left-0 right-0 top-16 bottom-0 z-0"
      aria-hidden
    >
      {entries.map(({ id, bg }) => (
        <div
          key={id}
          data-subsection-id={id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat subsection-bg-layer subsection-bg-layer--${id === "about" ? "active" : "below"}`}
          style={{
            backgroundImage: `url(/${bg})`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
