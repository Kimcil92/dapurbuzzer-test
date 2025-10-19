/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dapurbuzzer-api.kodekreatifdigital.id',
                pathname: '/storage/**',
            },
            {
                protocol: 'https',
                hostname: '**.fna.fbcdn.net',
            },
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
            },
            {
                protocol: 'https',
                hostname: 'dapurbuzzer.co.id',
            },
            {
                protocol: 'https',
                hostname: 'app.dapurbuzzer.co.id',
            },
        ],
    },

    trailingSlash: true,


    basePath: '',
    assetPrefix: './',

    reactStrictMode: false,
};

module.exports = nextConfig;
