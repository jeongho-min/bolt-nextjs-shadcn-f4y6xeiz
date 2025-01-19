/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['yvssieikcxdbtioggcbf.supabase.co', 'ilgoc-hospital.supabase.co'],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/ws\/lib\// }
    ];
    return config;
  },
};

module.exports = withPWA(nextConfig);
