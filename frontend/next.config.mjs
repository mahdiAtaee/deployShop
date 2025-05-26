/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", 'loremflickr.com', "api.gravatar.com", 'www.gravatar.com', 'localhost']
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://deployshop.onrender.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
