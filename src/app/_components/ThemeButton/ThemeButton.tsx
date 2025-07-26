'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useMediaQuery } from '@/hooks/useMediaQuery.hook';

import SunIcon from '@/svgs/sun.svg';
import MoonIcon from '@/svgs/moon.svg';

export enum Theme {
    dark = 'dark',
    light = 'light',
}

// type Props = {};

export const ThemeButton = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.light);
    const { matches: isSystemDark } = useMediaQuery(
        '(prefers-color-scheme: dark)'
    );

    const isDark = currentTheme === Theme.dark;

    useEffect(() => {
        // const theme = isSystemDark ? Theme.dark : Theme.light;
        // document.body.setAttribute('data-theme', theme);
        // setCurrentTheme(theme);

        document.body.setAttribute('data-theme', Theme.light);
        setCurrentTheme(Theme.light);
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }, [isSystemDark]);

    const handleOnClickTheme = () => {
        const theme = document.body.getAttribute('data-theme');

        let next = (theme as Theme) || currentTheme;
        if (theme === Theme.dark) {
            next = Theme.light;
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            next = Theme.dark;
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        }

        document.body.setAttribute('data-theme', next);
        setCurrentTheme(next);
    };

    // const { isMounted } = useIsMounted();

    return (
        <button
            onClick={handleOnClickTheme}
            className={clsx(['cursor-pointer'])}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? (
                <SunIcon
                    width={24}
                    height={24}
                />
            ) : (
                <MoonIcon
                    width={24}
                    height={24}
                />
            )}
        </button>
    );
};

export default ThemeButton;
