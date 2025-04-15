import React from 'react';
import clsx from 'clsx';

import BlogDashboard from '@/app/blog/BlogDashboard';

type Props = {};

export default function Page(props: Props) {
    return (
        // <section className={clsx('mt-20')}>
        <BlogDashboard />
        // </section>
    );
}
