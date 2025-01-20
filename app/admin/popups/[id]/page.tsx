"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PopupNotice, NoticeCategory } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { PageLayout } from "../../components/page-layout";
import { PopupForm } from "../components/popup-form";

export default function EditPopupPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [popup, setPopup] = useState<PopupNotice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id === "new") {
      setIsLoading(false);
      return;
    }
    fetchPopup();
  }, [params.id]);

  const fetchPopup = async () => {
    try {
      const response = await fetch(`/api/admin/popups/${params.id}`);
      if (!response.ok) throw new Error("팝업을 찾을 수 없습니다.");
      const data = await response.json();
      setPopup(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "팝업을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
      router.push("/admin/popups");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: Partial<PopupNotice>) => {
    try {
      const url = params.id === "new" ? "/api/admin/popups" : `/api/admin/popups/${params.id}`;
      const method = params.id === "new" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        description: `팝업이 성공적으로 ${params.id === "new" ? "등록" : "수정"}되었습니다.`,
      });
      router.push("/admin/popups");
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "팝업 저장 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <PageLayout title={params.id === "new" ? "팝업 작성" : "팝업 수정"} backUrl="/admin/popups">
      <PopupForm initialData={popup} onSubmit={handleSubmit} />
    </PageLayout>
  );
}
