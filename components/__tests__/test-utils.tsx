import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import type { MenuData, MetaData, Post, SectionConfig } from "@/lib/types";

export const mockMenuData: MenuData = {
  menu_pages: [
    { title: "Home", url: "/", category: "home", tooltip: "Home" },
    { title: "About", url: "/about/", category: "about", tooltip: "About" },
  ],
  menu_contacts: [
    {
      url: "https://example.com",
      network: "instagram",
      target: "_blank",
      label: "Instagram",
    },
  ],
};

export const mockMetaData: MetaData = {
  author: "Test Author",
  logo: "logo.png",
  clickToEnlargeImages: false,
  lang: "en",
  cookies: {
    enabled: true,
    message: "We use cookies",
    agreeButtonText: "Agree",
    disagreeButtonText: "Disagree",
    agreeButtonFnName: "agree",
    disagreeButtonFnName: "disagree",
    header: "Cookies",
  },
};

export const mockPost: Post = {
  slug: "test-post",
  category: "news",
  frontMatter: {
    title: "Test Post",
    description: "Test description",
    image: "test.jpg",
    image_alt: "Test image",
    date: "2024-01-01",
  },
  content: "Content",
  excerpt: "Excerpt",
};

export const mockPostWithExternal: Post = {
  ...mockPost,
  slug: "external-post",
  frontMatter: {
    ...mockPost.frontMatter,
    external_url: "https://external.com",
    external_name: "External Site",
  },
};

export const mockSectionConfig: SectionConfig = {
  title: "Test Section",
  subtitle: "Test Subtitle",
  description: "Test description",
  about: {
    image: "about.jpg",
    image_alt: "About image",
    heading: "About Heading",
    subheading: "About subheading",
  },
  posts: { description: "News" },
  gigs: { description: "Gigs" },
  videos: { description: "Videos" },
};

function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
}

export { customRender as render };
