import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

export function getTocFromMarkdown(markdown: string) {
    const toc: { id: string; text: string; level: number }[] = [];

    const tree = unified().use(remarkParse).parse(markdown);
    visit(tree, 'heading', (node: any) => {
        const text = node.children.map((c: any) => c.value).join('');
        const id = text.toLowerCase().replace(/\s+/g, '-');
        toc.push({ id, text, level: node.depth });
    });

    return toc;
}
