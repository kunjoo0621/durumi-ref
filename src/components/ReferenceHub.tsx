"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import { categories, type Site, type Category } from "@/data/categories";
import {
  Layout,
  SquaresFour,
  Diamond,
  Star,
  TextAa,
  Lightbulb,
  Megaphone,
  Plus,
  Rows,
  GridFour,
  ArrowUpRight,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";
import CustomCursor from "./CustomCursor";
import SubmitModal from "./SubmitModal";

const CATEGORY_ICONS: Record<string, ComponentType<{ size?: number; weight?: "regular" | "fill" | "bold" }>> = {
  uiux: Layout,
  system: SquaresFour,
  collateral: Megaphone,
  asset: Diamond,
  icon: Star,
  typo: TextAa,
  inspiration: Lightbulb,
};

/* ─── Favicon ─── */
function Favicon({ domain, size = 14, className = "" }: { domain: string; size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[3px] bg-white ${className}`}
      style={{ width: size, height: size, padding: 1 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`}
        alt="" width={size - 2} height={size - 2}
        className="rounded-[2px]"
        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
      />
    </span>
  );
}

/* ─── OG Thumbnail ─── */
const OGThumb = memo(function OGThumb({ site, isHovered = false, variant = "mobile" }: { site: Site; isHovered?: boolean; variant?: "mobile" | "desktop" }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [srcIdx, setSrcIdx] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slug = site.url.replace(/[/:]/g, "_");
  const localPath = variant === "desktop"
    ? `/thumbnails/${slug}_desktop.jpg`
    : `/thumbnails/${slug}.jpg`;
  const sources = [
    localPath,
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent("https://" + site.url)}?w=640&h=800`,
  ];

  const handleError = () => {
    if (srcIdx < sources.length - 1) {
      setSrcIdx((i) => i + 1);
      setStatus("loading");
    } else {
      setStatus("error");
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus("loaded");
    const img = e.currentTarget;
    const containerWidth = containerRef.current?.clientWidth || 260;
    const scaledHeight = (img.naturalHeight / img.naturalWidth) * containerWidth;
    setImgHeight(scaledHeight);
  };

  const [containerHeight, setContainerHeight] = useState(400);

  useEffect(() => {
    if (containerRef.current) setContainerHeight(containerRef.current.clientHeight);
  }, []);

  const rawScroll = Math.max(0, imgHeight - containerHeight);
  const scrollDistance = Math.min(rawScroll, containerHeight * 2);
  const canScroll = scrollDistance > 40;
  const scrollDuration = 4;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {status === "loading" && (
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `linear-gradient(110deg, var(--color-gray-5) 30%, var(--color-gray-4) 50%, var(--color-gray-5) 70%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s ease-in-out infinite",
          }}
        />
      )}
      {status !== "error" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sources[srcIdx]}
          alt={site.name}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          draggable={false}
          className="absolute left-0 top-0 w-full select-none"
          style={{
            objectFit: "cover",
            objectPosition: "top",
            height: canScroll ? "auto" : "100%",
            opacity: status === "loaded" ? 1 : 0,
            transform: isHovered && canScroll ? `translateY(-${scrollDistance}px)` : "translateY(0)",
            transition: isHovered
              ? `transform ${scrollDuration}s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease`
              : "transform 0.6s ease-out, opacity 0.5s ease",
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ background: `linear-gradient(145deg, var(--color-gray-4), var(--color-gray-6))` }}>
          <Favicon domain={site.url} size={28} className="opacity-60" />
          <span className="text-base font-bold" style={{ color: "var(--color-label-3)" }}>{site.name}</span>
        </div>
      )}
    </div>
  );
});

