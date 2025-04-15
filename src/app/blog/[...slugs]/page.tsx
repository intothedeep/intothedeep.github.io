import React from 'react';
import clsx from 'clsx';

import path from 'path';
import fs from 'fs';

import PostDetail from '@/app/blog/[...slugs]/PostDetail';
import {
    POST_DATA_FILE_NAME,
    POST_DATA_PATH,
} from '../../../../scripts/load_articles_meta';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '블로그 | 문서 대시보드',
    description: '카테고리별 문서를 찾아보세요',
};

type Props = {
    params: Promise<TPostFlattenedItem>;
};

export default async function Page({ params }: Props) {
    const { slugs, type, level, title, metadata, content } = await params.then(
        (posts) => {
            console.log('>>>>> blog slugs page:: ', posts);
            return posts;
        }
    );

    // console.log('>> post: ', {
    //     slugs,
    //     type,
    //     level,
    //     title,
    //     metadata,
    //     content,
    // });

    return <PostDetail slugs={slugs} />;
}

export async function generateStaticParams() {
    // JSON 파일의 경로 설정
    const filePath = path.join(
        process.cwd(),
        `${POST_DATA_PATH}/${POST_DATA_FILE_NAME}`
    );

    // JSON 파일 읽기
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(jsonData);

    // 각 포스트에 대한 경로 생성
    // const slugs = posts.map((post: TPostFlattenedItem) => {
    //     return post;
    // });

    return posts;
}
