import Image from "next/image";
import type { SectionAboutConfig } from "@/lib/types";

interface SectionHeroProps {
  about: SectionAboutConfig;
  title: string;
  subtitle: string;
}

export function SectionHero({ about, title, subtitle }: SectionHeroProps) {
  const heading = about.heading ?? title;
  const subheading = about.subheading ?? subtitle;
  const imgSrc = `/${about.image}`;

  return (
    <header className="relative mb-10 overflow-hidden bg-black min-h-[200px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[480px]">
      <Image
        src={imgSrc}
        alt={about.image_alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        priority
      />
      {/*<div className="absolute inset-0 bg-gradient-stage" aria-hidden />*/}
      <div className="absolute inset-0 flex flex-col justify-end px-0 py-6 sm:py-8 md:py-10">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text drop-shadow-md sm:text-4xl md:text-5xl">
          {heading}
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-text-muted drop-shadow sm:text-xl">
          {subheading}
        </p>
      </div>
    </header>
  );
}
