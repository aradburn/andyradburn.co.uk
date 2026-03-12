"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as Swetrix from "swetrix";

export default function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        const apiURL = "https://swetrix-api.musigree.com/log";
        const pid = "GjQYW2KvWZTZ";
        if (!pid) return;

        Swetrix.init(pid, {
            apiURL: apiURL,
            devMode: false,
            // disabled: process.env.NODE_ENV === "development",
        });
        Swetrix.trackViews();
        Swetrix.trackErrors();
    }, []);

    useEffect(() => {
        Swetrix.trackViews();
    }, [pathname]);

    return null;
}
