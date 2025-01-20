"use client";

import { CertificationSection } from "@/components/home/certification-section";
import { HeroSection } from "@/components/home/hero-section";
import { HistorySection } from "@/components/home/history-section";
import { NoticePopup } from "@/components/home/notice-popup";
import { NoticeSection } from "@/components/home/notice-section";
import { ReviewSection } from "@/components/home/reviews/review-section";
import { useToast } from "@/hooks/use-toast";
import { NoticeCategory } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// 임시 팝업 공지 데이터 (나중에 API로 대체)
const textPopupNotice = {
  id: "notice-1",
  title: "2024년 설 연휴 진료 안내 (테스트)",
  content: `
    <p>안녕하세요. 2024년 설 연휴 진료 일정을 안내드립니다.</p>
    <p>2월 9일(금) - 정상진료<br/>
    2월 10일(토) - 휴진<br/>
    2월 11일(일) - 휴진<br/>
    2월 12일(월) - 휴진<br/>
    2월 13일(화) - 정상진료</p>
    <p>즐거운 설 연휴 보내시기 바랍니다.</p>
  `,
  category: "NOTICE" as NoticeCategory,
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
  createdAt: new Date(),
};

const imagePopupNotice = {
  id: "event-1",
  title: "겨울맞이 관절 건강검진 이벤트 (테스트)",
  content: `
    <p>추운 겨울, 관절 건강을 미리 체크하세요!</p>
    <p>- 기간: 이벤트 게시 후 2주간<br/>
    - 대상: 전 연령대<br/>
    - 혜택: 관절 정밀 검진 40% 할인</p>
    <p>더 자세한 내용은 병원에 문의해주세요.</p>
  `,
  imageUrl: "/images/temp/winter-health.jpg",
  category: "EVENT" as NoticeCategory,
  startDate: new Date(),
  endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
  createdAt: new Date(),
};

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
    <main className="min-h-screen">
      <NoticePopup notices={[textPopupNotice, imagePopupNotice]} />
      <HeroSection />
      <CertificationSection />
      <HistorySection />
      <NoticeSection />
      <ReviewSection />
      <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2"></div>
    </main>
  );
}
