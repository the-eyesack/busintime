/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://api.prod.obanyc.com/api/siri/vehicle-monitoring.json/:path*'
            }
        ]
    }
}

module.exports = nextConfig
