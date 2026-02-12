import path from "path";
import { describe, expect, it } from "vitest";
import {
  getMenu,
  getMetaData,
  getSectionsConfig,
  getSectionConfig,
  getAllPosts,
  getPostsByCategory,
  getDiscographyPosts,
  getPostBySlug,
  getAllPostSlugs,
  getAllVideos,
  getAllGigs,
  getVideosByCategory,
  getGigsByCategory,
  getVideosForHome,
  getGigsForHome,
  getPostsFromDirs,
  getContentFromDirs,
} from "../data";

const TEST_DIR = path.join(process.cwd(), "test");
const TEST_POSTS_DIRS = [
  { dir: path.join(TEST_DIR, "_posts"), category: "dubbal" },
];
const TEST_VIDEO_DIRS = [
  { dir: path.join(TEST_DIR, "_videos"), category: "dubbal" },
];

describe("getMenu", () => {
  it("returns menu data with menu_pages and menu_contacts", () => {
    const menu = getMenu();
    expect(menu).toHaveProperty("menu_pages");
    expect(menu).toHaveProperty("menu_contacts");
    expect(Array.isArray(menu.menu_pages)).toBe(true);
    expect(Array.isArray(menu.menu_contacts)).toBe(true);
  });

  it("menu_pages have title, url, category", () => {
    const menu = getMenu();
    expect(menu.menu_pages.length).toBeGreaterThan(0);
    for (const page of menu.menu_pages) {
      expect(page).toHaveProperty("title");
      expect(page).toHaveProperty("url");
      expect(page).toHaveProperty("category");
      expect(typeof page.title).toBe("string");
      expect(typeof page.url).toBe("string");
      expect(typeof page.category).toBe("string");
    }
  });

  it("menu_contacts have url", () => {
    const menu = getMenu();
    for (const contact of menu.menu_contacts) {
      expect(contact).toHaveProperty("url");
      expect(typeof contact.url).toBe("string");
    }
  });
});

describe("getMetaData", () => {
  it("returns meta data with author, logo, lang, cookies", () => {
    const meta = getMetaData();
    expect(meta).toHaveProperty("author");
    expect(meta).toHaveProperty("logo");
    expect(meta).toHaveProperty("lang");
    expect(meta).toHaveProperty("cookies");
    expect(typeof meta.clickToEnlargeImages).toBe("boolean");
  });

  it("cookies has required fields", () => {
    const meta = getMetaData();
    expect(meta.cookies).toHaveProperty("enabled");
    expect(meta.cookies).toHaveProperty("message");
    expect(meta.cookies).toHaveProperty("agreeButtonText");
    expect(meta.cookies).toHaveProperty("disagreeButtonText");
  });
});

describe("getSectionsConfig", () => {
  it("returns config keyed by section", () => {
    const config = getSectionsConfig();
    expect(typeof config).toBe("object");
    expect(config).not.toBeNull();
  });

  it("each section has expected config keys", () => {
    const config = getSectionsConfig();
    for (const [key, section] of Object.entries(config)) {
      expect(key).toBeTruthy();
      expect(section).toHaveProperty("title");
      expect(section).toHaveProperty("subtitle");
      expect(section).toHaveProperty("about");
    }
  });
});

describe("getSectionConfig", () => {
  it("returns config for known section", () => {
    const config = getSectionConfig("dubbal");
    expect(config).not.toBeNull();
    expect(config?.title).toBeDefined();
  });

  it("returns null for unknown section", () => {
    const config = getSectionConfig("nonexistent-section-xyz");
    expect(config).toBeNull();
  });

  it("returns config for home", () => {
    const config = getSectionConfig("home");
    expect(config).not.toBeNull();
  });
});

