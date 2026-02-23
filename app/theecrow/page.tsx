import type { Metadata } from "next";
import "../theecrow-styles.css";
import { getSectionConfig } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { ScrollPinSections } from "@/components/ScrollPinSections";
import { SectionWithBackgrounds } from "@/components/SectionWithBackgrounds";

export async function generateMetadata(): Promise<Metadata> {
    const title = "Thee CROW";
    const description = "Thee CROW Website";
    const openGraph = {
        title: "Thee CROW - Dark Psychedelic Sounds",
        description: "News, gigs and releases from Thee CROW",
        locale: "en_GB",
        type: "website",
        url: "https://andyradburn.co.uk/theecrow/",
        siteName: "Thee CROW",
        images: [
            {
                url: "https://andyradburn.co.uk/assets/img/theecrow/TheeCrowLogo-Black-512x512.png",
                width: 512,
                height: 512,
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
        title: "Thee CROW",
        description: "News, gigs and releases from Thee CROW",
    };
    const other = {
        "dc.title": "Thee CROW",
        "dc.description": "News, gigs and releases from Thee CROW",
        "dc.relation": "https://andyradburn.co.uk/theecrow/",
        "dc.source": "https://andyradburn.co.uk/theecrow/",
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

export default async function TheeCrowPage() {
    const config = getSectionConfig("theecrow");
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
                    section="theecrow"
                    config={config}
                    contentOnly
                />
            </div>
        ) : null;

    const section3 =
        config.gigs != null ? (
            <div className="subsection-panel">
                <SectionGigsContent section="theecrow" config={config} />
            </div>
        ) : null;

    const section4 =
        config.videos != null ? (
            <div className="subsection-panel">
                <SectionVideosContent section="theecrow" config={config} />
            </div>
        ) : null;

    return (
        <SectionWithBackgrounds
            config={config}
            className="section-theecrow max-w-full"
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
