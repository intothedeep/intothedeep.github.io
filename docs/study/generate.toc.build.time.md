빌드 타임에 마크다운 파일을 로드하고 파싱하는 것이 더 나을까?

빌드 타임에 마크다운 파일을 로드하고 파싱하는 것이 더 나을 수 있는 경우가 많습니다.
왜냐하면 다음과 같은 장점이 있기 때문입니다.

✅ 빌드 타임에 처리하는 장점 1. 성능 최적화
• 런타임(클라이언트에서 fetch)에 파일을 읽으면 네트워크 요청이 필요합니다.
• 하지만 빌드 타임에 처리하면 미리 파싱한 데이터를 번들에 포함할 수 있어 클라이언트에서 불필요한 요청을 줄일 수 있습니다. 2. SEO (검색 엔진 최적화) 향상
• 클라이언트에서 데이터를 로드하면 초기 HTML에는 TOC가 포함되지 않음.
• 하지만 빌드 타임에 TOC를 생성하면 **서버 사이드 렌더링(SSR)**이 가능하고, SEO에 유리함. 3. 정적 사이트에 적합
• 블로그나 문서 사이트에서는 마크다운이 변경될 일이 많지 않음.
• 빌드 시 미리 변환해두면 페이지 로딩 속도가 훨씬 빨라짐. 4. 보안 강화
• 클라이언트에서 마크다운을 불러올 경우, 외부 파일을 무작위로 로드하는 보안 취약점 발생 가능.
• 빌드 타임에 처리하면 예측 가능한 데이터만 제공 가능.

⸻

🏗️ 빌드 타임에 TOC를 생성하는 방법 (Next.js 기준)

빌드 타임에 마크다운을 파싱하려면 **Next.js의 getStaticProps**를 활용하는 것이 좋습니다.

1️⃣ 필요한 라이브러리 설치

npm install fs path remark remark-parse remark-extract-toc unified

2️⃣ TOC 생성 유틸리티 함수 작성 (utils/generateTOC.ts)

import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkExtractToc from "remark-extract-toc";

interface TOCItem {
depth: number;
value: string;
children?: TOCItem[];
}

export async function generateTOC(filePath: string): Promise<TOCItem[]> {
const markdown = fs.readFileSync(filePath, "utf-8");

const tree: TOCItem[] = await unified()
.use(remarkParse)
.use(remarkExtractToc)
.process(markdown)
.then((file) => file.data.toc as TOCItem[]);

return tree;
}

⸻

3️⃣ getStaticProps에서 마크다운을 파싱 (pages/index.tsx)

import { GetStaticProps } from "next";
import path from "path";
import { generateTOC } from "../utils/generateTOC";

interface TOCItem {
depth: number;
value: string;
children?: TOCItem[];
}

interface HomeProps {
toc: TOCItem[];
}

const Home: React.FC<HomeProps> = ({ toc }) => {
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
<div className="p-4">
<h1 className="text-xl font-bold">Table of Contents</h1>
{toc.length > 0 ? renderTOC(toc) : <p>No headings found.</p>}
</div>
);
};

export const getStaticProps: GetStaticProps = async () => {
const filePath = path.join(process.cwd(), "public", "example.md");
const toc = await generateTOC(filePath);

return {
props: { toc },
};
};

export default Home;

⸻

🚀 요약: 빌드 타임 vs 런타임

방식 장점 단점
빌드 타임 (getStaticProps 사용) 🚀 빠른 로딩 속도 (SEO 유리), 클라이언트 요청 없음 🔄 마크다운이 변경될 경우 재배포 필요
런타임 (fetch 사용) ✏️ 실시간으로 변경 가능 🐢 초기 로딩 느림, SEO 불리함

❓ 언제 빌드 타임을 선택해야 할까?

✅ 정적인 블로그, 문서 사이트
✅ SEO 최적화가 필요할 때
✅ 성능이 중요한 프로젝트

❓ 언제 런타임을 선택해야 할까?

✅ 관리자가 실시간으로 문서를 업데이트해야 할 때
✅ 사용자 입력을 기반으로 TOC를 동적으로 생성할 때

⸻

💡 결론

📌 마크다운이 자주 변경되지 않는다면 빌드 타임에 처리하는 것이 더 좋습니다.
📌 하지만 동적으로 로딩해야 하는 경우에는 fetch를 활용할 수도 있습니다.

🎯 프로젝트 특성에 맞게 선택하면 됩니다! 🚀
