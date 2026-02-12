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
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  it("renders nothing", () => {
    const { container } = render(<Analytics />);
    expect(container.firstChild).toBeNull();
  });

  it("does not init Swetrix when pid is missing", () => {
    delete process.env.NEXT_PUBLIC_SWETRIX_PID;
    render(<Analytics />);
    expect(mockInit).not.toHaveBeenCalled();
  });

  it("inits Swetrix and tracks when pid is set", () => {
    process.env.NEXT_PUBLIC_SWETRIX_PID = "test-pid";
    render(<Analytics />);
    expect(mockInit).toHaveBeenCalledWith(
      "test-pid",
      expect.objectContaining({
        devMode: true,
      })
    );
    expect(mockTrackViews).toHaveBeenCalled();
    expect(mockTrackErrors).toHaveBeenCalled();
  });

  it("inits with apiURL when env var set", () => {
    process.env.NEXT_PUBLIC_SWETRIX_PID = "test-pid";
    process.env.NEXT_PUBLIC_SWETRIX_API_URL = "https://api.example.com";
    render(<Analytics />);
    expect(mockInit).toHaveBeenCalledWith(
      "test-pid",
      expect.objectContaining({
        apiURL: "https://api.example.com",
      })
    );
  });
});
