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
        title: "Claude Code 소스코드 51만 줄이 통째로 유출됐어요",
        summary: "AI 코딩 도구 점유율 1위(18%)인 Claude Code의 전체 소스코드가 npm 배포 실수로 공개됐습니다. 이번 유출로 AI 코딩 도구의 내부 구조가 처음으로 드러났어요.",
        detail: "Anthropic이 v2.1.88을 npm에 배포할 때 Bun 번들러의 소스맵 파일(.map)이 포함되면서 512,000줄의 TypeScript 코드가 노출됐습니다. 핵심 발견 내용은 세 가지예요. 첫째, KAIROS라는 자율 모드가 소스에서 150회 이상 언급되어 있는데, 유저가 자리를 비우면 백그라운드에서 자동으로 메모리를 정리하는 프로액티브 시스템입니다. 둘째, MEMORY.md를 경량 인덱스로 항상 컨텍스트에 로드하는 3레이어 메모리 아키텍처가 확인됐어요. 셋째, 44개의 완성됐지만 미출시된 기능이 피처 플래그로 숨겨져 있었습니다. 커뮤니티 반응은 폭발적이었어요. 공개 2시간 만에 Rust로 재구현한 claw-code가 GitHub 50K 스타를 달성했고, Python 버전도 등장했습니다. Anthropic은 '릴리스 패키징 이슈이며 보안 침해가 아니다'라고 해명했지만, 이미 코드는 전량 미러링된 상태입니다.",
        action: "Claude Code 사용자라면 최신 버전으로 업데이트하세요. 유출된 메모리 아키텍처 패턴(MEMORY.md 인덱싱)은 자신의 프로젝트에도 적용할 수 있는 좋은 참고자료예요.",
        category: "trend",
        articles: [
          { name: "The Register", title: "Anthropic's Claude Code source code leaks via npm", url: "https://www.theregister.com/2026/03/31/anthropic_claude_code_source_code/", ogImage: "https://regmedia.co.uk/2026/03/31/shutterstock_2192683369.jpg" },
          { name: "VentureBeat", title: "Claude Code's source code appears to have leaked", url: "https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know" },
        ],
      },
      {
        title: "Figma AI, 무료 시대가 끝났어요",
        summary: "1년간 무료로 제공되던 Figma의 AI 기능(Make)이 정식 출시와 함께 크레딧 과금으로 전환됐습니다. 디자이너의 AI 도구 비용 관리가 처음으로 중요해졌어요.",
        detail: "3월 18일부터 AI 디자인 생성, 이미지 편집(오브젝트 제거, 배경 확장), 코드 export 등 모든 AI 기능이 크레딧을 소모합니다. 구독형과 종량제 두 가지 옵션이 있고, Pro 플랜은 5월부터 적용돼요. 중요한 건 '어디에 AI를 쓸 것인가'를 전략적으로 판단해야 한다는 점이에요. 초안 생성에 쓸지, 이미지 편집에 쓸지, 코드 export에 쓸지 — 크레딧을 가장 효율적으로 쓰는 워크플로우를 먼저 실험해보세요. 베타 때 무한정 써봤다면 어떤 기능이 가장 시간을 아꼈는지 이미 알고 있을 거예요.",
        action: "5월 전에 크레딧 소비 패턴을 파악하세요. AI 초안 생성 vs 이미지 편집 vs 코드 export 중 어디서 가장 효과적인지 실험해보세요.",
        category: "tool",
        articles: [
          { name: "Figma Blog", title: "Updates to AI credits in Figma", url: "https://www.figma.com/blog/updates-to-ai-credits-in-figma/", ogImage: "https://cdn.sanity.io/images/599r6htc/regionalized/bbbd715863ae9596492a6b6eda14af49a9b802de-2400x1260.png?w=1200&q=70&fit=max&auto=format" },
        ],
      },
      {
        title: "이미지 30장이면 나만의 AI 스타일이 생겨요",
        summary: "Adobe Firefly에 커스텀 모델 학습 기능이 퍼블릭 베타로 추가됐습니다. 내 일러스트 스타일, 사진 톤, 캐릭터 특징을 AI가 학습해서 일관된 이미지를 만들어줘요.",
        detail: "학습에 필요한 이미지는 30장 미만이에요. 선 두께, 조명, 색상 팔레트, 캐릭터 비율까지 유지하면서 새 이미지를 생성합니다. 학습 1회에 500크레딧이 들고, Creative Cloud 구독자라면 별도 환경 세팅 없이 Firefly 웹에서 바로 사용 가능해요. 기존에 FLUX LoRA로 스타일 학습을 하려면 기술적 세팅이 필요했는데, 이제 Adobe 생태계 안에서 클릭 몇 번으로 끝납니다. 브랜드 가이드라인에 맞는 일러스트를 대량 생산해야 하거나, 시리즈 콘텐츠의 시각적 일관성을 유지해야 할 때 특히 강력해요.",
        action: "브랜드 일러스트 일관성이 필요하다면 바로 테스트해보세요. CC 구독 중이면 추가 비용 없이 시작할 수 있어요.",
        category: "tool",
        articles: [
          { name: "Adobe Blog", title: "Adobe Firefly expands with custom models", url: "https://blog.adobe.com/en/publish/2026/03/19/adobe-firefly-expands-video-image-creation-with-new-ai-capabilities-custom-models", ogImage: "https://blog.adobe.com/en/publish/2026/03/19/media_13006d926799bc866df08ba9c17cd4c7358bc273a.jpg?width=1200&format=pjpg&optimize=medium" },
          { name: "PetaPixel", title: "Train Adobe's AI on your own photographic style", url: "https://petapixel.com/2026/03/19/you-can-now-train-adobes-ai-on-your-own-unique-photographic-style/" },
        ],
      },
      {
        title: "디자인 토큰을 바꾸면 코드가 자동으로 바뀌어요",
        summary: "Figma MCP 플러그인이 나왔어요. 디자이너가 Figma에서 색상이나 간격을 수정하면, Claude Code가 코드에 자동 반영합니다. 반대 방향도 가능해요.",
        detail: "MCP(Model Context Protocol)는 AI 에이전트가 외부 도구와 양방향으로 통신하는 프로토콜이에요. 이 플러그인은 Figma의 디자인 토큰(색상, 타이포, 간격, 라운드 등)을 Claude Code가 직접 읽고 코드에 반영할 수 있게 해줍니다. 예를 들어 디자이너가 Primary 컬러를 #0A84FF에서 #007AFF로 바꾸면, Claude Code가 CSS 변수와 관련 컴포넌트를 자동 업데이트해요. 디자인 시스템을 운영하는 팀이라면 '디자이너가 바꿨는데 개발에 반영 안 됨' 문제가 사라집니다. 1인 디자이너-개발자에게도 Figma↔코드 수동 동기화 시간을 절약할 수 있어요.",
        action: "디자인 시스템을 운영 중이라면 Figma MCP를 설치하고 토큰 동기화를 테스트해보세요.",
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
        title: "GPT-5.4 출시 — 한번에 책 한 권을 넣을 수 있어요",
        summary: "OpenAI가 GPT-5.4를 Standard, Thinking, Pro 3가지 버전으로 출시했습니다. 컨텍스트 창이 105만 토큰(약 책 3권 분량)으로 늘어났고, 사실 오류가 33% 줄었어요.",
        detail: "가장 큰 변화는 컨텍스트 창 확대예요. 이전 모델은 긴 문서를 넣으면 앞부분을 잊어버렸는데, 이제 디자인 시스템 문서 전체를 한번에 넣고 질문할 수 있습니다. Thinking 버전은 복잡한 추론에 특화되어 있어서, '이 두 디자인 시스템의 차이를 분석해줘' 같은 요청에 더 정확한 답을 줘요. ChatGPT Plus 구독자라면 별도 조치 없이 자동 적용됩니다.",
        action: "디자인 시스템 문서나 긴 리서치 자료를 통째로 넣어보세요. 이전보다 훨씬 정확한 분석을 받을 수 있어요.",
        category: "trend",
        articles: [
          { name: "BuildFastWithAI", title: "AI Models: March 2026 Releases", url: "https://www.buildfastwithai.com/blogs/ai-models-march-2026-releases", ogImage: "https://oukdqujzonxvqhiefdsv.supabase.co/storage/v1/object/public/blogs/b0fc0c26-cd58-4791-a362-eebd0a445816.png" },
        ],
      },
      {
        title: "Claude, GPT, Gemini를 한 대시보드에서 관리해요",
        summary: "JetBrains가 AI 에이전트 통합 관리 플랫폼 'Central'을 발표했습니다. 여러 AI를 쓰는 팀이 정책, 비용, 권한을 하나로 관리할 수 있어요.",
        detail: "현재 많은 팀이 Claude로 코딩하고, ChatGPT로 리서치하고, Gemini로 문서 작업합니다. 문제는 각 도구의 비용을 따로 추적해야 하고, 누가 뭘 쓰는지 파악이 안 된다는 거예요. JetBrains Central은 Anthropic, OpenAI, Google의 에이전트를 하나의 플랫폼에서 관리합니다. 팀별 정책 설정(\"인턴은 GPT만 사용\"), 비용 어트리뷰션(\"이번 달 Claude 비용이 40% 증가\"), 컨텍스트 공유(모든 에이전트가 같은 프로젝트 맥락을 공유) 기능을 제공해요. Q2 2026에 얼리 액세스 예정입니다.",
        action: "팀에서 AI 도구를 3개 이상 쓴다면 얼리 액세스를 신청해두세요.",
        category: "tool",
        articles: [
          { name: "JetBrains Blog", title: "Introducing JetBrains Central", url: "https://blog.jetbrains.com/blog/2026/03/24/introducing-jetbrains-central/", ogImage: "https://blog.jetbrains.com/wp-content/uploads/2026/03/Blog-Social-Share-image-1280x720-1-1.png" },
          { name: "InfoWorld", title: "New JetBrains platform manages AI coding agents", url: "https://www.infoworld.com/article/4149535/new-jetbrains-platform-manages-ai-coding-agents.html" },
        ],
      },
      {
        title: "\"선물 추천해줘\" 하면 AI가 직접 물건을 팔아요",
        summary: "Shopify가 ChatGPT, Gemini, Copilot 앱 안에서 직접 상품 판매를 시작했습니다. 사용자가 웹사이트를 방문하지 않아도 AI 대화 안에서 검색→추천→결제가 끝나요.",
        detail: "이건 이커머스의 판도를 바꿀 수 있는 변화예요. 지금까지 쇼핑은 '검색 → 사이트 방문 → 상품 탐색 → 장바구니 → 결제'였죠. 앞으로는 '\"30대 여자 생일선물 추천해줘\" → AI가 3개 추천 → \"두 번째 거 살래\" → 결제 완료'가 됩니다. Shopify 판매자가 별도 개발 없이 AI 앱에 상품을 노출할 수 있어요. 디자이너 관점에서 중요한 건, 기존 웹 쇼핑몰 UI 외에 'AI 대화형 커머스'라는 완전히 새로운 UX 영역이 열렸다는 점이에요.",
        action: "이커머스 UI를 디자인한다면, 대화형 쇼핑 경험이라는 새 영역을 공부해두세요.",
        category: "trend",
        articles: [
          { name: "The AI Marketers", title: "Shopify's Agentic Storefront launch", url: "https://www.theaimarketers.ai/news032626/", ogImage: "https://storage.ghost.io/c/40/b2/40b20fac-3092-4d7d-92de-227ddbaff057/content/images/size/w1200/2026/03/March-26th-hero-n-fr.png" },
        ],
      },
    ],
  },
];
