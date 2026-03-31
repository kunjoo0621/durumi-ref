"use client";

import { useState } from "react";
import { categories } from "@/data/categories";
import { ArrowUpRight } from "@phosphor-icons/react";

const site = categories[0].sites[0]; // Mobbin
const catColor = categories[0].color;
const slug = site.url.replace(/[/:]/g, "_");

function Favicon({ domain, size = 14 }: { domain: string; size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-white"
      style={{ width: size, height: size, padding: 1 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`}
        alt="" width={size - 2} height={size - 2} className="rounded-[2px]"
        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
      />
    </span>
  );
}

/* ─── A: Current Design ─── */
function CardA({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      width: 280, height: 430, position: "relative", borderRadius: 16, overflow: "hidden",
      transform: hovered ? "scale(1.03)" : "scale(1)",
      boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.6)" : "0 2px 12px rgba(0,0,0,0.1)",
      transition: "transform 0.4s cubic-bezier(0.22,0.68,0,1), box-shadow 0.4s ease",
    }}>
      <img
        src={`/thumbnails/${slug}.jpg`}
        alt={site.name}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
      />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: catColor, opacity: hovered ? 1 : 0,
        transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
        transition: "opacity 0.3s, transform 0.45s cubic-bezier(0.22,0.68,0,1)",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 24px", zIndex: 4 }}>
        <div className="mb-1 flex items-center gap-2">
          <Favicon domain={site.url} />
          <span className="text-base font-bold text-white" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>{site.name}</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(235,235,245,0.6)", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>{site.desc}</div>
      </div>
    </div>
  );
}

/* ─── B: New Design ─── */
function CardB({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      width: 320, height: 430, borderRadius: 20, overflow: "hidden",
      background: hovered ? "var(--color-gray-5)" : "var(--color-gray-6)",
      transform: hovered ? "translateY(-6px)" : "translateY(0)",
      boxShadow: hovered
        ? "0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)"
        : "0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)",
      transition: "transform 0.35s cubic-bezier(0.22,0.68,0,1), box-shadow 0.4s ease, background 0.3s ease",
      display: "flex", flexDirection: "column",
    }}>
      {/* Thumbnail area */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{
          borderRadius: 12, overflow: "hidden", aspectRatio: "16/10", position: "relative",
          background: "var(--color-gray-4)",
        }}>
          <img
            src={`/thumbnails/${slug}.jpg`}
            alt={site.name}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "auto", objectFit: "cover",
              transform: hovered ? "translateY(-30%)" : "translateY(0)",
              transition: hovered
                ? "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "transform 0.6s ease-out",
            }}
          />
          {/* #1: Noise/grain overlay */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            opacity: 0.06, mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />
          {/* #5: Glass reflection highlight */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
            background: "linear-gradient(165deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 50%)",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.4s ease",
          }} />
          {/* Arrow on hover */}
          <div style={{
            position: "absolute", top: 8, right: 8, zIndex: 4,
            width: 28, height: 28, borderRadius: 8,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.5)",
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <ArrowUpRight size={13} weight="bold" color="white" />
          </div>
        </div>
      </div>

      {/* Info area */}
      <div style={{ padding: "24px 16px 0", flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="flex items-center gap-2.5" style={{ marginBottom: 8 }}>
          {/* #3: Favicon bounce on hover */}
          <div style={{
            transform: hovered ? "scale(1.15)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            display: "flex", alignItems: "center",
          }}>
            <Favicon domain={site.url} size={18} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: "white", letterSpacing: -0.3, lineHeight: 1 }}>{site.name}</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(235,235,245,0.5)", lineHeight: 1.6 }}>{site.desc}</div>
      </div>

      {/* Tags */}
      <div style={{ padding: "0 16px 24px", display: "flex", gap: 6 }}>
        {["해외", "모바일", "웹"].map((tag) => (
          <span key={tag} style={{
            padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 500,
            background: hovered ? "var(--color-gray-3)" : "var(--color-gray-4)",
            color: "rgba(235,235,245,0.5)",
            transition: "background 0.3s",
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function PreviewPage() {
  const [hovA, setHovA] = useState(false);
  const [hovB, setHovB] = useState(false);

  return (
    <div style={{
      minHeight: "100vh", background: "#000", color: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 48, padding: "60px 20px",
      fontFamily: "var(--font-montserrat), var(--font-pretendard), sans-serif",
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: -0.5 }}>Card Design Comparison</h1>

      <div style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: 1, textTransform: "uppercase" }}>A — Current</span>
          <div onMouseEnter={() => setHovA(true)} onMouseLeave={() => setHovA(false)} style={{ cursor: "pointer" }}>
            <CardA hovered={hovA} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: 1, textTransform: "uppercase" }}>B — New</span>
          <div onMouseEnter={() => setHovB(true)} onMouseLeave={() => setHovB(false)} style={{ cursor: "pointer" }}>
            <CardB hovered={hovB} />
          </div>
        </div>
      </div>
    </div>
  );
}
