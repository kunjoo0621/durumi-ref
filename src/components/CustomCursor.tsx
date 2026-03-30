"use client";

import { useEffect, useRef } from "react";

interface CustomCursorProps {
  color: string;
  isHovering?: boolean;
}

const TRAIL_COUNT = 7;
const BASE_SIZE = 16;
const HOVER_SIZE = 32;

export default function CustomCursor({ color, isHovering = false }: CustomCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const smoothMouse = useRef({ x: -100, y: -100 });
  const trail = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const velocity = useRef({ x: 0, y: 0 });
  const targetSize = useRef(BASE_SIZE);
  const currentSize = useRef(BASE_SIZE);
  const isPressed = useRef(false);
  const visible = useRef(false);
  const rafId = useRef<number>(0);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef(color);
  const hoveringRef = useRef(isHovering);

  // Keep refs in sync without re-mounting effect
  colorRef.current = color;
  hoveringRef.current = isHovering;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        // Snap all positions to avoid flying in from corner
        smoothMouse.current = { ...mouse.current };
        trail.current.forEach((t) => { t.x = e.clientX; t.y = e.clientY; });
        if (containerRef.current) containerRef.current.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      if (containerRef.current) containerRef.current.style.opacity = "0";
    };

    const onMouseDown = () => { isPressed.current = true; };
    const onMouseUp = () => { isPressed.current = false; };

    const animate = () => {
      // Smooth mouse position
      const mainLerp = 0.6;
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * mainLerp;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * mainLerp;

      // Velocity from smoothed position
      velocity.current.x = mouse.current.x - smoothMouse.current.x;
      velocity.current.y = mouse.current.y - smoothMouse.current.y;
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);

      // Smooth size transition
      targetSize.current = hoveringRef.current ? HOVER_SIZE : BASE_SIZE;
      currentSize.current += (targetSize.current - currentSize.current) * 0.2;

      // Press scale
      const pressScale = isPressed.current ? 0.7 : 1;

      // Update trail with spring-like physics
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0 ? smoothMouse.current : trail.current[i - 1];
        const stiffness = 0.22 - i * 0.02;
        trail.current[i].x += (target.x - trail.current[i].x) * stiffness;
        trail.current[i].y += (target.y - trail.current[i].y) * stiffness;

        const blob = blobRefs.current[i];
        if (!blob) continue;

        // Each blob slightly smaller
        const blobSize = Math.max(6, currentSize.current - i * 2) * pressScale;
        const half = blobSize / 2;

        // Velocity stretch (subtler)
        const stretch = Math.min(speed * 0.015, 0.25);
        const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);
        const sx = 1 + stretch;
        const sy = 1 - stretch * 0.4;

        blob.style.transform = `translate(${trail.current[i].x - half}px, ${trail.current[i].y - half}px) rotate(${angle}deg) scale(${sx}, ${sy})`;
        blob.style.width = `${blobSize}px`;
        blob.style.height = `${blobSize}px`;
        blob.style.opacity = `${0.9 - i * 0.12}`;
        blob.style.background = colorRef.current;
      }

      // Center dot — follows mouse directly
      if (dotRef.current) {
        const dotScale = isPressed.current ? 1.5 : 1;
        dotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px) scale(${dotScale})`;
        dotRef.current.style.boxShadow = `0 0 ${hoveringRef.current ? 10 : 6}px ${colorRef.current}80`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0, transition: "opacity 0.3s" }}
    >
      {/* SVG filter for liquid merge */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="liquid"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid blobs */}
      <div style={{ filter: "url(#liquid)", position: "absolute", inset: 0 }}>
        {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { blobRefs.current[i] = el; }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: BASE_SIZE,
              height: BASE_SIZE,
              borderRadius: "50%",
              background: color,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: `0 0 6px ${color}80`,
          willChange: "transform",
          transition: "box-shadow 0.3s",
        }}
      />
    </div>
  );
}