describe("getAllPosts", () => {
  it("returns array of posts", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it("each post has slug, category, frontMatter, content, excerpt", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("category");
      expect(post).toHaveProperty("frontMatter");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("excerpt");
      expect(typeof post.slug).toBe("string");
      expect(typeof post.category).toBe("string");
      expect(typeof post.content).toBe("string");
      expect(post.frontMatter).toHaveProperty("title");
      expect(post.frontMatter).toHaveProperty("date");
    }
  });

  it("posts are sorted newest first", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      const prev = posts[i - 1].frontMatter.date || "";
      const curr = posts[i].frontMatter.date || "";
      expect(prev.localeCompare(curr)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("getPostsByCategory", () => {
  it("returns only posts with matching category", () => {
    const posts = getPostsByCategory("dubbal");
    for (const post of posts) {
      expect(post.frontMatter.categories || []).toContain("dubbal");
    }
  });

  it("returns empty array for non-existent category", () => {
    const posts = getPostsByCategory("nonexistent-category-xyz");
    expect(posts).toEqual([]);
  });

  it("excludes discography subcategory when excludeDiscographySub is true", () => {
    const all = getPostsByCategory("bubbledubble", false);
    const excluding = getPostsByCategory("bubbledubble", true);
    const discographyPosts = all.filter(
      (p) => p.frontMatter.subcategory === "discography"
    );
    expect(discographyPosts.length).toBeGreaterThan(0);
    expect(excluding.length).toBe(all.length - discographyPosts.length);
  });
});

describe("getDiscographyPosts", () => {
  it("returns only posts with discography category", () => {
    const posts = getDiscographyPosts();
    for (const post of posts) {
      expect(post.frontMatter.categories || []).toContain("discography");
    }
  });
});

describe("getPostBySlug", () => {
  it("returns post for known slug and category", () => {
    const slugs = getAllPostSlugs();
    if (slugs.length > 0) {
      const { category, slug } = slugs[0];
      const post = getPostBySlug(category, slug);
      expect(post).not.toBeNull();
      expect(post?.slug).toBe(slug);
      expect(post?.category).toBe(category);
    }
  });

  it("returns null for unknown slug", () => {
    const post = getPostBySlug("dubbal", "nonexistent-slug-xyz");
    expect(post).toBeNull();
  });

  it("returns null for unknown category", () => {
    const post = getPostBySlug("nonexistent-category", "any-slug");
    expect(post).toBeNull();
  });
});

describe("getAllPostSlugs", () => {
  it("returns array of { category, slug }", () => {
    const slugs = getAllPostSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    for (const s of slugs) {
      expect(s).toHaveProperty("category");
      expect(s).toHaveProperty("slug");
      expect(typeof s.category).toBe("string");
      expect(typeof s.slug).toBe("string");
    }
  });

  it("matches slugs from getAllPosts", () => {
    const posts = getAllPosts();
    const slugs = getAllPostSlugs();
    expect(slugs.length).toBe(posts.length);
    const postKeys = new Set(posts.map((p) => `${p.category}:${p.slug}`));
    for (const { category, slug } of slugs) {
      expect(postKeys.has(`${category}:${slug}`)).toBe(true);
    }
  });
});

describe("getAllVideos", () => {
  it("returns array of video posts", () => {
    const videos = getAllVideos();
    expect(Array.isArray(videos)).toBe(true);
  });

  it("each video has slug, category, frontMatter, content", () => {
    const videos = getAllVideos();
    for (const video of videos) {
      expect(video).toHaveProperty("slug");
      expect(video).toHaveProperty("category");
      expect(video).toHaveProperty("content");
      expect(video).toHaveProperty("frontMatter");
    }
  });

  it("handles video with date as object in frontmatter", () => {
    const testVideos = getContentFromDirs(TEST_VIDEO_DIRS);
    const testVideo = testVideos.find((v) => v.slug === "test-date-object");
    expect(testVideo).toBeDefined();
    expect(testVideo?.frontMatter.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("getAllGigs", () => {
  it("returns array of gig posts", () => {
    const gigs = getAllGigs();
    expect(Array.isArray(gigs)).toBe(true);
  });
});

describe("getVideosByCategory", () => {
  it("returns only videos for matching category", () => {
    const videos = getVideosByCategory("dubbal");
    for (const post of videos) {
      expect(post.category).toBe("dubbal");
    }
  });
});

describe("getGigsByCategory", () => {
  it("returns only gigs for matching category", () => {
    const gigs = getGigsByCategory("dubbal");
    for (const post of gigs) {
      expect(post.category).toBe("dubbal");
    }
  });
});

describe("getVideosForHome", () => {
  it("returns only videos with home in categories", () => {
    const videos = getVideosForHome();
    for (const post of videos) {
      expect(post.frontMatter.categories || []).toContain("home");
    }
  });
});

describe("getGigsForHome", () => {
  it("returns only gigs with home in categories", () => {
    const gigs = getGigsForHome();
    for (const post of gigs) {
      expect(post.frontMatter.categories || []).toContain("home");
    }
  });
});

describe("slug extraction", () => {
  it("extracts slug from date-prefixed filename", () => {
    const post = getPostBySlug("dubbal", "dubbal-dubbal-one");
    expect(post).not.toBeNull();
  });
});

describe("parseCategories", () => {
  it("parses categories when frontmatter has categories as string", () => {
    const testPosts = getPostsFromDirs(TEST_POSTS_DIRS);
    const post = testPosts.find((p) => p.slug === "test-categories-string");
    expect(post).toBeDefined();
    expect(post?.frontMatter.categories).toEqual(["test", "dubbal"]);
  });
});

describe("excerpt", () => {
  it("adds ellipsis when content exceeds 200 characters", () => {
    const testPosts = getPostsFromDirs(TEST_POSTS_DIRS);
    const post = testPosts.find((p) => p.slug === "test-categories-string");
    expect(post).toBeDefined();
    expect(post?.excerpt?.endsWith("...")).toBe(true);
  });
});

describe("production data isolation", () => {
  it("getAllPosts returns only production content (no test directory data)", () => {
    const posts = getAllPosts();
    const testSlugs = ["test-categories-string", "test-date-object"];
    for (const slug of testSlugs) {
      expect(posts.some((p) => p.slug === slug)).toBe(false);
    }
  });

  it("getAllVideos returns only production content (no test directory data)", () => {
    const videos = getAllVideos();
    expect(videos.some((v) => v.slug === "test-date-object")).toBe(false);
  });
});
