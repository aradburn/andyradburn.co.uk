"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export interface SubsectionLink {
  id: string;
  label: string;
}

interface SubsectionNavLinksProps {
  links: SubsectionLink[];
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  const scroller = document.getElementById("main-content");
  if (!el || !scroller) return;
  gsap.to(scroller, {
    duration: 1.2,
    scrollTo: { y: el, offsetY: 80 },
    ease: "power2.inOut",
    overwrite: "auto",
  });
}

export function SubsectionNavLinks({ links }: SubsectionNavLinksProps) {
  if (links.length === 0) return null;

  return (
    <nav
      className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8"
      aria-label="Jump to section"
    >
      {links.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollToSection(id)}
          className="text-text-muted hover:text-text focus:text-text focus:outline-none focus:ring-2 focus:ring-text/50 rounded px-1 py-0.5 text-base font-medium underline-offset-4 transition-colors hover:underline sm:text-lg md:text-3xl"
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
