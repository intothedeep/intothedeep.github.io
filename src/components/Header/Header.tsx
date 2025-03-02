import { ThemeButton } from '@/components/ThemeButton';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {};

export const Header = (props?: Props) => {
    return (
        <header>
            <Link
                // href={'/home'}
                href={'/'}
                className={clsx('text-2xl', 'font-bold')}
            >
                Taek Lim
            </Link>

            <nav>
                <Link href={'/about'}>About</Link>
                {/* <Link href={"/resume"}>About</Link> */}
                {/* <Link href={"/about"}>About</Link> */}
                {/* <button className="theme-toggle">🌙</button> */}
                <ThemeButton />
            </nav>

            <button className="hamburger">☰</button>
            <div className="side-menu">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div>
        </header>
    );
};

export default Header;
