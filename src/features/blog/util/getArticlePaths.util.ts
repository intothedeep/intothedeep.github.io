import { getArticleData } from '@/features/blog/util/getArticleData.util';

export function getAllArticlePaths(data: any) {
    // const data = getArticleData();
    const paths = data.categories
        .map((category: any) => {
            return category.articles.map((article: any) => {
                return {
                    params: {
                        category: category.name,
                        article: article.title,
                    },
                };
            });
        })
        .flat();
    return paths;
}
