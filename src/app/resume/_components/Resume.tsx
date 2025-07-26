import React, { Suspense } from 'react';
import ResumeTOC from '@/app/resume/_components/ResumeTOC';
import LoadingFallback from '@/app/_components/loading/LoadingFallback';

import clsx from 'clsx';

import './Resume.scss';

const LazyResumeTOC = React.lazy(() => import('@/app/resume/_components/ResumeTOC'));

export const Resume = () => {
    return (
        <main
            className={clsx(
                'relative',
                'py-7',
                'flex-1',
                'flex',
                'justify-center',
                'mt-16'
            )}
        >
            <article
                id="resume"
                className={clsx(
                    // 'max-w-max',
                    'flex',
                    'justify-between',
                    'items-start',

                    'txt-xs',
                    // 'm-auto',
                    'p-5',
                    'rounded-lg shadow-md',
                    'bg-zinc-200 dark:bg-zinc-800',
                    'rounded-lg',
                    'shadow-lg'
                )}
            >
                <img
                    src="/v1/img/resume.jpg"
                    alt="Lim Taek resume"
                    fetchPriority={'high'}
                    className={clsx([
                        'object-contain',
                        // 'w-auto',
                        'w-[210mm]',
                        // 'h-[297mm]',
                    ])}
                />
            </article>

            <Suspense fallback={<LoadingFallback />}>
                <LazyResumeTOC />
            </Suspense>
        </main>
    );
};

export default Resume;
