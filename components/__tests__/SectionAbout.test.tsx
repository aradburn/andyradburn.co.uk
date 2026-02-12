import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionAbout } from "../SectionAbout";
import { mockSectionConfig } from "./test-utils";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- test mock for next/image
    <img src={src} alt={alt} data-testid="about-image" />
  ),
}));

vi.mock("../SubsectionNavLinks", () => ({
  SubsectionNavLinks: ({ links }: { links: { id: string; label: string }[] }) =>
    links.length === 0 ? null : (
      <nav data-testid="subsection-nav">
        {links.map((l) => (
          <span key={l.id}>{l.label}</span>
        ))}
      </nav>
    ),
}));

describe("SectionAbout", () => {
  it("renders heading from about config", () => {
    render(
      <SectionAbout
        about={mockSectionConfig.about!}
        title={mockSectionConfig.title}
        subtitle={mockSectionConfig.subtitle}
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "About Heading"
    );
  });

  it("falls back to title when heading not in about", () => {
    const aboutNoHeading = { ...mockSectionConfig.about!, heading: undefined };
    render(
      <SectionAbout
        about={aboutNoHeading}
        title="Page Title"
        subtitle="Sub"
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page Title"
    );
  });

  it("renders subheading from about config", () => {
    render(
      <SectionAbout
        about={mockSectionConfig.about!}
        title={mockSectionConfig.title}
        subtitle={mockSectionConfig.subtitle}
      />
    );
    expect(screen.getByText("About subheading")).toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    render(
      <SectionAbout
        about={mockSectionConfig.about!}
        title="Title"
        subtitle="Sub"
      />
    );
    const img = screen.getByTestId("about-image");
    expect(img).toHaveAttribute("src", "/about.jpg");
    expect(img).toHaveAttribute("alt", "About image");
  });

  it("renders subsection nav links when sectionConfig provided", () => {
    render(
      <SectionAbout
        about={mockSectionConfig.about!}
        title="Title"
        subtitle="Sub"
        sectionConfig={mockSectionConfig}
      />
    );
    expect(screen.getByTestId("subsection-nav")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Gigs")).toBeInTheDocument();
    expect(screen.getByText("Videos")).toBeInTheDocument();
  });

  it("does not render subsection nav when sectionConfig is null", () => {
    render(
      <SectionAbout
        about={mockSectionConfig.about!}
        title="Title"
        subtitle="Sub"
        sectionConfig={null}
      />
    );
    expect(screen.queryByTestId("subsection-nav")).not.toBeInTheDocument();
  });

  it("renders only links for subsections that exist in config", () => {
    const configPostsOnly = {
      ...mockSectionConfig,
      gigs: null,
      videos: null,
    };
    render(
      <SectionAbout
        about={mockSectionConfig.about!}
        title="Title"
        subtitle="Sub"
        sectionConfig={configPostsOnly}
      />
    );
    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.queryByText("Gigs")).not.toBeInTheDocument();
    expect(screen.queryByText("Videos")).not.toBeInTheDocument();
  });
});
