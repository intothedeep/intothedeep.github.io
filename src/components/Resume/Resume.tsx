import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

type Props = {};

export const Resume = (props: Props) => {
    return (
        <main className={clsx('relative', 'py-7', 'flex', 'justify-center')}>
            <article
                id="resume"
                className={clsx(
                    'w-[210mm]',
                    'h-[297mm]',
                    'flex',
                    'justify-between',
                    'txt-xs',
                    // 'm-auto',
                    'p-5',
                    'rounded-lg shadow-md',
                    'bg-zinc-200 dark:bg-zinc-800',
                    'rounded-lg',
                    'shadow-lg'
                )}
            >
                {/* <div className={clsx('flex flex-1 justify-between')}>
                    <h1 className={clsx('text-base')}>Taek Lim</h1>
                    <div className={clsx('text-xs')}>
                        <div>tio.taek.lim@gmail.com</div>
                        <div>github.com/tradelunch</div>
                    </div>
                    <div>Java, Javascript, spring</div>
                </div> */}
                {/* <embed
                    src={'/v1/pdfs/resume.pdf'}
                    // width="800px"
                    // height=""
                    className={clsx('flex-1')}
                /> */}
                {/* <img className={clsx(["object-cover"], )} src="/v1/imgs/resume.jpg" alt="resume" /> */}
                <Image
                    src="/v1/imgs/resume_small.jpeg"
                    alt="Lim Taek resume"
                    objectPosition="cover"
                    className={
                        clsx()
                        // 'w-full',
                        // 'h-auto',
                    }
                    width={1000}
                    height={0}
                    // sizes="100vw"
                    // style={{ width: '100%', height: 'auto' }}
                />
            </article>
            <ul className={clsx('sticky w-fit right-1 top-1 ml-2 h-fit')}>
                <li>
                    <a
                        href="https://www.linkedin.com/in/tiotaeklim/"
                        target="_blank"
                    >
                        Linkedin
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/tradelunch"
                        target="_blank"
                    >
                        Github
                    </a>
                </li>
                <li>
                    <a
                        href="https://algorithm.prettylog.com/"
                        target="_blank"
                    >
                        Algorithms
                    </a>
                </li>
                <li>
                    <a
                        href="https://blog.tradelunch.com/"
                        target="_blank"
                    >
                        Blog
                    </a>
                </li>
                <li>
                    <a
                        href="mailto:tiotaeklim@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        tio.taek.lim@gmail.com
                    </a>
                </li>
            </ul>
        </main>
    );
};

export default Resume;
