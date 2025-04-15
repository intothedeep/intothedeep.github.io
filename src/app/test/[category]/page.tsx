import clsx from 'clsx';
import React from 'react';

type Props = {
    params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
    // const content = await getAllContent();

    return [
        {
            category: 'test',
        },
    ];
}

export default async function Page({ params }: Props) {
    const { category } = await params;

    return (
        <main className={clsx('mt-20')}>
            <h1>{category}</h1>
        </main>
    );
}
