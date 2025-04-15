import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function CategorySidebar({ categories }: any) {
    return (
        <ul className="category-list">
            {categories.map((category: any) => (
                <CategoryItem
                    key={category.id}
                    category={category}
                />
            ))}
        </ul>
    );
}

function CategoryItem({ category }: any) {
    const [isExpanded, setIsExpanded] = useState(true);

    const hasContent =
        category.articles.length > 0 || category.subcategories.length > 0;

    return (
        <li className="category-item">
            <div
                className="category-name"
                onClick={() => hasContent && setIsExpanded(!isExpanded)}
            >
                {hasContent && (
                    <span className="category-icon">
                        {isExpanded ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </span>
                )}
                {category.name}
            </div>

            {isExpanded && (
                <>
                    {/* Render articles in this category */}
                    {category.articles.length > 0 && (
                        <ul className="article-list">
                            {category.articles.map((article: any) => (
                                <li
                                    key={article.id}
                                    className="article-item"
                                >
                                    <Link href={`/docs/${article.path}`}>
                                        {article.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Render subcategories recursively */}
                    {category.subcategories.length > 0 && (
                        <CategorySidebar categories={category.subcategories} />
                    )}
                </>
            )}
        </li>
    );
}
