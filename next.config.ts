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
        // 이미지 도메인 허용 (필요한 경우 외부 이미지 도메인 추가)
        domains: ['example.com', 'images.unsplash.com'],
    },

    // 404 페이지 및 에러 페이지 커스텀을 위한 설정
    trailingSlash: true,

    // 타입스크립트 설정
    typescript: {
        // 프로덕션 빌드 시 타입 체크 건너뛰기 (속도 향상)
        ignoreBuildErrors: false,
    },
    turbopack: {
        // Example: adding an alias and custom file extension
        resolveAlias: {
            underscore: 'lodash',
            '@/svgs': './src/assets/svgs',
            '@/ui': './src/components/ui',
            '@/components': './src/components',
        },
        resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],

        rules: {
            // SVG loader configuration for Turbopack
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.tsx',
            },
            // CSS/SCSS loader configuration
            // '*.css': {
            //     loaders: ['postcss-loader'],
            // },
            // // TypeScript configuration for Turbopack
            // '*.ts': {
            //     loaders: ['ts-loader'],
            // },
            // '*.tsx': {
            //     loaders: ['ts-loader'],
            // },
        },
    },

    /** Turbopack experimental configuration */
    // experimental: {
    //     turbo: {
    //         rules: {
    //             // SVG loader configuration for Turbopack
    //             '*.svg': {
    //                 loaders: ['@svgr/webpack'],
    //                 as: '*.tsx',
    //             },
    //             // CSS/SCSS loader configuration
    //             '*.css': {
    //                 loaders: ['postcss-loader'],
    //             },
    //             // TypeScript configuration for Turbopack
    //             '*.ts': {
    //                 loaders: ['ts-loader'],
    //             },
    //             '*.tsx': {
    //                 loaders: ['ts-loader'],
    //             },
    //         },
    //         resolveAlias: {
    //             '@/svgs': './src/assets/svgs',
    //             '@/ui': './src/components/ui',
    //             '@/components': './src/components',
    //         },
    //     },
    // },

    /* config options here */
    webpack: (config: any, options: any) => {
        console.log('>> next.config.ts::webpack config called');

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
                                            removeViewBox: false,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
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
