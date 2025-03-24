import React, { Suspense } from 'react';
import clsx from 'clsx';

import FadeIn from '@/components/Profile/FadeIn';
import Loading from '@/app/loading';

// Lazy load components
const Main = React.lazy(() => import('@/components/Profile/About'));
const Expertise = React.lazy(() => import('@/components/Profile/Expertise'));
const Timeline = React.lazy(() => import('@/components/Profile/Timeline'));
const Project = React.lazy(() => import('@/components/Profile/Project'));

// 클라이언트 컴포넌트 동적 로딩
// import dynamic from 'next/dynamic';
// const Timeline = dynamic(() => import('./Timeline'), { ssr: false });

import '@/components/Profile/index.scss';

const ProfileContent = () => (
    <FadeIn
        transitionDuration={700}
        className={clsx('fade-in-wrapper')}
        childClassName={clsx(['flex flex-col', 'min-h-screen'])}
    >
        <Main />
        <Expertise />
        <Timeline />
        <Project />
    </FadeIn>
);

const page = () => {
    return (
        <main className={clsx('main-container', ['relative', 'flex flex-col'])}>
            <Suspense fallback={<Loading />}>
                <ProfileContent />
            </Suspense>
        </main>
    );
};

export default page;
