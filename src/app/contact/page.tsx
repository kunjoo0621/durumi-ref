import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Durumi Ref 운영자에게 사이트 제보, 협업 제안, 오류 신고를 보내는 방법을 안내합니다.",
  alternates: { canonical: "https://durumiref.com/contact" },
};

export default function ContactPage() {
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
          <a href="/about" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            About
          </a>
        </nav>
      </header>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 160px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#0A84FF", letterSpacing: 0.5, marginBottom: 12 }}>
          CONTACT
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.2, marginBottom: 24 }}>
          편하게 연락 주세요
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "var(--color-label-2)",
            lineHeight: 1.85,
            wordBreak: "keep-all",
            marginBottom: 40,
          }}
        >
          Durumi Ref는 디자이너 한 명이 운영하는 사이드 프로젝트입니다. 사이트 제보, 큐레이션
          오류 신고, 협업 제안, 인터뷰 요청 등 어떤 종류의 메시지든 환영합니다. 가능하면 영업일
          기준 7일 이내에 회신드리며, 문의 성격에 따라 더 길어질 수도 있는 점 양해 부탁드립니다.
        </p>

        <section
          style={{
            background: "var(--color-gray-6)",
            border: "1px solid var(--glass-border)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
          }}
        >
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--color-label-3)", marginBottom: 8, letterSpacing: 0.5 }}>
            EMAIL
          </h2>
          <a
            href="mailto:kunjoo0621@gmail.com"
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0A84FF",
              textDecoration: "none",
              wordBreak: "break-all",
            }}
          >
            kunjoo0621@gmail.com
          </a>
          <p
            style={{
              fontSize: 13,
              color: "var(--color-label-3)",
              marginTop: 12,
              lineHeight: 1.7,
            }}
          >
            제목에 [Durumi Ref]를 적어 주시면 더 빠르게 확인할 수 있습니다.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-label)", marginBottom: 12, letterSpacing: -0.3 }}>
            사이트 제보
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-label-2)",
              lineHeight: 1.8,
              wordBreak: "keep-all",
              marginBottom: 12,
            }}
          >
            추천하고 싶은 디자인 레퍼런스 사이트, 트렌드, AI 도구가 있다면 메인 페이지 우측 상단의
            <strong> 제보 </strong>
            버튼이나 위 이메일로 보내주세요. 다음 정보를 함께 적어 주시면 검토가 빠릅니다.
          </p>
          <ul
            style={{
              fontSize: 15,
              color: "var(--color-label-2)",
              lineHeight: 1.8,
              paddingLeft: 18,
              wordBreak: "keep-all",
            }}
          >
            <li style={{ marginBottom: 6 }}>사이트 이름과 URL</li>
            <li style={{ marginBottom: 6 }}>한 줄 소개 (어떤 종류의 레퍼런스인지)</li>
            <li style={{ marginBottom: 6 }}>추천 사유 (실제 사용 경험이 있다면 더 좋습니다)</li>
            <li style={{ marginBottom: 6 }}>가능한 경우 카테고리(예: UI 갤러리, 무료 폰트, 데이터 시각화 등)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-label)", marginBottom: 12, letterSpacing: -0.3 }}>
            오류 / 끊긴 링크 신고
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-label-2)",
              lineHeight: 1.8,
              wordBreak: "keep-all",
            }}
          >
            깨진 링크, 잘못된 설명, 오래된 트렌드 정보 등을 발견하시면 페이지 URL과 함께 메일로
            알려주세요. 가능한 한 빠르게 수정·갱신합니다.
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
          <a href="/about" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            소개
          </a>
          <a href="/privacy" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            개인정보처리방침
          </a>
        </section>
      </main>
    </div>
  );
}
