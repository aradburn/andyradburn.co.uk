import { describe, expect, it } from "vitest";
import {
    HOME_CANONICAL_URL,
    HOME_PATH,
    SITE_ORIGIN,
    buildMetadataForPath,
    canonicalUrlForPath,
    canonicalUrlForSection,
    rootRedirectMetadata,
} from "../site";

describe("canonical URLs", () => {
    it("uses the production origin and trailing-slash home path", () => {
        expect(SITE_ORIGIN).toBe("https://andyradburn.co.uk");
        expect(HOME_PATH).toBe("/home/");
        expect(HOME_CANONICAL_URL).toBe("https://andyradburn.co.uk/home/");
    });

    it("builds a self-referencing canonical for a section slug", () => {
        expect(canonicalUrlForSection("home")).toBe(
            "https://andyradburn.co.uk/home/",
        );
        expect(canonicalUrlForSection("dubbal")).toBe(
            "https://andyradburn.co.uk/dubbal/",
        );
    });

    it("normalizes slashes on section slugs", () => {
        expect(canonicalUrlForSection("/about/")).toBe(
            "https://andyradburn.co.uk/about/",
        );
    });

    it("builds a canonical for an arbitrary path", () => {
        expect(canonicalUrlForPath("/")).toBe("https://andyradburn.co.uk/");
        expect(canonicalUrlForPath("privacy-policy")).toBe(
            "https://andyradburn.co.uk/privacy-policy/",
        );
    });
});

describe("rootRedirectMetadata", () => {
    it("tells crawlers not to index / and to treat /home/ as canonical", () => {
        expect(rootRedirectMetadata.robots).toEqual({
            index: false,
            follow: true,
            googleBot: {
                index: false,
                follow: true,
            },
        });
        expect(rootRedirectMetadata.alternates).toEqual({
            canonical: HOME_CANONICAL_URL,
        });
    });
});

describe("buildMetadataForPath", () => {
    it("sets a unique title and self-referencing canonical", () => {
        const metadata = buildMetadataForPath(
            "/about/",
            "About Andy Radburn",
            "Andy Radburn is a synthesizer player and composer living in Portsmouth, UK.",
        );
        expect(metadata.title).toBe("About Andy Radburn");
        expect(metadata.description).toBe(
            "Andy Radburn is a synthesizer player and composer living in Portsmouth, UK.",
        );
        expect(metadata.alternates?.canonical).toBe(
            "https://andyradburn.co.uk/about/",
        );
        expect(metadata.openGraph?.url).toBe("https://andyradburn.co.uk/about/");
    });
});
