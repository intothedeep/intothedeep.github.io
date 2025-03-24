import React from 'react';
import clsx from 'clsx';
import ResumeTOC from '@/components/Resume/ResumeTOC';

import './Resume.scss';

export const Resume = () => {
    return (
        <main
            className={clsx(
                'relative',
                'py-7',
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
                    src="/v1/imgs/resume_small.jpeg"
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

            <ResumeTOC />
        </main>
    );
};

export default Resume;
