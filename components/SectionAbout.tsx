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
    <header className="mx-auto w-sm sm:w-xl md:w-3xl lg:w-5xl xl:w-7xl min-h-[50vh] min-h-full py-8 sm:py-10 flex flex-col items-center justify-center justify-self-center overflow-hidden bg-gradient-to-b from-black/20 to-black/66">
      <div className="relative w-sm sm:w-sm md:w-3xl max-w-md sm:max-w-md md:max-w-3xl flex-1 min-h-[120px] sm:min-h-[160px]">
        <Image
          src={imgSrc}
          alt={about.image_alt}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 80vw, (max-width: 800px) 60vw, 1200px"
          loading="eager"
          preload={false}
        />
      </div>
      <div className="flex flex-col items-center text-center px-4 mt-4 sm:mt-6">
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-text drop-shadow-md">
          {heading}
        </h1>
        <p className="mt-2 max-w-3xl text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl text-text drop-shadow ">
          {subheading}
        </p>
        <SubsectionNavLinks links={links} />
      </div>
    </header>
  );
}
