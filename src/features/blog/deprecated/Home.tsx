import Head from 'next/head';
import Dashboard from './Dashboard';
import { buildDocStructure } from '@/lib/docs';
import path from 'path';

export default function Home({ docsStructure }: any) {
    return (
        <>
            <Head>
                <title>Documentation Portal</title>
                <meta
                    name="description"
                    content="Browse our documentation to learn more about our products and services."
                />
                <meta
                    property="og:title"
                    content="Documentation Portal"
                />
                <meta
                    property="og:description"
                    content="Browse our documentation to learn more about our products and services."
                />
                <meta
                    property="og:image"
                    content="/images/og-default.jpg"
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>

            <Dashboard docsStructure={docsStructure} />
        </>
    );
}

export async function getStaticProps() {
    const docsDirectory = path.join(process.cwd(), 'docs');
    const docsStructure = await buildDocStructure(docsDirectory);

    return {
        props: {
            docsStructure,
        },
    };
}
