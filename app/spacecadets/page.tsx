import type { Metadata } from "next";
import "../spacecadets-styles.css";
import { buildMetadataForSection, getSectionConfig } from "@/lib/data";
import { SectionAbout } from "@/components/SectionAbout";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";
import { SectionGigsContent } from "@/components/SectionGigsContent";
import { SectionVideosContent } from "@/components/SectionVideosContent";
import { ScrollPinSections } from "@/components/ScrollPinSections";
import { SectionWithBackgrounds } from "@/components/SectionWithBackgrounds";

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadataForSection("spacecadets");
}

export default async function SpaceCadetsPage() {
    const config = getSectionConfig("spacecadets");
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
                    section="spacecadets"
                    config={config}
                    contentOnly
                />
            </div>
        ) : null;

    const section3 =
        config.gigs != null ? (
            <div className="subsection-panel">
                <SectionGigsContent section="spacecadets" config={config} />
            </div>
        ) : null;

    const section4 =
        config.videos != null ? (
            <div className="subsection-panel">
                <SectionVideosContent section="spacecadets" config={config} />
            </div>
        ) : null;

    return (
        <SectionWithBackgrounds
            config={config}
            className="section-spacecadets max-w-full"
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
