"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as Swetrix from "swetrix";

export default function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        const apiURL = process.env.NEXT_PUBLIC_SWETRIX_API_URL;
        const pid = process.env.NEXT_PUBLIC_SWETRIX_PID;
        if (!pid) return;

        Swetrix.init(pid, {
            apiURL: apiURL,
            devMode: true,
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
