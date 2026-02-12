import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { SubsectionBackgroundLayers } from "../SubsectionBackgroundLayers";
import { mockSectionConfig } from "./test-utils";

const mockScrollTriggerCreate = vi.hoisted(() => vi.fn(() => ({ kill: vi.fn() })));
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: mockScrollTriggerCreate,
    refresh: vi.fn(),
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: (cb: () => void) => {
    cb();
  },
}));

describe("SubsectionBackgroundLayers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="main-content" style="overflow: auto; height: 500px;">
        <div class="scroll-sections-wrapper">
          <section id="about" data-subsection="about"></section>
          <section id="posts" data-subsection="posts"></section>
        </div>
      </div>
    `;
  });

  it("returns null when config has no background images", () => {
    const configNoBg = {
      ...mockSectionConfig,
      about: { ...mockSectionConfig.about!, "background-image": undefined },
      posts: undefined,
      gigs: undefined,
      videos: undefined,
    };
    const { container } = render(
      <SubsectionBackgroundLayers config={configNoBg} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders background layers when config has background images", () => {
    const configWithBg = {
      ...mockSectionConfig,
      about: {
        ...mockSectionConfig.about!,
        "background-image": "about-bg.jpg",
      },
    };
    const { container } = render(
      <SubsectionBackgroundLayers config={configWithBg} />
    );
    const layers = container.querySelectorAll("[data-subsection-id]");
    expect(layers.length).toBeGreaterThan(0);
    expect(container.querySelector('[data-subsection-id="about"]')).toBeInTheDocument();
  });

  it("applies background-image url to layer", () => {
    const configWithBg = {
      ...mockSectionConfig,
      about: {
        ...mockSectionConfig.about!,
        "background-image": "hero.jpg",
      },
    };
    const { container } = render(
      <SubsectionBackgroundLayers config={configWithBg} />
    );
    const layer = container.querySelector('[data-subsection-id="about"]') as HTMLElement;
    expect(layer?.style.backgroundImage).toContain("hero.jpg");
  });

  it("has aria-hidden on container", () => {
    const configWithBg = {
      ...mockSectionConfig,
      about: {
        ...mockSectionConfig.about!,
        "background-image": "bg.jpg",
      },
    };
    const { container } = render(
      <SubsectionBackgroundLayers config={configWithBg} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });
});
