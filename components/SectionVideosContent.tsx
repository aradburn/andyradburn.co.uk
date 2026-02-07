import { getVideosByCategory } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import type { SectionConfig } from "@/lib/types";

interface SectionVideosContentProps {
  section: string;
  config: SectionConfig;
}

export async function SectionVideosContent({
  section,
  config,
}: SectionVideosContentProps) {
  const videosConfig = config.videos;
  if (!videosConfig) return null;

  const heading = videosConfig.description ?? `${config.title} Videos`;
  const videos = getVideosByCategory(section);
  const videosWithHtml = await Promise.all(
    videos.map(async (video) => ({
      video,
      contentHtml: await markdownToHtml(video.content),
    })),
  );

  const contentBlock = (
    <div className="mx-auto min-w-0 max-w-full sm:max-w-max">
      {videosWithHtml.length === 0 ? (
        <p className="text-text-muted">No videos yet. Check back later.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {videosWithHtml.map(({ video, contentHtml }) => {
            const video_section_heading = video.frontMatter.title ?? heading;
            return (
              <article
                key={`${video.category}-${video.slug}`}
                className="videos min-w-4xl w-full max-w-full rounded-xl border-2 border-surface-border bg-surface-elevated py-4 px-8 shadow-sm transition-shadow hover:shadow-md sm:py-6 sm:px-6"
              >
                <header className="mb-6 border-b border-surface-border pb-2">
                  <h1 className="mb-1 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                    {video_section_heading}
                  </h1>
                </header>

                <div
                  className="prose prose-invert px-8 py-8 mb-8 max-w-none break-words overflow-x-hidden prose-a:text-accent [&_.video-container]:my-8 [&_.video-content]:aspect-video [&_.video-content]:w-full [&_.video-content]:mx-auto [&_.video-content]:max-w-4xl"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </article>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-full">
      {contentBlock}
    </div>
  );
}
