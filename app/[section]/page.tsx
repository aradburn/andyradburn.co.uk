import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import { PostFeedItem } from "@/components/PostFeed";

const SECTIONS: Record<string, { title: string; subtitle: string }> = {
  dubbal: {
    title: "Dubbal",
    subtitle: "Psychedelic Space Rock and Dubby Reggae Beats",
  },
  sonicarcana: {
    title: "Sonic Arcana",
    subtitle: "Electronic Space Ragas and Dubby Eastern Beats",
  },
  bubbledubble: {
    title: "BubbleDubble",
    subtitle: "Live Dubby Electronic Beats",
  },
  collaborations: {
    title: "Collaborations",
    subtitle: "Guest appearances with other bands",
  },
};

export function generateStaticParams() {
  return [
    { section: "dubbal" },
    { section: "sonicarcana" },
    { section: "bubbledubble" },
    { section: "collaborations" },
  ];
}

export default async function SectionPage({
  params,
}: {
  params: { section: string };
}) {
  const { section } = params;
  const config = SECTIONS[section];
  if (!config) notFound();

  const posts = getPostsByCategory(section);
  const postsWithHtml = await Promise.all(
    posts.map(async (post) => ({
      post,
      contentHtml: await markdownToHtml(post.content),
    })),
  );

  return (
    <div className="max-w-full">
      <header className="mb-10 border-b border-surface-border pb-2">
        <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          {config.title}
        </h1>
        <p className="text-lg text-text-muted">{config.subtitle}</p>
      </header>
      <div className="flex flex-col">
        {postsWithHtml.map(({ post, contentHtml }, i) => (
          <div key={`${post.category}-${post.slug}`}>
            {i > 0 &&
                <div className="art-nouveau-divider">

                </div>
            }
            <PostFeedItem post={post} contentHtml={contentHtml} />
          </div>
        ))}
      </div>
    </div>
  );
}
