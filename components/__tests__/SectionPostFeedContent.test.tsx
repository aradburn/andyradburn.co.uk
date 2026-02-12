import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionPostFeedContent } from "../SectionPostFeedContent";
import { mockSectionConfig, mockPost } from "./test-utils";

vi.mock("@/lib/data", () => ({
  getPostsByCategory: vi.fn(() => [mockPost]),
}));

vi.mock("@/lib/markdown", () => ({
  markdownToHtml: vi.fn(() => Promise.resolve("<p>Post content</p>")),
}));

vi.mock("../PostFeed", () => ({
  PostFeedItem: ({
    post,
    contentHtml,
  }: {
    post: { frontMatter: { title: string } };
    contentHtml: string;
  }) => (
    <article data-testid="post-feed-item">
      <h2>{post.frontMatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  ),
}));

vi.mock("../SectionAbout", () => ({
  SectionAbout: ({
    about,
    title,
    subtitle,
  }: {
    about: { heading?: string };
    title: string;
    subtitle: string;
  }) => (
    <header data-testid="section-about">
      <h1>{about.heading ?? title}</h1>
      <p>{subtitle}</p>
    </header>
  ),
}));

describe("SectionPostFeedContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders SectionAbout when config has about", async () => {
    const result = await SectionPostFeedContent({
      section: "home",
      config: mockSectionConfig,
    });
    render(result!);
    expect(screen.getByTestId("section-about")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "About Heading"
    );
  });

  it("renders page header when config has no about", async () => {
    const configNoAbout = { ...mockSectionConfig, about: null };
    const result = await SectionPostFeedContent({
      section: "home",
      config: configNoAbout,
    });
    render(result!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test Section"
    );
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders post feed items", async () => {
    const result = await SectionPostFeedContent({
      section: "home",
      config: mockSectionConfig,
    });
    render(result!);
    expect(screen.getByTestId("post-feed-item")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Post"
    );
    expect(screen.getByText("Post content")).toBeInTheDocument();
  });

  it("returns null when posts config is missing", async () => {
    const configNoPosts = { ...mockSectionConfig, posts: null };
    const result = await SectionPostFeedContent({
      section: "home",
      config: configNoPosts,
    });
    expect(result).toBeNull();
  });

  it("renders contentOnly layout when contentOnly is true", async () => {
    const result = await SectionPostFeedContent({
      section: "home",
      config: mockSectionConfig,
      contentOnly: true,
    });
    render(result!);
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.some((h) => h.textContent === "News")).toBe(true);
    expect(screen.getByTestId("post-feed-item")).toBeInTheDocument();
    expect(screen.queryByTestId("section-about")).not.toBeInTheDocument();
  });
});
