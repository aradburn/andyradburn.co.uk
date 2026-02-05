import type { Metadata } from "next";
import { getSectionConfig } from "@/lib/data";
import { getMetaData } from "@/lib/data";
import { SectionPageContent } from "@/components/SectionPageContent";

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
  return <SectionPageContent section="dubbal" config={config} />;
}
