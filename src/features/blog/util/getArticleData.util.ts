import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const categoriesDir = path.join(process.cwd(), 'content', 'categories');

export function getArticleData() {
    const categories = fs
        .readdirSync(categoriesDir)
        .filter((dir) =>
            fs.statSync(path.join(categoriesDir, dir)).isDirectory()
        );

    const data = {
        categories: categories.map((category) => {
            const categoryPath = path.join(categoriesDir, category);
            const files = fs
                .readdirSync(categoryPath)
                .filter((file) => file.match(/.*\.md$/));
            const articles = files.map((file) => {
                const filePath = path.join(categoryPath, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { data: metadata, content } = matter(fileContent);
                const title = file.replace('.md', '');
                return {
                    title,
                    metadata,
                    content,
                };
            });
            return {
                name: category,
                articles,
            };
        }),
    };

    return data;
}
