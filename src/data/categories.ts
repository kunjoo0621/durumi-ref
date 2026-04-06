export interface Site {
  name: string;
  url: string;
  desc: string;
  tags: string[];
  addedAt?: string; // ISO date, e.g. "2026-04-01"
  logoOnly?: boolean; // thumbnail is logo+bg, not a screenshot
}

// Sites added within this many days get a NEW badge
export const NEW_BADGE_DAYS = 14;

export interface Category {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  sites: Site[];
}

export const COLORS = {
  blue: "#0A84FF",
  green: "#30D158",
  indigo: "#5E5CE6",
  orange: "#FF9F0A",
  pink: "#FF375F",
  purple: "#BF5AF2",
  teal: "#64D2FF",
  yellow: "#FFD60A",
  mint: "#63E6E2",
} as const;

export const categories: Category[] = [
  {
    id: "uiux",
    label: "UI/UX",
    shortLabel: "UI/UX",
    color: COLORS.blue,
    sites: [
      { name: "Mobbin", url: "mobbin.com", desc: "해외 모바일·웹 화면 라이브러리", tags: ["해외", "모바일", "웹"] },
      { name: "Godly", url: "godly.website", desc: "인터랙션 중심 웹 디자인 갤러리", tags: ["해외", "인터랙션"] },
      { name: "Refero", url: "refero.design", desc: "기능·상황별 UI 패턴 모음", tags: ["해외", "UI 패턴"] },
      { name: "UIbowl", url: "uibowl.io", desc: "기능별 분류된 국내 웹·모바일 화면 모음", tags: ["국내", "모바일", "웹"] },
      { name: "Lapa Ninja", url: "lapa.ninja", desc: "랜딩페이지 풀페이지 스크린샷 아카이브", tags: ["해외", "랜딩페이지"] },
      { name: "GD웹", url: "gdweb.co.kr", desc: "가장 폭넓은 국내 웹 레퍼런스", tags: ["국내", "웹"] },
      { name: "Landdding", url: "landdding.com", desc: "카테고리별 웹 디자인 영감 갤러리", tags: ["해외", "웹"] },
      { name: "SEESAW", url: "seesaw.website", desc: "최신 트렌드 웹 디자인 모음", tags: ["해외", "트렌드"] },
      { name: "WWIT", url: "wwit.design", desc: "국내 모바일 화면 모음", tags: ["국내", "모바일"] },
      { name: "Minimal Gallery", url: "minimal.gallery", desc: "미니멀 웹 디자인 갤러리", tags: ["해외", "미니멀"] },
      { name: "Appshots", url: "appshots.design", desc: "해외 모바일 화면 모음", tags: ["해외", "모바일"] },
      { name: "DB컷", url: "dbcut.com", desc: "국내 웹 사이트 스크린샷 모음", tags: ["국내", "웹"] },
      { name: "Scrnshts", url: "scrnshts.club", desc: "고퀄리티 UI/UX 레퍼런스 아카이브", tags: ["해외", "UI/UX"], addedAt: "2026-04-04" },
    ],
  },
  {
    id: "system",
    label: "Design System",
    shortLabel: "시스템",
    color: COLORS.orange,
    sites: [
      { name: "Shadcn/ui", url: "ui.shadcn.com", desc: "재사용 가능한 컴포넌트", tags: ["React", "오픈소스"] },
      { name: "Tailwind Plus", url: "tailwindcss.com/plus", desc: "Tailwind 컴포넌트·템플릿 키트", tags: ["Tailwind", "유료"] },
      { name: "Material Design", url: "m3.material.io", desc: "Google의 크로스 플랫폼 디자인 시스템", tags: ["Google", "크로스플랫폼"] },
      { name: "Component Gallery", url: "component.gallery", desc: "디자인 시스템 비교·탐색", tags: ["비교", "컬렉션"] },
      { name: "Design Systems Repo", url: "designsystemsrepo.com", desc: "디자인 시스템 리소스 종합 컬렉션", tags: ["리소스", "컬렉션"] },
    ],
  },
  {
    id: "collateral",
    label: "Collateral",
    shortLabel: "산출물",
    color: COLORS.yellow,
    sites: [
      { name: "Really Good Emails", url: "reallygoodemails.com", desc: "카테고리별 이메일 디자인 갤러리", tags: ["이메일", "갤러리"] },
      { name: "SaaS Email", url: "saasemailtemplates.io", desc: "SaaS 이메일 템플릿 모음", tags: ["이메일", "SaaS"] },
      { name: "Email Love", url: "emaillove.com", desc: "아름다운 이메일 디자인 큐레이션", tags: ["이메일", "큐레이션"] },
    ],
  },
  {
    id: "ai",
    label: "AI",
    shortLabel: "AI",
    color: COLORS.indigo,
    sites: [
      { name: "ChatGPT", url: "chatgpt.com", desc: "OpenAI의 대화형 AI", tags: ["대화", "OpenAI"], addedAt: "2026-04-01" },
      { name: "Claude", url: "claude.ai", desc: "Anthropic의 AI 어시스턴트", tags: ["대화", "Anthropic"], addedAt: "2026-04-01" },
      { name: "Midjourney", url: "midjourney.com", desc: "AI 이미지 생성 도구", tags: ["이미지", "생성"], addedAt: "2026-04-01", logoOnly: true },
      { name: "Galileo AI", url: "galileo.ai", desc: "AI 기반 UI 디자인 생성", tags: ["UI", "디자인"], addedAt: "2026-04-01" },
      { name: "v0", url: "v0.dev", desc: "AI 기반 UI 코드 생성", tags: ["UI", "코드"], addedAt: "2026-04-01" },
      { name: "Cursor", url: "cursor.com", desc: "AI 코딩 에디터", tags: ["코딩", "에디터"], addedAt: "2026-04-01" },
      { name: "Perplexity", url: "perplexity.ai", desc: "AI 검색 엔진", tags: ["검색", "리서치"], addedAt: "2026-04-01" },
      { name: "Runway", url: "runwayml.com", desc: "AI 영상·이미지 생성", tags: ["영상", "생성"], addedAt: "2026-04-01" },
      { name: "There's An AI For That", url: "theresanaiforthat.com", desc: "AI 도구 검색 디렉토리", tags: ["디렉토리", "검색"], addedAt: "2026-04-01" },
      { name: "Lilys AI", url: "lilys.ai/ko", desc: "AI 영상·문서 요약 서비스", tags: ["요약", "생산성"], addedAt: "2026-04-01" },
      { name: "Future Tools", url: "futuretools.io", desc: "AI 도구 큐레이션", tags: ["큐레이션", "트렌드"], addedAt: "2026-04-01" },
    ],
  },
  {
    id: "asset",
    label: "Asset",
    shortLabel: "에셋",
    color: COLORS.teal,
    sites: [
      { name: "Unsplash", url: "unsplash.com", desc: "고퀄리티 무료 사진", tags: ["사진", "무료"] },
      { name: "Pexels", url: "pexels.com", desc: "무료 사진·영상 스톡", tags: ["사진", "영상"] },
      { name: "Freepik", url: "freepik.com", desc: "벡터·사진·PSD 종합 에셋", tags: ["벡터", "종합"], logoOnly: true },
      { name: "unDraw", url: "undraw.co", desc: "컬러 커스터마이징 오픈소스 일러스트", tags: ["일러스트", "오픈소스"] },
      { name: "Coolshapes", url: "coolshap.es", desc: "추상 그라디언트 도형 에셋", tags: ["도형", "그라디언트"] },
      { name: "Shapes Gallery", url: "shapes.gallery", desc: "일러스트 스타일 SVG 도형", tags: ["도형", "SVG"] },
      { name: "Spectrum", url: "spectrums.framer.website", desc: "기본 도형 벡터 리소스", tags: ["도형", "벡터"] },
      { name: "Handy Arrows", url: "handyarrows.com", desc: "프레젠테이션용 화살표·밑줄", tags: ["화살표", "프레젠테이션"] },
      { name: "Framer Updates", url: "framer.com/updates", desc: "트렌디한 폰트·디자인 소스", tags: ["폰트", "소스"], addedAt: "2026-04-04" },
      { name: "Minimal Mockups", url: "minimalmockups.com", desc: "무료 패키징·브랜딩 목업 (PSD)", tags: ["목업", "무료"], addedAt: "2026-04-06" },
      { name: "Creatoom", url: "creatoom.com", desc: "650+ 무료 명함·브랜딩 목업", tags: ["목업", "무료"], addedAt: "2026-04-06" },
      { name: "Pixpine", url: "pixpine.com", desc: "상업 라이선스 무료 패키징 목업", tags: ["목업", "상업용"], addedAt: "2026-04-06" },
      { name: "Mockups-Design", url: "mockups-design.com", desc: "구독 없이 즉시 무료 다운로드 목업", tags: ["목업", "무료"], addedAt: "2026-04-06" },
      { name: "Creatsy", url: "creatsy.com", desc: "극사실적 3D 합성 목업 (일부 유료)", tags: ["목업", "3D"], addedAt: "2026-04-06" },
      { name: "Mockuuups Studio", url: "mockuuups.studio", desc: "앱·웹 디바이스 목업 전문 (일부 유료)", tags: ["목업", "디바이스"], addedAt: "2026-04-06" },
    ],
  },
  {
    id: "icon",
    label: "Icon",
    shortLabel: "아이콘",
    color: COLORS.green,
    sites: [
      { name: "Lucide", url: "lucide.dev", desc: "Feather Icons 기반 커뮤니티 아이콘", tags: ["오픈소스", "React"] },
      { name: "Phosphor Icons", url: "phosphoricons.com", desc: "깔끔한 오픈소스 아이콘 세트", tags: ["오픈소스", "다양한 스타일"] },
      { name: "Heroicons", url: "heroicons.com", desc: "Tailwind CSS 팀의 아이콘", tags: ["Tailwind", "오픈소스"] },
      { name: "Tabler Icons", url: "tabler.io/icons", desc: "6,000개 이상의 무료 아이콘", tags: ["대규모", "오픈소스"] },
      { name: "Iconoir", url: "iconoir.com", desc: "1,500개 이상의 미니멀 SVG 아이콘", tags: ["미니멀", "SVG"] },
      { name: "Remix Icon", url: "remixicon.com", desc: "라인·솔리드 지원 오픈소스 아이콘", tags: ["라인", "솔리드"] },
    ],
  },
  {
    id: "typo",
    label: "Typography",
    shortLabel: "타이포",
    color: COLORS.pink,
    sites: [
      { name: "Google Fonts", url: "fonts.google.com", desc: "무료 웹 폰트 라이브러리", tags: ["무료", "웹폰트"] },
      { name: "Fontshare", url: "fontshare.com", desc: "프리미엄 무료 폰트", tags: ["무료", "프리미엄"] },
      { name: "Fonts In Use", url: "fontsinuse.com", desc: "실제 사용 사례 기반 폰트 아카이브", tags: ["사례", "아카이브"] },
      { name: "눈누", url: "noonnu.cc", desc: "한글 무료 폰트 모음", tags: ["한글", "무료"] },
      { name: "Typewolf", url: "typewolf.com", desc: "실제 사용 사례 기반 폰트 추천", tags: ["추천", "사례"] },
      { name: "Font Squirrel", url: "fontsquirrel.com", desc: "상업용 무료 폰트 + 웹폰트 생성기", tags: ["상업용", "생성기"] },
    ],
  },
  {
    id: "inspiration",
    label: "Inspiration",
    shortLabel: "영감",
    color: COLORS.purple,
    sites: [
      { name: "Dribbble", url: "dribbble.com", desc: "디자이너 포트폴리오·작업물 공유", tags: ["포트폴리오", "커뮤니티"] },
      { name: "Behance", url: "behance.net", desc: "Adobe 기반 크리에이티브 포트폴리오", tags: ["포트폴리오", "Adobe"] },
      { name: "Awwwards", url: "awwwards.com", desc: "수상작 중심 웹 디자인 갤러리", tags: ["어워드", "웹"] },
      { name: "One Page Love", url: "onepagelove.com", desc: "원페이지 웹사이트 전문 큐레이션", tags: ["원페이지", "큐레이션"] },
      { name: "CSS Design Awards", url: "cssdesignawards.com", desc: "웹 디자인 어워드·피드백 플랫폼", tags: ["어워드", "피드백"] },
      { name: "Siteinspire", url: "siteinspire.com", desc: "웹 디자인 영감", tags: ["웹", "큐레이션"] },
      { name: "Savee", url: "savee.com", desc: "비주얼 북마크 플랫폼", tags: ["북마크", "비주얼"] },
      { name: "Mindsparkle Mag", url: "mindsparklemag.com", desc: "프리미엄 디자인 매거진", tags: ["매거진", "프리미엄"] },
      { name: "Framer Gallery", url: "framer.com/gallery", desc: "요즘 감성 웹사이트 레퍼런스", tags: ["웹", "Framer"], addedAt: "2026-04-04" },
      { name: "Curated Supply", url: "curated.supply", desc: "고급스러운 제품 디자인 사례", tags: ["제품", "큐레이션"], addedAt: "2026-04-04" },
    ],
  },
];
