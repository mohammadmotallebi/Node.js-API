/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/api/:path*',
            },
            {
                source: '/:path*',
                destination: '/pages/:path*'
            },
            {
                source: '/',
                destination: '/dashboard',
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/pages/:path*',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig
