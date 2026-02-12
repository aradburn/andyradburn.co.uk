import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollPinSection } from "../ScrollPinSection";

const mockScrollTriggerCreate = vi.hoisted(() => vi.fn(() => ({ kill: vi.fn() })));
const mockTimeline = vi.hoisted(() =>
  vi.fn(() => ({
    to: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
  }))
);

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    timeline: mockTimeline,
    set: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: mockScrollTriggerCreate,
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: (cb: () => void) => {
    cb();
  },
}));

describe("ScrollPinSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
  });

  it("renders children", () => {
    render(
      <ScrollPinSection>
        <div data-testid="child">Child content</div>
      </ScrollPinSection>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });

  it("renders scroll-pin-section container", () => {
    const { container } = render(
      <ScrollPinSection>
        <div>Child</div>
      </ScrollPinSection>
    );
    expect(container.querySelector(".scroll-pin-section")).toBeInTheDocument();
  });

  it("renders inner panel with scroll-pin-section-inner class", () => {
    const { container } = render(
      <ScrollPinSection>
        <div>Child</div>
      </ScrollPinSection>
    );
    expect(container.querySelector(".scroll-pin-section-inner")).toBeInTheDocument();
  });

  it("applies scroll-pin-section structure for GSAP", () => {
    const { container } = render(
      <ScrollPinSection>
        <div>Child</div>
      </ScrollPinSection>
    );
    expect(container.querySelector(".scroll-pin-section-inner")).toBeInTheDocument();
  });
});
