import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSectionConfig, getMetaData } from "@/lib/data";
import { SectionPageContent } from "@/components/SectionPageContent";

const SECTION_SLUG = "collaborations";

export function generateStaticParams() {
  return [{ section: SECTION_SLUG }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  if (section !== SECTION_SLUG) return {};
  const config = getSectionConfig(section);
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

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section !== SECTION_SLUG) notFound();

  const config = getSectionConfig(section);
  if (!config) notFound();

  return <SectionPageContent section={section} config={config} />;
}
