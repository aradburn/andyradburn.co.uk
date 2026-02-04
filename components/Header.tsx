"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import type { MenuData, MetaData } from "@/lib/types";

const CONTACT_LABELS: Record<string, string> = {
  "fab fa-soundcloud": "SoundCloud",
  "fab fa-twitter": "Twitter",
  "fas fa-envelope": "Email",
  "fas fa-rss": "RSS",
};

function NavLinks({ menu }: { menu: MenuData }) {
  const pathname = usePathname();
  return (
    <>
      {menu.menu_pages.map((item) => {
        let href = item.url.startsWith("/") ? item.url : `/${item.url}`;
        href = href.replace(/\.html$/, "/") || "/";
        const p = pathname ?? "";
        const isSelected =
          p === href ||
          p === href.replace(/\/$/, "") ||
          (p.startsWith(href) && href !== "/");
        return (
          <li key={item.url}>
            <Link
              href={href}
              title={item.tooltip}
              className={`rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-[color,background-color] hover:bg-accent/10 hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${isSelected ? "border-1 border-surface-border bg-accent/15 text-accent" : "text-text/90"}`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
      {/*
      <li>
        <Link
          href="/mandala/"
          className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide text-text/90 transition-[color,background-color] hover:bg-accent/10 hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          title="Mandala Art"
        >
          Mandala
        </Link>
      </li>
  */}
    </>
  );
}

export function Header({ menu, meta }: { menu: MenuData; meta: MetaData }) {
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-surface-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/90">
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
          aria-label="Home"
        >
          <Image
            src={`/${meta.logo}`}
            alt=""
            width={160}
            height={64}
            className="h-10 w-auto object-contain md:h-12"
            priority
          />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
          aria-label="Main"
        >
          <ul className="flex flex-wrap items-center justify-center gap-1">
            <NavLinks menu={menu} />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {menu.menu_contacts?.map((c, i) => (
            <a
              key={i}
              href={c.url || "#"}
              target={c.target}
              rel="noopener noreferrer"
              aria-label={CONTACT_LABELS[c.faicon] ?? "External link"}
              className="rounded p-2 text-text-muted transition-[color,background-color] hover:bg-accent/10 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <i className={c.faicon} aria-hidden />
            </a>
          ))}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            onKeyDown={onKeyDown}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded md:hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex h-5 w-6 flex-col justify-center gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-text transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-text transition-opacity duration-200 motion-reduce:transition-none ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-text transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`fixed inset-0 top-16 z-40 md:hidden ${open ? "visible" : "invisible pointer-events-none"}`}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 bg-surface/80 backdrop-blur-sm transition-opacity duration-200 ease-out"
          aria-hidden
          onClick={closeMenu}
        />
        <nav
          className="absolute left-0 right-0 top-0 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-surface-border bg-surface py-4 shadow-lg transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none overscroll-contain"
          aria-label="Mobile navigation"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-8px)",
          }}
          onClick={closeMenu}
        >
          <ul className="flex flex-col gap-1 px-4">
            <NavLinks menu={menu} />
          </ul>
          <div className="mt-4 flex justify-center gap-2 border-t border-surface-border pt-4">
            {menu.menu_contacts?.map((c, i) => (
              <a
                key={i}
                href={c.url || "#"}
                target={c.target}
                rel="noopener noreferrer"
                aria-label={CONTACT_LABELS[c.faicon] ?? "External link"}
                className="rounded p-3 text-text-muted transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <i className={c.faicon} aria-hidden />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
