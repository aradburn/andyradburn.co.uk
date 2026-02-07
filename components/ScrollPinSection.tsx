"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollPinSectionProps {
  children: React.ReactNode;
}

/**
 * Wraps content in a full-height section that pins on scroll, scrubs
 * inner content (fake scroll), then scale/fade out. Based on GSAP
 * CodePen: Slides Pinning - Overscroll Solution.
 */
export function ScrollPinSection({ children }: ScrollPinSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = containerRef.current;
      if (!panel) return;

      const innerpanel = panel.querySelector<HTMLElement>(
        ".scroll-pin-section-inner"
      );
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
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="scroll-pin-section h-[calc(100vh-4rem)] w-full overflow-hidden px-4 sm:px-6 md:px-8"
    >
      <div className="scroll-pin-section-content h-full overflow-hidden">
        <div className="scroll-pin-section-inner h-auto pb-[20vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
