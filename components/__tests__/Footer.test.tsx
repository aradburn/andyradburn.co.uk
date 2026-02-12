import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";
import { mockMenuData, mockMetaData } from "./test-utils";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("react-social-icons", () => ({
  SocialIcon: ({
    url,
    children,
  }: {
    url: string;
    children?: React.ReactNode;
  }) => (
    <span data-testid="social-icon" data-url={url}>
      {children}
    </span>
  ),
}));

describe("Footer", () => {
  it("renders Explore column with menu links", () => {
    render(<Footer menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/home"
    );
    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks.some((a) => a.getAttribute("href") === "/about/")).toBe(true);
  });

  it("renders Follow column with contact links", () => {
    render(<Footer menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  it("renders Contact column with contact links", () => {
    render(<Footer menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
    expect(screen.getByRole("link", { name: "Cookies" })).toHaveAttribute(
      "href",
      "/cookies"
    );
  });

  it("renders copyright with author", () => {
    render(<Footer menu={mockMenuData} meta={mockMetaData} />);
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
  });

  it("normalizes .html URLs to trailing slash", () => {
    const menuWithHtml = {
      ...mockMenuData,
      menu_pages: [{ title: "Page", url: "page.html", category: "test" }],
    };
    render(<Footer menu={menuWithHtml} meta={mockMetaData} />);
    expect(screen.getByRole("link", { name: "Page" })).toHaveAttribute(
      "href",
      "/page/"
    );
  });

  it("handles empty menu_contacts", () => {
    const menuNoContacts = { ...mockMenuData, menu_contacts: [] };
    render(<Footer menu={menuNoContacts} meta={mockMetaData} />);
    expect(screen.getByText("Follow")).toBeInTheDocument();
  });

  it("adds leading slash to menu URLs without one", () => {
    const menuRelativeUrl = {
      ...mockMenuData,
      menu_pages: [{ title: "Page", url: "page", category: "test" }],
    };
    render(<Footer menu={menuRelativeUrl} meta={mockMetaData} />);
    expect(screen.getByRole("link", { name: "Page" })).toHaveAttribute(
      "href",
      "/page"
    );
  });

  it("renders contact with target _blank and rel noopener", () => {
    render(<Footer menu={mockMenuData} meta={mockMetaData} />);
    const instagramLink = screen.getByLabelText("Instagram");
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders contact without rel when target is not _blank", () => {
    const menuSelfTarget = {
      ...mockMenuData,
      menu_contacts: [
        {
          url: "/contact",
          network: "email",
          target: "_self",
          label: "Email",
        },
      ],
    };
    render(<Footer menu={menuSelfTarget} meta={mockMetaData} />);
    const link = screen.getByLabelText("Email");
    expect(link).toHaveAttribute("target", "_self");
    expect(link).not.toHaveAttribute("rel");
  });

  it("handles empty url with fallback to slash", () => {
    const menuEmptyUrl = {
      ...mockMenuData,
      menu_pages: [{ title: "Empty", url: "", category: "test" }],
    };
    render(<Footer menu={menuEmptyUrl} meta={mockMetaData} />);
    expect(screen.getByRole("link", { name: "Empty" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("falls back to Link when contact has no label", () => {
    const menuNoLabel = {
      ...mockMenuData,
      menu_contacts: [
        {
          url: "https://x.com",
          network: "x",
          target: "_blank",
        },
      ],
    };
    render(<Footer menu={menuNoLabel} meta={mockMetaData} />);
    expect(screen.getByText("Link")).toBeInTheDocument();
  });
});
