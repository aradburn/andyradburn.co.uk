"use client";

import type { SectionConfig } from "@/lib/types";
import { SubsectionBackgroundLayers } from "@/components/SubsectionBackgroundLayers";

interface SectionWithBackgroundsProps {
  config: SectionConfig;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps section page content and renders subsection background layers.
 * Backgrounds are driven by scroll position of each section (#about, #posts, etc.).
 */
export function SectionWithBackgrounds({
  config,
  children,
  className = "",
}: SectionWithBackgroundsProps) {
  return (
    <div className={`relative ${className}`.trim()}>
      <SubsectionBackgroundLayers config={config} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
