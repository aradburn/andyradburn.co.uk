import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostFeedItem, DiscographyEntry } from "../PostFeed";
import { mockPost, mockPostWithExternal } from "./test-utils";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- test mock for next/image
    <img src={src} alt={alt} data-testid="post-image" />
  ),
}));

describe("PostFeedItem", () => {
  it("renders post title", () => {
    render(<PostFeedItem post={mockPost} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Post"
    );
  });

  it("renders post date when provided", () => {
    render(<PostFeedItem post={mockPost} />);
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
  });

  it("renders description when no contentHtml", () => {
    render(<PostFeedItem post={mockPost} />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders excerpt when no description", () => {
    const postNoDesc = { ...mockPost, frontMatter: { ...mockPost.frontMatter, description: undefined } };
    render(<PostFeedItem post={postNoDesc} />);
    expect(screen.getByText("Excerpt")).toBeInTheDocument();
  });

  it("renders image when showImage is true and image exists", () => {
    render(<PostFeedItem post={mockPost} showImage />);
    const img = screen.getByTestId("post-image");
    expect(img).toHaveAttribute("src", "/test.jpg");
    expect(img).toHaveAttribute("alt", "Test image");
  });

  it("hides image when showImage is false", () => {
    render(<PostFeedItem post={mockPost} showImage={false} />);
    expect(screen.queryByTestId("post-image")).not.toBeInTheDocument();
  });

  it("renders internal link when no external_url", () => {
    render(<PostFeedItem post={mockPost} />);
    const link = screen.getByRole("link", { name: /More info/ });
    expect(link).toHaveAttribute("href", "/news/test-post/");
  });

  it("renders external link when external_url exists", () => {
    render(<PostFeedItem post={mockPostWithExternal} />);
    const link = screen.getByRole("link", { name: /Read more on External Site/ });
    expect(link).toHaveAttribute("href", "https://external.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders full content when contentHtml provided", () => {
    render(
      <PostFeedItem
        post={mockPost}
        contentHtml="<p>Full content</p>"
      />
    );
    expect(screen.getByText("Full content")).toBeInTheDocument();
  });

  it("uses image_alt when provided, else title", () => {
    const postNoAlt = { ...mockPost, frontMatter: { ...mockPost.frontMatter, image_alt: undefined } };
    render(<PostFeedItem post={postNoAlt} showImage />);
    expect(screen.getByTestId("post-image")).toHaveAttribute("alt", "Test Post");
  });
});

describe("DiscographyEntry", () => {
  it("renders post title", () => {
    render(<DiscographyEntry post={mockPost} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Post"
    );
  });

  it("renders image when present", () => {
    render(<DiscographyEntry post={mockPost} />);
    expect(screen.getByTestId("post-image")).toBeInTheDocument();
  });

  it("renders release type when provided", () => {
    const postWithType = {
      ...mockPost,
      frontMatter: { ...mockPost.frontMatter, type: "Album" },
    };
    render(<DiscographyEntry post={postWithType} />);
    expect(screen.getByText(/Release Type: Album/)).toBeInTheDocument();
  });

  it("renders release year from date", () => {
    render(<DiscographyEntry post={mockPost} />);
    expect(screen.getByText(/Release Year: 2024/)).toBeInTheDocument();
  });

  it("renders buy links when provided", () => {
    const postWithBuy = {
      ...mockPost,
      frontMatter: {
        ...mockPost.frontMatter,
        buy: [{ url: "https://store.com", name: "Store" }],
      },
    };
    render(<DiscographyEntry post={postWithBuy} />);
    const link = screen.getByRole("link", { name: "Store" });
    expect(link).toHaveAttribute("href", "https://store.com");
  });

  it("renders full content when contentHtml provided", () => {
    render(
      <DiscographyEntry
        post={mockPost}
        contentHtml="<p>Album content</p>"
      />
    );
    expect(screen.getByText("Album content")).toBeInTheDocument();
  });

  it("renders More info link when not full content", () => {
    render(<DiscographyEntry post={mockPost} />);
    expect(screen.getByRole("link", { name: /More info/ })).toBeInTheDocument();
  });
});
