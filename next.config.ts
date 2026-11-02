import type { NextConfig } from "next";

// Site estático: cada página vira um HTML em out/, servível por Vercel ou Hostinger (FTP).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Id de build fixo: com um id novo a cada build, o deploy por FTP precisava apagar a pasta
  // _next/<id> antiga e a Hostinger responde "550 No such file", derrubando todo envio.
  generateBuildId: async () => "primeira-chave",
};

export default nextConfig;
