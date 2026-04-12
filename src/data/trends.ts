export interface TrendSource {
  name: string;    // "VentureBeat", "Adobe Blog"
  url: string;
}

export interface TrendItem {
  title: string;
  summary: string;
  action: string;
  category: "tool" | "workflow" | "trend" | "resource";
  sources: TrendSource[];
  ogImage?: string;
}

export interface WeeklyTrend {
  date: string;
  weekNumber: number;
  title: string;
  readTime: string;
  items: TrendItem[];
}

export const CATEGORY_LABELS: Record<TrendItem["category"], string> = {
  tool: "디자인 도구",
  workflow: "워크플로우",
  trend: "트렌드",
  resource: "리소스",
};

export const CATEGORY_COLORS: Record<TrendItem["category"], string> = {
  tool: "#0A84FF",
  workflow: "#BF5AF2",
  trend: "#FF9F0A",
  resource: "#30D158",
};

export const trends: WeeklyTrend[] = [
  {
    date: "2026-04-01",
    weekNumber: 2,
    title: "Figma AI가 유료로 전환되고, Claude 소스코드가 통째로 유출됐어요",
    readTime: "2분",
    items: [
      {
        title: "Claude Code 소스코드 전량 유출",
        summary: "npm 배포 시 소스맵 파일이 포함되어 512,000줄 TypeScript 전체가 노출됐습니다. 내부 자율 모드(KAIROS), 3레이어 메모리 아키텍처 등 미공개 기능이 드러났어요.",
        action: "Claude Code 사용자라면 v2.1.87로 롤백하세요. 유출된 아키텍처를 참고해 자신의 워크플로우를 개선할 수 있어요.",
        category: "trend",
        sources: [
          { name: "VentureBeat", url: "https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know" },
          { name: "The Register", url: "https://www.theregister.com/2026/03/31/anthropic_claude_code_source_code/" },
        ],
      },
      {
        title: "Figma Make 정식 출시 + AI 크레딧 과금",
        summary: "베타를 졸업하고 정식 출시. AI 디자인 생성, 이미지 편집, 코드 export 기능을 제공하지만 3/18부터 크레딧 과금이 시작됐어요.",
        action: "크레딧 소비량을 파악하고, 어디에 집중 투입할지 미리 정하세요. Pro 플랜은 5월부터 적용.",
        category: "tool",
        sources: [
          { name: "Figma Blog", url: "https://www.figma.com/blog/updates-to-ai-credits-in-figma/" },
        ],
      },
      {
        title: "Adobe Firefly 커스텀 모델 베타",
        summary: "이미지 30장 미만으로 Firefly에 자신만의 스타일을 학습시킬 수 있습니다. 선 두께, 조명, 색상 팔레트까지 유지해요.",
        action: "CC 구독자라면 바로 써보세요. 브랜드 일러스트 일관성 유지에 강력합니다.",
        category: "tool",
        sources: [
          { name: "Adobe Blog", url: "https://blog.adobe.com/en/publish/2026/03/19/adobe-firefly-expands-video-image-creation-with-new-ai-capabilities-custom-models" },
          { name: "PetaPixel", url: "https://petapixel.com/2026/03/19/you-can-now-train-adobes-ai-on-your-own-unique-photographic-style/" },
        ],
      },
      {
        title: "디자인 시스템 자동화 시대 도래",
        summary: "Figma MCP로 Claude Code와 Figma를 양방향 동기화할 수 있게 됐어요. 디자인 토큰 변경이 코드에 자동 반영되는 워크플로우가 가능해졌습니다.",
        action: "Figma MCP 플러그인을 설치하고, 디자인 시스템 토큰을 코드와 연결해보세요.",
        category: "workflow",
        sources: [
          { name: "Figma", url: "https://www.figma.com/community/plugin/1456663893768029030/figma-mcp-server" },
        ],
      },
    ],
  },
  {
    date: "2026-03-29",
    weekNumber: 1,
    title: "GPT-5.4가 출시되고, Shopify가 AI 안에서 물건을 팔기 시작했어요",
    readTime: "2분",
    items: [
      {
        title: "GPT-5.4 출시 — 3가지 변형",
        summary: "Standard, Thinking, Pro 3가지 버전이 나왔어요. 컨텍스트 105만 토큰, 사실 오류 33% 감소.",
        action: "ChatGPT Plus 사용자라면 자동 적용. 긴 문서 요약이나 리서치에 바로 활용하세요.",
        category: "trend",
        sources: [
          { name: "BuildFastWithAI", url: "https://www.buildfastwithai.com/blogs/ai-models-march-2026-releases" },
        ],
      },
      {
        title: "JetBrains Central — AI 에이전트 통합 관리",
        summary: "Anthropic, OpenAI, Google 에이전트를 하나의 플랫폼에서 관리. 정책, 비용, 컨텍스트 공유 기능 제공.",
        action: "Q2 얼리 액세스 신청해두세요. 여러 AI 도구를 쓰고 있다면 관리가 편해집니다.",
        category: "tool",
        sources: [
          { name: "JetBrains Blog", url: "https://blog.jetbrains.com/blog/2026/03/24/introducing-jetbrains-central/" },
          { name: "InfoWorld", url: "https://www.infoworld.com/article/4149535/new-jetbrains-platform-manages-ai-coding-agents.html" },
        ],
      },
      {
        title: "Shopify 에이전틱 스토어프론트",
        summary: "ChatGPT, Gemini, Copilot 앱 안에서 직접 상품 판매 가능. AI 앱이 새로운 판매 채널이 되는 시대.",
        action: "이커머스 UI를 디자인한다면, AI 앱 내 쇼핑 경험 설계를 고려해야 합니다.",
        category: "trend",
        sources: [
          { name: "The AI Marketers", url: "https://www.theaimarketers.ai/news032626/" },
        ],
      },
    ],
  },
];
