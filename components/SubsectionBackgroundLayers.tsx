"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SectionConfig } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const SUBSECTIONS = [
  "about",
  "posts",
  "gigs",
  "videos",
] as const;

type SubsectionId = (typeof SUBSECTIONS)[number];

const ENTER_END = 0.12;
const LEAVE_START = 0.88;

function progressToYPercent(p: number): number {
  if (p <= ENTER_END) {
    return 100 - (p / ENTER_END) * 100;
  }
  if (p >= LEAVE_START) {
    return ((p - LEAVE_START) / (1 - LEAVE_START)) * -100;
  }
  return 0;
}

function getBackgroundImage(
  config: SectionConfig,
  id: SubsectionId
): string | undefined {
  if (id === "about") {
    return config.about?.["background-image"];
  }
  const block = config[id];
  return block && typeof block === "object" && "background-image" in block
    ? (block["background-image"] as string)
    : undefined;
}

interface SubsectionBackgroundLayersProps {
  config: SectionConfig;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Renders full-viewport background layers for each subsection that has
 * "background-image" in config. Uses GSAP ScrollTrigger to scroll each
 * image in from below and keep it pinned until the next subsection.
 * Sits below the page header (top: 4rem); does not hide the header.
 */
export function SubsectionBackgroundLayers({
  config,
  containerRef,
}: SubsectionBackgroundLayersProps) {
  const layersRef = useRef<Map<SubsectionId, HTMLDivElement>>(new Map());
  const triggerMapRef = useRef<Map<SubsectionId, ScrollTrigger>>(new Map());

  useGSAP(
    () => {
      const scope = containerRef.current;
      if (!scope) return;

      triggerMapRef.current.clear();

      // Use default scroller (window) so we match ScrollPinSections and the real scroll position.
      SUBSECTIONS.forEach((id) => {
        const bg = getBackgroundImage(config, id);
        const layerEl = layersRef.current.get(id);
        if (!bg || !layerEl) return;

        const triggerEl =
          id === "about"
            ? scope.querySelector("#about") ?? scope.querySelector(".scroll-pin-section")
            : scope.querySelector(`#${id}`);
        if (!triggerEl) return;

        gsap.set(layerEl, { yPercent: 100 });

        const st = ScrollTrigger.create({
          trigger: triggerEl,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(layerEl, { yPercent: progressToYPercent(self.progress) });
          },
        });
        triggerMapRef.current.set(id, st);
      });

      triggerMapRef.current.forEach((st) => st.refresh());

      return () => {
        triggerMapRef.current.forEach((t) => t.kill());
        triggerMapRef.current.clear();
      };
    },
    { scope: containerRef, dependencies: [config] }
  );

  // Reset scroll after mount so we run after Next.js/browser scroll restoration.
  // Then refresh triggers and explicitly sync each layer to "at top" state.
  useEffect(() => {
    const runReset = () => {
      window.scrollTo(0, 0);
      triggerMapRef.current.forEach((st) => st.refresh());
      triggerMapRef.current.forEach((st, id) => {
        const layerEl = layersRef.current.get(id);
        if (layerEl) gsap.set(layerEl, { yPercent: progressToYPercent(st.progress) });
      });
    };
    runReset();
    const t1 = setTimeout(runReset, 0);
    const t2 = setTimeout(runReset, 100);
    const t3 = setTimeout(runReset, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [config]);

  const entries = SUBSECTIONS.map((id) => ({
    id,
    bg: getBackgroundImage(config, id),
  })).filter((e): e is { id: SubsectionId; bg: string } => !!e.bg);

  if (entries.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-16 bottom-0 z-0"
      aria-hidden
    >
      {entries.map(({ id, bg }) => (
        <div
          key={id}
          ref={(el) => {
            if (el) layersRef.current.set(id, el);
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/${bg})`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
