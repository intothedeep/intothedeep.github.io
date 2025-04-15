import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CategorySidebar from '@/components/CategorySidebar';
import SearchBar from '@/components/SearchBar';

export default function Dashboard({ docsStructure }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDocs, setFilteredDocs] = useState(docsStructure);
    const router = useRouter();

    // Handle search functionality
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredDocs(docsStructure);
            return;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();

        // Filter articles based on search query
        const matchingArticles = docsStructure.articles.filter(
            (article) =>
                article.title.toLowerCase().includes(lowerCaseQuery) ||
                article.tags.some((tag) =>
                    tag.toLowerCase().includes(lowerCaseQuery)
                ) ||
                article.summary?.toLowerCase().includes(lowerCaseQuery) ||
                article.content.toLowerCase().includes(lowerCaseQuery)
        );

        // Rebuild the category structure but only include matching articles
        const matchingArticleIds = new Set(
            matchingArticles.map((article: any) => article.id)
        );

        // Helper function to filter categories with matching articles
        const filterCategories = (categories: any) => {
            return categories
                .map((category: any) => {
                    // Filter subcategories recursively
                    const filteredSubcategories = filterCategories(
                        category.subcategories
                    );

                    // Filter articles in this category
                    const filteredArticles = category.articles.filter(
                        (article: any) => matchingArticleIds.has(article.id)
                    );

                    // Only include this category if it has matching articles or subcategories
                    if (
                        filteredArticles.length > 0 ||
                        filteredSubcategories.length > 0
                    ) {
                        return {
                            ...category,
                            articles: filteredArticles,
                            subcategories: filteredSubcategories,
                        };
                    }
                    return null;
                })
                .filter(Boolean); // Remove null entries
        };

        setFilteredDocs({
            categories: filterCategories(docsStructure.categories),
            articles: matchingArticles,
        });
    }, [searchQuery, docsStructure]);

    return (
        <div className="docs-dashboard">
            <div className="search-container">
                <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClear={() => setSearchQuery('')}
                />
            </div>

            <div className="docs-container">
                <div className="sidebar">
                    <h2>Documentation</h2>
                    <CategorySidebar categories={filteredDocs.categories} />
                </div>

                <div className="main-content">
                    {!searchQuery && (
                        <>
                            <h1>Welcome to the Documentation</h1>
                            <p>
                                Select an article from the sidebar to get
                                started.
                            </p>

                            <div className="featured-articles">
                                <h2>Featured Articles</h2>
                                <div className="article-grid">
                                    {docsStructure.articles
                                        .slice(0, 6)
                                        .map((article: any) => (
                                            <Link
                                                key={article.id}
                                                href={`/docs/${article.path}`}
                                                className="article-card"
                                            >
                                                <div className="article-thumbnail">
                                                    {article.thumbnail ? (
                                                        <Image
                                                            src={
                                                                article.thumbnail
                                                            }
                                                            alt={article.title}
                                                            width={280}
                                                            height={160}
                                                            className="thumbnail-image"
                                                        />
                                                    ) : (
                                                        <div className="placeholder-thumbnail">
                                                            <span>
                                                                {article.title.charAt(
                                                                    0
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="article-info">
                                                    <h3>{article.title}</h3>
                                                    {article.summary && (
                                                        <p className="article-summary">
                                                            {article.summary}
                                                        </p>
                                                    )}
                                                    {article.tags &&
                                                        article.tags.length >
                                                            0 && (
                                                            <div className="article-tags">
                                                                {article.tags
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            tag
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    tag
                                                                                }
                                                                                className="tag"
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                            </div>
                                                        )}
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}

                    {searchQuery && filteredDocs.articles.length === 0 && (
                        <div className="no-results">
                            No results found for "{searchQuery}"
                        </div>
                    )}

                    {searchQuery && filteredDocs.articles.length > 0 && (
                        <div className="search-results">
                            <h2>
                                Search Results ({filteredDocs.articles.length})
                            </h2>
                            <div className="article-grid">
                                {filteredDocs.articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/docs/${article.path}`}
                                        className="article-card"
                                    >
                                        <div className="article-thumbnail">
                                            {article.thumbnail ? (
                                                <Image
                                                    src={article.thumbnail}
                                                    alt={article.title}
                                                    width={280}
                                                    height={160}
                                                    className="thumbnail-image"
                                                />
                                            ) : (
                                                <div className="placeholder-thumbnail">
                                                    <span>
                                                        {article.title.charAt(
                                                            0
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="article-info">
                                            <h3>{article.title}</h3>
                                            {article.summary && (
                                                <p className="article-summary">
                                                    {article.summary}
                                                </p>
                                            )}
                                            {article.tags &&
                                                article.tags.length > 0 && (
                                                    <div className="article-tags">
                                                        {article.tags
                                                            .slice(0, 3)
                                                            .map((tag) => (
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
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
