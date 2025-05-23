import type { NextConfig } from 'next';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    // output: "standalone", // Outputs a static site. docker?

    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',

    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // trailingSlash: true,

    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,

    /** deactivate for SPA */
    images: {
        unoptimized: true,
    },

    /** turbo pack */

    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.tsx',
                },
            },
        },
    },

    /* config options here */
    webpack: (config, options) => {
        console.log('--> spa config with export s: webpack config called');

        // PDF loader
        config.module.rules.push({
            test: /\.(pdf)$/,
            type: 'asset/resource',
        });

        // SVG loader
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            removeViewBox: false
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        });

        // alias for path
        config.resolve.alias = {
            ...config.resolve.alias,
            '@/svgs': path.resolve(process.cwd(), './src/assets/svgs'),
            '@/ui': path.resolve(process.cwd(), './src/components/ui'),
            '@/components': path.resolve(process.cwd(), './src/components'),
        };

        return config;
    },

    /**
     * @details no SPA
     */
    // async rewrites() {
    //     return [
    //         {
    //             source: '/about',
    //             destination: '/',
    //         },
    //     ];
    // },
};

export default nextConfig;

// const updateAlias = (config: any) => {
// 	const alias = config.resolve.alias;

// 	console.log(">>>>> ", alias);

// 	config.resolve.alias = {
// 		...alias,
// 		// "@/": [
// 		// 	path.resolve(process.cwd(), "./src/"),
// 		// 	path.resolve(process.cwd(), "src/"),
// 		// ],
// 		"@svg": [
// 			path.resolve(process.cwd(), "./src/assets/svgs"),
// 			path.resolve(process.cwd(), "src/assets/svgs"),
// 		],
// 		"@ui": [
// 			path.resolve(process.cwd(), "./src/components/ui"),
// 			path.resolve(process.cwd(), "src/components/ui"),
// 		],
// 		"@components": [
// 			path.resolve(process.cwd(), "./src/components"),
// 			path.resolve(process.cwd(), "src/components"),
// 		],
// 	};

// 	return config;
// };

// const updateSVGR = (config: any) => {
// 	// Grab the existing rule that handles SVG imports
// 	const fileLoaderRule = config.module.rules.find((rule: any) =>
// 		rule.test?.test?.(".svg")
// 	);

// 	config.module.rules.push(
// 		// Reapply the existing rule, but only for svg imports ending in ?url
// 		{
// 			...fileLoaderRule,
// 			test: /\.svg$/i,
// 			resourceQuery: /url/, // *.svg?url
// 		},
// 		// Convert all other *.svg imports to React components
// 		{
// 			test: /\.svg$/i,
// 			issuer: fileLoaderRule.issuer,
// 			resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
// 			use: ["@svgr/webpack"],
// 		}
// 	);

// 	// Modify the file loader rule to ignore *.svg, since we have it handled now.
// 	fileLoaderRule.exclude = /\.svg$/i;

// 	return config;
// };
