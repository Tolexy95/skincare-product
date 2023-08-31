/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: process.env.NODE_ENV === 'development', // Enable in development mode only
    images: {
      domains: ["cdn.sanity.io"],
    },
}

module.exports = nextConfig;
