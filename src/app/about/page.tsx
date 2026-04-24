import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "Durumi Ref는 디자이너가 자주 보는 레퍼런스 사이트, AI 도구, 디자인 트렌드를 한곳에서 큐레이션하는 사이트입니다. 운영자, 큐레이션 기준, 업데이트 주기를 안내합니다.",
  alternates: { canonical: "https://durumiref.com/about" },
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg)",
        color: "var(--color-label)",
        overflow: "auto",
        position: "fixed",
        inset: 0,
      }}
    >
      <div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10"
        style={{
          height: "50%",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(10,132,255,0.06) 0%, transparent 70%)",
        }}
      />

      <header
        className="safe-top sticky top-0 z-10 flex items-center justify-between px-5 py-3 sm:px-8 sm:py-4"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <a href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Durumi Ref" width={28} height={28} className="rounded-md sm:size-8" />
          <span className="hidden text-[15px] font-bold tracking-tight text-white sm:block sm:text-[17px]">
            Durumi Ref
          </span>
        </a>
        <nav className="flex items-center gap-4 text-sm" style={{ color: "var(--color-label-3)" }}>
          <a href="/" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            Ref
          </a>
          <a href="/trends" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            Trends
          </a>
          <a href="/about" style={{ color: "var(--color-label)", textDecoration: "none", fontWeight: 600 }}>
            About
          </a>
        </nav>
      </header>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 160px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#0A84FF", letterSpacing: 0.5, marginBottom: 12 }}>
          ABOUT
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.2, marginBottom: 24 }}>
          디자이너에게 필요한 레퍼런스를<br />한곳에 모읍니다
        </h1>

        <section
          style={{
            fontSize: 16,
            color: "var(--color-label-2)",
            lineHeight: 1.85,
            wordBreak: "keep-all",
            marginBottom: 40,
          }}
        >
          <p style={{ marginBottom: 16 }}>
            Durumi Ref(durumiref.com)는 1인 프로덕트 디자이너가 매주 직접 검토한 디자인
            레퍼런스 사이트, AI 도구, 워크플로우 트렌드를 정리해 공개하는 큐레이션 사이트입니다.
            정보가 넘쳐나는 시대에 "지금 디자이너에게 진짜 의미 있는 것"만 골라내는 것을
            목표로 합니다.
          </p>
          <p style={{ marginBottom: 16 }}>
            UI/UX 갤러리, 디자인 시스템, 무료 아이콘과 폰트, 데이터 시각화, 모바일 앱 패턴,
            영상 레퍼런스, AI 디자인 도구까지 — 디자이너의 일상 작업에 자주 쓰이는 카테고리를
            한 화면에서 빠르게 탐색할 수 있도록 구성했습니다. 모든 레퍼런스는 운영자가 실제로
            사용해 보고 추천 사유를 함께 적은 것만 등록합니다.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-label)", marginBottom: 12, letterSpacing: -0.3 }}>
            큐레이션 기준
          </h2>
          <ul
            style={{
              fontSize: 15,
              color: "var(--color-label-2)",
              lineHeight: 1.8,
              wordBreak: "keep-all",
              paddingLeft: 18,
            }}
          >
            <li style={{ marginBottom: 6 }}>실무에서 한 번 이상 직접 사용해 본 도구·사이트</li>
            <li style={{ marginBottom: 6 }}>한국 디자이너 환경(한글 타이포, 모바일 비중)에 잘 맞는 자료 우선</li>
            <li style={{ marginBottom: 6 }}>광고성 또는 일회성 화제보다 1년 뒤에도 가치 있을 자료</li>
            <li style={{ marginBottom: 6 }}>AI 트렌드는 1차 출처(공식 블로그, 릴리즈 노트)를 검증한 항목만</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-label)", marginBottom: 12, letterSpacing: -0.3 }}>
            업데이트 주기
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-label-2)",
              lineHeight: 1.8,
              wordBreak: "keep-all",
            }}
          >
            레퍼런스 사이트 카탈로그는 비정기적으로 추가·정리됩니다. AI/디자인 트렌드는
            매주 한 번 새 주차로 업로드되며, 가장 최근 주차에는 NEW 라벨이 표시됩니다.
            전 주차의 트렌드도 인사이트가 휘발되지 않도록 그대로 보존합니다.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-label)", marginBottom: 12, letterSpacing: -0.3 }}>
            운영자
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-label-2)",
              lineHeight: 1.8,
              wordBreak: "keep-all",
            }}
          >
            프로덕트 디자이너가 1인 프로젝트로 운영합니다. 디자인 시스템, AI 자동화 워크플로우,
            한국 시장 특화 디자인 도구에 관심이 많으며 같은 분야의 동료 디자이너를 우선 독자로 두고
            글과 큐레이션을 정리합니다. 사이트 제보·피드백·문의는 <a href="/contact" style={{ color: "#0A84FF", textDecoration: "none" }}>Contact</a> 페이지를
            통해 받습니다.
          </p>
        </section>

        <section
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--glass-border)",
            display: "flex",
            gap: 16,
            fontSize: 13,
            color: "var(--color-label-3)",
          }}
        >
          <a href="/privacy" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            개인정보처리방침
          </a>
          <a href="/contact" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            Contact
          </a>
        </section>
      </main>
    </div>
  );
}
