'use client';

// export { ThemeButton } from './ThemeButton';
// export * from './ThemeButton';

import dynamic from 'next/dynamic';
export const ThemeButton = dynamic(
    () => import('./ThemeButton').then((arg) => arg),
    {
        loading: () => <p>Loading...</p>,
        ssr: false,
    }
);
