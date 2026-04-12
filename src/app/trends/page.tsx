"use client";

import { useState } from "react";
import { trends, CATEGORY_LABELS, CATEGORY_COLORS, type TrendItem } from "@/data/trends";
import { CaretDown, List, X } from "@phosphor-icons/react";
import CustomCursor from "@/components/CustomCursor";
import SubmitModal from "@/components/SubmitModal";

/* ─── Trend Item ─── */
function TrendItemCard({ item, index, total }: { item: TrendItem; index: number; total: number }) {
  const color = CATEGORY_COLORS[item.category];
  const label = CATEGORY_LABELS[item.category];
  const isLast = index === total - 1;

  return (
    <a
      href={item.sources.length > 0 ? item.sources[0].url : "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="trend-card block"
      style={{
        paddingBottom: isLast ? 0 : 28,
        marginBottom: isLast ? 0 : 28,
        borderBottom: isLast ? "none" : "1px solid var(--glass-border)",
        animation: "fade-up 0.4s cubic-bezier(.16,1,.3,1) backwards",
        animationDelay: `${index * 80}ms`,
        textDecoration: "none", color: "inherit",
      }}
    >
      <div className="flex gap-4">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mb-3 flex items-center gap-2">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: color, letterSpacing: 0.3 }}>
              {label}
            </span>
          </div>

          <h3 style={{
            fontSize: 17, fontWeight: 700,
            color: "var(--color-label)",
            lineHeight: 1.5, marginBottom: 10, letterSpacing: -0.2,
          }}>
            {item.title}
          </h3>

          <p style={{
            fontSize: 14, color: "var(--color-label-2)",
            lineHeight: 1.8, marginBottom: 0, wordBreak: "keep-all",
          }}>
            {item.summary}
          </p>
        </div>

        {item.ogImage && (
          <div className="hidden shrink-0 sm:block" style={{
            width: 160, height: 100, borderRadius: 10, overflow: "hidden",
            background: "var(--color-gray-6)", marginTop: 24,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.ogImage}
              alt={item.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      <p style={{
        fontSize: 13, color: color,
        lineHeight: 1.7, marginTop: 12, marginBottom: 0, fontWeight: 500,
      }}>
        → {item.action}
      </p>

      {item.sources.length > 0 && (
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "var(--color-label-3)" }}>출처</span>
          {item.sources.map((s, i) => (
            <span key={s.url} className="flex items-center">
              {i > 0 && <span style={{ fontSize: 11, color: "var(--color-gray-3)", margin: "0 2px" }}>·</span>}
              <span style={{ fontSize: 11, color: "var(--color-label-3)", padding: "2px 4px" }}>
                {s.name}
              </span>
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

/* ─── Week Section ─── */
function WeekSection({ week, isLatest }: { week: typeof trends[0]; isLatest: boolean }) {
  const [expanded, setExpanded] = useState(isLatest);
  const dateObj = new Date(week.date);

  return (
    <section className="trend-card" style={{
      marginBottom: 24,
      borderRadius: 20,
      background: "var(--color-gray-6)",
      border: "1px solid var(--glass-border)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mobile-nav-link flex w-full items-center justify-between border-none"
        style={{
          padding: "24px 28px",
          background: "transparent",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mb-2 flex items-center gap-2">
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: isLatest ? "#0A84FF" : "var(--color-label-3)",
            }}>
              {dateObj.getFullYear()}년 {dateObj.getMonth() + 1}월 {week.weekNumber}주
            </span>
            {isLatest && (
              <span style={{
                padding: "2px 8px", borderRadius: 999,
                fontSize: 10, fontWeight: 600,
                background: "rgba(10,132,255,0.15)", color: "#0A84FF",
              }}>
                NEW
              </span>
            )}
          </div>
          <h2 style={{
            fontSize: 17,
            fontWeight: 700,
            color: "var(--color-label)",
            margin: 0, letterSpacing: -0.3, lineHeight: 1.45,
          }}>
            {week.title}
          </h2>
          <span style={{
            fontSize: 12, color: "var(--color-label-3)",
            marginTop: 8, display: "flex", alignItems: "center", gap: 6,
          }}>
            {week.readTime} 읽기
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--color-gray-3)" }} />
            {week.items.length}개 토픽
          </span>
        </div>
        <CaretDown
          size={18} weight="bold" color="var(--color-label-3)"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.25s var(--ease-smooth)",
            flexShrink: 0, marginLeft: 16,
          }}
        />
      </button>

      {/* Items */}
      {expanded && (
        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ height: 1, background: "var(--glass-border)", marginBottom: 28 }} />
          {week.items.map((item, i) => (
            <TrendItemCard key={item.title} item={item} index={i} total={week.items.length} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ═══ TRENDS PAGE ═══ */
export default function TrendsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--color-bg)",
      color: "var(--color-label)",
      overflow: "auto",
      position: "fixed",
      inset: 0,
    }}>
      <CustomCursor color="#0A84FF" />
      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10" style={{
        height: "50%",
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(10,132,255,0.08) 0%, transparent 70%)",
      }} />

      {/* ─── Header ─── */}
      <header className="safe-top sticky top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 sm:px-8 sm:py-4" style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}>
        <a href="/" className="flex items-center gap-2 justify-self-start" style={{ textDecoration: "none" }}>
          <img src="/logo.svg" alt="Durumi Ref" width={28} height={28} className="rounded-md sm:size-8" />
          <span className="hidden text-[15px] font-bold tracking-tight text-white sm:block sm:text-[17px]">
            Durumi Ref
          </span>
        </a>

        <nav className="hidden items-center justify-center sm:flex">
          <div className="flex items-center gap-1" style={{
            padding: "4px",
            background: "var(--glass-bg)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            borderRadius: 999,
            border: "1px solid var(--glass-border)",
          }}>
            {[
              { label: "Ref", href: "/", active: false },
              { label: "Trends", href: "/trends", active: true },
              { label: "Extract", href: "/extract", active: false },
            ].map((item) => (
              <a key={item.label} href={item.href} className="header-btn" style={{
                padding: "6px 16px", borderRadius: 999,
                fontSize: 13, fontWeight: item.active ? 600 : 400,
                color: item.active ? "var(--color-label)" : "var(--color-label-3)",
                background: item.active ? "var(--color-gray-4)" : "transparent",
                textDecoration: "none",
              }}>{item.label}</a>
            ))}
          </div>
        </nav>

        <div className="flex items-center justify-self-end gap-2 sm:gap-3">
          <button onClick={() => setMobileNavOpen(true)} aria-label="메뉴"
            className="header-btn flex min-h-[44px] min-w-[44px] items-center justify-center border-none sm:hidden"
            style={{ background: "transparent", cursor: "pointer" }}>
            <List size={22} weight="bold" color="var(--color-label)" />
          </button>
          <div className="relative hidden sm:block">
            <button onClick={() => setSubmitOpen(true)} className="header-btn-submit shrink-0 border-none" style={{
              padding: "8px 18px", borderRadius: 999,
              background: "var(--color-label)", color: "var(--color-bg)",
              fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
            }}>제보</button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center sm:hidden" style={{
          background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        }}>
          <button onClick={() => setMobileNavOpen(false)}
            className="absolute right-5 top-5 flex size-10 items-center justify-center border-none"
            style={{ background: "transparent", cursor: "pointer" }} aria-label="닫기">
            <X size={24} weight="bold" color="var(--color-label)" />
          </button>
          <nav className="flex flex-col items-center gap-3">
            {[
              { label: "Ref", href: "/", active: false },
              { label: "Trends", href: "/trends", active: true },
              { label: "Extract", href: "/extract", active: false },
            ].map((item, i) => (
              <a key={item.label} href={item.href} className="mobile-nav-link" style={{
                fontSize: 24, fontWeight: item.active ? 700 : 500,
                color: item.active ? "var(--color-label)" : "var(--color-label-2)",
                textDecoration: "none", padding: "12px 32px", borderRadius: 16,
                background: item.active ? "rgba(255,255,255,0.06)" : "transparent",
                animation: "fade-up 0.3s cubic-bezier(.16,1,.3,1) backwards",
                animationDelay: `${i * 50}ms`,
              }}>{item.label}</a>
            ))}
            <div style={{ width: 40, height: 1, background: "var(--color-gray-3)", opacity: 0.3, margin: "8px 0" }} />
            <button onClick={() => { setMobileNavOpen(false); setSubmitOpen(true); }} className="mobile-nav-link" style={{
              fontSize: 18, fontWeight: 500, color: "var(--color-label-2)",
              padding: "12px 32px", borderRadius: 16, background: "transparent",
              border: "none", cursor: "pointer", fontFamily: "inherit",
              animation: "fade-up 0.3s cubic-bezier(.16,1,.3,1) backwards", animationDelay: "200ms",
            }}>사이트 제보</button>
          </nav>
        </div>
      )}

      {/* ─── Content ─── */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px 140px" }}>
        {/* Page intro */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{
            fontSize: 28, fontWeight: 800,
            letterSpacing: -0.8, lineHeight: 1.3, marginBottom: 8,
          }}>
            Trends
          </h1>
          <p style={{
            fontSize: 15, color: "var(--color-label-3)",
            lineHeight: 1.7,
          }}>
            AI와 디자인의 변화를 매주 정리합니다.
            <br />
            디자이너가 놓치면 안 되는 것만 담았어요.
          </p>
        </div>

        {trends.map((week, i) => (
          <WeekSection key={week.date} week={week} isLatest={i === 0} />
        ))}
      </div>
    </div>
  );
}