/* ─── Strip Card (B design) ─── */
function StripCard({
  site, catColor, isHovered, isAnyHovered, index, onHover, onLeave,
}: {
  site: Site; catColor: string; isHovered: boolean; isAnyHovered: boolean;
  index: number; onHover: (i: number) => void; onLeave: () => void;
}) {
  const isFaded = isAnyHovered && !isHovered;
  const slug = site.url.replace(/[/:]/g, "_");

  const handleClick = useCallback((e: React.MouseEvent) => {
    const area = (e.currentTarget as HTMLElement).closest(".hscroll-area") as HTMLElement | null;
    if (area?.dataset.dragged === "true") { e.preventDefault(); e.stopPropagation(); }
  }, []);

  return (
    <div className="h-full flex-shrink-0 basis-[260px] sm:basis-[320px]" style={{ position: "relative" }}>
      <a
        href={`https://${site.url}`} target="_blank" rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => onHover(index)} onMouseLeave={onLeave}
        onTouchStart={() => onHover(index)} onTouchEnd={onLeave}
        draggable={false}
        style={{
          display: "flex", flexDirection: "column", position: "absolute", inset: 0,
          borderRadius: 20, overflow: "hidden", cursor: "pointer", userSelect: "none",
          background: isHovered ? "var(--color-gray-5)" : "var(--color-gray-6)",
          transform: isHovered ? "translateY(-6px)" : isFaded ? "scale(0.96)" : "translateY(0)",
          zIndex: isHovered ? 10 : 1,
          filter: isFaded ? "brightness(0.7) grayscale(0.3)" : "brightness(1) grayscale(0)",
          boxShadow: isHovered
            ? "0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)"
            : "0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)",
          transition: `transform 0.35s var(--ease-smooth), filter 0.4s ease, box-shadow 0.35s ease, background 0.3s ease`,
          animation: "card-in 0.5s cubic-bezier(.16,1,.3,1) backwards",
          animationDelay: `${index * 55}ms`,
          textDecoration: "none", color: "inherit",
        }}
      >
        {/* Thumbnail */}
        <div style={{ padding: "16px 16px 0", flex: "0 0 auto" }}>
          <div style={{
            borderRadius: 12, overflow: "hidden", aspectRatio: "16/10", position: "relative",
            background: "var(--color-gray-4)",
          }}>
            <img
              src={`/thumbnails/${slug}_desktop.jpg`}
              alt={site.name}
              loading="lazy" draggable={false}
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "auto", objectFit: "cover",
                transform: isHovered ? "translateY(-30%)" : "translateY(0)",
                transition: isHovered
                  ? "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
                  : "transform 0.6s ease-out",
              }}
            />
            {/* Noise grain */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
              opacity: 0.06, mixBlendMode: "overlay",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }} />
            {/* Glass reflection */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
              background: "linear-gradient(165deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 50%)",
              opacity: isHovered ? 1 : 0.6,
              transition: "opacity 0.4s ease",
            }} />
            {/* Arrow */}
            <div style={{
              position: "absolute", top: 8, right: 8, zIndex: 4,
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scale(1)" : "scale(0.5)",
              transition: "all 0.25s var(--ease-spring)",
            }}>
              <ArrowUpRight size={13} weight="bold" color="white" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "24px 16px 0", flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="flex items-center gap-2.5" style={{ marginBottom: 8 }}>
            <div style={{
              transform: isHovered ? "scale(1.15)" : "scale(1)",
              transition: "transform 0.3s var(--ease-spring)",
              display: "flex", alignItems: "center",
            }}>
              <Favicon domain={site.url} size={20} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "white", letterSpacing: -0.3, lineHeight: 1 }}>{site.name}</span>
          </div>
          <div style={{ fontSize: 14, color: "rgba(235,235,245,0.5)", lineHeight: 1.6 }}>{site.desc}</div>
          <div style={{ minHeight: 40, flex: 1 }} />
        </div>

        {/* Tags */}
        <div style={{ padding: "0 16px 24px", display: "flex", gap: 6 }}>
          {site.tags.map((tag) => (
            <span key={tag} style={{
              padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 500,
              background: isHovered ? "var(--color-gray-3)" : "var(--color-gray-4)",
              color: "rgba(235,235,245,0.5)",
              transition: "background 0.3s",
            }}>{tag}</span>
          ))}
        </div>
      </a>
    </div>
  );
}

/* ─── List Card ─── */
function ListCard({ site, index }: { site: Site; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={`https://${site.url}`} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "block", borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer",
        transition: `transform 0.35s var(--ease-smooth), box-shadow 0.35s ease`,
        transform: hov ? "scale(1.02)" : "scale(1)",
        boxShadow: hov ? "0 16px 44px rgba(0,0,0,0.35)" : "none",
        animation: "fade-up 0.4s cubic-bezier(.16,1,.3,1) backwards",
        animationDelay: `${index * 40}ms`,
        textDecoration: "none", color: "inherit",
      }}
    >
      <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", aspectRatio: "16/10", position: "relative", background: "var(--color-gray-5)" }}>
        <OGThumb site={site} variant="desktop" />
      </div>
      <div style={{ padding: "10px 2px 4px" }}>
        <div className="mb-0.5 flex items-center gap-[7px]">
          <Favicon domain={site.url} size={20} />
          <span className="flex-1 text-base font-semibold text-white">{site.name}</span>
        </div>
        <span style={{ fontSize: 14, color: "var(--color-label-2)" }}>{site.desc}</span>
      </div>
    </a>
  );
}

