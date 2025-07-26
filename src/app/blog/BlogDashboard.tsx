'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategorySidebar from './_components/CategorySidebar';
import PostCard from './_components/PostCard';
import { TPostFlattenedItem } from './_types/blog.types';

type Props = {};

export const BlogDashboard = (props: Props) => {
    const [posts, setPosts] = useState<TPostFlattenedItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts/parsed.json', {
                    responseType: 'json',
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Extract categories and recent posts
    const categories = posts.filter(post => post.type === 'FOLDER');
    const filePosts = posts.filter(post => post.type === 'FILE' && post.metadata);
    
    // Sort by date and get latest posts
    const latestPosts = filePosts
        .sort((a, b) => {
            const dateA = new Date(a.metadata?.date || '').getTime();
            const dateB = new Date(b.metadata?.date || '').getTime();
            return dateB - dateA;
        })
        .slice(0, 6);

    if (loading) {
        return (
            <main className={clsx('p-6')}>
                <div className="animate-pulse">Loading...</div>
            </main>
        );
    }

    return (
        <main className={clsx('flex gap-8 p-6')}>
            {/* Main content area */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-8">최신 포스트</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestPosts.map((post, index) => (
                        <PostCard key={post.metadata?.id || index} post={post} />
                    ))}
                </div>

                {latestPosts.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        아직 작성된 포스트가 없습니다.
                    </div>
                )}
            </div>

            {/* Right sidebar for categories */}
            <aside className="w-80 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">카테고리</h2>
                <CategorySidebar categories={categories} posts={filePosts} />
            </aside>
        </main>
    );
};

export default BlogDashboard;
