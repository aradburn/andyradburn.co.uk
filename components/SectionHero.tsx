import Image from "next/image";
import type { SectionHeroConfig } from "@/lib/types";

interface SectionHeroProps {
  hero: SectionHeroConfig;
  title: string;
  subtitle: string;
}

export function SectionHero({ hero, title, subtitle }: SectionHeroProps) {
  const heading = hero.heading ?? title;
  const subheading = hero.subheading ?? subtitle;
  const imgSrc = `/${hero.image}`;

  return (
    <header className="relative mb-10 overflow-hidden rounded-xl border-2 border-surface-border min-h-[200px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[480px]">
      <Image
        src={imgSrc}
        alt={hero.image_alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-stage" aria-hidden />
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
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
