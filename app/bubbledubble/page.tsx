import type { Metadata } from "next";
import "../bubbledubble-styles.css";
import { getSectionConfig, getMetaData } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";

export async function generateMetadata(): Promise<Metadata> {
  const config = getSectionConfig("bubbledubble");
  const meta = getMetaData();
  const title = config ? `${config.title} | ${meta.author}` : meta.author;
  const description = config?.description ?? undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
    },
  };
}

export default async function BubbleDubblePage() {
  const config = getSectionConfig("bubbledubble");
  if (!config) return null;

  const about = config.about ? (
    <SectionAbout
      about={config.about}
      title={config.title}
      subtitle={config.subtitle}
    />
  ) : (
    <header className="mb-10 border-b border-surface-border pb-2">
      <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
        {config.title}
      </h1>
      <p className="text-lg text-text-muted">{config.subtitle}</p>
    </header>
  );

  const postfeed =
    config.posts != null ? (
      <div data-subsection="posts" className="subsection-panel">
        <SectionPostFeedContent section="bubbledubble" config={config} contentOnly />
      </div>
    ) : null;

  const gigs =
    config.gigs != null ? (
      <div data-subsection="gigs" className="subsection-panel">
        <SectionGigsContent section="bubbledubble" config={config} />
      </div>
    ) : null;

  const videos =
    config.videos != null ? (
      <div data-subsection="videos" className="subsection-panel">
        <SectionVideosContent section="bubbledubble" config={config} />
      </div>
    ) : null;

  return (
    <div className="section-bubbledubble max-w-full">
      {about}
      <div className="flex flex-col gap-12">
        {postfeed}
        {gigs}
        {videos}
      </div>
    </div>
  );
}
