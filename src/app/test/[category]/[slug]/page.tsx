import React from 'react';
import clsx from 'clsx';

type Props = {
    params: Promise<{ category: string; slug: string }>;
};

export default async function Page({ params }: Props) {
    const { category, slug } = await params;

    return (
        <main className={clsx('mt-20')}>
            <h1>
                {category}: {slug}
            </h1>
        </main>
    );
}

export async function generateStaticParams() {
    // const content = await getAllContent();

    return [
        {
            category: 'test',
            slug: '123',
        },
    ];
}
