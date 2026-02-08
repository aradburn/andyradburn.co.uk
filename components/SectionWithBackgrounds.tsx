"use client";

import { useRef } from "react";
import type { SectionConfig } from "@/lib/types";
import { SubsectionBackgroundLayers } from "@/components/SubsectionBackgroundLayers";

interface SectionWithBackgroundsProps {
  config: SectionConfig;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps section page content and renders subsection background layers
 * when config defines background-image for about/posts/gigs/videos.
 * Backgrounds scroll in from below (GSAP) and sit behind content; they
 * do not cover the page header.
 */
export function SectionWithBackgrounds({
  config,
  children,
  className = "",
}: SectionWithBackgroundsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={`relative ${className}`.trim()}>
      <SubsectionBackgroundLayers config={config} containerRef={containerRef} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
