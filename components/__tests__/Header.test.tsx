import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";
import { mockMenuData, mockMetaData } from "./test-utils";

const mockPathname = vi.fn(() => "/home");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- test mock for next/image
    <img src={src} alt={alt} data-testid="logo" />
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/home");
  });

  it("renders logo with correct src", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByTestId("logo")).toHaveAttribute("src", "/logo.png");
  });

  it("renders skip to main content link", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
      "href",
      "#main-content"
    );
  });

  it("renders home link with aria-label", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks.some((a) => a.getAttribute("href") === "/home")).toBe(true);
  });

  it("renders nav links from menu", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
  });

  it("renders mobile menu button", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("toggles mobile menu on button click", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    const menuButton = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(menuButton);
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("renders nav links with correct hrefs from menu", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    const links = nav.querySelectorAll("a[href]");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/home");
    expect(hrefs).toContain("/about/");
  });

  it("closes menu on Escape key", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    const dialog = document.getElementById("mobile-menu");
    fireEvent.keyDown(dialog!, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("renders main nav with aria-label", () => {
    render(<Header menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });
});
