"use client";

import { CertificationSection } from "@/components/home/certification-section";
import { HeroSection } from "@/components/home/hero-section";
import { HistorySection } from "@/components/home/history-section";
import { ReviewSection } from "@/components/home/reviews/review-section";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      const errorMessages: { [key: string]: string } = {
        Signin: "로그인에 실패했습니다.",
        OAuthSignin: "소셜 로그인 연동에 실패했습니다.",
        OAuthCreateAccount: "계정 생성에 실패했습니다.",
        EmailCreateAccount: "이메일 계정 생성에 실패했습니다.",
        Callback: "인증 콜백 처리에 실패했습니다.",
        Default: "알 수 없는 오류가 발생했습니다.",
      };

      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: errorMessages[error] || errorMessages.Default,
      });
    }
  }, [searchParams, toast]);

  return (
    <main className="min-h-screen ">
      <HeroSection />
      <CertificationSection />
      <HistorySection />
      <ReviewSection />
      <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2"></div>
    </main>
  );
}
