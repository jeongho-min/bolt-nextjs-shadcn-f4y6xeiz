"use client";

import { ReactNode } from "react";
import { HeaderProvider } from "./providers/header-provider";
import { FooterProvider } from "./providers/footer-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuickLinks } from "@/components/home/quick-links";
import dynamic from "next/dynamic";

const AnimatePresence = dynamic(() => import("framer-motion").then((mod) => mod.AnimatePresence), {
  ssr: false,
});

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <HeaderProvider>
      <FooterProvider>
        <Header />
        <main className="pt-16">
          <AnimatePresence mode="wait">{children}</AnimatePresence>
          <QuickLinks />
        </main>
        <Footer />
        <Toaster />
      </FooterProvider>
    </HeaderProvider>
  );
}
