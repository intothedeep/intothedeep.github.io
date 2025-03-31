import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ClientTrailCursorDom } from '@/components/ClientTrailCursorDom';
import { ClientTrailCursorCanvas } from '@/components/ClientTrailCursorCanvas';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import '@/styles/00_global.scss';
import clsx from 'clsx';
import { Suspense } from 'react';
import Loading from '@/app/loading';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Taek Lim | Software Engineer - Backend, Frontend, Mobile and Infra',
    description:
        'Software engineer with expertise in React, React Native, and Spring. Specializing in frontend development with experience in optimizing performance and building cross-platform applications.',
    icons: {
        icon: [
            { url: '/favicon.ico' },
            // { url: '/icon-light.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
            // { url: '/icon-dark.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    geistSans.variable,
                    geistMono.variable,
                    'relative'
                )}
            >
                <Header />
                {children}
                <Footer />

                <ClientTrailCursorCanvas />
                <ClientTrailCursorDom />
            </body>
        </html>
    );
}
