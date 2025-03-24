import React from 'react';
import clsx from 'clsx';

import FadeIn from '@/components/Profile/FadeIn';

import Main from '@/components/Profile/About';
import Expertise from '@/components/Profile/Expertise';
import Timeline from '@/components/Profile/Timeline';
import Project from '@/components/Profile/Project';
// import Contact from '@/components/Profile/Contact';

// 클라이언트 컴포넌트 동적 로딩
// import dynamic from 'next/dynamic';
// const Timeline = dynamic(() => import('./Timeline'), { ssr: false });

import '@/components/Profile/index.scss';

const page = () => {
    return (
        <main className={clsx('main-container', ['relative', 'flex flex-col'])}>
            <FadeIn
                transitionDuration={700}
                className={clsx('fade-in-wrapper')}
                childClassName={clsx(['flex flex-col', 'min-h-screen'])}
            >
                <Main />
                <Expertise />
                <Timeline />
                <Project />
                {/* <Contact /> */}
            </FadeIn>
        </main>
    );
};

export default page;
