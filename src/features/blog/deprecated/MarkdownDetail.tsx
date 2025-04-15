import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import TableOfContents from '@/components/TableOfContents';

export default function ArticleDetail({ article, mdxSource, siteUrl }: any) {
    const [activeHeading, setActiveHeading] = useState('');

    // Set up intersection observer for active heading tracking
    useEffect(() => {
        if (typeof window !== 'undefined' && article?.headings?.length > 0) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveHeading(entry.target.id);
                        }
                    });
                },
                { rootMargin: '-100px 0px -66%' }
            );

            article.headings.forEach(({ slug }: any) => {
                const element = document.getElementById(slug);
                if (element) observer.observe(element);
            });

            return () => {
                article.headings.forEach(({ slug }: any) => {
                    const element = document.getElementById(slug);
                    if (element) observer.unobserve(element);
                });
            };
        }
    }, [article]);

    if (!article) {
        return (
            <div className="article-not-found">
                <h1>Article not found</h1>
                <p>
                    The article you're looking for doesn't exist or has been
                    moved.
                </p>
                <Link href="/">Return to Home</Link>
            </div>
        );
    }

    // SEO metadata
    const pageTitle = `${article.title} | Documentation`;
    const pageDescription =
        article.summary || `Learn about ${article.title} in our documentation.`;
    const ogImageUrl = article.thumbnail
        ? `${siteUrl}${article.thumbnail}`
        : `${siteUrl}/images/default-og.jpg`;

    // Format the date if available
    const formattedDate = article.date
        ? new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta
                    name="description"
                    content={pageDescription}
                />
                <meta
                    property="og:title"
                    content={pageTitle}
                />
                <meta
                    property="og:description"
                    content={pageDescription}
                />
                <meta
                    property="og:image"
                    content={ogImageUrl}
                />
                <meta
                    property="og:type"
                    content="article"
                />
                <meta
                    property="og:url"
                    content={`${siteUrl}/docs/${article.path}`}
                />
                {article.tags && (
                    <meta
                        name="keywords"
                        content={article.tags.join(', ')}
                    />
                )}
                {article.date && (
                    <meta
                        property="article:published_time"
                        content={new Date(article.date).toISOString()}
                    />
                )}
            </Head>

            <div className="article-detail">
                <div className="article-container">
                    <div className="article-content">
                        <div className="article-header">
                            {article.thumbnail && (
                                <div className="article-featured-image">
                                    <Image
                                        src={article.thumbnail}
                                        alt={article.title}
                                        width={800}
                                        height={400}
                                        className="featured-image"
                                    />
                                </div>
                            )}

                            <h1>{article.title}</h1>

                            {article.summary && (
                                <div className="article-summary">
                                    {article.summary}
                                </div>
                            )}

                            <div className="article-meta">
                                {formattedDate && (
                                    <div className="article-date">
                                        {formattedDate}
                                    </div>
                                )}

                                {article.tags && article.tags.length > 0 && (
                                    <div className="article-tags">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="tag"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="markdown-content">
                            <MDXRemote {...mdxSource} />
                        </div>
                    </div>

                    {article.headings && article.headings.length > 0 && (
                        <TableOfContents
                            headings={article.headings}
                            activeHeading={activeHeading}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
