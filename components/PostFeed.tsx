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
    <article className="post min-w-0 w-full max-w-full rounded-xl border-2 border-surface-border bg-surface-elevated py-4 px-4 shadow-sm transition-shadow hover:shadow-md sm:py-6 sm:px-6">
      <header className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="min-w-0 font-display text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold tracking-tight">
          <PostTitleLink post={post} inline={fullContent}>
            {post.frontMatter.title}
          </PostTitleLink>
        </h2>
        {post.frontMatter.date && (
          <span className="shrink-0 text-sm text-text-muted">
            {post.frontMatter.date}
          </span>
        )}
      </header>
      {showImage && imgSrc && (
        <figure className="my-4 flex justify-center overflow-hidden rounded-lg">
          <Image
            src={imgSrc}
            alt={post.frontMatter.image_alt || post.frontMatter.title}
            width={192}
            height={192}
            className="max-h-[50vh] w-auto max-w-full object-contain sm:max-h-[80vh]"
          />
        </figure>
      )}
      <section className="min-w-0 overflow-x-hidden text-text">
        {fullContent && contentHtml ? (
          <div
            className="prose prose-invert max-w-none break-words overflow-x-hidden prose-a:text-accent"
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
    <article className="discography mb-10 flex min-w-0 lg:min-w-5xl max-w-full flex-col gap-4 rounded-xl border border-surface-border bg-surface-elevated/80 p-4 shadow-sm transition-shadow hover:shadow-md hover:border-accent/30 sm:p-6 md:flex-row">
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
