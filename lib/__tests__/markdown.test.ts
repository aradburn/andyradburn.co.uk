import { describe, expect, it } from "vitest";
import { markdownToHtml } from "../markdown";

describe("markdownToHtml", () => {
  it("converts headings h1–h6 to HTML", async () => {
    const md = "# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6";
    const html = await markdownToHtml(md);
    expect(html).toContain("<h1>H1</h1>");
    expect(html).toContain("<h2>H2</h2>");
    expect(html).toContain("<h3>H3</h3>");
    expect(html).toContain("<h4>H4</h4>");
    expect(html).toContain("<h5>H5</h5>");
    expect(html).toContain("<h6>H6</h6>");
  });

  it("converts paragraphs and line breaks", async () => {
    const html = await markdownToHtml("First paragraph.\n\nSecond paragraph.");
    expect(html).toContain("<p>First paragraph.</p>");
    expect(html).toContain("<p>Second paragraph.</p>");
  });

  it("converts bold and italic", async () => {
    const html = await markdownToHtml("**bold** and *italic*");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
  });

  it("converts inline code", async () => {
    const html = await markdownToHtml("Use `code` here");
    expect(html).toContain("<code>code</code>");
  });

  it("converts links", async () => {
    const html = await markdownToHtml("[link](https://example.com)");
    expect(html).toContain('<a href="https://example.com">link</a>');
  });

  it("converts unordered lists", async () => {
    const html = await markdownToHtml("- item1\n- item2");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>item1</li>");
    expect(html).toContain("<li>item2</li>");
  });

  it("converts ordered lists", async () => {
    const html = await markdownToHtml("1. first\n2. second");
    expect(html).toContain("<ol>");
    expect(html).toContain("<li>first</li>");
    expect(html).toContain("<li>second</li>");
  });

  it("converts blockquotes", async () => {
    const html = await markdownToHtml("> A quoted line");
    expect(html).toContain("<blockquote>");
    expect(html).toContain("A quoted line");
  });

  it("converts fenced code blocks", async () => {
    const html = await markdownToHtml("```js\nconst x = 1;\n```");
    expect(html).toContain("<pre>");
    expect(html).toMatch(/<code[\s>]/);
    expect(html).toContain("const x = 1;");
  });

  it("preserves raw HTML in markdown", async () => {
    const html = await markdownToHtml('<div class="custom">raw HTML</div>');
    expect(html).toContain('<div class="custom">raw HTML</div>');
  });

  it("transforms YouTube iframes to lazy placeholders", async () => {
    const html = await markdownToHtml(
      '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>'
    );
    expect(html).toContain('data-video-id="dQw4w9WgXcQ"');
    expect(html).toContain("youtube-lazy");
    expect(html).toContain("video-content");
  });

  it("transforms youtube-nocookie iframes to lazy placeholders", async () => {
    const html = await markdownToHtml(
      '<iframe src="https://www.youtube-nocookie.com/embed/GPljPbC-4pE" title="YouTube video player"></iframe>'
    );
    expect(html).toContain('data-video-id="GPljPbC-4pE"');
    expect(html).toContain("youtube-lazy");
  });

  it("leaves non-YouTube iframes unchanged", async () => {
    const html = await markdownToHtml(
      '<iframe src="https://bandcamp.com/EmbeddedPlayer/album=123"></iframe>'
    );
    expect(html).toContain("bandcamp.com");
    expect(html).not.toContain("youtube-lazy");
  });

  it("handles empty string", async () => {
    const html = await markdownToHtml("");
    expect(html).toBe("");
  });

  it("handles mixed markdown and HTML", async () => {
    const md = "# Title\n\n<p>Paragraph</p>\n\n- list item";
    const html = await markdownToHtml(md);
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<p>Paragraph</p>");
    expect(html).toContain("<li>list item</li>");
  });

  it("handles unicode and special characters", async () => {
    const html = await markdownToHtml("# Café & résumé");
    expect(html).toContain("Café");
    expect(html).toContain("résumé");
    expect(html).toMatch(/&(amp|#x26|#38);/);
  });
});
