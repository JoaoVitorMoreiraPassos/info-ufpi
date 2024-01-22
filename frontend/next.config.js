/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.3',
            },
        ]
    },
}
