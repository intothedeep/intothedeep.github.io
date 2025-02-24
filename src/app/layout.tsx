import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppProvider } from '@components/Providers';
import Header from '@components/Header/Header';

import '@/styles/globals.css';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Taek Lim Portfolio',
    description:
        'Backend, Frontend, Software, engineer, machine learning, AI, computer science, data, streaming, react, next, javascript, java, spring, boot, css, html, 5 year experience, remote',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html
                lang="en"
                suppressHydrationWarning
            >
                <body
                    className={clsx(
                        inter.className,
                        'relative',
                        'flex flex-col ',
                        'min-h-screen',
                    )}
                >
                    <AppProvider>
                        <Header />

                        <main
                            className={clsx(
                                'flex-1',
                                'py-6 px-6 md:px-12 lg:px-24',
                                'dark:bg-[#1a1b1e]',
                                'dark:text-primary-foreground',
                            )}
                        >
                            {children}
                        </main>
                    </AppProvider>
                </body>
            </html>
        </>
    );
}
