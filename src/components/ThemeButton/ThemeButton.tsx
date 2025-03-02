'use client';

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery.hook';

// SVG 컴포넌트 임포트
import SunIcon from '@/svg/sun.svg';
import MoonIcon from '@/svg/moon.svg';
import clsx from 'clsx';
import { useIsMounted } from '@/hooks/useIsMounted.hook';

export enum Theme {
    dark = 'dark',
    light = 'light',
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ThemeButton = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.dark);
    const { matches: isSystemDark } = useMediaQuery(
        '(prefers-color-scheme: dark)'
    );

    const isDark = currentTheme === Theme.dark;

    const handleOnClickTheme = () => {
        const theme = document.body.getAttribute('data-theme');

        let next = (theme as Theme) || currentTheme;
        if (theme === Theme.dark) {
            next = Theme.light;
        } else {
            next = Theme.dark;
        }
        document.body.setAttribute('data-theme', next);
        setCurrentTheme(next);
    };

    useEffect(() => {
        const theme = isSystemDark ? Theme.dark : Theme.light;
        document.body.setAttribute('data-theme', theme);
        setCurrentTheme(theme);
    }, []);
    console.log('check isSystemDark ', currentTheme, isSystemDark);

    const { isMounted } = useIsMounted();

    if (!isMounted) {
        return;
    }

    return (
        <button
            onClick={handleOnClickTheme}
            className={clsx(['cursor-pointer'])}
        >
            {isDark &&
                // <SunIcon
                //     width={24}
                //     height={24}
                // />
                '😎'}

            {!isDark &&
                // <MoonIcon
                //     width={24}
                //     height={24}
                // />
                '🌑'}
        </button>
    );
};

export default ThemeButton;
