import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { ScrollResetOnRouteChange } from "../ScrollResetOnRouteChange";

const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { refresh: vi.fn() },
}));

describe("ScrollResetOnRouteChange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    document.body.innerHTML = `
      <div id="main-content" style="overflow: auto; height: 500px;">
        <div style="height: 1000px;">Content</div>
      </div>
    `;
    const scroller = document.getElementById("main-content")!;
    (scroller as HTMLElement & { scrollTo: (x: number, y: number) => void }).scrollTo = vi.fn();
  });

  it("renders nothing", () => {
    const { container } = render(<ScrollResetOnRouteChange />);
    expect(container.firstChild).toBeNull();
  });

  it("resets scroll when pathname changes", async () => {
    const scroller = document.getElementById("main-content")!;
    const scrollToFn = vi.fn();
    (scroller as HTMLElement & { scrollTo: (x: number, y: number) => void }).scrollTo = scrollToFn;

    mockPathname.mockReturnValue("/");
    const { rerender } = render(<ScrollResetOnRouteChange />);

    mockPathname.mockReturnValue("/about");
    rerender(<ScrollResetOnRouteChange />);

    await vi.runAllTimersAsync();
    expect(scrollToFn).toHaveBeenCalledWith(0, 0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not reset on initial mount", () => {
    mockPathname.mockReturnValue("/");
    const scroller = document.getElementById("main-content")!;
    scroller.scrollTop = 100;
    render(<ScrollResetOnRouteChange />);
    expect(scroller.scrollTop).toBe(100);
  });

  it("runs delayed reset after pathname change", async () => {
    const scroller = document.getElementById("main-content")!;
    const scrollToFn = vi.fn();
    (scroller as HTMLElement & { scrollTo: (x: number, y: number) => void }).scrollTo = scrollToFn;

    mockPathname.mockReturnValue("/");
    const { rerender } = render(<ScrollResetOnRouteChange />);
    mockPathname.mockReturnValue("/cookies");
    rerender(<ScrollResetOnRouteChange />);

    await vi.advanceTimersByTimeAsync(100);
    expect(scrollToFn).toHaveBeenCalledWith(0, 0);
  });

  it("cleans up timeout on unmount when pathname changed", async () => {
    mockPathname.mockReturnValue("/");
    const { rerender, unmount } = render(<ScrollResetOnRouteChange />);
    mockPathname.mockReturnValue("/about");
    rerender(<ScrollResetOnRouteChange />);
    await vi.advanceTimersByTimeAsync(0);
    await vi.advanceTimersByTimeAsync(0);
    unmount();
  });
});
