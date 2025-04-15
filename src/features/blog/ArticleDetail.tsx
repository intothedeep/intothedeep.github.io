import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllContent, flattenTOC } from './util';
import TableOfContents from './TableOfContents';

interface PostPageProps {
    params: {
        category: string;
        slug: string;
    };
}

// 메타데이터 동적 생성
export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.category, params.slug);

    if (!post) {
        return {
            title: '게시물을 찾을 수 없습니다',
        };
    }

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            images: [post.thumbnail],
        },
    };
}

// 정적 경로 생성
export async function generateStaticParams() {
    const { allPosts } = await getAllContent();

    return allPosts.map((post) => ({
        category: post.category,
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await getPostBySlug(params.category, params.slug);

    if (!post) {
        notFound();
    }

    // 계층적 목차 구조를 평평한 배열로 변환
    const flatToc = flattenTOC(post?.toc ?? []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link
                    href="/blog"
                    className="text-blue-500 hover:underline"
                >
                    &larr; 모든 게시물로 돌아가기
                </Link>
            </div>

            <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <article className="flex-1">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-gray-600">
                            {new Date(post.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">
                            카테고리: {post.category}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-8">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-100 text-gray-700 px-3 py-1 text-sm rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </article>

                <aside className="w-full md:w-64 sticky top-4 self-start">
                    <TableOfContents toc={flatToc} />
                </aside>
            </div>
        </div>
    );
}
