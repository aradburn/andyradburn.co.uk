import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionVideosContent } from "../SectionVideosContent";
import { mockSectionConfig } from "./test-utils";

const mockVideo = {
  slug: "test-video",
  category: "videos",
  frontMatter: { title: "Test Video" },
  content: "Video content",
};

vi.mock("@/lib/data", () => ({
  getVideosByCategory: vi.fn(() => [mockVideo]),
  getVideosForHome: vi.fn(() => [mockVideo]),
}));

vi.mock("@/lib/markdown", () => ({
  markdownToHtml: vi.fn(() => Promise.resolve("<p>Video content</p>")),
}));

vi.mock("../YouTubeLazyHydrator", () => ({
  YouTubeLazyHydrator: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="youtube-hydrator">{children}</div>
  ),
}));

describe("SectionVideosContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders videos when available", async () => {
    const result = await SectionVideosContent({
      section: "home",
      config: mockSectionConfig,
    });
    render(result!);
    expect(screen.getByTestId("youtube-hydrator")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test Video"
    );
    expect(screen.getByText("Video content")).toBeInTheDocument();
  });

  it("returns null when videos config is missing", async () => {
    const configNoVideos = { ...mockSectionConfig, videos: null };
    const result = await SectionVideosContent({
      section: "home",
      config: configNoVideos,
    });
    expect(result).toBeNull();
  });

  it("renders placeholder when no videos", async () => {
    const { getVideosForHome } = await import("@/lib/data");
    vi.mocked(getVideosForHome).mockReturnValue([]);

    const result = await SectionVideosContent({
      section: "home",
      config: mockSectionConfig,
    });
    render(result!);
    expect(screen.getAllByTestId("youtube-hydrator")[0]).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("wraps content in YouTubeLazyHydrator", async () => {
    const result = await SectionVideosContent({
      section: "home",
      config: mockSectionConfig,
    });
    render(result!);
    expect(screen.getAllByTestId("youtube-hydrator").length).toBeGreaterThan(0);
  });

  it("uses getVideosByCategory when section is not home", async () => {
    const { getVideosByCategory } = await import("@/lib/data");
    vi.mocked(getVideosByCategory).mockReturnValue([mockVideo]);

    const result = await SectionVideosContent({
      section: "dubbal",
      config: mockSectionConfig,
    });
    render(result!);
    expect(getVideosByCategory).toHaveBeenCalledWith("dubbal");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test Video"
    );
  });

  it("uses videos config description as heading when video has no title", async () => {
    const { getVideosForHome } = await import("@/lib/data");
    const videoNoTitle = {
      ...mockVideo,
      frontMatter: {},
    } as typeof mockVideo;
    vi.mocked(getVideosForHome).mockReturnValue([videoNoTitle]);

    const configWithDesc = {
      ...mockSectionConfig,
      videos: { description: "Custom Videos" },
    };
    const result = await SectionVideosContent({
      section: "home",
      config: configWithDesc,
    });
    render(result!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Custom Videos"
    );
  });
});
