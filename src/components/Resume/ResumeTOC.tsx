'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery.hook';
import clsx from 'clsx';
import React from 'react';

type Props = {};

export const ResumeTOC = (props: Props) => {
    return (
        <ul
            className={clsx(
                'resume-toc',
                'sticky w-fit right-1 top-7 ml-2 h-fit'
                
            )}
        >
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
    );
};

export default ResumeTOC;
