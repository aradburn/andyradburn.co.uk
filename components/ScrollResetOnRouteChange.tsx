"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAIN_CONTENT_ID = "main-content";

function resetScrollAndRefresh() {
  const scroller = document.getElementById(MAIN_CONTENT_ID);
  if (scroller) {
    scroller.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }
}

/**
 * Resets scroll position of the main content area when the route changes.
 * Runs reset immediately and again after layout (double rAF + short timeout)
 * so we catch the case where the new page content is shorter and commits
 * after pathname updates; then refreshes ScrollTrigger.
 */
export function ScrollResetOnRouteChange() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (prev !== null && prev !== pathname) {
      resetScrollAndRefresh();
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resetScrollAndRefresh();
          if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            resetScrollAndRefresh();
            timeoutRef.current = null;
          }, 50);
        });
      });
      return () => {
        cancelAnimationFrame(rafId);
        if (timeoutRef.current != null) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [pathname]);

  return null;
}
