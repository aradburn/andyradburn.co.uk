import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubsectionNavLinks } from "../SubsectionNavLinks";

const mockScrollTo = vi.hoisted(() => vi.fn());
vi.mock("gsap", () => ({
  default: {
    to: vi.fn((_: unknown, opts: { scrollTo?: { y: number }; duration?: number }) => {
      mockScrollTo(opts);
    }),
    registerPlugin: vi.fn(),
  },
}));
vi.mock("gsap/ScrollToPlugin", () => ({
  default: {},
  ScrollToPlugin: {},
}));

describe("SubsectionNavLinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="main-content" style="overflow: auto; height: 500px;">
        <div id="posts" style="height: 200px;">Posts</div>
        <div id="gigs" style="height: 200px;">Gigs</div>
      </div>
    `;
  });

  it("returns null when links is empty", () => {
    const { container } = render(<SubsectionNavLinks links={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nav with aria-label", () => {
    render(
      <SubsectionNavLinks links={[{ id: "posts", label: "News" }]} />
    );
    expect(screen.getByRole("navigation", { name: "Jump to section" })).toBeInTheDocument();
  });

  it("renders links as buttons", () => {
    render(
      <SubsectionNavLinks
        links={[
          { id: "posts", label: "News" },
          { id: "gigs", label: "Gigs" },
        ]}
      />
    );
    expect(screen.getByRole("button", { name: "News" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gigs" })).toBeInTheDocument();
  });

  it("scrolls to section when button clicked", () => {
    render(
      <SubsectionNavLinks links={[{ id: "posts", label: "News" }]} />
    );
    fireEvent.click(screen.getByRole("button", { name: "News" }));
    expect(mockScrollTo).toHaveBeenCalledWith(
      expect.objectContaining({
        duration: 1.2,
        scrollTo: expect.objectContaining({ y: expect.anything() }),
      })
    );
  });

  it("does not call gsap when target section does not exist", () => {
    document.body.innerHTML = `<div id="main-content"></div>`;
    render(
      <SubsectionNavLinks links={[{ id: "nonexistent", label: "Missing" }]} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Missing" }));
    expect(mockScrollTo).not.toHaveBeenCalled();
  });
});
