import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface TPostMetadata {
    id: string;
    title: string;
    summary: string;
    thumbnail: string;
    date: string;
    tags: string[];
    slug: string;
    category?: string;
}

interface TPostFileNode {
    type: 'FILE';
    name: string;
    title: string;
    content: string;
    metadata?: TPostMetadata;
}

interface TPostFolderNode {
    [key: string]: TPostFileNode[] | TPostFolderNode | undefined | 'FOLDER'; // Allow nested folders and 'FOLDER' as a valid value
}

type TPostNode = TPostFileNode | TPostFolderNode;

type TPostFlattenedItem = {
    type: 'FILE' | 'FOLDER';
    slugs: string[];
    level: number;
    title?: string;
    content?: string;
    metadata?: TPostMetadata;
};

/**
 *
 * @param path
 * @returns return dirs based on path
 */
const findFolderAll = async (filename: string) => {
    async function dfs(filename: string, dir: string = '') {
        const dirPath = path.join(dir, filename);

        const subFolderTree: TPostFolderNode = {
            type: 'FOLDER',
        };
        // subFolderTree.files = subFolderTree.files ?? [];
        const files: TPostFileNode[] = [];
        const dirs = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const dirent of dirs) {
            const { name, parentPath } = dirent;

            if (name.indexOf('.key') != -1) {
                console.log('TODO: add key');
            } else if (dirent.isDirectory()) {
                subFolderTree[name] = await dfs(name, parentPath);
                subFolderTree[name].type = 'FOLDER';
            } else {
                const filePath = path.join(parentPath, name);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { data: metadata, content } = matter(fileContent);
                const title = name.replace('.md', '');

                const post: TPostFileNode = {
                    name,
                    title,
                    type: 'FILE',
                    metadata: metadata as TPostMetadata,
                    content,
                };

                files.push(post);
            }
        }

        subFolderTree.files = files;
        subFolderTree.type = 'FOLDER';

        return subFolderTree;
    }

    const contentsTree = await dfs(filename);
    return contentsTree;
};

const POST_INPUT_FOLDER = '00_articles';

export const POST_META_FILE_NAME = 'meta.json';
export const POST_DATA_PATH = '/public/posts';
export const POST_DATA_FILE_NAME = 'parsed.json';

function createMetaJsonFile(
    treeData: any,
    output: string,
    output_filename: string
) {
    const pwd = path.join(process.cwd(), `${output}/${output_filename}`);

    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(treeData, null, 4); // Pretty print with 2 spaces

    // Write the JSON string to the file
    fs.writeFileSync(pwd, jsonData, { encoding: 'utf8' });
}

const treeData: TPostNode = await findFolderAll(POST_INPUT_FOLDER);
createMetaJsonFile(treeData, POST_DATA_PATH, POST_META_FILE_NAME);
// console.log('>>> meta: ', treeData);

/**
 * - flatten data
 * @param obj
 * @param path
 * @returns
 */
function flattenPosts(node: TPostFolderNode): TPostFlattenedItem[] {
    // console.log('------ node: ', node);

    const flatten = (node: TPostFolderNode, slugs: string[], level: number) => {
        const items: TPostFlattenedItem[] = [];

        // folder itself
        if (slugs.length !== 0) {
            items.push({
                slugs,
                level,
                type: 'FOLDER',
            });
        }

        for (const file of node.files as TPostFileNode[]) {
            // console.log('>> flatten::file: ', file);
            const title: string = file.title!;

            const item: TPostFlattenedItem = {
                ...file,
                slugs: [...slugs, title],
                level: level + 1,
            };
            items.push(item);
        }

        for (const key of Object.keys(node)) {
            if (key != 'files' && key != 'type') {
                console.log('>> key: ', key, slugs, level);

                const arr = flatten(
                    node[key] as TPostFolderNode,
                    [...slugs, key],
                    level + 1
                );

                items.push(...arr);
            }
        }

        return items;
    };

    const acc: TPostFlattenedItem[] = flatten(
        node,
        [],
        0
    ) as TPostFlattenedItem[];

    return acc;
}

const flattened = flattenPosts(treeData);

// console.log(flattened);
createMetaJsonFile(flattened, POST_DATA_PATH, POST_DATA_FILE_NAME);
