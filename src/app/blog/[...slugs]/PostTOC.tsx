// export interface TOCItem {
//     value: string;
//     depth: number;
//     children: TOCItem[];
//     data?: {
//         id?: string;
//     };
// }

// export interface Category {
//     name: string;
//     posts: PostMetadata[];
// }

// export interface ContentStructure {
//     categories: Category[];
//     allPosts: PostMetadata[];
// }

// import { remark } from 'remark';
// import html from 'remark-html';
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkExtractToc from 'remark-extract-toc';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import { glob } from 'glob';

// // 마크다운 내용에서 목차(TOC) 추출하는 함수
// export async function extractTOC(markdown: string): Promise<TOCItem[]> {
//     const tree: TOCItem[] = await unified()
//         .use(remarkParse)
//         .use(remarkExtractToc)
//         .process(markdown)
//         .then((file) => file.data.toc as TOCItem[]);

//     return tree;
// }

import React from 'react';

type Props = {};

export default function PostTOC({}: Props) {
    // useEffect(() => {
    //     // 목차 추출
    //     const toc = await extractTOC(content);

    //     // HTML로 변환
    //     const processedContent = await remark().use(html).process(content);
    //     const contentHtml = processedContent.toString();
    // }, []);

    return <div>PostTOC</div>;
}
