'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import Fuse from 'fuse.js';
import Link from 'next/link';
import Image from 'next/image';
import { PostMetadata } from '@/features/blog/util';

interface BlogSearchProps {
    posts: PostMetadata[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [searchResults, setSearchResults] = useState<PostMetadata[]>([]);

    // Fuse.js 설정
    // const fuse = new Fuse(posts, {
    //     keys: ['title', 'summary', 'tags'],
    //     threshold: 0.4,
    //     includeScore: true,
    // });

    // useEffect(() => {
    //     if (searchQuery) {
    //         const results = fuse.search(searchQuery);
    //         setSearchResults(results.map((result) => result.item));

    //         // URL 파라미터 업데이트
    //         const params = new URLSearchParams(searchParams);
    //         params.set('q', searchQuery);
    //         router.push(`/blog?${params.toString()}`, { scroll: false });
    //     } else {
    //         setSearchResults([]);

    //         // 검색어가 없으면 쿼리 파라미터 제거
    //         if (searchParams.has('q')) {
    //             const params = new URLSearchParams(searchParams);
    //             params.delete('q');
    //             router.push(
    //                 `/blog${params.size ? `?${params.toString()}` : ''}`,
    //                 { scroll: false }
    //             );
    //         }
    //     }
    // }, [searchQuery, fuse, router, searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="mb-8">
            <form
                onSubmit={handleSearch}
                className="mb-4"
            >
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="문서 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        검색
                    </button>
                </div>
            </form>

            {searchQuery && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4">
                        "{searchQuery}" 검색 결과 ({searchResults.length})
                    </h2>

                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {searchResults.map((post) => (
                                <Link
                                    href={`/blog/${post.category}/${post.slug}`}
                                    key={`${post.category}-${post.slug}`}
                                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={post.thumbnail}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {post.summary}
                                        </p>
                                        <div className="text-sm text-gray-500 mb-2">
                                            카테고리: {post.category}
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            검색 결과가 없습니다. 다른 키워드로 시도해보세요.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
