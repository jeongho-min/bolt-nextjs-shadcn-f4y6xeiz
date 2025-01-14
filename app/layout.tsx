import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { HeaderProvider } from "./providers/header-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuickLinks } from "@/components/home/quick-links";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { KakaoProvider } from "@/app/providers/kakao-provider";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="!scroll-smooth">
      <body className="min-h-screen">
        <KakaoProvider>
          <Providers>
            <HeaderProvider>
              <Header />
              <main className="pt-16">
                <AnimatePresence mode="wait">{children}</AnimatePresence>
                <QuickLinks />
              </main>
              <Footer />
              <Toaster />
            </HeaderProvider>
          </Providers>
        </KakaoProvider>
      </body>
    </html>
  );
}
