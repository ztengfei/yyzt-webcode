/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: [],
        /** Do not run ESLint during production builds (`next build`). */
        ignoreDuringBuilds: true
    }
    // devServer: {
    //     port: 8000
    // }
    // output: "export"
};

module.exports = nextConfig;
