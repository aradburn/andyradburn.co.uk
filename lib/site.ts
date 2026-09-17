import type { Metadata } from "next";

export const SITE_ORIGIN = "https://andyradburn.co.uk";
export const HOME_PATH = "/home/";
export const HOME_CANONICAL_URL = `${SITE_ORIGIN}${HOME_PATH}`;

function normalizePath(path: string): string {
    const trimmed = path.trim();
    if (trimmed === "" || trimmed === "/") {
        return "/";
    }
    const withoutSlashes = trimmed.replace(/^\/+|\/+$/g, "");
    return `/${withoutSlashes}/`;
}

export function canonicalUrlForPath(path: string): string {
    const normalized = normalizePath(path);
    if (normalized === "/") {
        return `${SITE_ORIGIN}/`;
    }
    return `${SITE_ORIGIN}${normalized}`;
}

export function canonicalUrlForSection(section: string): string {
    return canonicalUrlForPath(section);
}

export const rootRedirectMetadata: Metadata = {
    robots: {
        index: false,
        follow: true,
        googleBot: {
            index: false,
            follow: true,
        },
    },
    alternates: {
        canonical: HOME_CANONICAL_URL,
    },
};

export function buildMetadataForPath(
    path: string,
    title: string,
    description?: string,
): Metadata {
    const canonical = canonicalUrlForPath(path);
    return {
        title,
        ...(description === undefined ? {} : { description }),
        alternates: {
            canonical,
        },
        openGraph: {
            url: canonical,
            title,
            ...(description === undefined ? {} : { description }),
        },
    };
}
