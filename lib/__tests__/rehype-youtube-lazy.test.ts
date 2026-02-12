import { describe, expect, it } from "vitest";
import type { Element, Properties, Root } from "hast";
import { rehypeYouTubeLazy } from "../rehype-youtube-lazy";

function createElement(
  tagName: string,
  properties: Properties = {},
  children: Element["children"] = []
): Element {
  return {
    type: "element",
    tagName,
    properties,
    children,
  };
}

function createRoot(children: Root["children"]): Root {
  return { type: "root", children };
}

describe("rehypeYouTubeLazy", () => {
  it("replaces youtube.com/embed iframe with lazy placeholder", () => {
    const tree = createRoot([
      createElement("iframe", {
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      }),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const child = tree.children[0];
    expect(child).toBeDefined();
    expect(child.type).toBe("element");
    if (child.type === "element") {
      expect(child.tagName).toBe("div");
      expect(child.properties).toMatchObject({
        className: ["youtube-lazy", "video-content"],
        "data-video-id": "dQw4w9WgXcQ",
      });
    }
  });

  it("replaces youtube-nocookie.com/embed iframe with lazy placeholder", () => {
    const tree = createRoot([
      createElement("iframe", {
        src: "https://www.youtube-nocookie.com/embed/GPljPbC-4pE",
        title: "YouTube video player",
      }),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const child = tree.children[0];
    expect(child).toBeDefined();
    expect(child.type).toBe("element");
    if (child.type === "element") {
      expect(child.tagName).toBe("div");
      expect(child.properties).toMatchObject({
        "data-video-id": "GPljPbC-4pE",
      });
    }
  });

  it("leaves non-YouTube iframes unchanged", () => {
    const tree = createRoot([
      createElement("iframe", {
        src: "https://bandcamp.com/EmbeddedPlayer/album=123",
      }),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const child = tree.children[0];
    expect(child).toBeDefined();
    expect(child.type).toBe("element");
    if (child.type === "element") {
      expect(child.tagName).toBe("iframe");
      expect(child.properties?.src).toBe(
        "https://bandcamp.com/EmbeddedPlayer/album=123"
      );
    }
  });

  it("leaves iframes without src unchanged", () => {
    const tree = createRoot([createElement("iframe", {})]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const child = tree.children[0];
    expect(child).toBeDefined();
    if (child.type === "element") {
      expect(child.tagName).toBe("iframe");
      expect(child.properties?.src).toBeUndefined();
    }
  });

  it("leaves iframes with empty src unchanged", () => {
    const tree = createRoot([
      createElement("iframe", { src: "" }),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const child = tree.children[0];
    expect(child).toBeDefined();
    if (child.type === "element") {
      expect(child.tagName).toBe("iframe");
      expect(child.properties?.src).toBe("");
    }
  });

  it("leaves iframes with non-matching YouTube URL unchanged", () => {
    const tree = createRoot([
      createElement("iframe", {
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      }),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const child = tree.children[0];
    expect(child).toBeDefined();
    if (child.type === "element") {
      expect(child.tagName).toBe("iframe");
      expect(child.properties?.src).toContain("youtube.com");
    }
  });

  it("transforms multiple YouTube iframes in same tree", () => {
    const tree = createRoot([
      createElement("iframe", {
        src: "https://www.youtube.com/embed/abc12345678",
      }),
      createElement("p", {}, [{ type: "text", value: "between" }]),
      createElement("iframe", {
        src: "https://www.youtube-nocookie.com/embed/xyz98765432",
      }),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const first = tree.children[0];
    const third = tree.children[2];
    expect(first.type).toBe("element");
    expect(third.type).toBe("element");
    if (first.type === "element" && third.type === "element") {
      expect(first.tagName).toBe("div");
      expect(first.properties?.["data-video-id"]).toBe("abc12345678");
      expect(third.tagName).toBe("div");
      expect(third.properties?.["data-video-id"]).toBe("xyz98765432");
    }
  });

  it("leaves non-iframe elements unchanged", () => {
    const tree = createRoot([
      createElement("div", { className: "container" }),
      createElement("p", {}, [{ type: "text", value: "text" }]),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    expect(tree.children[0]).toMatchObject({
      type: "element",
      tagName: "div",
      properties: { className: "container" },
    });
    expect(tree.children[1]).toMatchObject({
      type: "element",
      tagName: "p",
    });
  });

  it("extracts 11-character video ID from URL", () => {
    const tree = createRoot([
      createElement("iframe", {
        src: "https://www.youtube.com/embed/AbCdEfGhIjK",
      }),
    ]);
    const transform = rehypeYouTubeLazy();
    transform(tree);

    const child = tree.children[0];
    expect(child.type).toBe("element");
    if (child.type === "element") {
      expect(child.properties?.["data-video-id"]).toBe("AbCdEfGhIjK");
    }
  });
});
