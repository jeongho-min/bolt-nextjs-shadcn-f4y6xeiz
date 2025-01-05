import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "소리철 일곡에스한방병원",
  description: "광주 북구 일곡동 소재 한방병원, 전문적인 한방 의료 서비스를 제공합니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
