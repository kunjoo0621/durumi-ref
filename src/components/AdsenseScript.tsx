"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const ALLOWED_PREFIXES = ["/", "/trends"] as const;

export default function AdsenseScript() {
  const pathname = usePathname();

  const allowed =
    pathname === "/" ||
    ALLOWED_PREFIXES.some((p) => p !== "/" && pathname.startsWith(p));

  if (!allowed) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6839121940253595"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
