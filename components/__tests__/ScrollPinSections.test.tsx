import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollPinSections } from "../ScrollPinSections";

describe("ScrollPinSections", () => {
  it("renders only sections with content", () => {
    render(
      <ScrollPinSections
        section1={<div data-testid="about">About</div>}
        section2={<div data-testid="posts">Posts</div>}
      />
    );
    expect(screen.getByTestId("about")).toHaveTextContent("About");
    expect(screen.getByTestId("posts")).toHaveTextContent("Posts");
  });

  it("renders sections with correct ids", () => {
    const { container } = render(
      <ScrollPinSections
        section1={<div>About</div>}
        section2={<div>Posts</div>}
        section3={<div>Gigs</div>}
        section4={<div>Videos</div>}
      />
    );
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#posts")).toBeInTheDocument();
    expect(container.querySelector("#gigs")).toBeInTheDocument();
    expect(container.querySelector("#videos")).toBeInTheDocument();
  });

  it("skips null sections", () => {
    render(
      <ScrollPinSections
        section1={<div data-testid="about">About</div>}
        section2={null}
        section3={<div data-testid="gigs">Gigs</div>}
      />
    );
    expect(screen.getByTestId("about")).toBeInTheDocument();
    expect(screen.getByTestId("gigs")).toBeInTheDocument();
    expect(screen.queryByTestId("posts")).not.toBeInTheDocument();
  });

  it("renders first section with flex justify-center", () => {
    const { container } = render(
      <ScrollPinSections section1={<div>About</div>} />
    );
    const firstSection = container.querySelector("#about");
    const innerDiv = firstSection?.querySelector("div");
    expect(innerDiv).toHaveClass("flex", "min-h-[calc(100vh-4rem)]", "justify-center");
  });

  it("renders later sections with max-w-4xl", () => {
    const { container } = render(
      <ScrollPinSections
        section1={<div>About</div>}
        section2={<div>Posts</div>}
      />
    );
    const postsSection = container.querySelector("#posts");
    const innerDiv = postsSection?.querySelector("div");
    expect(innerDiv).toHaveClass("mx-auto", "max-w-4xl");
  });
});
