import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadataForSection, getSectionConfig } from "@/lib/data";
import { SectionPostFeedContent } from "@/components/SectionPostFeedContent";

const SECTION_SLUG = "collaborations";

export const dynamicParams = false;

export function generateStaticParams() {
    return [{ section: SECTION_SLUG }];
}

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadataForSection(SECTION_SLUG);
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
