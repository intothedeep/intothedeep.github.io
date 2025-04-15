To extract a **Table of Contents (TOC)** from a Markdown file and render it dynamically as a **React component**, follow these steps:

---

**Step 1: Install Dependencies**

You’ll need remark, remark-parse, remark-extract-toc, and unified to process Markdown and extract headings.

```
npm install remark remark-parse remark-extract-toc unified
```

---

**Step 2: Create a Utility Function to Extract TOC**

This function will parse a Markdown file and extract the headings.

```
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkExtractToc from "remark-extract-toc";

interface TOCItem {
  depth: number;
  value: string;
  children?: TOCItem[];
}

export async function extractTOC(markdown: string): Promise<TOCItem[]> {
  const tree: TOCItem[] = await unified()
    .use(remarkParse)
    .use(remarkExtractToc)
    .process(markdown)
    .then((file) => file.data.toc as TOCItem[]);

  return tree;
}
```

---

**Step 3: Create a React TOC Component**

Now, create a React component to render the extracted TOC.

```
import React, { useEffect, useState } from "react";
import { extractTOC } from "./utils/extractTOC"; // Import the extraction function

interface TOCItem {
  depth: number;
  value: string;
  children?: TOCItem[];
}

const TOC: React.FC<{ markdown: string }> = ({ markdown }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const generateTOC = async () => {
      const tocData = await extractTOC(markdown);
      setToc(tocData);
    };

    generateTOC();
  }, [markdown]);

  const renderTOC = (items: TOCItem[], level: number = 0) => {
    return (
      <ul className={`ml-${level * 4} list-disc`}>
        {items.map((item, index) => (
          <li key={index}>
            <a href={`#${item.value.toLowerCase().replace(/\s+/g, "-")}`} className="text-blue-500">
              {item.value}
            </a>
            {item.children && renderTOC(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 bg-gray-100 border rounded">
      <h2 className="text-lg font-bold">Table of Contents</h2>
      {toc.length > 0 ? renderTOC(toc) : <p>No headings found.</p>}
    </div>
  );
};

export default TOC;
```

---

**Step 4: Use the TOC Component**

Pass Markdown content to the TOC component.

```
import React, { useState } from "react";
import TOC from "./components/TOC";

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(`# Title\n\n## Subtitle\n\n### Section`);

  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <TOC markdown={markdown} />
      </div>
      <div className="w-2/3 p-4">
        <textarea
          className="w-full p-2 border"
          rows={10}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Paste Markdown here..."
        />
      </div>
    </div>
  );
};

export default App;
```

---

**How It Works**

1. **extractTOC function**:

• Uses remark-parse and remark-extract-toc to extract headings.

• Converts them into a structured array.

2. **TOC Component**:

• Calls extractTOC inside useEffect when markdown changes.

• Renders a nested list of links for headings.

3. **App Component**:

• Provides an editable Markdown textarea.

• Dynamically updates the TOC when Markdown content changes.

---

**Features**

✅ Extracts TOC dynamically from Markdown

✅ Creates clickable links to corresponding headings

✅ Supports nested headings (H1, H2, H3, etc.)

✅ React + TypeScript + Tailwind CSS styling

Would you like me to refine the UI further with a collapsible TOC? 🚀
