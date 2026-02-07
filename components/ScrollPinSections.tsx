"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollPinSectionsProps {
  /** Section 1: viewport-sized panel (e.g. hero). Pins then scale/fade. */
  section1: React.ReactNode;
  /**
   * Section 2: long content panel. Pins, inner fake-scroll, then scale/fade.
   * To split into separate scroll panels later: add optional section3, section4
   * and pass each subsection (SectionPostFeedContent, SectionGigsContent,
   * SectionVideosContent) as its own prop.
   */
  section2: React.ReactNode;
}

const SECTION_CLASS = "scroll-pin-section";
const INNER_CLASS = "scroll-pin-section-inner";

/**
 * Two-panel scroll animation: Section 1 (CodePen "Section 1") = hero,
 * Section 2 (CodePen "Section 2") = long scrolling content. Based on
 * GSAP CodePen: Slides Pinning - Overscroll Solution.
 */
export function ScrollPinSections({ section1, section2 }: ScrollPinSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = containerRef.current;
      if (!scope) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        `.${SECTION_CLASS}`,
        scope
      );

      panels.forEach((panel) => {
        const innerpanel = panel.querySelector<HTMLElement>(`.${INNER_CLASS}`);
        if (!innerpanel) return;

        const panelHeight = innerpanel.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;
        const fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = `${panelHeight * fakeScrollRatio}px`;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: fakeScrollRatio
              ? `+=${innerpanel.offsetHeight}`
              : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
          },
        });

        if (fakeScrollRatio) {
          tl.to(innerpanel, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }
        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: 0.9 }
        ).to(panel, { opacity: 0, duration: 0.1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="scroll-pin-sections-wrapper">
      <div
        className={`${SECTION_CLASS} h-[calc(100vh-4rem)] w-full overflow-hidden`}
      >
        <div className="h-full overflow-hidden">
          <div
            className={`${INNER_CLASS} h-full flex flex-col justify-center`}
          >
            {section1}
          </div>
        </div>
      </div>
      <div
        className={`${SECTION_CLASS} h-[calc(100vh-4rem)] w-full overflow-hidden`}
      >
        <div className="h-full overflow-hidden">
          <div className={`${INNER_CLASS} h-auto pb-[20vh]`}>
            {section2}
          </div>
        </div>
      </div>
    </div>
  );
}
