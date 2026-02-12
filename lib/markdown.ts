import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { rehypeYouTubeLazy } from "./rehype-youtube-lazy";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeYouTubeLazy)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(result.value);
}
