"use client";

import { CertificationSection } from "@/components/home/certification-section";
import { HeroSection } from "@/components/home/hero-section";
import { HistorySection } from "@/components/home/history-section";
import { NoticePopup } from "@/components/home/notice-popup";
import { NoticeSection } from "@/components/home/notice-section";
import { ReviewSection } from "@/components/home/reviews/review-section";
import { useToast } from "@/hooks/use-toast";
import { Notice, PopupNotice } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface NoticeWithAttachments extends Notice {
  attachments: Array<{
    id: string;
    noticeId: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string | null;
    createdAt: Date;
  }>;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [popups, setPopups] = useState<PopupNotice[]>([]);
  const [notices, setNotices] = useState<NoticeWithAttachments[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // 팝업 데이터 가져오기
      const popupsResponse = await fetch("/api/popups/active");
      if (!popupsResponse.ok) throw new Error("팝업 데이터를 불러오는데 실패했습니다.");
      const popupsData = await popupsResponse.json();
      setPopups(popupsData);

      // 공지사항 데이터 가져오기
      const noticesResponse = await fetch("/api/notices/active");
      if (!noticesResponse.ok) throw new Error("공지사항 데이터를 불러오는데 실패했습니다.");
      const noticesData = await noticesResponse.json();
      setNotices(noticesData);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      {!isLoading && popups.length > 0 && <NoticePopup notices={popups} />}
      <HeroSection />
      <CertificationSection />
      <HistorySection />
      <NoticeSection notices={notices} isLoading={isLoading} />
      <ReviewSection />
      <div className="container mx-auto px-4 py-16 grid gap-8 md:grid-cols-2"></div>
    </main>
  );
}
