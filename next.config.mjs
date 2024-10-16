/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/player',
                destination: '/player/dashboard',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
