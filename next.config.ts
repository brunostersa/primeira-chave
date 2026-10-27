import type { NextConfig } from "next";

// Site estático: cada página vira um HTML em out/, servível por Vercel ou Hostinger (FTP).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
