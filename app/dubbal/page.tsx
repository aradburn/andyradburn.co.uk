import type { Metadata } from "next";
import "../dubbal-styles.css";
import { getSectionConfig, getMetaData } from "@/lib/data";
import { SectionHero } from "@/components/SectionHero";
import { SectionContentStack } from "@/components/SectionContentStack";
import { ScrollPinSections } from "@/components/ScrollPinSections";

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

  const section1 = config.about ? (
    <SectionHero
      about={config.about}
      title={config.title}
      subtitle={config.subtitle}
    />
  ) : (
    <header className="border-b border-surface-border px-4 pb-2">
      <h1 className="font-display text-4xl font-bold tracking-tight text-text">
        {config.title}
      </h1>
      <p className="text-lg text-text-muted">{config.subtitle}</p>
    </header>
  );

  return (
    <div className="section-dubbal">
      <ScrollPinSections
        section1={section1}
        section2={<SectionContentStack section="dubbal" config={config} />}
      />
    </div>
  );
}
