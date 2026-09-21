const HOME_PATH_ALIASES = new Set(["/", "/home"]);

function normalizeNavPath(path: string): string {
    const trimmed = path.trim();
    if (trimmed === "" || trimmed === "/") {
        return "/";
    }
    return trimmed.replace(/\/+$/, "") || "/";
}

export function isNavLinkSelected(pathname: string, href: string): boolean {
    const normalizedPath = normalizeNavPath(pathname);
    const normalizedHref = normalizeNavPath(href);
    if (normalizedHref === "/") {
        return HOME_PATH_ALIASES.has(normalizedPath);
    }
    return (
        normalizedPath === normalizedHref ||
        normalizedPath.startsWith(`${normalizedHref}/`)
    );
}
