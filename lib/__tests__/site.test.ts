import { describe, expect, it } from "vitest";
import {
    HOME_CANONICAL_URL,
    HOME_PATH,
    RETIRED_HOME_PATH,
    SITE_ORIGIN,
    buildMetadataForPath,
    canonicalUrlForPath,
    canonicalUrlForSection,
    retiredHomeRedirectMetadata,
} from "../site";

describe("canonical URLs", () => {
    it("uses the production origin as the homepage", () => {
        expect(SITE_ORIGIN).toBe("https://andyradburn.co.uk");
        expect(HOME_PATH).toBe("/");
        expect(HOME_CANONICAL_URL).toBe("https://andyradburn.co.uk/");
        expect(RETIRED_HOME_PATH).toBe("/home/");
    });

    it("maps the home section to the site root", () => {
        expect(canonicalUrlForSection("home")).toBe(
            "https://andyradburn.co.uk/",
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

describe("retiredHomeRedirectMetadata", () => {
    it("tells crawlers not to index /home/ and to treat / as canonical", () => {
        expect(retiredHomeRedirectMetadata.robots).toEqual({
            index: false,
            follow: true,
            googleBot: {
                index: false,
                follow: true,
            },
        });
        expect(retiredHomeRedirectMetadata.alternates).toEqual({
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
