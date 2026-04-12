export interface TrendArticle {
  name: string;
  title: string;
  url: string;
  ogImage?: string;
}

export interface TrendItem {
  title: string;
  summary: string;       // 짧은 요약 (2줄, 항상 보임)
  detail?: string;        // 상세 내용 (더보기로 펼침)
  action: string;
  category: "tool" | "workflow" | "trend" | "resource";
  articles: TrendArticle[];
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
    readTime: "3분",
    items: [
      {
        title: "Claude Code 소스코드가 통째로 유출됐어요",
        summary: "Anthropic이 npm에 새 버전을 배포하면서 실수로 전체 소스코드(51만 줄)가 공개됐습니다.",
        detail: "소스맵 파일이 패키지에 포함된 게 원인이에요. 유출된 코드에서 KAIROS라는 자율 모드, 3레이어 메모리 구조, 44개의 숨겨진 기능 플래그 등이 발견됐습니다. 커뮤니티에서는 이미 Rust로 재구현한 오픈소스 버전이 2시간 만에 GitHub 50K 스타를 달성했어요. Anthropic은 보안 침해가 아닌 패키징 실수라고 해명했습니다.",
        action: "Claude Code 사용자라면 v2.1.87로 롤백하세요. 유출된 아키텍처를 참고해 워크플로우를 개선할 수 있어요.",
        category: "trend",
        articles: [
          { name: "The Register", title: "Anthropic's Claude Code source code leaks via npm", url: "https://www.theregister.com/2026/03/31/anthropic_claude_code_source_code/", ogImage: "https://regmedia.co.uk/2026/03/31/shutterstock_2192683369.jpg" },
          { name: "VentureBeat", title: "Claude Code's source code appears to have leaked", url: "https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know" },
        ],
      },
      {
        title: "Figma AI가 유료로 전환됐어요",
        summary: "Figma Make가 정식 출시되면서 AI 크레딧 과금이 시작됐습니다.",
        detail: "베타 기간에는 무료였던 AI 기능이 3/18부터 크레딧을 소모합니다. AI 디자인 생성, 이미지 편집, 코드 export 등의 기능을 제공하지만, 무제한으로 쓰던 시대는 끝났어요. Pro 플랜 적용은 5월부터이니 그 전에 크레딧 소비 패턴을 파악해두는 게 좋습니다.",
        action: "크레딧 소비량을 파악하고, 어디에 집중 투입할지 미리 정하세요.",
        category: "tool",
        articles: [
          { name: "Figma Blog", title: "Updates to AI credits in Figma", url: "https://www.figma.com/blog/updates-to-ai-credits-in-figma/", ogImage: "https://cdn.sanity.io/images/599r6htc/regionalized/bbbd715863ae9596492a6b6eda14af49a9b802de-2400x1260.png?w=1200&q=70&fit=max&auto=format" },
        ],
      },
      {
        title: "내 스타일로 AI 이미지를 만들 수 있게 됐어요",
        summary: "Adobe Firefly에 커스텀 모델 기능이 베타로 추가됐습니다.",
        detail: "이미지 30장만 있으면 Firefly가 내 스타일을 학습합니다. 선 두께, 조명, 색상 팔레트, 캐릭터 특징까지 유지하면서 새 이미지를 생성해요. Creative Cloud 구독자라면 별도 세팅 없이 바로 사용 가능합니다.",
        action: "CC 구독자라면 바로 써보세요. 브랜드 일러스트 일관성 유지에 강력합니다.",
        category: "tool",
        articles: [
          { name: "Adobe Blog", title: "Adobe Firefly expands with custom models", url: "https://blog.adobe.com/en/publish/2026/03/19/adobe-firefly-expands-video-image-creation-with-new-ai-capabilities-custom-models", ogImage: "https://blog.adobe.com/en/publish/2026/03/19/media_13006d926799bc866df08ba9c17cd4c7358bc273a.jpg?width=1200&format=pjpg&optimize=medium" },
          { name: "PetaPixel", title: "Train Adobe's AI on your own photographic style", url: "https://petapixel.com/2026/03/19/you-can-now-train-adobes-ai-on-your-own-unique-photographic-style/" },
        ],
      },
      {
        title: "Figma와 코드가 자동으로 동기화돼요",
        summary: "Figma MCP로 디자인 토큰 변경이 코드에 자동 반영되는 워크플로우가 가능해졌습니다.",
        detail: "Claude Code와 Figma를 양방향으로 연결하는 MCP 플러그인이 나왔어요. 디자이너가 Figma에서 토큰을 바꾸면 코드에 자동 반영되고, 개발자가 코드를 수정하면 Figma에서도 확인할 수 있습니다. 디자인 시스템 유지 관리의 노가다가 줄어들어요.",
        action: "Figma MCP 플러그인을 설치하고, 디자인 시스템 토큰을 코드와 연결해보세요.",
        category: "workflow",
        articles: [
          { name: "Figma Community", title: "Figma MCP Server plugin", url: "https://www.figma.com/community/plugin/1456663893768029030/figma-mcp-server" },
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
        title: "GPT가 또 업그레이드됐어요",
        summary: "GPT-5.4가 Standard, Thinking, Pro 3가지 버전으로 출시됐습니다.",
        detail: "컨텍스트 창이 105만 토큰으로 늘어났고, 사실 오류가 기존 대비 33% 줄었어요. ChatGPT Plus 사용자라면 자동으로 적용됩니다. 긴 문서 요약이나 복잡한 리서치에서 체감 차이가 있을 거예요.",
        action: "ChatGPT Plus 사용자라면 자동 적용. 긴 문서 요약이나 리서치에 바로 활용하세요.",
        category: "trend",
        articles: [
          { name: "BuildFastWithAI", title: "AI Models: March 2026 Releases", url: "https://www.buildfastwithai.com/blogs/ai-models-march-2026-releases", ogImage: "https://oukdqujzonxvqhiefdsv.supabase.co/storage/v1/object/public/blogs/b0fc0c26-cd58-4791-a362-eebd0a445816.png" },
        ],
      },
      {
        title: "AI 도구들을 한 곳에서 관리할 수 있어요",
        summary: "JetBrains가 AI 에이전트 통합 관리 플랫폼 'Central'을 발표했습니다.",
        detail: "Anthropic, OpenAI, Google의 AI 에이전트를 하나의 대시보드에서 관리합니다. 정책 설정, 비용 추적, 컨텍스트 공유 기능을 제공해요. 여러 AI 도구를 쓰는 팀이라면 관리가 훨씬 편해질 거예요. Q2 2026에 얼리 액세스 예정입니다.",
        action: "Q2 얼리 액세스 신청해두세요. 여러 AI 도구를 쓰고 있다면 관리가 편해집니다.",
        category: "tool",
        articles: [
          { name: "JetBrains Blog", title: "Introducing JetBrains Central", url: "https://blog.jetbrains.com/blog/2026/03/24/introducing-jetbrains-central/", ogImage: "https://blog.jetbrains.com/wp-content/uploads/2026/03/Blog-Social-Share-image-1280x720-1-1.png" },
          { name: "InfoWorld", title: "New JetBrains platform manages AI coding agents", url: "https://www.infoworld.com/article/4149535/new-jetbrains-platform-manages-ai-coding-agents.html" },
        ],
      },
      {
        title: "AI 앱 안에서 쇼핑이 가능해졌어요",
        summary: "Shopify가 ChatGPT, Gemini, Copilot 앱 안에서 직접 상품 판매를 시작했습니다.",
        detail: "AI 챗봇에게 \"선물 추천해줘\"라고 물으면, 대화 안에서 바로 상품을 보여주고 결제까지 가능해요. 웹사이트를 열지 않아도 쇼핑이 끝납니다. 이커머스 디자이너라면 '앱 밖의 쇼핑 경험'이라는 새 영역을 고민해야 할 때에요.",
        action: "이커머스 UI를 디자인한다면, AI 앱 내 쇼핑 경험 설계를 고려해야 합니다.",
        category: "trend",
        articles: [
          { name: "The AI Marketers", title: "Shopify's Agentic Storefront launch", url: "https://www.theaimarketers.ai/news032626/", ogImage: "https://storage.ghost.io/c/40/b2/40b20fac-3092-4d7d-92de-227ddbaff057/content/images/size/w1200/2026/03/March-26th-hero-n-fr.png" },
        ],
      },
    ],
  },
];
