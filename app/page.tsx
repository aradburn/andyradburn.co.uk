import { getSectionConfig } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { ScrollPinSections } from "@/components/ScrollPinSections";
import { SectionWithBackgrounds } from "@/components/SectionWithBackgrounds";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const title = "Andy Radburn";
    const description =
        "Official website of Andy Radburn. News, live dates, and fresh releases from the bands I’m part of - all in one place.";
    const openGraph = {
        title: "Andy Radburn's Website",
        description:
            "News, live dates, and fresh releases from the bands I’m part of - all in one place.",
        locale: "en_GB",
        type: "website",
        url: "https://andyradburn.co.uk",
        siteName: "Andy Radburn",
        images: [
            {
                url: "https://andyradburn.co.uk/assets/img/home/AndyKeyboardv3-750x750.png", // Must be an absolute URL
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
                url: "/assets/img/dubbal/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/assets/img/dubbal/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
        ],
        //shortcut: "/shortcut-icon.png',
        apple: [
            {
                url: "/assets/img/dubbal/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
    const twitter = {
        card: "summary_large_image",
        title: "Andy Radburn",
        description:
            "Official website of Andy Radburn. News, live dates, and fresh releases from the bands I’m part of - all in one place.",
        //     siteId: '??????',
        //     creator: '@aradburn',
        //     creatorId: '???????',
        images: [
            "https://andyradburn.co.uk/assets/img/home/AndyKeyboardv3-750x750.png",
        ], // Must be an absolute URL
    };
    const other = {
        "dc.title": "Andy Radburn",
        "dc.description":
            "Official website of Andy Radburn. News, live dates, and fresh releases from the bands I’m part of - all in one place.",
        "dc.relation": "https://andyradburn.co.uk",
        "dc.source": "https://andyradburn.co.uk",
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

export default async function HomePage() {
    const config = getSectionConfig("home");
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
                    section="home"
                    config={config}
                    contentOnly
                />
            </div>
        ) : null;

    const section3 =
        config.gigs != null ? (
            <div className="subsection-panel">
                <SectionGigsContent section="home" config={config} />
            </div>
        ) : null;

    const section4 =
        config.videos != null ? (
            <div className="subsection-panel">
                <SectionVideosContent section="home" config={config} />
            </div>
        ) : null;

    return (
        <SectionWithBackgrounds
            config={config}
            className="section-home max-w-full"
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
