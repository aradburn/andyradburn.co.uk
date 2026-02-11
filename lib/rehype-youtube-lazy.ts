import type { Root } from "hast";
import { visit } from "unist-util-visit";

const YOUTUBE_EMBED_RE =
  /youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/;

/**
 * Rehype plugin: replace YouTube iframes with placeholder divs
 * for click-to-load. The placeholder has data-video-id for
 * client-side hydration.
 */
export function rehypeYouTubeLazy() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent || index === undefined || node.tagName !== "iframe") return;
      const src = node.properties?.src;
      if (typeof src !== "string") return;
      const match = src.match(YOUTUBE_EMBED_RE);
      if (!match) return;

      const videoId = match[1];
      (parent.children as typeof tree.children)[index] = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["youtube-lazy", "video-content"],
          "data-video-id": videoId,
        },
        children: [],
      };
    });
  };
}
