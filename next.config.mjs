/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_APIURL: "http://96.9.81.187:8080/api/v1",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
