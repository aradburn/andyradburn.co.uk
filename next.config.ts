import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // For GitHub Pages with custom domain (CNAME), use basePath: ''
  // For project site (username.github.io/repo), set basePath: '/repo-name'
  basePath: "",
  assetPrefix: "",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
