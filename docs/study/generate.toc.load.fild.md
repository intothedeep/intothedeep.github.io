To load a Markdown file from the **public folder** in a React + TypeScript application and generate a Table of Contents (TOC), follow these steps:

---

**1. Load Markdown File from the Public Folder**

Since files in the **public folder** are accessible via a URL (/public/ is the root), we need to fetch the Markdown file.

---

**Step 1: Place Markdown File in public/ Folder**

Place your Markdown file (e.g., example.md) inside the public/ folder.

```
/public
  ├── example.md
```

---

**Step 2: Create a Utility Function to Fetch the Markdown File**

Use fetch to read the file and extract the content.

```
export async function loadMarkdownFile(fileName: string): Promise<string> {
  const response = await fetch(`/${fileName}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${fileName}`);
  }
  return await response.text();
}
```

---

**Step 3: Modify TOC Component to Accept Markdown from a File**

Update your TOC.tsx component to accept and process a file.

```
import React, { useEffect, useState } from "react";
import { extractTOC } from "../utils/extractTOC"; // Function to extract TOC
import { loadMarkdownFile } from "../utils/loadMarkdown"; // Function to load file

interface TOCItem {
  depth: number;
  value: string;
  children?: TOCItem[];
}

const TOC: React.FC<{ fileName: string }> = ({ fileName }) => {
  const [markdown, setMarkdown] = useState<string>("");
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const loadFile = async () => {
      try {
        const content = await loadMarkdownFile(fileName);
        setMarkdown(content);
        const tocData = await extractTOC(content);
        setToc(tocData);
      } catch (error) {
        console.error("Error loading markdown file:", error);
      }
    };

    loadFile();
  }, [fileName]);

  const renderTOC = (items: TOCItem[], level: number = 0) => (
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

**Step 4: Use the TOC Component in App.tsx**

Now, pass the filename to the TOC component.

```
import React from "react";
import TOC from "./components/TOC";

const App: React.FC = () => {
  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <TOC fileName="example.md" />
      </div>
      <div className="w-2/3 p-4">
        <h1 className="text-2xl font-bold">Markdown File Viewer</h1>
        <p>Table of Contents will be generated from the Markdown file.</p>
      </div>
    </div>
  );
};

export default App;
```

---

**How It Works**

1. **loadMarkdownFile(fileName)**: Fetches Markdown content from /public/.

2. **extractTOC(markdown)**: Extracts headings and structures them into a TOC.

3. **TOC.tsx**:

• Loads the file using useEffect.

• Generates the TOC dynamically.

4. **App.tsx**:

• Passes the filename (example.md) to TOC as a prop.

• Renders the TOC alongside the Markdown file.

---

**Final Thoughts**

✅ Supports **loading Markdown files dynamically**

✅ Extracts **Table of Contents**

✅ Uses **React + TypeScript + Tailwind CSS** for styling

Would you like me to add a **file upload feature** for dynamic Markdown selection? 🚀
