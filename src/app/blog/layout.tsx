import clsx from 'clsx';

export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={clsx('flex-1 flex flex-col mt-18 min-h-full')}>
            <div className={clsx('flex-1 flex flex-row ')}>
                <section className="flex-1 px-4 border-r">{children}</section>

                <aside className="w-1/5 px-2">
                    <p className={clsx('font-bold', 'mb-2', 'sticky top-20')}>
                        Other Posts
                    </p>
                </aside>
            </div>
        </main>
    );
}
