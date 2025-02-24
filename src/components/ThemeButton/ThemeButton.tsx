'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

import SunIcon from '@svg/sun.svg';
import MoonIcon from '@svg/moon.svg';
import { useIsMounted } from '@/hooks/useIsMounted.hook';
import { useMediaQuery } from '@/hooks/useMediaQuery.hook';

export enum Theme {
    dark = 'dark',
    light = 'light',
}

type Props = {};

export const ThemeButton = (props: Props) => {
    const { themes, theme, setTheme } = useTheme();
    const isDark = Theme.dark == theme;

    const handleOnClickTheme = () => {
        setTheme(isDark ? Theme.light : Theme.dark);
    };

    const { matches } = useMediaQuery('(prefers-color-scheme: dark)');
    console.log({
        themes,
        theme,
        isDark,
        matches,
    });

    useEffect(() => {
        setTheme('dark');
    }, [setTheme]);

    // const { isMounted } = useIsMounted();
    // if (!isMounted) {
    //     return null;
    // }

    return (
        <>
            <Button onClick={handleOnClickTheme}>
                {!isDark && <MoonIcon />}
                {isDark && <SunIcon />}
            </Button>
        </>
    );
};

export default ThemeButton;
