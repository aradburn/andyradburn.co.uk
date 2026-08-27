import { getDiscographyPosts } from "@/lib/data";
import "../discography-styles.css";
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
        <div className="section-discography
                        mx-auto w-sm sm:w-xl md:w-3xl lg:w-5xl xl:w-7xl
                        max-w-full min-h-[60vh] min-h-full
                        py-8 sm:py-20
                        flex flex-col items-center justify-center justify-self-center
                        overflow-hidden
                        ">
            <header className="mx-auto min-w-0 sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-5xl max-w-full sm:max-w-max
                               mt-10 mb-10 p-12 border-b border-surface-border pb-2
                               bg-gradient-to-b from-black/20 to-black/66">
                <h1 className="font-display text-center
                               text-4xl md:text-5xl font-bold tracking-tight text-text ">
                    Discography
                </h1>
                <h2 className="mx-auto text-center mt-4 text-2xl text-text-muted">
                    Andy Radburn&apos;s
                </h2>
                <h2 className="mx-auto text-center mt-1 text-2xl text-text-muted">
                    Releases and recordings
                </h2>
            </header>
            <div className="flex flex-col gap-6 bg-gradient-to-b from-black/30 to-black/30">
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
