import type { Metadata } from "next";
import "../sonicarcana-styles.css";
import { getSectionConfig, getMetaData } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { ScrollPinSections } from "@/components/ScrollPinSections";
import { SectionWithBackgrounds } from "@/components/SectionWithBackgrounds";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Sonic Arcana Band";
  const description = "Sonic Arcana Website";
  const openGraph = {
    title: "Sonic Arcana - Psychedelic Dubby Beats",
    description: "News gigs and releases from Sonic Arcana",
    locale: "en_GB",
    type: "website",
    url: "https://andyradburn.co.uk/sonicarcana/",
    siteName: "Sonic Arcana",
    images: [
      {
        url: "https://andyradburn.co.uk/assets/img/sonicarcana/Sonic-Arcana-v2-1080x1080.jpg", // Must be an absolute URL
        width: 1080,
        height: 1080,
      },
    ],
  }
  const robots = {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
    },
  }
  const icons = {
    icon: [
      { url: "/assets/img/sonicarcana/EarthPyramid-Purple-Icon-64x64.png", sizes: '64x64', type: 'image/png' },
      { url: "/assets/img/sonicarcana/EarthPyramid-Purple-Icon-32x32.png", sizes: '32x32', type: 'image/png' },
      { url: "/assets/img/sonicarcana/EarthPyramid-Purple-Icon-16x16.png", sizes: '16x16', type: 'image/png' },
    ],
    //shortcut: "/shortcut-icon.png',
    apple: [
      { url: "/assets/img/sonicarcana/EarthPyramid-Purple-Icon-180x180.png", sizes: '180x180', type: 'image/png' },
    ],
  }
  const twitter = {
    card: "summary_large_image",
    title: "Sonic Arcana Band",
    description: "News gigs and releases from Sonic Arcana",
//     siteId: '??????',
//     creator: '@aradburn',
//     creatorId: '???????',
    images: ["https://andyradburn.co.uk/assets/img/sonicarcana/Kepler-452B-Front-Cover-v10-2048x946.jpg"], // Must be an absolute URL
  }
  const other = {
    "dc.title": "Sonic Arcana Band",
    "dc.description": "News gigs and releases from Sonic Arcana",
    "dc.relation": "https://andyradburn.co.uk/sonicarcana/",
    "dc.source": "https://andyradburn.co.uk/sonicarcana/",
    "dc.language": "en_GB",
  }
  return {
    title,
    description,
    openGraph,
    robots,
    icons,
    twitter,
    other,
    category: 'music',
  };
}

export default async function SonicArcanaPage() {
  const config = getSectionConfig("sonicarcana");
  if (!config) return null;

  const section1 = config.about ? (
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

  const section2 =
    config.posts != null ? (
      <div className="subsection-panel">
        <SectionPostFeedContent section="sonicarcana" config={config} contentOnly />
      </div>
    ) : null;

  const section3 =
    config.gigs != null ? (
      <div className="subsection-panel">
        <SectionGigsContent section="sonicarcana" config={config} />
      </div>
    ) : null;

  const section4 =
    config.videos != null ? (
      <div className="subsection-panel">
        <SectionVideosContent section="sonicarcana" config={config} />
      </div>
    ) : null;

  return (
    <SectionWithBackgrounds config={config} className="section-sonicarcana max-w-full">
      <ScrollPinSections
        section1={section1}
        section2={section2}
        section3={section3}
        section4={section4}
      />
    </SectionWithBackgrounds>
  );
}
