"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Notice } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { PageLayout } from "@/app/admin/components/page-layout";
import { NoticeForm } from "../../components/notice-form";

interface NoticeWithAttachments extends Omit<Notice, "attachments"> {
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
  }[];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditNoticePage({ params }: PageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [notice, setNotice] = useState<NoticeWithAttachments | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      const response = await fetch(`/api/admin/notices/${params.id}`);
      if (!response.ok) throw new Error("공지사항을 찾을 수 없습니다.");
      const data = await response.json();
      setNotice(data);
    } catch (error) {
      toast({
        title: "오류",
        description: "공지사항을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
      router.push("/admin/notices");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: Partial<NoticeWithAttachments>) => {
    try {
      const { attachments, ...rest } = formData;
      const response = await fetch(`/api/admin/notices/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...rest,
          attachments: attachments || [],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        description: "공지사항이 성공적으로 수정되었습니다.",
      });
      router.push("/admin/notices");
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "공지사항 수정 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="공지사항 수정" backUrl="/admin/notices">
        <div className="flex items-center justify-center p-8">
          <div className="text-muted-foreground">로딩 중...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="공지사항 수정" backUrl="/admin/notices">
      <NoticeForm initialData={notice} onSubmit={handleSubmit} />
    </PageLayout>
  );
}
