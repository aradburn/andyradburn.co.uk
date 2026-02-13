import { getGigsByCategory, getGigsForHome } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import type { SectionConfig } from "@/lib/types";

interface SectionGigsContentProps {
  section: string;
  config: SectionConfig;
}

export async function SectionGigsContent({
  section,
  config,
}: SectionGigsContentProps) {
  const gigsConfig = config.gigs;
  if (!gigsConfig) return null;

  const heading = gigsConfig.description ?? `${config.title} Gigs`;
  const gigs =
    section === "home" ? getGigsForHome() : getGigsByCategory(section);
  const gigsWithHtml = await Promise.all(
    gigs.map(async (gig) => ({
      gig,
      contentHtml: await markdownToHtml(gig.content),
    })),
  );

  const contentBlock = (
    <div className="mx-auto min-w-0 max-w-full sm:max-w-max">
      {gigsWithHtml.length !== 0 ? (
        <div className="flex flex-col gap-8">
          {gigsWithHtml.map(({ gig, contentHtml }) => {
            const gig_section_heading = gig.frontMatter.title ?? heading;
            return (
              <article
                key={`${gig.category}-${gig.slug}`}
                className="gigs min-w-0 sm:min-w-sm md:min-w-2xl lg:min-w-3xl xl:min-w-4xl max-w-full rounded-xl border-2 border-surface-border bg-surface-elevated shadow-sm transition-shadow hover:shadow-md px-4 py-4 sm:px-6 sm:py-6 md:px-16 md:py-6"
              >
                <header className="mt-6 mb-6 border-b border-surface-border pb-2">
                  <h1 className="mb-1 text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-display font-bold tracking-tight text-text">
                    {gig_section_heading}
                  </h1>
                </header>

                <div
                  className="prose prose-invert max-w-none break-words overflow-x-hidden prose-a:text-accent"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </article>
            );
          })}
        </div>
      ) : (
        <article
          key={`${config.title}-nogigs`}
          className="gigs min-w-0 sm:min-w-sm md:min-w-2xl lg:min-w-3xl xl:min-w-4xl max-w-full rounded-xl border-2 border-surface-border bg-surface-elevated shadow-sm transition-shadow hover:shadow-md px-4 py-4 sm:px-6 sm:py-6 md:px-16 md:py-6"
        >
            <header className="mt-6 mb-6 border-b border-surface-border pb-2">
              <h1 className="mb-1 text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-display font-bold tracking-tight text-text">
                {heading}
              </h1>
            </header>

            <div
              className="prose prose-invert max-w-none break-words overflow-x-hidden prose-a:text-accent">
              <p className="text-text-muted">
                        No upcoming gigs listed.
              </p>
              <p className="text-text-muted">
                      Check back later or follow us for
                      announcements.
              </p>
            </div>
        </article>

     )}
    </div>
  );

  return (
    <div className="max-w-full">
      {contentBlock}
    </div>
  );
}
