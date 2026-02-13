"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(
    () => import("@/components/Analytics").then((m) => m.default),
    { ssr: false }
);

export function AnalyticsDynamic() {
    return <Analytics />;
}
