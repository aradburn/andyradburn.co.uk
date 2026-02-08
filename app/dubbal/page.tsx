import type { Metadata } from "next";
import "../dubbal-styles.css";
import { getSectionConfig, getMetaData } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { ScrollPinSections } from "@/components/ScrollPinSections";

export async function generateMetadata(): Promise<Metadata> {
  const config = getSectionConfig("dubbal");
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

export default async function DubbalPage() {
  const config = getSectionConfig("dubbal");
  if (!config) return null;

  const about = config.about ? (
    <SectionAbout
      about={config.about}
      title={config.title}
      subtitle={config.subtitle}
      sectionConfig={config}
    />
  ) : (
    <header className="border-b border-surface-border px-4 pb-2">
      <h1 className="font-display text-4xl font-bold tracking-tight text-text">
        {config.title}
      </h1>
      <p className="text-lg text-text-muted">{config.subtitle}</p>
    </header>
  );

  const postfeed =
    config.posts != null ? (
      <div id="posts" data-subsection="posts" className="subsection-panel">
        <SectionPostFeedContent section="dubbal" config={config} contentOnly />
      </div>
    ) : null;

  const gigs =
    config.gigs != null ? (
      <div id="gigs" data-subsection="gigs" className="subsection-panel">
        <SectionGigsContent section="dubbal" config={config} />
      </div>
    ) : null;

  const videos =
    config.videos != null ? (
      <div id="videos" data-subsection="videos" className="subsection-panel">
        <SectionVideosContent section="dubbal" config={config} />
      </div>
    ) : null;

  return (
    <div className="section-dubbal">
      <ScrollPinSections
        section1={about}
        section2={
          <div className="flex flex-col gap-12">
            {postfeed}
            {gigs}
            {videos}
          </div>
        }
      />
    </div>
  );
}
