import type { Metadata } from "next";
import "../sonicarcana-styles.css";
import { getSectionConfig, getMetaData } from "@/lib/data";
import { SectionHero } from "@/components/SectionHero";
import { SectionContentStack } from "@/components/SectionContentStack";

export async function generateMetadata(): Promise<Metadata> {
  const config = getSectionConfig("sonicarcana");
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

export default async function SonicArcanaPage() {
  const config = getSectionConfig("sonicarcana");
  if (!config) return null;

  return (
    <div className="section-sonicarcana max-w-full">
      {config.about ? (
        <SectionHero
          about={config.about}
          title={config.title}
          subtitle={config.subtitle}
        />
      ) : (
        <header className="mb-10 border-b border-surface-border pb-2">
          <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
            {config.title}
          </h1>
          <p className="text-lg text-text-muted">{config.subtitle}</p>
        </header>
      )}
      <SectionContentStack section="sonicarcana" config={config} />
    </div>
  );
}
