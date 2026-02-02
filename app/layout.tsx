import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/Layout";

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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;600;700&display=swap"
        />
        <meta name="theme-color" content="#014034" />
        <script
          src="https://kit.fontawesome.com/79c31398dc.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
