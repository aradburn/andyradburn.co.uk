import { getDiscographyPosts } from "@/lib/data";
import "../base-styles.css";
import { markdownToHtml } from "@/lib/markdown";
import { DiscographyEntry } from "@/components/PostFeed";

export default async function DiscographyPage() {
  const posts = getDiscographyPosts();
  const postsWithHtml = await Promise.all(
    posts.map(async (post) => ({
      post,
      contentHtml: await markdownToHtml(post.content),
    })),
  );
  return (
    <div className="mx-auto w-sm sm:w-xl md:w-3xl lg:w-5xl xl:w-7xl max-w-full min-h-[60vh] min-h-full py-8 sm:py-20 flex flex-col items-center justify-center justify-self-center overflow-hidden bg-gradient-to-b from-black/20 to-black/66">
      <header className="mb-10 border-b border-surface-border pb-2">
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Discography
        </h1>
        <p className="mt-2 text-lg text-text-muted">Releases and recordings</p>
      </header>
      <div className="flex flex-col gap-6">
        {postsWithHtml.map(({ post, contentHtml }) => (
          <DiscographyEntry
            key={`${post.category}-${post.slug}`}
            post={post}
            contentHtml={contentHtml}
          />
        ))}
      </div>
    </div>
  );
}
