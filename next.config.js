/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/vehicleMonitoring/:path*',
                destination: 'http://api.prod.obanyc.com/api/siri/vehicle-monitoring.json/:path*'
            },
            {
                source: '/routeInformation/:path*',
                destination: 'https://bustime.mta.info/api/where/stops-for-route/:path*'
            },
            {
                source: '/stopMonitoring/:path*',
                destination: 'https://bustime.mta.info/api/siri/stop-monitoring.json/:path*'
            }
        ]
    }
}

module.exports = nextConfig
