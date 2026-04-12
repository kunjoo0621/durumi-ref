"use client";

import { useState } from "react";
import { trends, CATEGORY_LABELS, CATEGORY_COLORS, type TrendItem as TrendItemType, type TrendArticle } from "@/data/trends";
import { List, X } from "@phosphor-icons/react";
import CustomCursor from "@/components/CustomCursor";
import SubmitModal from "@/components/SubmitModal";

/* ─── Article Card (surfit style) ─── */
function ArticleCard({ article }: { article: TrendArticle }) {
  const domain = article.url.replace(/https?:\/\//, "").split("/")[0].replace("www.", "");

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="trend-card block shrink-0"
      style={{
        width: 240,
        borderRadius: 14,
        background: "var(--color-gray-5)",
        border: "1px solid var(--glass-border)",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Favicon + source name */}
      <div className="flex items-center gap-2" style={{ padding: "12px 14px 8px" }}>
        <span className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-white" style={{ width: 16, height: 16, padding: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
            alt="" width={14} height={14} className="rounded-[2px]"
            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
          />
        </span>
        <span style={{ fontSize: 11, color: "var(--color-label-3)", fontWeight: 500 }}>
          {article.name}
        </span>
      </div>
      {/* Title */}
      <div style={{
        padding: "0 14px 14px",
        fontSize: 13, fontWeight: 600, color: "var(--color-label)",
        lineHeight: 1.5, letterSpacing: -0.1,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
      }}>
        {article.title}
      </div>
    </a>
  );
}

/* ─── Single Trend Item ─── */
function TrendItem({ item }: { item: TrendItemType }) {
  const color = CATEGORY_COLORS[item.category];
  const label = CATEGORY_LABELS[item.category];
  const link = item.articles.length > 0 ? item.articles[0].url : undefined;

  return (
    <>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="trend-card group block"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* OG Image — full width, big */}
      {item.ogImage && (
        <div style={{
          borderRadius: 14, overflow: "hidden",
          aspectRatio: "2.2/1", position: "relative",
          background: "var(--color-gray-5)", marginBottom: 20,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.ogImage}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.4s var(--ease-smooth)",
            }}
            className="group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Category pill */}
      <div className="mb-3 flex items-center gap-2">
        <span style={{
          padding: "4px 10px", borderRadius: 999,
          fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
          background: `${color}12`, color: color,
        }}>
          {label}
        </span>
        {item.articles.length > 0 && (
          <span style={{ fontSize: 11, color: "var(--color-label-3)" }}>
            {item.articles[0].name}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 20, fontWeight: 700,
        color: "var(--color-label)",
        lineHeight: 1.45, marginBottom: 10, letterSpacing: -0.3,
      }}>
        {item.title}
      </h3>

      {/* Summary */}
      <p style={{
        fontSize: 15, color: "var(--color-label-2)",
        lineHeight: 1.8, marginBottom: 16, wordBreak: "keep-all",
      }}>
        {item.summary}
      </p>

      {/* Action */}
      <div style={{
        fontSize: 14, color: color, fontWeight: 500,
        lineHeight: 1.6, padding: "12px 0",
        borderTop: `1px solid ${color}15`,
      }}>
        → {item.action}
      </div>
    </a>

    {/* Related articles — surfit style cards */}
    {item.articles.length > 0 && (
      <div style={{ marginTop: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-label-3)", marginBottom: 10, display: "block" }}>
          관련 아티클
        </span>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar" style={{ paddingBottom: 4 }}>
          {item.articles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      </div>
    )}
    </>
  );
}

/* ─── Week Section ─── */
function WeekSection({ week, isLatest, index }: { week: typeof trends[0]; isLatest: boolean; index: number }) {
  const dateObj = new Date(week.date);

  return (
    <section style={{
      animation: "fade-up 0.5s cubic-bezier(.16,1,.3,1) backwards",
      animationDelay: `${index * 100}ms`,
    }}>
      {/* Week header — Linear style: left date, right title */}
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <span style={{
            fontSize: 14, fontWeight: 700,
            color: isLatest ? "#0A84FF" : "var(--color-label-3)",
          }}>
            {dateObj.getFullYear()}년 {dateObj.getMonth() + 1}월 {week.weekNumber}주
          </span>
          {isLatest && (
            <span style={{
              padding: "3px 8px", borderRadius: 999,
              fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
              background: "rgba(10,132,255,0.12)", color: "#0A84FF",
            }}>
              NEW
            </span>
          )}
        </div>
        <h2 style={{
          fontSize: 28, fontWeight: 800,
          color: "var(--color-label)",
          margin: 0, letterSpacing: -0.8, lineHeight: 1.3,
        }}>
          {week.title}
        </h2>
      </div>

      {/* Items — vertical feed */}
      <div className="flex flex-col gap-12">
        {week.items.map((item) => (
          <TrendItem key={item.title} item={item} />
        ))}
      </div>
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
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(10,132,255,0.06) 0%, transparent 70%)",
      }} />

      {/* ─── Header ─── */}
      <header className="safe-top sticky top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 sm:px-8 sm:py-4" style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}>
        <a href="/" className="flex items-center gap-2 justify-self-start" style={{ textDecoration: "none" }}>
          <img src="/logo.svg" alt="Durumi Ref" width={28} height={28} className="rounded-md sm:size-8" />
          <span className="hidden text-[15px] font-bold tracking-tight text-white sm:block sm:text-[17px]">Durumi Ref</span>
        </a>
        <nav className="hidden items-center justify-center sm:flex">
          <div className="flex items-center gap-1" style={{
            padding: "4px", background: "var(--glass-bg)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
            borderRadius: 999, border: "1px solid var(--glass-border)",
          }}>
            {[
              { label: "Ref", href: "/", active: false },
              { label: "Trends", href: "/trends", active: true },
              { label: "Extract", href: "/extract", active: false },
            ].map((item) => (
              <a key={item.label} href={item.href} className="header-btn" style={{
                padding: "6px 16px", borderRadius: 999, fontSize: 13,
                fontWeight: item.active ? 600 : 400,
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
              padding: "8px 18px", borderRadius: 999, background: "var(--color-label)", color: "var(--color-bg)",
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
            }}>사이트 제보</button>
          </nav>
        </div>
      )}

      {/* ─── Content ─── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 160px" }}>
        {/* Hero intro */}
        <div style={{ marginBottom: 72 }}>
          <p style={{
            fontSize: 14, fontWeight: 600, color: "#0A84FF",
            letterSpacing: 0.5, marginBottom: 12,
          }}>
            WEEKLY DIGEST
          </p>
          <h1 style={{
            fontSize: 36, fontWeight: 800,
            letterSpacing: -1, lineHeight: 1.2, marginBottom: 16,
          }}>
            디자이너를 위한<br />AI 트렌드
          </h1>
          <p style={{
            fontSize: 16, color: "var(--color-label-3)",
            lineHeight: 1.7, maxWidth: 440,
          }}>
            매주 AI와 디자인의 변화를 정리합니다.
            놓치면 안 되는 것만, 디자이너 관점으로.
          </p>
        </div>

        {/* Weekly sections */}
        <div className="flex flex-col" style={{ gap: 80 }}>
          {trends.map((week, i) => (
            <WeekSection key={week.date} week={week} isLatest={i === 0} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
