import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import Analytics from "../Analytics";

const mockInit = vi.hoisted(() => vi.fn());
const mockTrackViews = vi.hoisted(() => vi.fn());
const mockTrackErrors = vi.hoisted(() => vi.fn());

vi.mock("swetrix", () => ({
  init: mockInit,
  trackViews: mockTrackViews,
  trackErrors: mockTrackErrors,
}));

const mockPathname = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing", () => {
    const { container } = render(<Analytics />);
    expect(container.firstChild).toBeNull();
  });

  it("inits Swetrix and tracks", () => {
    render(<Analytics />);
    expect(mockInit).toHaveBeenCalledWith(
      "tk8UH0E6rrE1",
      expect.objectContaining({
        apiURL: "https://swetrix-api.musigree.com/log",
        devMode: false,
      })
    );
    expect(mockTrackViews).toHaveBeenCalled();
    expect(mockTrackErrors).toHaveBeenCalled();
  });
});
