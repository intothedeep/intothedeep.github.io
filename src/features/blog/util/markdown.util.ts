import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { glob } from 'glob';

export interface TOCItem {
    value: string;
    depth: number;
    children: TOCItem[];
    data?: {
        id?: string;
    };
}

export interface PostMetadata {
    title: string;
    summary: string;
    thumbnail: string;
    date: string;
    tags: string[];
    slug: string;
    category: string;
}

export interface Post extends PostMetadata {
    content: string;
    toc?: TOCItem[];
}

export interface Category {
    name: string;
    posts: PostMetadata[];
}

export interface ContentStructure {
    categories: Category[];
    allPosts: PostMetadata[];
}

// 추출된 TOC를 플랫한 구조로 변환하는 함수 (선택 사항)
export function flattenTOC(
    items: TOCItem[],
    current: { id: string; text: string; level: number }[] = [],
    level = 1
): { id: string; text: string; level: number }[] {
    for (const item of items) {
        // ID가 없는 경우 생성
        const id =
            item.data?.id ||
            item.value
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');

        current.push({
            id,
            text: item.value,
            level: item.depth,
        });

        if (item.children && item.children.length > 0) {
            flattenTOC(item.children, current, level + 1);
        }
    }

    return current;
}

// 마크다운 파일에서 메타데이터, 내용, 목차 추출
export async function getMarkdownContent(filePath: string): Promise<Post> {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // 상대 경로에서 카테고리와 슬러그 추출
    const relativePath = path.relative(
        path.join(process.cwd(), 'content'),
        filePath
    );
    const pathParts = relativePath.split(path.sep);
    const category = pathParts[0];
    const filename = pathParts[1];
    const slug = filename.replace(/\.md$/, '');

    // 목차 추출
    // const toc = await extractTOC(content);

    // HTML로 변환
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        title: data.title || slug,
        summary: data.summary || '',
        thumbnail: data.thumbnail || '/images/default-thumbnail.jpg',
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        slug,
        category,
        content: contentHtml,
        // toc,
    };
}

// 모든 카테고리와 게시물 데이터 가져오기
export async function getAllContent(): Promise<ContentStructure> {
    const contentDir = path.join(process.cwd(), 'content');
    console.log('contentDir: ', contentDir);

    const categories: Category[] = [];
    const allPosts: PostMetadata[] = [];

    // 모든 카테고리 폴더 가져오기
    const categoryDirs = fs
        .readdirSync(contentDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    // 각 카테고리 폴더의 모든 마크다운 파일 처리
    for (const category of categoryDirs) {
        const categoryPath = path.join(contentDir, category);
        const markdownFiles = await glob('*.md', { cwd: categoryPath });

        const posts: PostMetadata[] = [];

        for (const file of markdownFiles) {
            const filePath = path.join(categoryPath, file);
            const post = await getMarkdownContent(filePath);
            // toc를 제외한 메타데이터만 저장
            const { content, toc, ...metadata } = post;

            posts.push(metadata);
            allPosts.push(metadata);
        }

        categories.push({
            name: category,
            posts: posts.sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
        });
    }

    return {
        categories,
        allPosts: allPosts.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    };
}

// 특정 게시물 가져오기
export async function getPostBySlug(
    category: string,
    slug: string
): Promise<Post | null> {
    const filePath = path.join(
        process.cwd(),
        'content',
        category,
        `${slug}.md`
    );

    try {
        if (fs.existsSync(filePath)) {
            return await getMarkdownContent(filePath);
        }
        return null;
    } catch (error) {
        console.error('Error getting post:', error);
        return null;
    }
}
