import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionGigsContent } from "../SectionGigsContent";
import { mockSectionConfig } from "./test-utils";

const mockGig = {
  slug: "test-gig",
  category: "gigs",
  frontMatter: { title: "Test Gig" },
  content: "Gig content",
};

vi.mock("@/lib/data", () => ({
  getGigsByCategory: vi.fn(() => [mockGig]),
  getGigsForHome: vi.fn(() => [mockGig]),
}));

vi.mock("@/lib/markdown", () => ({
  markdownToHtml: vi.fn(() => Promise.resolve("<p>Rendered content</p>")),
}));

describe("SectionGigsContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders gigs when available", async () => {
    const result = await SectionGigsContent({
      section: "home",
      config: mockSectionConfig,
    });
    render(result!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test Gig"
    );
    expect(screen.getByText("Rendered content")).toBeInTheDocument();
  });

  it("returns null when gigs config is missing", async () => {
    const configNoGigs = { ...mockSectionConfig, gigs: null };
    const result = await SectionGigsContent({
      section: "home",
      config: configNoGigs,
    });
    expect(result).toBeNull();
  });

  it("renders 'No upcoming gigs' when no gigs", async () => {
    const { getGigsByCategory, getGigsForHome } = await import("@/lib/data");
    vi.mocked(getGigsForHome).mockReturnValue([]);
    vi.mocked(getGigsByCategory).mockReturnValue([]);

    const result = await SectionGigsContent({
      section: "home",
      config: mockSectionConfig,
    });
    render(result!);
    expect(screen.getByText("No upcoming gigs listed.")).toBeInTheDocument();
  });

  it("uses custom heading from gigs config description when no gig title", async () => {
    const gigNoTitle = { ...mockGig, frontMatter: {} } as typeof mockGig;
    const { getGigsForHome } = await import("@/lib/data");
    vi.mocked(getGigsForHome).mockReturnValue([gigNoTitle]);
    const configWithDesc = {
      ...mockSectionConfig,
      gigs: { description: "Upcoming Shows" },
    };
    const result = await SectionGigsContent({
      section: "home",
      config: configWithDesc,
    });
    render(result!);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Upcoming Shows"
    );
  });
});
