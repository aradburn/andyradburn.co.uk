import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionWithBackgrounds } from "../SectionWithBackgrounds";
import { mockSectionConfig } from "./test-utils";

vi.mock("../SubsectionBackgroundLayers", () => ({
  SubsectionBackgroundLayers: ({ config }: { config: { title: string } }) => (
    <div data-testid="background-layers" data-config-title={config.title} />
  ),
}));

describe("SectionWithBackgrounds", () => {
  it("renders children", () => {
    render(
      <SectionWithBackgrounds config={mockSectionConfig}>
        <div data-testid="child">Child content</div>
      </SectionWithBackgrounds>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });

  it("renders SubsectionBackgroundLayers with config", () => {
    render(
      <SectionWithBackgrounds config={mockSectionConfig}>
        <div>Child</div>
      </SectionWithBackgrounds>
    );
    const layers = screen.getAllByTestId("background-layers")[0];
    expect(layers).toHaveAttribute("data-config-title", "Test Section");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SectionWithBackgrounds config={mockSectionConfig} className="custom-class">
        <div>Child</div>
      </SectionWithBackgrounds>
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("wraps children in relative z-10 div", () => {
    const { container } = render(
      <SectionWithBackgrounds config={mockSectionConfig}>
        <div>Child</div>
      </SectionWithBackgrounds>
    );
    const contentDiv = container.querySelector(".relative.z-10");
    expect(contentDiv).toHaveTextContent("Child");
  });
});
