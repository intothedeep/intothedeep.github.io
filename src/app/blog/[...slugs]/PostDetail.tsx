'use client';

import React, { useEffect, useState } from 'react';
import production from 'react/jsx-runtime';
import axios from 'axios';

// Import unified ecosystem packages
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeReact from 'rehype-react';
import rehypeHighlight from 'rehype-highlight';
import { all, common, createLowlight } from 'lowlight';

// Define types
type TPostFlattenedItem = {
    title: string;
    type: string;
    level: number;
    content: string;
};

type Props = {
    slugs: string[];
};

export default function PostDetail({ slugs = [] }: Props) {
    const [meta, setMeta] = useState<TPostFlattenedItem>();
    const [htmlContent, setHtmlContent] = useState('');
    const [reactContent, setReactContent] = useState<React.ReactNode>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/posts/parsed.json', {
                    responseType: 'json',
                });

                const arr: TPostFlattenedItem[] = response.data;
                const titleFromSlugs = slugs[slugs.length - 1];

                const currentMeta = arr.find((meta) => {
                    return meta.title === titleFromSlugs;
                });

                setMeta(currentMeta);
                return currentMeta;
            } catch (error) {
                console.error('데이터 요청 실패:', error);
            }
        };

        fetchData();
    }, [slugs]);

    useEffect(() => {
        if (meta?.content) {
            // Process content to generate HTML with TOC and syntax highlighting
            const processContent = async () => {
                // Pipeline for HTML output
                const htmlResult = await unified()
                    .use(remarkParse) // Parse markdown into mdast
                    .use(remarkGfm) // Support GitHub Flavored Markdown
                    // .use(rehypeSlug) // Add IDs to headings in markdown AST before TOC generation
                    .use(remarkToc, {
                        heading: 'Table of Contents',
                        tight: true,
                        maxDepth: 3,
                    }) // Generate TOC
                    .use(remarkRehype, { allowDangerousHtml: true }) // Transform to hast
                    .use(rehypeSlug) // Add IDs to headings in HTML AST (backup)
                    .use(rehypePrism, { showLineNumbers: true }) // Syntax highlighting
                    .use(rehypeStringify, { allowDangerousHtml: true }) // Stringify to HTML
                    .process(meta.content);

                setHtmlContent(String(htmlResult));

                const lowlight = createLowlight(common);

                const tree = lowlight.highlight('js', '"use strict";');

                // Pipeline for React components
                const processor = unified()
                    .use(remarkParse)
                    .use(remarkGfm) // Support GitHub Flavored Markdown
                    // .use(remarkSlug) // Add IDs to headings in markdown AST before TOC generation
                    .use(remarkToc, {
                        heading: 'Table of Contents',
                        tight: true,
                        maxDepth: 3,
                    })
                    .use(remarkRehype, { allowDangerousHtml: true })
                    .use(rehypeSlug) // Add IDs to headings in HTML AST (backup)
                    .use(rehypeHighlight, {
                        // languages: { ...tree },
                    })
                    .use(rehypePrism, { showLineNumbers: true })
                    // .use(rehypeReact, production);
                    .use(rehypeReact, production, {
                        createElement: React.createElement,
                        Fragment: true, // Add this line - providing React.Fragment
                        components: {
                            // Custom React components for specific HTML elements
                            h1: (props: any) => (
                                <h1
                                    className="text-2xl font-bold my-4"
                                    {...props}
                                />
                            ),
                            h2: (props: any) => (
                                <h2
                                    className="text-xl font-semibold my-3"
                                    {...props}
                                />
                            ),
                            h3: (props: any) => (
                                <h3
                                    className="text-lg font-medium my-2"
                                    {...props}
                                />
                            ),
                            a: (props: any) => {
                                // Add smooth scrolling for TOC links
                                if (props.href?.startsWith('#')) {
                                    return (
                                        <a
                                            {...props}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const targetId =
                                                    props.href.substring(1);
                                                const element =
                                                    document.getElementById(
                                                        targetId
                                                    );
                                                if (element) {
                                                    element.scrollIntoView({
                                                        behavior: 'smooth',
                                                    });
                                                    // Update URL without refresh
                                                    window.history.pushState(
                                                        null,
                                                        '',
                                                        props.href
                                                    );
                                                }
                                            }}
                                            className="text-blue-600 hover:underline"
                                        />
                                    );
                                }
                                return (
                                    <a
                                        className="text-blue-600 hover:underline"
                                        {...props}
                                    />
                                );
                            },
                            code: (props: any) => (
                                <code
                                    className="bg-gray-100 rounded px-1"
                                    {...props}
                                />
                            ),
                            pre: (props: any) => (
                                <pre
                                    className="bg-gray-800 text-white p-4 rounded my-4 overflow-auto"
                                    {...props}
                                />
                            ),
                            // Custom components for GFM-specific elements
                            table: (props: any) => (
                                <table
                                    className="border-collapse table-auto w-full my-4"
                                    {...props}
                                />
                            ),
                            thead: (props: any) => (
                                <thead
                                    className="bg-gray-100"
                                    {...props}
                                />
                            ),
                            th: (props: any) => (
                                <th
                                    className="border border-gray-300 px-4 py-2 text-left"
                                    {...props}
                                />
                            ),
                            td: (props: any) => (
                                <td
                                    className="border border-gray-300 px-4 py-2"
                                    {...props}
                                />
                            ),
                            // Task list items
                            li: (props: any) => {
                                // Check if this is a task list item
                                if (
                                    props.className?.includes('task-list-item')
                                ) {
                                    return (
                                        <li
                                            className="flex items-start my-1"
                                            {...props}
                                        />
                                    );
                                }
                                return (
                                    <li
                                        className="my-1"
                                        {...props}
                                    />
                                );
                            },
                            // Strikethrough
                            del: (props: any) => (
                                <del
                                    className="line-through"
                                    {...props}
                                />
                            ),
                            // Style the TOC nav
                            nav: (props: any) => {
                                if (props.className?.includes('toc')) {
                                    return (
                                        <nav
                                            className="toc bg-gray-50 p-4 rounded mb-6"
                                            {...props}
                                        />
                                    );
                                }
                                return <nav {...props} />;
                            },
                        },
                    });

                const reactResult = await processor.process(meta.content);
                setReactContent(reactResult.result);
            };

            processContent();
        }
    }, [meta]);

    // Debug function to log IDs after rendering
    useEffect(() => {
        if (htmlContent) {
            console.log('Content rendered, checking heading IDs...');
            // Use setTimeout to ensure the DOM has been updated
            setTimeout(() => {
                const headings = document.querySelectorAll(
                    'h1, h2, h3, h4, h5, h6'
                );
                console.log(`Found ${headings.length} headings:`);
                headings.forEach((heading) => {
                    console.log(
                        `${heading.tagName}: id="${heading.id}", text="${heading.textContent}"`
                    );
                });
            }, 500);
        }
    }, [htmlContent]);

    if (!meta) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-detail">
            <h1 className="text-3xl font-bold mb-6">{meta.title}</h1>

            <div className="post-meta mb-4">
                <div>
                    <strong>Type:</strong> {meta.type}
                </div>
                <div>
                    <strong>Level:</strong> {meta.level}
                </div>
            </div>

            <div className="content-tabs mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    Content Rendering Methods:
                </h2>

                {/* HTML Rendering Method */}
                <div className="html-content mb-4">
                    <h3 className="text-lg font-medium mb-2">
                        HTML Rendering:
                    </h3>
                    <div
                        className="content-output border p-4 rounded"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>

                {/* React Components Method */}
                <div className="react-content mb-4">
                    <h3 className="text-lg font-medium mb-2">
                        React Components Rendering:
                    </h3>
                    <div className="content-output border p-4 rounded">
                        {reactContent}
                    </div>
                </div>
            </div>
        </div>
    );
}
