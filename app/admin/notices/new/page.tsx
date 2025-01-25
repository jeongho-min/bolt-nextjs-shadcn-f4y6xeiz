"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { PageLayout } from "../../components/page-layout";
import { NoticeForm } from "../components/notice-form";
import { Notice, NoticeCategory } from "@prisma/client";

interface NoticeWithAttachments extends Omit<Notice, "attachments"> {
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
  }[];
}

const initialNotice: NoticeWithAttachments = {
  id: "",
  title: "",
  content: "",
  category: "NOTICE" as NoticeCategory,
  isImportant: false,
  isActive: true,
  viewCount: 0,
  startDate: null,
  endDate: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: null,
  attachments: [],
};

export default function NewNoticePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: Partial<NoticeWithAttachments>) => {
    try {
      const response = await fetch("/api/admin/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("공지사항 생성에 실패했습니다.");
      }

      toast({
        title: "성공",
        description: "새 공지사항이 생성되었습니다.",
      });

      router.push("/admin/notices");
      router.refresh();
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "공지사항 생성 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout title="새 공지사항" backUrl="/admin/notices">
      <NoticeForm initialData={initialNotice} onSubmit={handleSubmit} mode="create" />
    </PageLayout>
  );
}
