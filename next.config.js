/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uhwgptibeyawxmljdydm.supabase.co"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
