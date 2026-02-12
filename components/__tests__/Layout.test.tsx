import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Layout } from "../Layout";

describe("Layout", () => {
  it("renders children", () => {
    render(
      <Layout>
        <div data-testid="child">Child content</div>
      </Layout>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });

  it("renders main with id main-content", () => {
    const { container } = render(<Layout>Content</Layout>);
    const main = container.querySelector("main#main-content");
    expect(main).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Layout footer={<footer data-testid="custom-footer">Footer</footer>}>
        Content
      </Layout>
    );
    expect(screen.getByTestId("custom-footer")).toHaveTextContent("Footer");
  });

  it("does not render footer when not provided", () => {
    render(<Layout>Content</Layout>);
    expect(screen.queryByTestId("custom-footer")).toBeNull();
  });

  it("renders background div with magicbackground class", () => {
    const { container } = render(<Layout>Content</Layout>);
    const bg = container.querySelector(".magicbackground");
    expect(bg).toBeInTheDocument();
  });
});
