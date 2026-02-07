import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import type { SectionConfig } from "@/lib/types";

/** Class for each subsection panel; use same class when splitting into separate scroll sections later. */
export const SUBSECTION_PANEL_CLASS = "section-subsection-panel";

interface SectionContentStackProps {
  section: string;
  config: SectionConfig;
}

/**
 * Renders posts, gigs, and videos in one scrollable stack.
 * Each subsection is wrapped in a panel with data-subsection so you can later
 * split into separate ScrollPinSections (section2, section3, section4) by
 * passing each subsection component directly as section2/section3/section4.
 */
export async function SectionContentStack({
  section,
  config,
}: SectionContentStackProps) {
  const posts =
    config.posts != null ? (
      <div data-subsection="posts" className={SUBSECTION_PANEL_CLASS}>
        <SectionPostFeedContent section={section} config={config} contentOnly />
      </div>
    ) : null;

  const gigs =
    config.gigs != null ? (
      <div data-subsection="gigs" className={SUBSECTION_PANEL_CLASS}>
        <SectionGigsContent section={section} config={config} />
      </div>
    ) : null;

  const videos =
    config.videos != null ? (
      <div data-subsection="videos" className={SUBSECTION_PANEL_CLASS}>
        <SectionVideosContent section={section} config={config} />
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-12">
      {posts}
      {gigs}
      {videos}
    </div>
  );
}
