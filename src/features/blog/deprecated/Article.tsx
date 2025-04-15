import { getArticleByPath, getAllArticlePaths } from '@/lib/docs';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import path from 'path';
import ArticleDetail from '@/components/ArticleDetail';

export default function ArticlePage({ article, mdxSource }) {
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

    return (
        <ArticleDetail
            article={article}
            mdxSource={mdxSource}
            siteUrl={siteUrl}
        />
    );
}

export async function getStaticPaths() {
    const docsDirectory = path.join(process.cwd(), 'docs');
    const paths = await getAllArticlePaths(docsDirectory);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const docsDirectory = path.join(process.cwd(), 'docs');
    const articlePath = params.slug.join('/');
    const article = await getArticleByPath(docsDirectory, articlePath);

    if (!article) {
        return {
            notFound: true,
        };
    }

    // Process markdown content with MDX
    const mdxSource = await serialize(article.content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypePrism],
        },
        scope: article,
    });

    return {
        props: {
            article,
            mdxSource,
        },
    };
}
