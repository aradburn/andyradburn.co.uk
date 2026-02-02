import { getPostsByCategory } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import { PostFeedItem } from "@/components/PostFeed";

export default async function HomePage() {
  const posts = getPostsByCategory("home", true);
  const postsWithHtml = await Promise.all(
    posts.map(async (post) => ({
      post,
      contentHtml: await markdownToHtml(post.content),
    })),
  );
  return (
    <div className="max-w-full">
      <header className="mb-10 border-b border-surface-border pb-8">
        <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl md:text-6xl">
          Andy Radburn
        </h1>
        <p className="text-lg text-text-muted sm:text-xl">
          Dubbal, Sonic Arcana, BubbleDubble, Mandala Art and more…
        </p>
      </header>
      <div className="flex flex-col gap-6">
        {postsWithHtml.map(({ post, contentHtml }) => (
          <PostFeedItem
            key={`${post.category}-${post.slug}`}
            post={post}
            contentHtml={contentHtml}
          />
        ))}
      </div>
    </div>
  );
}