/* ─── Dock Item (card style) ─── */
function DockItem({ cat, isActive, onClick, scale = 1, hideActiveTooltip = false }: { cat: Category; isActive: boolean; onClick: (id: string) => void; scale?: number; hideActiveTooltip?: boolean }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  const Icon = CATEGORY_ICONS[cat.id];
  const size = Math.round(52 * scale);

  return (
    <div className="relative flex flex-col items-center"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPressed(false); }}>
      <button onClick={() => onClick(cat.id)} aria-label={cat.label}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        className="flex items-center justify-center border-none"
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(14 * scale),
          cursor: "pointer",
          fontFamily: "inherit",
          background: isActive
            ? `radial-gradient(circle at 40% 40%, ${cat.color}50, ${cat.color}18)`
            : hov
              ? "var(--color-gray-4)"
              : "var(--color-gray-5)",
          boxShadow: isActive
            ? `0 0 20px ${cat.color}30, var(--glass-inset)`
            : hov
              ? `var(--glass-inset), 0 4px 16px rgba(0,0,0,0.4)`
              : "var(--glass-inset)",
          color: isActive ? cat.color : hov ? "var(--color-label)" : "var(--color-gray-1)",
          transform: pressed
            ? "scale(0.9) translateY(0px)"
            : hov && !isActive
              ? `scale(${scale}) translateY(-${Math.round(12 * scale)}px)`
              : "scale(1) translateY(0px)",
          transition: `color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s var(--ease-spring)`,
        }}>
        {Icon && <Icon size={Math.round(22 * scale)} weight="fill" />}
      </button>
      {/* Active dot */}
      <div style={{
        width: 4, height: 4, borderRadius: 2, background: cat.color, marginTop: 6,
        opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(0)",
        transition: "all 0.2s",
      }} />
      {/* Tooltip */}
      <div className="hidden sm:block" style={{
        position: "absolute", bottom: "calc(100% + 10px)",
        background: isActive ? cat.color : "var(--color-gray-3)",
        color: isActive ? "#000" : "var(--color-label)",
        fontSize: 11, fontWeight: isActive ? 600 : 500,
        padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap",
        opacity: (isActive && !hideActiveTooltip) || hov ? 1 : 0,
        transform: isActive || hov ? `translateY(-${Math.round(hov && !isActive ? 12 * scale : 0)}px)` : "translateY(4px)",
        transition: "opacity 0.15s, transform 0.2s var(--ease-spring), background 0.3s", pointerEvents: "none", zIndex: 20,
      }}>{cat.label}</div>
    </div>
  );
}

/* ─── Mobile Tab Item (iOS style) ─── */
function MobileTabItem({ cat, isActive, onClick }: { cat: Category; isActive: boolean; onClick: (id: string) => void }) {
  const Icon = CATEGORY_ICONS[cat.id];
  return (
    <button
      onClick={() => onClick(cat.id)}
      aria-label={cat.label}
      className="flex shrink-0 flex-col items-center justify-center gap-0.5 border-none"
      style={{
        background: "transparent",
        cursor: "pointer",
        fontFamily: "inherit",
        padding: "8px 14px",
        minHeight: 48,
        color: isActive ? cat.color : "var(--color-gray-1)",
        transition: "color 0.2s",
      }}
    >
      {Icon && <Icon size={20} weight="fill" />}
      <span style={{
        fontSize: 9,
        fontWeight: isActive ? 600 : 400,
        letterSpacing: 0.1,
      }}>{cat.shortLabel}</span>
    </button>
  );
}

