"use client";

import { ReactNode } from "react";
import { KakaoProvider } from "./providers/kakao-provider";
import { NaverProvider } from "./providers/naver-provider";
import { HeaderProvider } from "./providers/header-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuickLinks } from "@/components/home/quick-links";
import { AnimatePresence } from "framer-motion";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <HeaderProvider>
      <KakaoProvider>
        <NaverProvider>
          <Header />
          <main className="pt-16">
            <AnimatePresence mode="wait">{children}</AnimatePresence>
            <QuickLinks />
          </main>
          <Footer />
          <Toaster />
        </NaverProvider>
      </KakaoProvider>
    </HeaderProvider>
  );
}
