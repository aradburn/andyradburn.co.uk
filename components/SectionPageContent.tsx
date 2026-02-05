import { getPostsByCategory } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import { PostFeedItem } from "@/components/PostFeed";
import { SectionHero } from "@/components/SectionHero";
import type { SectionConfig } from "@/lib/types";

interface SectionPageContentProps {
  section: string;
  config: SectionConfig;
}

export async function SectionPageContent({
  section,
  config,
}: SectionPageContentProps) {
  const posts = getPostsByCategory(section);
  const postsWithHtml = await Promise.all(
    posts.map(async (post) => ({
      post,
      contentHtml: await markdownToHtml(post.content),
    })),
  );

  return (
    <div className="max-w-full">
      {config.hero ? (
        <SectionHero
          hero={config.hero}
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
      <div className="mx-auto min-w-0 max-w-full sm:max-w-max">
          <div className="flex flex-col gap-6">
            {postsWithHtml.map(({ post, contentHtml }) => (
              <div key={`${post.category}-${post.slug}`}>
                <PostFeedItem post={post} contentHtml={contentHtml} />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
