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

export const metadata: Metadata = {
  title: "Durumi Ref",
  description: "디자이너를 위한 레퍼런스 사이트 큐레이션",
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Durumi Ref",
    description: "디자이너를 위한 레퍼런스 사이트 큐레이션",
    images: [{ url: "/og.png", width: 800, height: 400 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Durumi Ref",
    description: "디자이너를 위한 레퍼런스 사이트 큐레이션",
    images: ["/og.png"],
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
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
