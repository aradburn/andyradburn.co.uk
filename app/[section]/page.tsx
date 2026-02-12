import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSectionConfig } from "@/lib/data";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";

const SECTION_SLUG = "collaborations";

export const dynamicParams = false;

export function generateStaticParams() {
    return [{ section: SECTION_SLUG }];
}

export async function generateMetadata(): Promise<Metadata> {
    const title = "Andy Radburn";
    const description = "Andy Radburn's Website";
    const openGraph = {
        title: "Andy Radburn",
        description: "News gigs and releases from Andy Radburn",
        locale: "en_GB",
        type: "website",
        url: "https://andyradburn.co.uk/",
        siteName: "Andy Radburn",
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
        title: "Andy Radburn",
        description: "News gigs and releases from Andy Radburn",
        //     siteId: '??????',
        //     creator: '@aradburn',
        //     creatorId: '???????',
        images: [
            "https://andyradburn.co.uk/assets/img/bubbledubble/BubbleDubble-Logo-6v2-2048x946.png",
        ], // Must be an absolute URL
    };
    const other = {
        "dc.title": "Andy Radburn",
        "dc.description": "News gigs and releases from Andy Radburn",
        "dc.relation": "https://andyradburn.co.uk/",
        "dc.source": "https://andyradburn.co.uk/",
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

export default async function SectionPage({
    params,
}: {
    params: Promise<{ section: string }>;
}) {
    const { section } = await params;
    if (section !== SECTION_SLUG) notFound();

    const config = getSectionConfig(section);
    if (!config) notFound();

    return <SectionPostFeedContent section={section} config={config} />;
}
