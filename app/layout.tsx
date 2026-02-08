import type { Metadata } from "next";
import { Arvo, Manrope } from "next/font/google";
import "./globals.css";
import "./styles.css";
import { getMenu, getMetaData } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Layout } from "@/components/Layout";
import { ScrollResetOnRouteChange } from "@/components/ScrollResetOnRouteChange";

const arvo = Arvo({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});
const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Andy Radburn",
  description: "Andy Radburn's website.",
  openGraph: {
      title: "Andy Radburn",
//       type: "website",
      description: "Andy Radburn's website."
      // TODO
//       "og_image": og_image,
//       "og:site_name" content="Musigree"/>
//       "og_url": og_url,
  },
//   other: {
//     http-equiv: ['meta1', 'meta2'],
//   },
};

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
        {/*
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' data: 'unsafe-eval'; script-src-elem 'self' data: 'unsafe-inline'; style-src 'self'; style-src-elem 'self' 'unsafe-inline'; style-src-attr 'self' 'unsafe-inline' 'unsafe-hashes'; object-src 'none'; frame-src 'self' https://bandcamp.com ; child-src 'self'; img-src 'self' data:; font-src 'self' https://*.fontawesome.com; connect-src 'self' http://localhost ws://localhost https://*.fontawesome.com; manifest-src 'self'; base-uri 'self'; form-action 'self'; media-src 'self' data:; worker-src 'self'"
        />
        <meta
          name="referrer"
          content="origin-when-crossorigin"
        />
        */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/img/site.webmanifest" />
        <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        <meta name="theme-color" content="#014034" />
        <script
          src="https://kit.fontawesome.com/79c31398dc.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body
        className={`${arvo.variable} ${manrope.variable} flex h-screen flex-col overflow-hidden`}
      >
        <div className="h-16 shrink-0" aria-hidden />
        <Header menu={menu} meta={meta} />
        <ScrollResetOnRouteChange />
        <Layout footer={<Footer menu={menu} meta={meta} />}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
