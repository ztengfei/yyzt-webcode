/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: [],
        /** Do not run ESLint during production builds (`next build`). */
        ignoreDuringBuilds: true
    },
    output: "export"
};

module.exports = nextConfig;
