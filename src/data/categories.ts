export interface Site {
  name: string;
  url: string;
  desc: string;
}

export interface Category {
  id: string;
  label: string;
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
    color: COLORS.blue,
    sites: [
      { name: "Mobbin", url: "mobbin.com", desc: "해외 모바일·웹 화면 라이브러리" },
      { name: "Godly", url: "godly.website", desc: "인터랙션 중심 웹 디자인 갤러리" },
      { name: "Refero", url: "refero.design", desc: "기능·상황별 UI 패턴 모음" },
      { name: "UIbowl", url: "uibowl.io", desc: "기능별 분류된 국내 웹·모바일 화면 모음" },
      { name: "Lapa Ninja", url: "lapa.ninja", desc: "랜딩페이지 풀페이지 스크린샷 아카이브" },
      { name: "GD웹", url: "gdweb.co.kr", desc: "가장 폭넓은 국내 웹 레퍼런스" },
      { name: "Landdding", url: "landdding.com", desc: "카테고리별 웹 디자인 영감 갤러리" },
      { name: "SEESAW", url: "seesaw.website", desc: "최신 트렌드 웹 디자인 모음" },
      { name: "WWIT", url: "wwit.design", desc: "국내 모바일 화면 모음" },
      { name: "Minimal Gallery", url: "minimal.gallery", desc: "미니멀 웹 디자인 갤러리" },
      { name: "Appshots", url: "appshots.design", desc: "해외 모바일 화면 모음" },
      { name: "DB컷", url: "dbcut.com", desc: "국내 웹 사이트 스크린샷 모음" },
    ],
  },
  {
    id: "system",
    label: "Design System",
    color: COLORS.orange,
    sites: [
      { name: "Shadcn/ui", url: "ui.shadcn.com", desc: "재사용 가능한 컴포넌트" },
      { name: "Tailwind Plus", url: "tailwindcss.com/plus", desc: "Tailwind 컴포넌트·템플릿 키트" },
      { name: "Material Design", url: "m3.material.io", desc: "Google의 크로스 플랫폼 디자인 시스템" },
      { name: "Component Gallery", url: "component.gallery", desc: "디자인 시스템 비교·탐색" },
      { name: "Design Systems Repo", url: "designsystemsrepo.com", desc: "디자인 시스템 리소스 종합 컬렉션" },
    ],
  },
  {
    id: "collateral",
    label: "Collateral",
    color: COLORS.yellow,
    sites: [
      { name: "Really Good Emails", url: "reallygoodemails.com", desc: "카테고리별 이메일 디자인 갤러리" },
      { name: "SaaS Email", url: "saasemailtemplates.io", desc: "SaaS 이메일 템플릿 모음" },
      { name: "Email Love", url: "emaillove.com", desc: "아름다운 이메일 디자인 큐레이션" },
    ],
  },
  {
    id: "asset",
    label: "Asset",
    color: COLORS.teal,
    sites: [
      { name: "Unsplash", url: "unsplash.com", desc: "고퀄리티 무료 사진" },
      { name: "Pexels", url: "pexels.com", desc: "무료 사진·영상 스톡" },
      { name: "Freepik", url: "freepik.com", desc: "벡터·사진·PSD 종합 에셋" },
      { name: "unDraw", url: "undraw.co", desc: "컬러 커스터마이징 오픈소스 일러스트" },
      { name: "Coolshapes", url: "coolshap.es", desc: "추상 그라디언트 도형 에셋" },
      { name: "Shapes Gallery", url: "shapes.gallery", desc: "일러스트 스타일 SVG 도형" },
      { name: "Spectrum", url: "spectrums.framer.website", desc: "기본 도형 벡터 리소스" },
      { name: "Handy Arrows", url: "handyarrows.com", desc: "프레젠테이션용 화살표·밑줄" },
    ],
  },
  {
    id: "icon",
    label: "Icon",
    color: COLORS.green,
    sites: [
      { name: "Lucide", url: "lucide.dev", desc: "Feather Icons 기반 커뮤니티 아이콘" },
      { name: "Phosphor Icons", url: "phosphoricons.com", desc: "깔끔한 오픈소스 아이콘 세트" },
      { name: "Heroicons", url: "heroicons.com", desc: "Tailwind CSS 팀의 아이콘" },
      { name: "Tabler Icons", url: "tabler.io/icons", desc: "6,000개 이상의 무료 아이콘" },
      { name: "Iconoir", url: "iconoir.com", desc: "1,500개 이상의 미니멀 SVG 아이콘" },
      { name: "Remix Icon", url: "remixicon.com", desc: "라인·솔리드 지원 오픈소스 아이콘" },
    ],
  },
  {
    id: "typo",
    label: "Typography",
    color: COLORS.pink,
    sites: [
      { name: "Google Fonts", url: "fonts.google.com", desc: "무료 웹 폰트 라이브러리" },
      { name: "Fontshare", url: "fontshare.com", desc: "프리미엄 무료 폰트" },
      { name: "Fonts In Use", url: "fontsinuse.com", desc: "실제 사용 사례 기반 폰트 아카이브" },
      { name: "눈누", url: "noonnu.cc", desc: "한글 무료 폰트 모음" },
      { name: "Typewolf", url: "typewolf.com", desc: "실제 사용 사례 기반 폰트 추천" },
      { name: "Font Squirrel", url: "fontsquirrel.com", desc: "상업용 무료 폰트 + 웹폰트 생성기" },
    ],
  },
  {
    id: "inspiration",
    label: "Inspiration",
    color: COLORS.purple,
    sites: [
      { name: "Dribbble", url: "dribbble.com", desc: "디자이너 포트폴리오·작업물 공유" },
      { name: "Behance", url: "behance.net", desc: "Adobe 기반 크리에이티브 포트폴리오" },
      { name: "Awwwards", url: "awwwards.com", desc: "수상작 중심 웹 디자인 갤러리" },
      { name: "One Page Love", url: "onepagelove.com", desc: "원페이지 웹사이트 전문 큐레이션" },
      { name: "CSS Design Awards", url: "cssdesignawards.com", desc: "웹 디자인 어워드·피드백 플랫폼" },
      { name: "Siteinspire", url: "siteinspire.com", desc: "웹 디자인 영감" },
      { name: "Savee", url: "savee.com", desc: "비주얼 북마크 플랫폼" },
      { name: "Mindsparkle Mag", url: "mindsparklemag.com", desc: "프리미엄 디자인 매거진" },
    ],
  },
];
