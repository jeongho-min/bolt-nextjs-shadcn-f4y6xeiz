"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Notice } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { PageLayout } from "@/app/admin/components/page-layout";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface NoticeWithAttachments extends Omit<Notice, "attachments"> {
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
  }[];
}

export default function NoticePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [notice, setNotice] = useState<NoticeWithAttachments | null>(null);

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
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/admin/notices/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("공지사항 삭제에 실패했습니다.");
      }

      toast({
        description: "공지사항이 성공적으로 삭제되었습니다.",
      });
      router.push("/admin/notices");
    } catch (error) {
      toast({
        title: "오류",
        description: "공지사항 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  if (!notice) return null;

  const actions = [
    {
      label: "수정",
      onClick: () => router.push(`/admin/notices/${params.id}/edit`),
      variant: "outline" as const,
    },
    {
      label: "삭제",
      onClick: handleDelete,
      variant: "outline" as const,
    },
  ];

  return (
    <PageLayout title="공지사항 상세" backUrl="/admin/notices" actions={actions}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">{notice.title}</h2>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>{format(new Date(notice.createdAt), "yyyy.MM.dd")}</span>
                <span>·</span>
                <span>{notice.category}</span>
                {notice.isImportant && (
                  <>
                    <span>·</span>
                    <span className="text-red-500">중요</span>
                  </>
                )}
              </div>
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: notice.content }} />

            {notice.attachments && notice.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">첨부파일</h3>
                <div className="space-y-1">
                  {notice.attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {file.fileName}
                      </a>
                      <span className="text-sm text-gray-500">({Math.round(file.fileSize / 1024)}KB)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
