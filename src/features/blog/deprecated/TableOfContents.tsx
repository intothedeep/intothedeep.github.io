import Link from 'next/link';

export default function TableOfContents({ headings, activeHeading }: any) {
    return (
        <div className="table-of-contents">
            <h3>Table of Contents</h3>
            <ul>
                {headings.map(({ level, text, slug }: any) => (
                    <li
                        key={slug}
                        className={`toc-level-${level} ${
                            activeHeading === slug ? 'active' : ''
                        }`}
                        style={{ marginLeft: `${(level - 1) * 16}px` }}
                    >
                        <Link href={`#${slug}`}>{text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
