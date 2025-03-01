'use client';

import dynamic from 'next/dynamic';

// export { ThemeButton } from './ThemeButton';
export * from './ThemeButton';

export const ThemeButton = dynamic(
    () => import('./ThemeButton').then((arg) => arg),
    {
        loading: () => <p>Loading...</p>,
        ssr: false,
    }
);
