/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  transpilePackages: [
    '@mui/material',
    '@mui/icons-material',
    '@mui/system',
    '@mui/utils',
    '@mui/base',
    '@mui/styled-engine',
    '@emotion/react',
    '@emotion/styled',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': require.resolve('@mui/styled-engine'),
      '@emotion/react': require.resolve('@emotion/react'),
      '@emotion/styled': require.resolve('@emotion/styled'),
    };
    return config;
  },
};

module.exports = nextConfig;
