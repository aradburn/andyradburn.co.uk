import { describe, expect, it } from "vitest";
import { isNavLinkSelected } from "../nav";

describe("isNavLinkSelected", () => {
    it("selects the home link only on the site root or retired /home path", () => {
        expect(isNavLinkSelected("/", "/")).toBe(true);
        expect(isNavLinkSelected("/home", "/")).toBe(true);
        expect(isNavLinkSelected("/home/", "/")).toBe(true);
        expect(isNavLinkSelected("/dubbal/", "/")).toBe(false);
        expect(isNavLinkSelected("/about/", "/")).toBe(false);
    });

    it("selects section links by exact path, ignoring trailing slash", () => {
        expect(isNavLinkSelected("/dubbal/", "/dubbal/")).toBe(true);
        expect(isNavLinkSelected("/dubbal", "/dubbal/")).toBe(true);
        expect(isNavLinkSelected("/sonicarcana/", "/dubbal/")).toBe(false);
    });
});
