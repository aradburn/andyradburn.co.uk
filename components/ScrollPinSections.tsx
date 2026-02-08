"use client";

const SECTION_IDS = ["about", "posts", "gigs", "videos"] as const;

interface ScrollPinSectionsProps {
  section1?: React.ReactNode | null;
  section2?: React.ReactNode | null;
  section3?: React.ReactNode | null;
  section4?: React.ReactNode | null;
}

/**
 * Four sections that scroll normally (about, posts, gigs, videos).
 * No pin/fade/zoom; background layers are driven by SubsectionBackgroundLayers
 * based on each section's scroll position.
 */
export function ScrollPinSections({
  section1,
  section2,
  section3,
  section4,
}: ScrollPinSectionsProps) {
  const sections = [section1, section2, section3, section4];
  const entries = SECTION_IDS.map((id, i) => ({ id, content: sections[i] })).filter(
    (e): e is { id: (typeof SECTION_IDS)[number]; content: React.ReactNode } =>
      e.content != null
  );

  return (
    <div className="scroll-sections-wrapper">
      {entries.map(({ id, content }, index) => (
        <section
          key={id}
          id={id}
          data-subsection={id}
          className="min-h-[calc(100vh-4rem)] w-full py-12 md:py-16"
        >
          <div
            className={
              index === 0
                ? "flex min-h-[calc(100vh-4rem)] flex-col justify-center"
                : "mx-auto max-w-4xl px-4"
            }
          >
            {content}
          </div>
        </section>
      ))}
    </div>
  );
}
