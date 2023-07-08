/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/vehicleMonitoring/:path*',
                destination: 'http://api.prod.obanyc.com/api/siri/vehicle-monitoring.json/:path*'
            },
            {
                source: '/stopInformation/:path*',
                destination: 'https://bustime.mta.info/api/where/stops-for-route/:path*'
            }
        ]
    }
}

module.exports = nextConfig
