export {};

declare global {
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
}
