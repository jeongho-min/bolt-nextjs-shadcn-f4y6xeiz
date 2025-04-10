import type { Metadata } from "next";
import ClientLayout from "./client-layout";
import { TreatmentCaseProvider } from "./contexts/treatment-case-context";
import "./globals.css";
import { AuthProvider } from "./providers/auth-provider";
import { DepartmentInfoProvider } from "./contexts/department-info-context";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="ko" className="!scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <body className="min-h-screen">
        <DepartmentInfoProvider>
          <TreatmentCaseProvider>
            <AuthProvider>
              <ClientLayout>{children}</ClientLayout>
            </AuthProvider>
          </TreatmentCaseProvider>
        </DepartmentInfoProvider>
        <Toaster />
      </body>
    </html>
  );
}
