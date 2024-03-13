/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRss: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
