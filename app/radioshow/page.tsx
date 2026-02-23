import type { Metadata } from "next";
import "../radioshow-styles.css";
import { getSectionConfig } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { ScrollPinSections } from "@/components/ScrollPinSections";
import { SectionWithBackgrounds } from "@/components/SectionWithBackgrounds";

export async function generateMetadata(): Promise<Metadata> {
    const title = "Sonic Arcana Radio Show";
    const description = "Sonic Arcana Radio Show Website";
    const openGraph = {
        title: "Sonic Arcana Radio Show - Psychedelic Radio Broadcasts",
        description: "News, playlists and broadcasts from the Sonic Arcana Radio Show",
        locale: "en_GB",
        type: "website",
        url: "https://andyradburn.co.uk/radioshow/",
        siteName: "Sonic Arcana Radio Show",
        images: [
            {
                url: "https://andyradburn.co.uk/assets/img/radioshow/SonicArcanaRadioShow-v2-750x750.png", // Must be an absolute URL
                width: 750,
                height: 750,
            },
        ],
    };
    const robots = {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
    };
    const twitter = {
        card: "summary_large_image",
        title: "Sonic Arcana Radio Show",
        description: "News, playlists and broadcasts from the Sonic Arcana Radio Show",
    };
    const other = {
        "dc.title": "Sonic Arcana Radio Show",
        "dc.description": "News, playlists and broadcasts from the Sonic Arcana Radio Show",
        "dc.relation": "https://andyradburn.co.uk/radioshow/",
        "dc.source": "https://andyradburn.co.uk/radioshow/",
        "dc.language": "en_GB",
    };
    return {
        title,
        description,
        openGraph,
        robots,
        twitter,
        other,
        category: "music",
    };
}

export default async function RadioShowPage() {
    const config = getSectionConfig("radioshow");
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
                <SectionPostFeedContent
                    section="radioshow"
                    config={config}
                    contentOnly
                />
            </div>
        ) : null;

    const section3 =
        config.gigs != null ? (
            <div className="subsection-panel">
                <SectionGigsContent section="radioshow" config={config} />
            </div>
        ) : null;

    const section4 =
        config.videos != null ? (
            <div className="subsection-panel">
                <SectionVideosContent section="radioshow" config={config} />
            </div>
        ) : null;

    return (
        <SectionWithBackgrounds
            config={config}
            className="section-radioshow max-w-full"
        >
            <ScrollPinSections
                section1={section1}
                section2={section2}
                section3={section3}
                section4={section4}
            />
        </SectionWithBackgrounds>
    );
}
