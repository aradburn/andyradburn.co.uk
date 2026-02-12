"use client";

import { useRef, useMemo, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SectionConfig } from "@/lib/types";
import {
  OPACITY_MAX,
  getBackgroundImage,
  progressToYPercent,
  aboutProgressToYPercent,
  sectionOpacity,
  sectionProgress,
} from "@/lib/subsection-background-utils";

gsap.registerPlugin(ScrollTrigger);

const SUBSECTIONS = ["about", "posts", "gigs", "videos"] as const;
type SubsectionId = (typeof SUBSECTIONS)[number];

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
        const atTop = scrollerEl.scrollTop <= 0;
        entries.forEach(({ id }, i) => {
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
          let opacity = sectionOpacity(p, rect, vh);
          if (atTop && i === 0) opacity = Math.max(opacity, OPACITY_MAX);
          gsap.set(layerEl, {
            y: 0,
            yPercent: y,
            opacity,
            zIndex: isInView ? 2 : 1,
          });
        });
      };

      entries.forEach(({ id }, i) => {
        const layerEl = getLayerBySubsectionId(id);
        if (layerEl) gsap.set(layerEl, { y: 0, yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? OPACITY_MAX : 0 });
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
      {entries.map(({ id, bg }, i) => (
        <div
          key={id}
          data-subsection-id={id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat subsection-bg-layer subsection-bg-layer--${id === "about" ? "active" : "below"}`}
          style={{
            backgroundImage: `url(/${bg})`,
            willChange: "transform",
            opacity: i === 0 ? OPACITY_MAX : 0,
          }}
        />
      ))}
    </div>
  );
}
