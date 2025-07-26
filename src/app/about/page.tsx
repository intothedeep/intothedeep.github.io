import React, { Suspense } from 'react';
import clsx from 'clsx';

import FadeIn from '@/app/about/_components/FadeIn';
import Loading from '@/app/loading';

// Lazy load components
const Intro = React.lazy(() => import('@/app/about/_components/Intro'));
const Expertise = React.lazy(() => import('@/app/about/_components/Expertise'));
const Timeline = React.lazy(() => import('@/app/about/_components/Timeline'));
const Project = React.lazy(() => import('@/app/about/_components/Project'));

// 클라이언트 컴포넌트 동적 로딩
// import dynamic from 'next/dynamic';
// const Timeline = dynamic(() => import('./Timeline'), { ssr: false });

import '@/app/about/_components/index.scss';

const AboutContent = () => (
    <FadeIn
        transitionDuration={700}
        className={clsx('fade-in-wrapper')}
        childClassName={clsx(['flex flex-col', 'min-h-screen'])}
    >
        <Intro />
        <Expertise />
        <Timeline />
        <Project />
    </FadeIn>
);

const page = () => {
    return (
        <main className={clsx('main-container', ['relative', 'flex-1 flex flex-col'])}>
            <Suspense fallback={<Loading />}>
                <AboutContent />
            </Suspense>
        </main>
    );
};

export default page;
