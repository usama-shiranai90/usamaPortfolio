/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    experimental: {
        // Rewrites barrel imports (`import { X } from 'lucide-react'`) into deep
        // per-icon imports so only the icons actually used reach the bundle.
        optimizePackageImports: ['lucide-react', 'react-icons/si'],
    },
    images: {
        // AVIF first, WebP fallback — both are far smaller than the source PNG/JPGs.
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'resources.jetbrains.com',
            },
            {
                protocol: 'https',
                hostname: 'www.vectorlogo.zone',
            },
        ],
    },
}

export default nextConfig
