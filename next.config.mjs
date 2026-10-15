/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        search: "/**",
        pathname: "/viniciosneves/code-connect-assets/**",
        search: "",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Se não for o servidor (ou seja, se for o cliente), ignora o módulo 'fs'
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
