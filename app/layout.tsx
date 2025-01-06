import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { HeaderProvider } from "./providers/header-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "소리청 일곡에스한방병원",
  description: "소리청 일곡에스한방병원 공식 홈페이지입니다.",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <HeaderProvider>
            <Header />
            <main className="pt-16">{children}</main>
            <Footer />
          </HeaderProvider>
        </Providers>
      </body>
    </html>
  );
}