/* ─── Dock Bar (desktop: macOS magnification / mobile: iOS tab bar) ─── */
function DockBar({ categories: cats, activeTab, onTabChange }: { categories: Category[]; activeTab: string; onTabChange: (id: string) => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getScale = (index: number) => {
    if (hoveredIdx === null) return 1;
    const dist = Math.abs(index - hoveredIdx);
    if (dist === 0) return 1.2;
    if (dist === 1) return 1.1;
    if (dist === 2) return 1.03;
    return 1;
  };

  return (
    <>
      {/* Mobile: iOS tab bar */}
      <div className="safe-bottom absolute inset-x-0 bottom-0 z-10 sm:hidden"
        style={{ borderTop: "1px solid var(--glass-border)", background: "var(--glass-bg-strong)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)" }}>
        <div className="hide-scrollbar flex items-center overflow-x-auto">
          {cats.map((cat) => (
            <MobileTabItem key={cat.id} cat={cat} isActive={activeTab === cat.id} onClick={onTabChange} />
          ))}
        </div>
      </div>

      {/* Desktop: glassmorphism dock */}
      <div className="safe-bottom pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center pb-5 sm:flex">
        <div
          className="pointer-events-auto flex items-end gap-1.5 overflow-visible px-2.5 py-2"
          style={{
            background: "var(--glass-bg-strong)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            borderRadius: 18,
            border: "1px solid var(--glass-border)",
            boxShadow: `0 8px 40px rgba(0,0,0,0.5), var(--glass-inset)`,
          }}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {cats.map((cat, i) => (
            <div key={cat.id} onMouseEnter={() => setHoveredIdx(i)}>
              <DockItem cat={cat} isActive={activeTab === cat.id} onClick={onTabChange} scale={getScale(i)} hideActiveTooltip={hoveredIdx !== null && !(activeTab === cat.id && hoveredIdx === i)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── View Toggle Icons ─── */
function CardViewIcon({ active, color }: { active: boolean; color: string }) {
  return <Rows size={14} weight="fill" color={active ? color : "var(--color-gray-2)"} />;
}

function ListViewIcon({ active, color }: { active: boolean; color: string }) {
  return <GridFour size={14} weight="fill" color={active ? color : "var(--color-gray-2)"} />;
}

/* ═══ MAIN ═══ */
export default function ReferenceHub() {
  const [activeTab, setActiveTab] = useState("uiux");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [transitioning, setTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });

  const activeCat = categories.find((c) => c.id === activeTab)!;

  const switchTab = (id: string) => {
    if (id === activeTab) return;
    setTransitioning(true);
    setHoveredCard(null);
    setTimeout(() => {
      setActiveTab(id);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
      setTimeout(() => setTransitioning(false), 25);
    }, 150);
  };

  // Wheel anywhere → horizontal scroll (card view only)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || viewMode !== "card") return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
      }
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [activeTab, viewMode]);

  // Drag scroll
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (viewMode !== "card") return;
      isDragging.current = true;
      dragStart.current = { x: e.clientX, scroll: scrollRef.current?.scrollLeft || 0 };
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      if (scrollRef.current) scrollRef.current.dataset.dragged = "false";
    },
    [viewMode]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      const dx = dragStart.current.x - e.clientX;
      if (Math.abs(dx) > 5) scrollRef.current.dataset.dragged = "true";
      scrollRef.current.scrollLeft = dragStart.current.scroll + dx;
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.dataset.dragged = "false";
      }, 80);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const glowBg = `radial-gradient(ellipse 90% 60% at 50% 0%, ${activeCat.color}33 0%, transparent 80%)`;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden" style={{ background: "var(--color-bg)", color: "var(--color-label)" }}>
      <CustomCursor color={activeCat.color} isHovering={hoveredCard !== null} />
      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10" style={{
        height: "64%",
        background: glowBg,
        transition: "background 0.8s ease",
        animation: "glow-breathe 6s ease-in-out infinite",
      }} />

      {/* ─── Header (floating, flat items) ─── */}
      <header className="safe-top absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-3 sm:px-8 sm:pt-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width={28} height={28} viewBox="0 0 400 400" fill="none" className="rounded-md sm:size-8" style={{ transition: "background 0.5s ease" }}>
            <rect width="400" height="400" rx="20" fill={activeCat.color} style={{ transition: "fill 0.5s ease" }} />
            <g clipPath="url(#logo-clip)">
              <path fillRule="evenodd" clipRule="evenodd" d="M69.7266 172.27V138.668C95.1611 138.668 115.644 118.184 115.644 92.5488H149.247C149.247 136.682 113.684 172.27 69.7266 172.27Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M250.023 92.5488H283.626C283.626 118.184 304.285 138.668 329.745 138.668V172.27C285.813 172.27 250.049 136.682 250.049 92.5488H250.023Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M199.739 262.697C164.578 289.539 120.822 305.825 73.1195 306.629H69.7266V273.027C110.266 273.027 147.84 259.706 177.848 237.036C185.991 229.27 193.154 220.725 199.714 211.803C206.098 220.725 213.437 229.27 221.379 237.036C251.588 259.681 289.162 273.027 329.701 273.027V306.403L326.133 306.604C278.631 305.8 234.875 289.489 199.714 262.672L199.739 262.697Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M224.193 194.74C215.472 185.767 207.882 175.437 201.725 164.53C200.946 163.323 200.317 162.142 199.739 160.936C199.161 162.142 198.332 163.323 197.754 164.53C172.696 209.241 124.617 239.451 69.7266 239.451V205.848C132.157 205.848 182.85 155.18 182.85 92.5742H216.453C216.453 118.185 224.998 141.659 239.097 160.534C259.757 188.18 292.756 205.848 329.752 205.848V239.451C288.408 239.451 250.834 222.335 224.193 194.74Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="logo-clip">
                <rect width="260" height="214.082" fill="white" transform="translate(69.7266 92.5488)"/>
              </clipPath>
            </defs>
          </svg>
          <span className="hidden text-[15px] font-bold tracking-tight text-white sm:block sm:text-[17px]">
            Durumi Ref
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View toggle pill */}
          <div className="flex items-center" style={{
            padding: "4px",
            background: "var(--glass-bg)",
            backdropFilter: "var(--glass-blur)",
            WebkitBackdropFilter: "var(--glass-blur)",
            borderRadius: 999,
            border: "1px solid var(--glass-border)",
          }}>
            <button
              onClick={() => { setViewMode("card"); setHoveredCard(null); }}
              aria-label="Card view"
              className="header-btn flex size-8 items-center justify-center"
              style={{
                borderRadius: 999,
                border: "none", cursor: "pointer", fontFamily: "inherit",
                background: viewMode === "card" ? "var(--color-gray-4)" : "transparent",
              }}
            >
              <CardViewIcon active={viewMode === "card"} color={activeCat.color} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className="header-btn flex size-8 items-center justify-center"
              style={{
                borderRadius: 999,
                border: "none", cursor: "pointer", fontFamily: "inherit",
                background: viewMode === "list" ? "var(--color-gray-4)" : "transparent",
              }}
            >
              <ListViewIcon active={viewMode === "list"} color={activeCat.color} />
            </button>
          </div>

          {/* Submit pill */}
          <button
            onClick={() => setSubmitOpen(true)}
            className="header-btn-submit shrink-0 border-none"
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              background: "var(--color-label)",
              color: "var(--color-bg)",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            제보
          </button>
        </div>
      </header>

      {/* ─── Content ─── */}
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col" style={{
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "scale(0.97)" : "scale(1)",
        transition: "opacity 0.14s, transform 0.14s",
      }}>
        {viewMode === "card" ? (
          <div className="relative flex flex-1 flex-col justify-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[12] w-8 sm:w-[60px]" style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[12] w-8 sm:w-[60px]" style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }} />

            <div
              ref={scrollRef}
              className="hscroll-area hide-scrollbar flex items-stretch gap-2 overflow-x-auto overflow-y-hidden px-6 py-4 sm:gap-2.5 sm:px-[50px] sm:py-6"
              data-dragged="false"
              onMouseDown={onMouseDown}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ height: "clamp(400px, 60vh, 520px)", cursor: "grab", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              <div className="shrink-0 basis-2 sm:basis-5" />
              {activeCat.sites.map((site, i) => (
                <StripCard
                  key={`${activeTab}-${site.name}`}
                  site={site} catColor={activeCat.color} index={i}
                  isHovered={hoveredCard === i}
                  isAnyHovered={hoveredCard !== null}
                  onHover={setHoveredCard}
                  onLeave={() => setHoveredCard(null)}
                />
              ))}
              <div className="shrink-0 basis-2 sm:basis-5" />
            </div>
          </div>
        ) : (
          <div className="relative flex-1 overflow-y-auto px-4 pt-16 pb-32 sm:px-5 sm:pt-20 sm:pb-36">
            <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              {activeCat.sites.map((site, i) => (
                <ListCard key={`${activeTab}-${site.name}`} site={site} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Bottom Dock (glassmorphism, floating, macOS style) ─── */}
      <DockBar categories={categories} activeTab={activeTab} onTabChange={switchTab} />
    </div>
  );
}
