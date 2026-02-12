import { describe, expect, it } from "vitest";
import {
  SECTION_CATEGORIES,
  type MenuData,
  type MenuPage,
  type MenuContact,
  type MetaData,
  type SectionConfig,
  type SectionCategory,
  type Post,
  type PostFrontMatter,
  type LinkItem,
} from "../types";

describe("SECTION_CATEGORIES", () => {
  it("contains expected categories", () => {
    expect(SECTION_CATEGORIES).toContain("home");
    expect(SECTION_CATEGORIES).toContain("dubbal");
    expect(SECTION_CATEGORIES).toContain("sonicarcana");
    expect(SECTION_CATEGORIES).toContain("bubbledubble");
    expect(SECTION_CATEGORIES).toContain("collaborations");
    expect(SECTION_CATEGORIES).toContain("discography");
  });

  it("has exactly 6 categories", () => {
    expect(SECTION_CATEGORIES).toHaveLength(6);
  });

  it("each category is a non-empty string", () => {
    for (const cat of SECTION_CATEGORIES) {
      expect(typeof cat).toBe("string");
      expect(cat.length).toBeGreaterThan(0);
    }
  });
});

describe("SectionCategory type", () => {
  it("accepts valid section categories", () => {
    const valid: SectionCategory[] = [
      "home",
      "dubbal",
      "sonicarcana",
      "bubbledubble",
      "collaborations",
      "discography",
    ];
    expect(valid).toEqual([...SECTION_CATEGORIES]);
  });
});

describe("MenuData structure", () => {
  it("requires menu_pages array and menu_contacts array", () => {
    const valid: MenuData = {
      menu_pages: [],
      menu_contacts: [],
    };
    expect(valid.menu_pages).toEqual([]);
    expect(valid.menu_contacts).toEqual([]);
  });

  it("MenuPage requires title, url, category", () => {
    const page: MenuPage = {
      title: "Home",
      url: "/",
      category: "home",
    };
    expect(page.title).toBe("Home");
    expect(page.url).toBe("/");
    expect(page.category).toBe("home");
  });

  it("MenuPage allows optional tooltip", () => {
    const page: MenuPage = {
      title: "Dubbal",
      url: "/dubbal/",
      category: "dubbal",
      tooltip: "Dubbal tooltip",
    };
    expect(page.tooltip).toBe("Dubbal tooltip");
  });

  it("MenuContact requires url", () => {
    const contact: MenuContact = {
      url: "https://example.com",
    };
    expect(contact.url).toBe("https://example.com");
  });

  it("MenuContact allows optional network, target, label", () => {
    const contact: MenuContact = {
      url: "https://soundcloud.com/",
      network: "soundcloud",
      target: "_blank",
      label: "SoundCloud",
    };
    expect(contact.network).toBe("soundcloud");
    expect(contact.target).toBe("_blank");
    expect(contact.label).toBe("SoundCloud");
  });
});

describe("MetaData structure", () => {
  it("requires author, logo, clickToEnlargeImages, lang, cookies", () => {
    const meta: MetaData = {
      author: "Andy",
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
    expect(meta.author).toBe("Andy");
    expect(meta.cookies.enabled).toBe(true);
  });
});

describe("SectionConfig structure", () => {
  it("requires title, subtitle, description, about", () => {
    const config: SectionConfig = {
      title: "Section",
      subtitle: "Subtitle",
      description: "Description",
      about: null,
    };
    expect(config.title).toBe("Section");
    expect(config.about).toBeNull();
  });

  it("allows optional posts, gigs, videos config", () => {
    const config: SectionConfig = {
      title: "Section",
      subtitle: "Sub",
      description: "Desc",
      about: null,
      posts: { description: "News" },
      gigs: null,
      videos: { description: "Videos", "background-image": "bg.jpg" },
    };
    expect(config.posts?.description).toBe("News");
    expect(config.videos?.["background-image"]).toBe("bg.jpg");
  });
});

describe("Post and PostFrontMatter structure", () => {
  it("Post requires slug, category, frontMatter, content", () => {
    const post: Post = {
      slug: "test-post",
      category: "dubbal",
      frontMatter: {
        title: "Test",
        date: "2025-01-01",
        categories: ["dubbal"],
      },
      content: "Body content",
    };
    expect(post.slug).toBe("test-post");
    expect(post.frontMatter.title).toBe("Test");
  });

  it("PostFrontMatter allows optional layout, image, embed_player, etc", () => {
    const frontMatter: PostFrontMatter = {
      title: "Post",
      layout: "post",
      image: "cover.jpg",
      embed_player: {
        type: "bandcamp",
        src: "https://bandcamp.com/embed/123",
      },
    };
    expect(frontMatter.layout).toBe("post");
    expect(frontMatter.embed_player?.type).toBe("bandcamp");
  });

  it("LinkItem requires url and name", () => {
    const link: LinkItem = {
      url: "https://example.com",
      name: "Example",
    };
    expect(link.url).toBe("https://example.com");
    expect(link.name).toBe("Example");
  });
});
