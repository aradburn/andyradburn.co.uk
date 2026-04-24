"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as Swetrix from "swetrix";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const apiURL = "https://swetrix-api.musigree.com/log";
    const pid = "tk8UH0E6rrE1";
    if (!pid) return;

    Swetrix.init(pid, {
      apiURL,
      devMode: false,
    });
    Swetrix.trackViews();
    Swetrix.trackErrors();
  }, []);

  useEffect(() => {
    Swetrix.trackViews();
  }, [pathname]);

  return null;
}
