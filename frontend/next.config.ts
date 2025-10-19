/** @type {import('next').NextConfig} */
const nextConfig = {
    // Penting: agar bisa export ke static hosting (tanpa Node)
    output: 'export',

    // Menonaktifkan image optimizer bawaan (karena butuh server Node)
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
            }
        ],
    },

    trailingSlash: true,

    assetPrefix: './',
};

module.exports = nextConfig;
