import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const SITE_URL = "https://www.durumiref.com";
const TITLE = "Durumi Ref — 디자이너를 위한 레퍼런스 사이트 큐레이션";
const DESCRIPTION = "UI/UX, 디자인 시스템, 에셋, 아이콘, 타이포그래피, 영감까지. 디자이너가 자주 보는 레퍼런스 사이트를 한곳에서 탐색하세요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Durumi Ref",
  },
  description: DESCRIPTION,
  keywords: [
    "디자인 레퍼런스", "UI/UX 레퍼런스", "웹 디자인 영감", "모바일 디자인",
    "디자인 시스템", "무료 아이콘", "무료 폰트", "디자인 에셋",
    "Dribbble", "Behance", "Mobbin", "Figma",
    "design reference", "design inspiration", "UI design",
    "두루미", "Durumi Ref",
  ],
  authors: [{ name: "Durumi", url: SITE_URL }],
  creator: "Durumi",
  publisher: "Durumi",
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "Durumi Ref",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 800, height: 400, alt: "Durumi Ref" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${montserrat.variable} ${pretendard.variable} h-full antialiased`}>
      <head>
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Durumi Ref",
              url: SITE_URL,
              description: DESCRIPTION,
              inLanguage: "ko",
              creator: {
                "@type": "Organization",
                name: "Durumi",
              },
            }),
          }}
        />
      </head>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
