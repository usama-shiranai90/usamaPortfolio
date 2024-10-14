

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from "node:path";
import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
   /* serverRuntimeConfig: {
        PROJECT_ROOT: __dirname
    },*/
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        outputFileTracingIncludes: {
            '/articles/*': ['./src/app/articles/**/*.mdx'],
        },
    },
}

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
    },
})

export default withMDX(nextConfig)
