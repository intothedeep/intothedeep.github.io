'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TPostFlattenedItem } from '../_types/blog.types';

type Props = {
    categories: TPostFlattenedItem[];
    posts: TPostFlattenedItem[];
};

export default function CategorySidebar({ categories, posts }: Props) {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set()
    );

    const toggleCategory = (categoryPath: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryPath)) {
            newExpanded.delete(categoryPath);
        } else {
            newExpanded.add(categoryPath);
        }
        setExpandedCategories(newExpanded);
    };

    // Group posts by category path
    const postsByCategory = posts.reduce((acc, post) => {
        const categoryPath = post.slugs.slice(0, -1).join('/');
        if (!acc[categoryPath]) {
            acc[categoryPath] = [];
        }
        acc[categoryPath].push(post);
        return acc;
    }, {} as Record<string, TPostFlattenedItem[]>);

    const renderCategory = (category: TPostFlattenedItem) => {
        const categoryPath = category.slugs.join('/');
        const isExpanded = expandedCategories.has(categoryPath);
        const categoryPosts = postsByCategory[categoryPath] || [];
        const indentLevel = category.level;

        return (
            <div key={categoryPath} className="mb-2">
                <div
                    className={`flex items-center gap-2 py-2 px-2 rounded cursor-pointer hover:bg-gray-100 transition-colors`}
                    style={{ paddingLeft: `${indentLevel * 16 + 8}px` }}
                    onClick={() => toggleCategory(categoryPath)}
                >
                    <span className="text-gray-600 w-4 text-center">
                        {isExpanded ? '▼' : '▶'}
                    </span>
                    <span className="text-blue-600">
                        {isExpanded ? '📂' : '📁'}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                        {category.title || category.slugs[category.slugs.length - 1]}
                    </span>
                </div>

                {isExpanded && categoryPosts.length > 0 && (
                    <div className="ml-4">
                        {categoryPosts.map((post, index) => (
                            <Link
                                key={post.metadata?.id || index}
                                href={`/blog/${post.slugs.join('/')}`}
                                className="block py-1 px-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                style={{ paddingLeft: `${(indentLevel + 1) * 16 + 8}px` }}
                            >
                                📄 {post.metadata?.title || post.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Sort categories by level and then by title
    const sortedCategories = categories.sort((a, b) => {
        if (a.level !== b.level) {
            return a.level - b.level;
        }
        const titleA = a.title || a.slugs[a.slugs.length - 1] || '';
        const titleB = b.title || b.slugs[b.slugs.length - 1] || '';
        return titleA.localeCompare(titleB);
    });

    return (
        <div className="category-sidebar">
            {sortedCategories.length > 0 ? (
                <div className="space-y-1">
                    {sortedCategories.map(renderCategory)}
                </div>
            ) : (
                <div className="text-sm text-gray-500 py-4">
                    카테고리가 없습니다.
                </div>
            )}
        </div>
    );
} 