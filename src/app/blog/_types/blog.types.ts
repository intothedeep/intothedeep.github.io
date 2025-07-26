export type TPostFlattenedItem = {
    type: 'FILE' | 'FOLDER';
    slugs: string[];
    level: number;
    title?: string;
    content?: string;
    metadata?: TPostMetadata;
};

export type TPostMetadata = {
    id: string;
    title: string;
    summary: string;
    thumbnail: string;
    date: string;
    tags: string[];
    slug: string;
    category?: string;
}; 