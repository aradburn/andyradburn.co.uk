import type { Metadata } from "next";
import "../bubbledubble-styles.css";
import { getSectionConfig } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { ScrollPinSections } from "@/components/ScrollPinSections";
import { SectionWithBackgrounds } from "@/components/SectionWithBackgrounds";

export async function generateMetadata(): Promise<Metadata> {
    const title = "BubbleDubble Band";
    const description = "BubbleDubble Website";
    const openGraph = {
        title: "BubbleDubble - Psychedelic Dubby Beats",
        description: "News gigs and releases from BubbleDubble",
        locale: "en_GB",
        type: "website",
        url: "https://andyradburn.co.uk/bubbledubble/",
        siteName: "BubbleDubble",
        images: [
            {
                url: "https://andyradburn.co.uk/assets/img/bubbledubble/logo-v8-black-750x750.png", // Must be an absolute URL
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
            //       "max-video-preview": -1,
            //       "max-image-preview": "large",
            //       "max-snippet": -1,
        },
    };
    const icons = {
        icon: [
            {
                url: "/assets/img/bubbledubble/BubbleDubble-Logo-6v2-64x64.png",
                sizes: "64x64",
                type: "image/png",
            },
            {
                url: "/assets/img/bubbledubble/BubbleDubble-Logo-6v2-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
        //shortcut: "/shortcut-icon.png',
        apple: [
            {
                url: "/assets/img/bubbledubble/BubbleDubble-Logo-6v2-180x180.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
    const twitter = {
        card: "summary_large_image",
        title: "BubbleDubble Band",
        description: "News gigs and releases from BubbleDubble",
        //     siteId: '??????',
        //     creator: '@aradburn',
        //     creatorId: '???????',
        images: [
            "https://andyradburn.co.uk/assets/img/bubbledubble/BubbleDubble-Logo-6v2-2048x946.png",
        ], // Must be an absolute URL
    };
    const other = {
        "dc.title": "BubbleDubble Band",
        "dc.description": "News gigs and releases from BubbleDubble",
        "dc.relation": "https://andyradburn.co.uk/bubbledubble/",
        "dc.source": "https://andyradburn.co.uk/bubbledubble/",
        "dc.language": "en_GB",
    };
    return {
        title,
        description,
        openGraph,
        robots,
        icons,
        twitter,
        other,
        category: "music",
    };
}

export default async function BubbleDubblePage() {
    const config = getSectionConfig("bubbledubble");
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
                    section="bubbledubble"
                    config={config}
                    contentOnly
                />
            </div>
        ) : null;

    const section3 =
        config.gigs != null ? (
            <div className="subsection-panel">
                <SectionGigsContent section="bubbledubble" config={config} />
            </div>
        ) : null;

    const section4 =
        config.videos != null ? (
            <div className="subsection-panel">
                <SectionVideosContent section="bubbledubble" config={config} />
            </div>
        ) : null;

    return (
        <SectionWithBackgrounds
            config={config}
            className="section-bubbledubble max-w-full"
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
