import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Durumi Ref(durumiref.com)의 개인정보 수집·이용·보관·제3자 제공·쿠키 사용에 대한 안내입니다.",
  alternates: { canonical: "https://durumiref.com/privacy" },
};

export default function PrivacyPage() {
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

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 160px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#0A84FF", letterSpacing: 0.5, marginBottom: 12 }}>
          PRIVACY POLICY
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.8, lineHeight: 1.2, marginBottom: 8 }}>
          개인정보처리방침
        </h1>
        <p style={{ fontSize: 13, color: "var(--color-label-3)", marginBottom: 32 }}>
          시행일: 2026-04-24 · 최종 수정: 2026-04-24
        </p>

        <Section title="1. 수집하는 개인정보 항목">
          Durumi Ref는 회원 가입 절차가 없으며, 일반적인 사이트 탐색을 위해 별도의 개인정보를
          요구하지 않습니다. 다만 사용자가 자발적으로 작성하는 사이트 제보 양식을 제출할 경우
          제보자의 이름(닉네임), 이메일 주소, 추천 사이트 URL 및 메모가 수집될 수 있습니다.
          이메일은 제보 회신과 검토 결과 공유 목적으로만 사용됩니다.
        </Section>

        <Section title="2. 수집 및 이용 목적">
          수집된 정보는 (1) 제보된 사이트의 적합성 검토, (2) 검토 결과 회신, (3) 향후 큐레이션
          품질 개선을 위한 통계 분석에 사용됩니다. 사용자가 명시적으로 동의한 경우에 한해
          신규 큐레이션 알림 이메일을 발송할 수 있으며, 이외의 마케팅 활용은 일체 하지 않습니다.
        </Section>

        <Section title="3. 보관 및 폐기">
          제보 데이터는 검토 완료 후 12개월 동안 보관되며, 이후 자동 폐기됩니다. 사용자가
          삭제를 요청하는 경우 즉시 파기합니다. 백업본을 포함한 모든 저장소에서 복구 불가능한
          방식으로 폐기합니다.
        </Section>

        <Section title="4. 제3자 제공">
          Durumi Ref는 사용자가 제출한 개인정보를 외부에 제공·판매·공유하지 않습니다.
          단, 법령에 따라 수사기관의 적법한 요청이 있는 경우에 한해 관련 절차를 따라 제공할 수 있습니다.
        </Section>

        <Section title="5. 쿠키 및 광고">
          본 사이트는 사용자 경험 향상과 트래픽 분석, 광고 노출을 위해 다음의 제3자 서비스를 이용합니다.
        </Section>
        <ul
          style={{
            fontSize: 15,
            color: "var(--color-label-2)",
            lineHeight: 1.8,
            paddingLeft: 18,
            marginBottom: 32,
            wordBreak: "keep-all",
          }}
        >
          <li style={{ marginBottom: 6 }}>
            <strong>Google AdSense</strong> — 광고 게재를 위해 쿠키와 광고 식별자를 사용할 수 있습니다.
            사용자는 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0A84FF", textDecoration: "none" }}>Google 광고 설정</a>에서
            맞춤 광고를 끌 수 있습니다.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>Google s2/favicons</strong> — 외부 사이트 파비콘 표시 목적으로 호출됩니다.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>웹 폰트(Pretendard, Montserrat)</strong> — 폰트 로드 외 사용자 식별 정보를 수집하지 않습니다.
          </li>
        </ul>

        <Section title="6. 사용자의 권리">
          사용자는 언제든 자신이 제출한 정보의 열람·정정·삭제를 요청할 수 있으며, 동의 철회를
          통해 이메일 수신을 중단할 수 있습니다. 요청은 아래 연락처를 통해 접수됩니다.
        </Section>

        <Section title="7. 정책 변경">
          본 방침은 관련 법령이나 운영 정책 변경에 따라 개정될 수 있으며, 변경 시 본 페이지에
          최종 수정일과 함께 공지합니다. 중요한 변경의 경우 사이트 메인 화면에 별도 안내합니다.
        </Section>

        <Section title="8. 문의처">
          개인정보 관련 문의는 <a href="mailto:kunjoo0621@gmail.com" style={{ color: "#0A84FF", textDecoration: "none" }}>kunjoo0621@gmail.com</a>으로
          보내주시기 바랍니다. 영업일 기준 7일 이내에 회신드립니다.
        </Section>

        <section
          style={{
            paddingTop: 24,
            marginTop: 16,
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
          <a href="/contact" style={{ color: "var(--color-label-3)", textDecoration: "none" }}>
            Contact
          </a>
        </section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "var(--color-label)",
          marginBottom: 8,
          letterSpacing: -0.2,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "var(--color-label-2)",
          lineHeight: 1.8,
          wordBreak: "keep-all",
        }}
      >
        {children}
      </p>
    </section>
  );
}
