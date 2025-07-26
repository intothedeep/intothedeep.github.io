'use client';

import React, { useRef } from 'react';
import clsx from 'clsx';

import Hamburger from '@/svgs/hamburger.svg';

type Props = {};

const SideMenu = (props: Props) => {
    // const { matches: isMobile } = useMediaQuery('(max-width: 768px)');

    const sideRef = useRef<HTMLElement>(null);

    return (
        <>
            <button
                className={clsx('hamburger', ['cursor-pointer'])}
                onClick={(e) => {
                    sideRef.current?.classList.toggle('open');
                }}
            >
                <Hamburger
                    width={24}
                    height={24}
                />
            </button>

            <aside
                className={clsx('side-menu-wrapper')}
                ref={sideRef}
                onClick={(e) => {
                    e.currentTarget.classList.toggle('open');
                }}
            >
                <nav className={clsx('side-menu')}>
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>
            </aside>
        </>
    );
};

export default SideMenu;
