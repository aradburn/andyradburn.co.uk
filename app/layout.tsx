import type { Metadata } from "next";
import { Arvo, Manrope } from "next/font/google";
import "./globals.css";
import "./background.css";
import { getMenu, getMetaData } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Layout } from "@/components/Layout";

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
  openGraph: { title: "Andy Radburn", description: "Andy Radburn's website." },
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
        className={`${arvo.variable} ${manrope.variable} flex min-h-screen flex-col`}
      >
        <div className="h-16 shrink-0" aria-hidden />
        <Header menu={menu} meta={meta} />
        <Layout>{children}</Layout>
        <Footer menu={menu} meta={meta} />
      </body>
    </html>
  );
}
