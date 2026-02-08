import { getPostsByCategory } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import { PostFeedItem } from "@/components/PostFeed";
import { SectionAbout } from "@/components/SectionAbout";
import type { SectionConfig } from "@/lib/types";

interface SectionPostFeedContentProps {
  section: string;
  config: SectionConfig;
  /** When true, render only the main content (no hero, no page header). Use when hero is rendered as a separate panel. */
  contentOnly?: boolean;
}

export async function SectionPostFeedContent({
  section,
  config,
  contentOnly = false,
}: SectionPostFeedContentProps) {
  const postsConfig = config.posts;
  if (!postsConfig) return null;

  const posts = getPostsByCategory(section);
  const postsWithHtml = await Promise.all(
    posts.map(async (post) => ({
      post,
      contentHtml: await markdownToHtml(post.content),
    })),
  );

  const contentBlock = (
    <div className="mx-auto min-w-0 lg:min-w-5xl max-w-full sm:max-w-max">
      <div className="flex flex-col gap-6">
        {postsWithHtml.map(({ post, contentHtml }) => (
          <div key={`${post.category}-${post.slug}`}>
            <PostFeedItem post={post} contentHtml={contentHtml} />
          </div>
        ))}
      </div>
    </div>
  );

  if (contentOnly) {
    return (
      <div className="max-w-full">
        <header className="mx-auto min-w-0 lg:min-w-5xl max-w-full sm:max-w-max mb-10 border-b border-surface-border pb-2">
          <h2 className="text-center mb-2 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
            {postsConfig.description}
          </h2>
        </header>
        {contentBlock}
      </div>
    );
  }

  return (
    <div className="max-w-full">
      {config.about ? (
        <SectionAbout
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
      {contentBlock}
    </div>
  );
}
