"use client";

import { useState } from "react";
import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import { categories } from "@/data/categories";

export default function SubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!siteName.trim() || !siteUrl.trim()) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteName: siteName.trim(), siteUrl: siteUrl.trim(), category }),
      });

      if (res.ok) {
        setStatus("sent");
        setTimeout(() => {
          onClose();
          setSiteName("");
          setSiteUrl("");
          setCategory("");
          setStatus("idle");
        }, 1500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Backdrop + Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div
            className="w-full max-w-[400px] sm:w-[400px]"
            style={{
              background: "var(--color-gray-6)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              animation: "fade-up 0.3s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">사이트 제보</h2>
              <button
                onClick={() => onClose()}
                aria-label="닫기"
                className="flex size-8 items-center justify-center"
                style={{
                  borderRadius: "50%", border: "none", cursor: "pointer",
                  background: "var(--color-fill-4)",
                }}
              >
                <X size={16} weight="bold" color="var(--color-gray-1)" />
              </button>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--color-label-2)" }}>
                  사이트명 <span style={{ color: "var(--color-pink)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Dribbble"
                  className="w-full border-none text-sm text-white outline-none"
                  style={{
                    padding: "10px 12px",
                    background: "var(--color-gray-5)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--color-label-2)" }}>
                  URL <span style={{ color: "var(--color-pink)" }}>*</span>
                </label>
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="dribbble.com"
                  className="w-full border-none text-sm text-white outline-none"
                  style={{
                    padding: "10px 12px",
                    background: "var(--color-gray-5)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium" style={{ color: "var(--color-label-2)" }}>
                  카테고리
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none border-none text-sm text-white outline-none"
                  style={{
                    padding: "10px 12px",
                    background: "var(--color-gray-5)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "inherit",
                    color: category ? "var(--color-label)" : "var(--color-gray-1)",
                  }}
                >
                  <option value="">선택 (선택사항)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!siteName.trim() || !siteUrl.trim() || status === "sending" || status === "sent"}
              className="mt-5 flex w-full items-center justify-center gap-2 text-sm font-semibold"
              style={{
                padding: "12px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                cursor: status === "sending" || status === "sent" ? "default" : "pointer",
                fontFamily: "inherit",
                background: status === "sent" ? "var(--color-green)" : "var(--color-label)",
                color: status === "sent" ? "white" : "var(--color-bg)",
                opacity: !siteName.trim() || !siteUrl.trim() ? 0.4 : 1,
                transition: "background 0.2s, opacity 0.2s",
              }}
            >
              {status === "idle" && <><PaperPlaneTilt size={16} weight="fill" /> 제보하기</>}
              {status === "sending" && "전송 중..."}
              {status === "sent" && "전송 완료!"}
              {status === "error" && "다시 시도"}
            </button>

            {status === "error" && (
              <p className="mt-2 text-center text-xs" style={{ color: "var(--color-pink)" }}>
                전송에 실패했습니다. 다시 시도해주세요.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
