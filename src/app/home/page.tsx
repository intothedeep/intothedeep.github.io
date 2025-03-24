import React from 'react';
import clsx from 'clsx';

import FadeIn from '@/app/home/FadeIn';

import Main from '@/app/home/About';
import Expertise from '@/app/home/Expertise';
import Timeline from '@/app/home/Timeline';
import Project from '@/app/home/Project';
import Contact from '@/app/home/Contact';

// 클라이언트 컴포넌트 동적 로딩
// import dynamic from 'next/dynamic';
// const Timeline = dynamic(() => import('./Timeline'), { ssr: false });

import './index.scss';

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
