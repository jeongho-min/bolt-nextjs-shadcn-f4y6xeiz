import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ClientLayout } from "./client-layout";

export const metadata: Metadata = {
  title: "소리청 일곡에스한방병원",
  description: "소리청 일곡에스한방병원 - 이명, 난청, 어지럼증 전문 한방병원",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "소리청 일곡에스한방병원",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  formatDetection: {
    telephone: true,
  },
};

function NaverScript() {
  return <Script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" strategy="afterInteractive" />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="!scroll-smooth">
      <head>
        <NaverScript />
      </head>
      <body className="min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
