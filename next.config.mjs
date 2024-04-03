/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // swcPlugins: [
        //     ["next-superjson-plugin", {}]
        // ]

    },
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
                protocol: "https"
            },
            {
                hostname: "avatars.githubusercontent.com",
                protocol: "https"
            },
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https"
            },
            {
                hostname: "res.cloudinary.com",
                protocol: "https"
            }
        ]
    }
};

export default nextConfig;
