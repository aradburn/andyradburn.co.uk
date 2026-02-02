import { getDiscographyPosts } from "@/lib/data";
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
    <div className="max-w-full">
      <header className="mb-10 border-b border-surface-border pb-8">
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
