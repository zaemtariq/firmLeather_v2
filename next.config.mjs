/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/products/all",
        permanent: true, // Use true for SEO (301 redirect), false for temporary (307)
      },
    ];
  },
};

export default nextConfig;
