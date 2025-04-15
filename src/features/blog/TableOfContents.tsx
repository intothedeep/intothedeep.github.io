'use client';

import { useState, useEffect } from 'react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    toc: TocItem[];
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
    const [activeHeading, setActiveHeading] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
        );

        const headingElements = document.querySelectorAll(
            'h1, h2, h3, h4, h5, h6'
        );
        headingElements.forEach((element) => observer.observe(element));

        return () => {
            headingElements.forEach((element) => observer.unobserve(element));
        };
    }, []);

    if (toc.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm sticky top-4">
            <h3 className="text-lg font-semibold mb-4">목차</h3>
            <nav>
                <ul className="space-y-2">
                    {toc.map((item) => (
                        <li
                            key={item.id}
                            style={{
                                paddingLeft: `${(item.level - 1) * 12}px`,
                            }}
                        >
                            <a
                                href={`#${item.id}`}
                                className={`block py-1 border-l-4 pl-2 text-sm hover:text-blue-600 transition-colors ${
                                    activeHeading === item.id
                                        ? 'border-blue-500 text-blue-600 font-medium'
                                        : 'border-transparent text-gray-600'
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById(item.id)
                                        ?.scrollIntoView({
                                            behavior: 'smooth',
                                        });
                                }}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
