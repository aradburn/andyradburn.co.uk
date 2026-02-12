import { describe, it, expect } from "vitest";
import {
  sectionProgress,
  sectionOverlapsContent,
  progressToYPercent,
  aboutProgressToYPercent,
  progressDeltaForHalfVh,
  sectionOpacity,
  getBackgroundImage,
  ENTER_END,
  OPACITY_MAX,
} from "../subsection-background-utils";

function rect(top: number, bottom: number): DOMRect {
  return {
    top,
    bottom,
    height: bottom - top,
    left: 0,
    right: 100,
    width: 100,
    x: 0,
    y: top,
    toJSON: () => ({}),
  };
}

describe("sectionProgress", () => {
  it("returns 0 when range <= 0", () => {
    expect(sectionProgress(rect(100, 150), -200)).toBe(0);
  });

  it("returns progress from 0 to 1 based on viewport position", () => {
    const vh = 800;
    expect(sectionProgress(rect(800, 1000), vh)).toBe(0);
    expect(sectionProgress(rect(-200, 0), vh)).toBe(1);
    expect(sectionProgress(rect(400, 600), vh)).toBeCloseTo(0.4, 1);
  });

  it("clamps result to [0, 1]", () => {
    const vh = 800;
    expect(sectionProgress(rect(-500, -400), vh)).toBe(1);
    expect(sectionProgress(rect(900, 1000), vh)).toBe(0);
  });
});

describe("sectionOverlapsContent", () => {
  it("returns false when section is above content area", () => {
    expect(sectionOverlapsContent(rect(0, 50), 800)).toBe(false);
  });

  it("returns false when section is below viewport", () => {
    expect(sectionOverlapsContent(rect(900, 1000), 800)).toBe(false);
  });

  it("returns true when section overlaps content area", () => {
    expect(sectionOverlapsContent(rect(100, 400), 800)).toBe(true);
  });
});

describe("progressToYPercent", () => {
  const vh = 800;

  it("returns -100 when section is above content area", () => {
    expect(progressToYPercent(0.5, rect(0, 50), vh)).toBe(-100);
  });

  it("returns 100 when section is below viewport", () => {
    expect(progressToYPercent(0.5, rect(900, 1000), vh)).toBe(100);
  });

  it("returns 0 when section overlaps content", () => {
    expect(progressToYPercent(0.5, rect(100, 400), vh)).toBe(0);
  });

  it("returns 100 when section is below viewport regardless of p", () => {
    const r = rect(800, 1000);
    expect(progressToYPercent(0, r, vh)).toBe(100);
    expect(progressToYPercent(ENTER_END, r, vh)).toBe(100);
  });

  it("returns -100 when section is above content and p >= leave start", () => {
    const r = rect(-200, 0);
    expect(progressToYPercent(1, r, vh)).toBe(-100);
  });
});

describe("aboutProgressToYPercent", () => {
  const vh = 800;

  it("returns -100 when section is above content area", () => {
    expect(aboutProgressToYPercent(0.5, rect(0, 50), vh)).toBe(-100);
  });

  it("returns 100 when section is below viewport", () => {
    expect(aboutProgressToYPercent(0.5, rect(900, 1000), vh)).toBe(100);
  });

  it("returns 0 when section overlaps content", () => {
    expect(aboutProgressToYPercent(0.5, rect(100, 400), vh)).toBe(0);
  });

  it("returns 0 when p < leave start and in overlap zone", () => {
    expect(aboutProgressToYPercent(0.5, rect(100, 400), vh)).toBe(0);
  });

  it("returns negative when p >= leave start for section above", () => {
    const r = rect(-200, 0);
    expect(aboutProgressToYPercent(1, r, vh)).toBe(-100);
  });
});

describe("progressDeltaForHalfVh", () => {
  it("returns 0 when range <= 0", () => {
    expect(progressDeltaForHalfVh(rect(100, 150), -200)).toBe(0);
  });

  it("returns positive delta for valid rect", () => {
    const r = rect(0, 400);
    const delta = progressDeltaForHalfVh(r, 800);
    expect(delta).toBeGreaterThan(0);
    expect(delta).toBeLessThan(1);
  });
});

describe("sectionOpacity", () => {
  const vh = 800;

  it("returns 0 when p <= enterFadeStart", () => {
    const r = rect(800, 1000);
    expect(sectionOpacity(0, r, vh)).toBe(0);
  });

  it("returns OPACITY_MAX when section is in view (between enter and leave)", () => {
    const r = rect(100, 400);
    expect(sectionOpacity(0.5, r, vh)).toBe(OPACITY_MAX);
  });

  it("returns 0 when p >= leaveFadeEnd", () => {
    const r = rect(-200, 0);
    expect(sectionOpacity(1, r, vh)).toBe(0);
  });

  it("returns intermediate value during enter fade", () => {
    const r = rect(750, 950);
    const p = ENTER_END / 2;
    const opacity = sectionOpacity(p, r, vh);
    expect(opacity).toBeGreaterThan(0);
    expect(opacity).toBeLessThanOrEqual(OPACITY_MAX);
  });
});

describe("getBackgroundImage", () => {
  it("returns about background-image from config.about", () => {
    const config = {
      title: "Test",
      subtitle: "",
      about: { "background-image": "about-bg.jpg" },
    };
    expect(getBackgroundImage(config as never, "about")).toBe("about-bg.jpg");
  });

  it("returns undefined when about has no background-image", () => {
    const config = { title: "Test", subtitle: "", about: {} };
    expect(getBackgroundImage(config as never, "about")).toBeUndefined();
  });

  it("returns background-image from posts block", () => {
    const config = {
      title: "Test",
      subtitle: "",
      posts: { "background-image": "posts-bg.jpg" },
    };
    expect(getBackgroundImage(config as never, "posts")).toBe("posts-bg.jpg");
  });

  it("returns undefined when block has no background-image", () => {
    const config = { title: "Test", subtitle: "", posts: { description: "x" } };
    expect(getBackgroundImage(config as never, "posts")).toBeUndefined();
  });

  it("returns undefined when block is not an object", () => {
    const config = { title: "Test", subtitle: "", posts: "string" };
    expect(getBackgroundImage(config as never, "posts")).toBeUndefined();
  });

  it("returns undefined when block is undefined", () => {
    const config = { title: "Test", subtitle: "" };
    expect(getBackgroundImage(config as never, "posts")).toBeUndefined();
  });

  it("returns background-image from gigs and videos blocks", () => {
    const configWithGigs = {
      title: "Test",
      subtitle: "",
      gigs: { "background-image": "gigs-bg.jpg" },
    };
    expect(getBackgroundImage(configWithGigs as never, "gigs")).toBe("gigs-bg.jpg");

    const configWithVideos = {
      title: "Test",
      subtitle: "",
      videos: { "background-image": "videos-bg.jpg" },
    };
    expect(getBackgroundImage(configWithVideos as never, "videos")).toBe("videos-bg.jpg");
  });
});
