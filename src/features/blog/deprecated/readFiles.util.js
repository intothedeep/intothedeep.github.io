import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to recursively read directories and files
export async function readMarkdownFiles(directoryPath, basePath = '') {
    const result = {
        categories: [],
        articles: [],
    };

    // Read all files and directories in the current directory
    const items = fs.readdirSync(directoryPath);

    // Process each item
    for (const item of items) {
        const itemPath = path.join(directoryPath, item);
        const stat = fs.statSync(itemPath);

        // If it's a directory, process it recursively
        if (stat.isDirectory()) {
            const categoryPath = basePath ? `${basePath}/${item}` : item;
            const category = {
                id: categoryPath,
                name: item,
                path: categoryPath,
                subcategories: [],
                articles: [],
            };

            // Process the contents of this category
            const categoryContents = await readMarkdownFiles(
                itemPath,
                categoryPath
            );

            // Add subcategories
            category.subcategories = categoryContents.categories;

            // Add articles that belong directly to this category
            category.articles = categoryContents.articles.map((article) => {
                return {
                    ...article,
                    category: categoryPath,
                };
            });

            result.categories.push(category);
            result.articles.push(...category.articles);
        }
        // If it's a markdown file, process it as an article
        else if (stat.isFile() && item.endsWith('.md')) {
            const fileContent = fs.readFileSync(itemPath, 'utf8');
            const { data, content } = matter(fileContent);

            // Extract title and other metadata from frontmatter
            const title = data.title || item.replace('.md', '');
            const thumbnail = data.thumbnail || null;
            const summary = data.summary || '';

            const articlePath = basePath
                ? `${basePath}/${item.replace('.md', '')}`
                : item.replace('.md', '');
            const article = {
                id: articlePath,
                title: title,
                path: articlePath,
                tags: data.tags || [],
                date: data.date || null,
                thumbnail: thumbnail,
                summary: summary,
                content: content,
                filePath: itemPath,
            };

            result.articles.push(article);
        }
    }

    return result;
}

// Function to build the complete documentation structure
export async function buildDocStructure(docsDirectory) {
    const structure = await readMarkdownFiles(docsDirectory);
    return structure;
}

// Function to get a specific article by path
export async function getArticleByPath(articlesDirectory, articlePath) {
    const fullPath = path.join(articlesDirectory, `${articlePath}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    // Read file content
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Extract headings for table of contents
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const slug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

        headings.push({ level, text, slug });
    }

    return {
        path: articlePath,
        title: data.title || articlePath.split('/').pop(),
        content,
        headings,
        ...data, // Include all frontmatter data (thumbnail, summary, tags, date, etc.)
    };
}

// Function to get all article paths for Next.js static generation
export async function getAllArticlePaths(docsDirectory) {
    const structure = await buildDocStructure(docsDirectory);
    return structure.articles.map((article) => ({
        params: {
            slug: article.path.split('/'),
        },
    }));
}
