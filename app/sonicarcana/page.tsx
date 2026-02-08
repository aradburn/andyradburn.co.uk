import type { Metadata } from "next";
import "../sonicarcana-styles.css";
import { getSectionConfig, getMetaData } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { SectionWithBackgrounds } from "@/components/SectionWithBackgrounds";

export async function generateMetadata(): Promise<Metadata> {
  const config = getSectionConfig("sonicarcana");
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

export default async function SonicArcanaPage() {
  const config = getSectionConfig("sonicarcana");
  if (!config) return null;

  const about = config.about ? (
    <section id="about" data-subsection="about">
      <SectionAbout
        about={config.about}
        title={config.title}
        subtitle={config.subtitle}
        sectionConfig={config}
      />
    </section>
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
      <div id="posts" data-subsection="posts" className="subsection-panel">
        <SectionPostFeedContent section="sonicarcana" config={config} contentOnly />
      </div>
    ) : null;

  const gigs =
    config.gigs != null ? (
      <div id="gigs" data-subsection="gigs" className="subsection-panel">
        <SectionGigsContent section="sonicarcana" config={config} />
      </div>
    ) : null;

  const videos =
    config.videos != null ? (
      <div id="videos" data-subsection="videos" className="subsection-panel">
        <SectionVideosContent section="sonicarcana" config={config} />
      </div>
    ) : null;

  return (
    <SectionWithBackgrounds config={config} className="section-sonicarcana max-w-full">
      {about}
      <div className="flex flex-col gap-12">
        {postfeed}
        {gigs}
        {videos}
      </div>
    </SectionWithBackgrounds>
  );
}
