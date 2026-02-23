import type { Metadata } from "next";
import { Suspense } from "react";
import { Arvo, Manrope, Audiowide } from "next/font/google";
import "./globals.css";
import "./styles.css";
import { getMenu, getMetaData } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Layout } from "@/components/Layout";
import { ScrollResetOnRouteChange } from "@/components/ScrollResetOnRouteChange";
import { AnalyticsDynamic } from "@/components/AnalyticsDynamic";

const arvo = Arvo({
    weight: ["400", "700"],
    style: ["normal"],
    subsets: ["latin"],
    variable: "--font-arvo",
    preload: true,
});
const manrope = Manrope({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-manrope",
    preload: true,
});
const audiowide = Audiowide({
    weight: ["400"],
    style: ["normal"],
    subsets: ["latin"],
    variable: "--font-audiowide",
    preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
    const title = "Andy Radburn";
    const description =
        "Official website of Andy Radburn. News, live dates, and fresh releases from the bands I'm part of - all in one place.";
    const openGraph = {
        title: "Andy Radburn's Website",
        description:
            "News, live dates, and fresh releases from the bands I'm part of - all in one place.",
        locale: "en_GB",
        type: "website",
        url: "https://andyradburn.co.uk/home",
        siteName: "Andy Radburn",
        images: [
            {
                url: "https://andyradburn.co.uk/assets/img/home/AndyKeyboardv3-750x750.png", // Must be an absolute URL
                width: 750,
                height: 750,
            },
        ],
    };
    const robots = {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            //       "max-video-preview": -1,
            //       "max-image-preview": "large",
            //       "max-snippet": -1,
        },
    };
    const icons = {
        icon: [
            {
                url: "/assets/img/dubbal/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/assets/img/dubbal/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
        ],
        //shortcut: "/shortcut-icon.png',
        apple: [
            {
                url: "/assets/img/dubbal/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
    const twitter = {
        card: "summary_large_image",
        title: "Andy Radburn",
        description:
            "Official website of Andy Radburn. News, live dates, and fresh releases from the bands I'm part of - all in one place.",
        //     siteId: '??????',
        //     creator: '@aradburn',
        //     creatorId: '???????',
        images: [
            "https://andyradburn.co.uk/assets/img/home/AndyKeyboardv3-750x750.png",
        ], // Must be an absolute URL
    };
    const other = {
        "dc.title": "Andy Radburn",
        "dc.description":
            "Official website of Andy Radburn. News, live dates, and fresh releases from the bands I'm part of - all in one place.",
        "dc.relation": "https://andyradburn.co.uk",
        "dc.source": "https://andyradburn.co.uk",
        "dc.language": "en_GB",
    };
    return {
        title,
        description,
        openGraph,
        robots,
        icons,
        twitter,
        other,
        category: "music",
    };
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const menu = getMenu();
    const meta = getMetaData();
    return (
        <html lang="en">
            <head>
                <meta
                    httpEquiv="Content-Security-Policy"
                    content={`default-src 'self' ;
                            script-src 'self' data: 'unsafe-eval' https://swetrix.org/swetrix.js https://cdn.jsdelivr.net/gh/Swetrix/ ;
                            script-src-elem 'self' data: 'unsafe-inline' https://swetrix.org/swetrix.js https://cdn.jsdelivr.net/gh/Swetrix/ ;
                            style-src 'self' ;
                            style-src-elem 'self' 'unsafe-inline' ;
                            style-src-attr 'self' 'unsafe-inline' 'unsafe-hashes' ;
                            object-src 'none' ;
                            frame-src 'self' https://bandcamp.com https://www.youtube-nocookie.com ;
                            child-src 'self' ;
                            img-src 'self' data: https://img.youtube.com https://swetrix-api.musigree.com/ ;
                            font-src 'self' https://*.fontawesome.com ;
                            connect-src 'self' http://localhost ws://localhost https://*.fontawesome.com https://swetrix-api.musigree.com/ ;
                            manifest-src 'self' ;
                            base-uri 'self' ;
                            form-action 'self' ;
                            media-src 'self' data: ;
                            worker-src 'self' ;`}
                />
                <meta name="referrer" content="origin-when-cross-origin" />
                <meta
                    httpEquiv="Permissions-Policy"
                    content="camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=(), encrypted-media=(), fullscreen=(self), picture-in-picture=(self)"
                />

                {/*
                <link rel="manifest" href="/assets/img/site.webmanifest" />
                <link rel="shortcut icon" href="/assets/img/favicon.ico" />
                <meta name="theme-color" content="#014034" />
                */}
            </head>
            <body
                className={`${arvo.variable} ${manrope.variable} ${audiowide.variable} font-sans flex h-screen flex-col overflow-hidden`}
            >
                <div className="h-16 shrink-0 md:h-24" aria-hidden />
                <Header menu={menu} meta={meta} />
                <ScrollResetOnRouteChange />
                <Layout footer={<Footer menu={menu} meta={meta} />}>
                    {children}
                </Layout>
                <Suspense fallback={null}>
                    <AnalyticsDynamic />
                </Suspense>
                {process.env.NEXT_PUBLIC_SWETRIX_PID && (
                    <noscript>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`https://swetrix-api.musigree.com/log/noscript?pid=${process.env.NEXT_PUBLIC_SWETRIX_PID}`}
                            alt=""
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </noscript>
                )}
            </body>
        </html>
    );
}
