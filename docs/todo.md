# TODO

## Detail

- SEO

  - dynamic meta

  - next/head

                        ```javascript
                        import Head from 'next/head';

                        const MyPage = () => (
                            <>
                                <Head>
                                    <title>My Page Title</title>
                                    <meta
                                        name="description"
                                        content="This is a description of my page."
                                    />
                                </Head>
                                <div>Content of the page</div>
                            </>
                        );

                        export default MyPage;
                        ```

  - metadata

    - static

            ```js
            export const metadata = {
                title: 'My Website',
                description:
                    'This is my awesome website built with Next.js.',
                openGraph: {
                    title: 'My Website',
                    description:
                        'This is my awesome website built with Next.js.',
                    url: 'https://www.mywebsite.com',
                    siteName: 'MyWebsite',
                },
                twitter: {
                    card: 'summary_large_image',
                    site: '@mywebsite',
                },
            };
            ```

    - dynamic

            ```js
            // app/[slug]/page.js
            export async function generateMetadata({ params }) {
                const res = await fetch(
                    `https://api.example.com/posts/${params.slug}`
                );
                const post = await res.json();

                return {
                    title: post.title,
                    description: post.excerpt,
                    openGraph: {
                        title: post.title,
                        description: post.excerpt,
                        image: post.imageUrl,
                        url: `https://www.mywebsite.com/${params.slug}`,
                    },
                };
            }
            ```
