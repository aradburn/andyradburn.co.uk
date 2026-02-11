import Image from "next/image";
import type { SectionAboutConfig, SectionConfig } from "@/lib/types";
import { SubsectionNavLinks } from "@/components/SubsectionNavLinks";

interface SectionAboutProps {
  about: SectionAboutConfig;
  title: string;
  subtitle: string;
  /** When provided, styled links to each non-null subsection (posts → News, gigs, videos) are shown. */
  sectionConfig?: SectionConfig | null;
}

function subsectionLinks(config: SectionConfig): { id: string; label: string }[] {
  const links: { id: string; label: string }[] = [];
  if (config.posts != null) links.push({ id: "posts", label: "News" });
  if (config.gigs != null) links.push({ id: "gigs", label: "Gigs" });
  if (config.videos != null) links.push({ id: "videos", label: "Videos" });
  return links;
}

export function SectionAbout({ about, title, subtitle, sectionConfig }: SectionAboutProps) {
  const heading = about.heading ?? title;
  const subheading = about.subheading ?? subtitle;
  const imgSrc = `/${about.image}`;
  const links = sectionConfig ? subsectionLinks(sectionConfig) : [];

  return (
    <header className="mx-auto flex w-7xl min-h-[50vh] min-h-full flex-col items-center justify-center justify-self-center overflow-hidden bg-gradient-to-b from-black/20 to-black/66 py-8 sm:py-10">
      <div className="relative w-3xl max-w-3xl flex-1 min-h-[120px] sm:min-h-[160px]">
        <Image
          src={imgSrc}
          alt={about.image_alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 800px) 60vw, 1200px"
          priority
        />
      </div>
      <div className="flex flex-col items-center text-center px-4 mt-4 sm:mt-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text drop-shadow-md sm:text-4xl md:text-5xl">
          {heading}
        </h1>
        <p className="mt-2 max-w-3xl text-lg text-text drop-shadow sm:text-3xl">
          {subheading}
        </p>
        <SubsectionNavLinks links={links} />
      </div>
    </header>
  );
}
