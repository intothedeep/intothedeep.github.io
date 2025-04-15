# Next: when generateMetadata executed?

✅ Next.js에서 generateMetadata가 실행되는 시점

Next.js에서 generateMetadata 함수는 페이지의 메타데이터(SEO 태그 등)를 동적으로 생성하는 기능을 합니다. 하지만 정적(static) 사이트를 생성(SSG, Static Site Generation)할 때는 실행 방식이 다릅니다.

⸻

🔹 정적 사이트(Static Website)에서 generateMetadata가 실행되는 시점

Next.js에서 generateMetadata는 SSG를 사용하는 경우,
• 빌드 시점(next build)에 실행되어 정적으로 생성됨
• 빌드된 HTML 파일 안에 메타데이터가 미리 포함됨
• 런타임(클라이언트 사이드)에서는 실행되지 않음

즉, 정적인 페이지(export const generateMetadata = ...)를 사용하면, generateMetadata는 한 번 실행된 후 변경되지 않습니다.

⸻

🔹 어떨 때 generateMetadata가 작동하지 않을까?

아래 상황에서는 generateMetadata가 런타임에서 동적으로 실행되지 않습니다. 1. 완전 정적 사이트 (output: 'export' 설정 사용)
• next build 시점에 generateMetadata가 실행되며, 이후 변경 불가능
• HTML 파일이 정적으로 생성되어 서버 없이도 배포 가능 2. 서버 없이 정적 배포 (예: Vercel, Netlify, S3 등)
• 정적 HTML 파일이 생성된 후, 실행할 서버가 없기 때문에 클라이언트에서 generateMetadata 실행이 불가능

⸻

🔹 정적 사이트에서 동적 메타데이터를 적용하는 방법

정적 사이트에서 페이지마다 다른 메타데이터를 설정하고 싶다면? 1. 클라이언트에서 메타데이터를 변경하는 방법
• 정적으로 생성된 페이지라면 generateMetadata 대신, 클라이언트 측에서 document.head를 직접 변경해야 합니다.

import { useEffect } from "react";

export default function Page() {
useEffect(() => {
document.title = "새로운 타이틀";
document.querySelector('meta[name="description"]')?.setAttribute("content", "동적으로 변경된 설명");
}, []);

return <div>페이지 컨텐츠</div>;
}

⚠️ 주의: 이렇게 하면 SEO 최적화가 어렵고, 검색 엔진이 메타데이터를 제대로 반영하지 못할 수 있음.

    2.	서버 컴포넌트(Server Components) 또는 API 사용
    •	서버에서 데이터를 가져온 후, 서버 사이드에서 메타데이터를 생성하는 방법
    •	fetch로 동적 데이터를 가져올 때 generateMetadata 내에서 사용 가능

export async function generateMetadata({ params }) {
const data = await fetch(`https://api.example.com/page/${params.id}`).then(res => res.json());

return {
title: data.title,
description: data.description,
};
}

    3.	서버 렌더링(SSR, getServerSideProps)을 활용
    •	완전 정적인 사이트가 아니라면, getServerSideProps를 이용해 페이지가 요청될 때마다 메타데이터를 생성할 수도 있음.
    •	다만, Next.js 13 이상에서는 getServerSideProps보다 generateMetadata가 권장됨.

⸻

🔹 정리

상황 generateMetadata 실행 시점 실행 가능 여부
SSG (정적 사이트) next build 시점 ✅ (한 번 실행 후 변경 불가)
완전 정적 배포 next build 시점 ✅ (변경 불가)
CSR (클라이언트에서 동적 변경) 런타임 ❌ (직접 document.head 조작 필요)
SSR (서버 렌더링) 요청 시점 ✅ (요청할 때마다 새로 실행)

➡️ Next.js에서 정적인 사이트를 사용하면 generateMetadata는 빌드 시점에만 실행되며, 클라이언트에서 실행되지 않습니다.
➡️ 동적으로 변경하려면 클라이언트에서 document.title을 변경하거나, SSR을 고려해야 합니다.

혹시 더 궁금한 점 있으면 질문 주세요! 🚀
