import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import type {
    MenuData,
    MetaData,
    Post,
    PostFrontMatter,
    SectionConfig,
    SectionsConfig,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "_data");
const ROOT = process.cwd();

function loadYaml<T>(filename: string): T {
    const filePath = path.join(DATA_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    return yaml.load(raw) as T;
}

export const getMenu = cache(function getMenu(): MenuData {
    return loadYaml<MenuData>("menu.yml");
});

export const getMetaData = cache(function getMetaData(): MetaData {
    return loadYaml<MetaData>("metaData.yml");
});

export const getSectionsConfig = cache(
    function getSectionsConfig(): SectionsConfig {
        return loadYaml<SectionsConfig>("sections.yml");
    },
);

export function getSectionConfig(section: string): SectionConfig | null {
    const config = getSectionsConfig();
    return config[section] ?? null;
}

const POSTS_DIRS = [
    { dir: path.join(ROOT, "home", "_posts"), category: "home" },
    { dir: path.join(ROOT, "dubbal", "_posts"), category: "dubbal" },
    { dir: path.join(ROOT, "sonicarcana", "_posts"), category: "sonicarcana" },
    {
        dir: path.join(ROOT, "bubbledubble", "_posts"),
        category: "bubbledubble",
    },
    { dir: path.join(ROOT, "spacecadets", "_posts"), category: "spacecadets" },
];

const VIDEO_DIRS = [
    { dir: path.join(ROOT, "home", "_videos"), category: "home" },
    { dir: path.join(ROOT, "dubbal", "_videos"), category: "dubbal" },
    { dir: path.join(ROOT, "sonicarcana", "_videos"), category: "sonicarcana" },
    {
        dir: path.join(ROOT, "bubbledubble", "_videos"),
        category: "bubbledubble",
    },
    {
        dir: path.join(ROOT, "spacecadets", "_videos"),
        category: "spacecadets",
    },
];

const GIG_DIRS = [
    { dir: path.join(ROOT, "home", "_gigs"), category: "home" },
    { dir: path.join(ROOT, "dubbal", "_gigs"), category: "dubbal" },
    { dir: path.join(ROOT, "sonicarcana", "_gigs"), category: "sonicarcana" },
    { dir: path.join(ROOT, "bubbledubble", "_gigs"), category: "bubbledubble" },
    { dir: path.join(ROOT, "spacecadets", "_gigs"), category: "spacecadets" },
];

function parseCategories(categories: string[] | string | undefined): string[] {
    if (!categories) return [];
    if (Array.isArray(categories)) return categories;
    return categories.split(/\s+/).filter(Boolean);
}

function slugFromFilename(filename: string): string {
    return filename
        .replace(/^\d{4}-\d{2}-\d{2}-/, "")
        .replace(/\.markdown$/, "")
        .replace(/\.md$/, "");
}

function dateFromFilename(filename: string): string | undefined {
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : undefined;
}

/** Builds posts from a list of dirs. Used by getAllPosts (production) and by tests with test dirs. */
export function getPostsFromDirs(
    dirs: { dir: string; category: string }[],
): Post[] {
    const posts: Post[] = [];
    for (const { dir, category } of dirs) {
        if (!fs.existsSync(dir)) continue;
        const files = fs
            .readdirSync(dir)
            .filter((f) => /\.(markdown|md)$/i.test(f));
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const raw = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(raw);
            const categories = parseCategories(data.categories);
            const slug = slugFromFilename(file);
            const normalizedCategories = Array.isArray(categories)
                ? categories
                : [categories].filter(Boolean);
            const frontMatterDate = data.date
                ? typeof data.date === "string"
                    ? data.date
                    : (data.date as Date).toISOString().slice(0, 10)
                : dateFromFilename(file);
            posts.push({
                slug,
                category,
                frontMatter: {
                    ...data,
                    title: data.title ?? slug,
                    date: frontMatterDate,
                    categories: normalizedCategories,
                } as PostFrontMatter,
                content,
                excerpt:
                    content.slice(0, 200).replace(/\n/g, " ").trim() +
                    (content.length > 200 ? "..." : ""),
            });
        }
    }
    return posts.toSorted((a, b) => {
        const dA = a.frontMatter.date || "";
        const dB = b.frontMatter.date || "";
        return dB.localeCompare(dA);
    });
}

export function getAllPosts(): Post[] {
    return getPostsFromDirs(POSTS_DIRS);
}

export function getPostsByCategory(
    category: string,
    excludeDiscographySub = false,
): Post[] {
    const all = getAllPosts();
    return all.filter((p) => {
        const cats = p.frontMatter.categories || [];
        const hasCategory = cats.includes(category);
        if (!hasCategory) return false;
        if (
            excludeDiscographySub &&
            p.frontMatter.subcategory === "discography"
        )
            return false;
        return true;
    });
}

export function getDiscographyPosts(): Post[] {
    const all = getAllPosts();
    return all.filter((p) =>
        (p.frontMatter.categories || []).includes("discography"),
    );
}

export function getPostBySlug(category: string, slug: string): Post | null {
    const all = getAllPosts();
    return all.find((p) => p.category === category && p.slug === slug) ?? null;
}

export function getAllPostSlugs(): { category: string; slug: string }[] {
    return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

/** Builds video/gig-style posts from dirs. Used by getAllVideos/getAllGigs (production) and by tests. */
export function getContentFromDirs(
    dirs: { dir: string; category: string }[],
): Post[] {
    return getPostsFromDirs(dirs);
}

export function getAllVideos(): Post[] {
    return getContentFromDirs(VIDEO_DIRS);
}

export function getAllGigs(): Post[] {
    return getContentFromDirs(GIG_DIRS);
}

export function getVideosByCategory(category: string): Post[] {
    const all = getAllVideos();
    return all.filter((p) => p.category === category);
}

export function getGigsByCategory(category: string): Post[] {
    const all = getAllGigs();
    return all.filter((p) => p.category === category);
}

export function getGigsForHome(): Post[] {
    const all = getAllGigs();
    return all.filter((p) => (p.frontMatter.categories || []).includes("home"));
}

export function getVideosForHome(): Post[] {
    const all = getAllVideos();
    return all.filter((p) => (p.frontMatter.categories || []).includes("home"));
}
