import Link from "next/link";
import type { MenuData, MetaData } from "@/lib/types";

const FOLLOW_LABELS: Record<string, string> = {
  "fab fa-soundcloud": "SoundCloud",
  "fab fa-twitter": "Twitter",
  "fas fa-envelope": "Email",
  "fas fa-rss": "RSS",
};

const CONTACT_LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookies" },
] as const;

function ExploreColumn({ menu }: { menu: MenuData }) {
  return (
    <div>
      <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-text-muted">
        Explore
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {menu.menu_pages.map((item) => {
          const href = item.url.startsWith("/") ? item.url : `/${item.url}`;
          const normalized = href.replace(/\.html$/, "/") || "/";
          return (
            <li key={item.url}>
              <Link
                href={normalized}
                title={item.tooltip}
                className="text-sm text-text/90 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FollowColumn({ menu }: { menu: MenuData }) {
  return (
    <div>
      <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-text-muted">
        Follow
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {menu.menu_contacts?.map((c, i) => (
          <li key={i}>
            <a
              href={c.url || "#"}
              target={c.target}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text/90 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <i className={c.faicon} aria-hidden />
              <span>{FOLLOW_LABELS[c.faicon] ?? "Link"}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn() {
  return (
    <div>
      <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-text-muted">
        Contact
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {CONTACT_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-text/90 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ menu, meta }: { menu: MenuData; meta: MetaData }) {
  return (
    <footer className="shrink-0 border-t border-surface-border bg-surface/90">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <ExploreColumn menu={menu} />
          <FollowColumn menu={menu} />
          <ContactColumn />
        </div>
        <p className="mt-8 border-t border-surface-border pt-6 text-center text-sm text-text-muted">
          Copyright &copy;{" "}
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
          {meta.author}
        </p>
      </div>
    </footer>
  );
}
