import clsx from 'clsx';
import Link from 'next/link';
import React, { Suspense } from 'react';

import Hamburger from '@/svgs/hamburger.svg';
import LoadingFallback from '@/components/loading/LoadingFallback';

// Lazy load ThemeButton
const LazyThemeButton = React.lazy(() =>
    import('@/components/ThemeButton').then((module) => ({
        default: module.ThemeButton,
    }))
);

type Props = {};

export const Header = (props?: Props) => {
    return (
        <header
            className={clsx('header', [
                'fixed',
                'top-0',
                'left-0',
                'right-0',
                'z-50',
                // 'dark:bg-amber-50',
                'shadow-sm',
                'shadow-zinc-300',
                'dark:shadow-zinc-800',
            ])}
        >
            <Link
                // href={'/home'}
                href={'/'}
                className={clsx('text-2xl', 'font-bold')}
            >
                Taek Lim
            </Link>

            <nav>
                <Link href={'/profile'}>Profile</Link>
                <Link href={'/resume'}>Resume</Link>
                {/* <Link href={"/resume"}>About</Link> */}
                {/* <Link href={"/about"}>About</Link> */}
                {/* <button className="theme-toggle">🌙</button> */}

                <Suspense fallback={<LoadingFallback />}>
                    <LazyThemeButton />
                </Suspense>
            </nav>

            <button className="hamburger">
                <Hamburger
                    width={24}
                    height={24}
                />
            </button>

            {/* <div className="side-menu">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div> */}
        </header>
    );
};

export default Header;
