import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { YouTubeLazyHydrator } from "../YouTubeLazyHydrator";

describe("YouTubeLazyHydrator", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders children", () => {
    render(
      <YouTubeLazyHydrator>
        <div data-testid="child">Child</div>
      </YouTubeLazyHydrator>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child");
  });

  it("hydrates placeholder elements with data-video-id", () => {
    document.body.innerHTML = `
      <div id="root"></div>
      <div class="youtube-lazy" data-video-id="dQw4w9WgXcQ"></div>
    `;
    const root = document.getElementById("root")!;
    render(
      <YouTubeLazyHydrator>
        <div>Content</div>
      </YouTubeLazyHydrator>,
      { container: root }
    );
    const placeholder = document.querySelector(".youtube-lazy");
    expect(placeholder).toBeInTheDocument();
    expect(placeholder?.querySelector(".youtube-lazy__trigger")).toBeInTheDocument();
    expect(placeholder?.querySelector("img")).toHaveAttribute(
      "src",
      "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    );
  });

  it("replaces placeholder with iframe on play button click", async () => {
    document.body.innerHTML = `
      <div id="root"></div>
      <div class="youtube-lazy" data-video-id="dQw4w9WgXcQ"></div>
    `;
    const root = document.getElementById("root")!;
    render(
      <YouTubeLazyHydrator>
        <div>Content</div>
      </YouTubeLazyHydrator>,
      { container: root }
    );
    await waitFor(() => {
      expect(document.querySelector(".youtube-lazy__trigger")).toBeInTheDocument();
    });
    const trigger = document.querySelector(".youtube-lazy__trigger") as HTMLButtonElement;
    fireEvent.click(trigger);
    const placeholder = document.querySelector(".youtube-lazy");
    const iframe = placeholder?.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
    );
  });

  it("does not hydrate placeholder without data-video-id", () => {
    document.body.innerHTML = `
      <div id="root"></div>
      <div class="youtube-lazy"></div>
    `;
    const root = document.getElementById("root")!;
    render(
      <YouTubeLazyHydrator>
        <div>Content</div>
      </YouTubeLazyHydrator>,
      { container: root }
    );
    const placeholder = document.querySelector(".youtube-lazy");
    expect(placeholder?.querySelector(".youtube-lazy__trigger")).not.toBeInTheDocument();
  });

  it("skips hydration when placeholder already has trigger", () => {
    document.body.innerHTML = `
      <div id="root"></div>
      <div class="youtube-lazy" data-video-id="abc123">
        <div class="youtube-lazy__trigger">existing</div>
      </div>
    `;
    const root = document.getElementById("root")!;
    render(
      <YouTubeLazyHydrator>
        <div>Content</div>
      </YouTubeLazyHydrator>,
      { container: root }
    );
    const placeholder = document.querySelector(".youtube-lazy");
    expect(placeholder?.textContent).toContain("existing");
  });

  it("play button has aria-label", () => {
    document.body.innerHTML = `
      <div id="root"></div>
      <div class="youtube-lazy" data-video-id="abc123"></div>
    `;
    const root = document.getElementById("root")!;
    render(
      <YouTubeLazyHydrator>
        <div>Content</div>
      </YouTubeLazyHydrator>,
      { container: root }
    );
    const trigger = document.querySelector(".youtube-lazy__trigger");
    expect(trigger).toHaveAttribute("aria-label", "Play video");
  });
});
