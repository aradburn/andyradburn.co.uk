import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";

function PostTitleLink({
  post,
  children,
  inline,
}: {
  post: Post;
  children: React.ReactNode;
  inline?: boolean;
}) {
  const external = !!post.frontMatter.external_url;
  if (inline && !external) return <>{children}</>;
  if (external) {
    return (
      <a
        href={post.frontMatter.external_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return <Link href={`/${post.category}/${post.slug}/`}>{children}</Link>;
}

export function PostFeedItem({
  post,
  showImage = true,
  contentHtml,
}: {
  post: Post;
  showImage?: boolean;
  /** When set, full content is shown on this page (no link to post page). */
  contentHtml?: string;
}) {
  const imgSrc = post.frontMatter.image ? `/${post.frontMatter.image}` : null;
  const fullContent = !!contentHtml;
  const external = !!post.frontMatter.external_url;

  return (
    <article className="w-full rounded-xl border border-surface-border bg-surface-elevated/80 py-6 px-6 shadow-sm transition-shadow hover:shadow-md hover:border-accent/30">
      <header>
        {post.frontMatter.date && (
          <p className="text-right text-sm text-text-muted">
            {post.frontMatter.date}
          </p>
        )}
        <h2 className="mb-2 font-display text-xl font-semibold tracking-tight">
          <PostTitleLink post={post} inline={fullContent}>
            {post.frontMatter.title}
          </PostTitleLink>
        </h2>
      </header>
      {showImage && imgSrc && (
        <figure className="my-4 max-w-full overflow-hidden rounded-lg">
          <Image
            src={imgSrc}
            alt={post.frontMatter.image_alt || post.frontMatter.title}
            width={192}
            height={192}
            className="max-h-[80vh] w-auto max-w-full"
          />
        </figure>
      )}
      <section className="text-text">
        {fullContent && contentHtml ? (
          <div
            className="prose prose-invert max-w-none prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : post.frontMatter.description ? (
          <p>{post.frontMatter.description}</p>
        ) : (
          <p className="line-clamp-3">{post.excerpt}</p>
        )}
        {!fullContent && (
          <p className="mt-2">
            <PostTitleLink post={post} inline={false}>
              {post.frontMatter.external_name
                ? `Read more on ${post.frontMatter.external_name} →`
                : "More info →"}
            </PostTitleLink>
          </p>
        )}
        {fullContent && external && (
          <p className="mt-2">
            <a
              href={post.frontMatter.external_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.frontMatter.external_name
                ? `Read more on ${post.frontMatter.external_name} →`
                : "More info →"}
            </a>
          </p>
        )}
      </section>
    </article>
  );
}

export function DiscographyEntry({
  post,
  contentHtml,
}: {
  post: Post;
  contentHtml?: string;
}) {
  const imgSrc = post.frontMatter.image ? `/${post.frontMatter.image}` : null;
  const fullContent = !!contentHtml;

  return (
    <article className="mb-10 flex flex-col gap-4 rounded-xl border border-surface-border bg-surface-elevated/80 p-6 shadow-sm transition-shadow hover:shadow-md hover:border-accent/30 md:flex-row">
      {imgSrc && (
        <figure className="h-[20vw] w-[20vw] max-h-[320px] max-w-[320px] shrink-0 overflow-hidden rounded-lg md:mr-4">
          <Image
            src={imgSrc}
            alt={post.frontMatter.image_alt || post.frontMatter.title}
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        </figure>
      )}
      <section className="min-w-0 flex-1">
        <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight">
          <PostTitleLink post={post} inline={fullContent}>
            {post.frontMatter.title}
          </PostTitleLink>
        </h2>
        {fullContent && contentHtml ? (
          <div
            className="prose prose-invert mb-2 max-w-none text-lg leading-relaxed prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <p className="mb-2 text-lg leading-relaxed">
            {post.frontMatter.description || post.excerpt}
          </p>
        )}
        {post.frontMatter.type && (
          <p className="text-sm">Release Type: {post.frontMatter.type}</p>
        )}
        {post.frontMatter.date && (
          <p className="text-sm">
            Release Year: {post.frontMatter.date.slice(0, 4)}
          </p>
        )}
        {post.frontMatter.buy && post.frontMatter.buy.length > 0 && (
          <p className="text-sm">
            Buy {post.frontMatter.title} from:{" "}
            {post.frontMatter.buy.map((b, i) => (
              <span key={i}>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  {b.name}
                </a>
                {i < post.frontMatter.buy!.length - 1 ? " | " : ""}
              </span>
            ))}
          </p>
        )}
        {!fullContent && (
          <p className="mt-2">
            <PostTitleLink post={post} inline={false}>
              {post.frontMatter.external_name
                ? `Read more on ${post.frontMatter.external_name} →`
                : "More info →"}
            </PostTitleLink>
          </p>
        )}
        {fullContent && post.frontMatter.external_url && (
          <p className="mt-2">
            <a
              href={post.frontMatter.external_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.frontMatter.external_name
                ? `Read more on ${post.frontMatter.external_name} →`
                : "More info →"}
            </a>
          </p>
        )}
      </section>
    </article>
  );
}
