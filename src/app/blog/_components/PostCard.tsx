'use client';

import React from 'react';
import Link from 'next/link';
import { TPostFlattenedItem } from '../_types/blog.types';

type Props = {
    post: TPostFlattenedItem;
};

export default function PostCard({ post }: Props) {
    const { metadata } = post;
    
    if (!metadata) {
        return null;
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateString;
        }
    };

    const truncateSummary = (text: string, maxLength: number = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <Link 
            href={`/blog/${post.slugs.join('/')}`}
            className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
            {/* Thumbnail */}
            {metadata.thumbnail && (
                <div className="aspect-video w-full bg-gray-100 overflow-hidden">
                    <img 
                        src={metadata.thumbnail} 
                        alt={metadata.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                </div>
            )}
            
            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {metadata.title}
                </h3>
                
                {/* Summary */}
                {metadata.summary && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {truncateSummary(metadata.summary)}
                    </p>
                )}
                
                {/* Tags */}
                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {metadata.tags.slice(0, 3).map((tag, index) => (
                            <span 
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                        {metadata.tags.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                                +{metadata.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}
                
                {/* Date and Category */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(metadata.date)}</span>
                    {metadata.category && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                            {metadata.category}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
} 