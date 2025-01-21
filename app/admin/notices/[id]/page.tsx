"use client";

import { PageLayout } from "@/app/admin/components/page-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Notice } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarDays, Download, FileIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TipTapViewer = dynamic(() => import("@/components/editor/tiptap-viewer").then((mod) => mod.TipTapViewer), {
  ssr: false,
});

interface NoticeWithAttachments extends Omit<Notice, "attachments"> {
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
  }[];
}

const formatHtmlContent = (html: string) => {
  // 빈 p 태그 제거
  let formatted = html.replace(/<p><\/p>/g, "");
  // p 태그 사이의 불필요한 공백 제거
  formatted = formatted.replace(/<\/p>\s*<p>/g, "</p><p>");
  // 연속된 br 태그를 하나로 통일
  formatted = formatted.replace(/(<br\s*\/?>\s*)+/g, "<br>");
  // 줄바꿈 유지를 위한 스타일 추가
  formatted = formatted.replace(/<p>/g, '<p style="margin-bottom: 1rem;">');
  return formatted;
};

const downloadFile = async (url: string, fileName: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
  }
};

const htmlToMarkdown = (html: string) => {
  // HTML 태그를 마크다운으로 변환
  let markdown = html;

  // 제목 변환
  markdown = markdown.replace(/<h1><strong>(.*?)<\/strong><\/h1>/g, "# $1");
  markdown = markdown.replace(/<h2><strong>(.*?)<\/strong><\/h2>/g, "## $1");

  // 강조 변환
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, "**$1**");

  // 줄바꿈 변환
  markdown = markdown.replace(/<br\s*\/?>/g, "\n");
  markdown = markdown.replace(/<\/p><p>/g, "\n\n");

  // 남은 p 태그 제거
  markdown = markdown.replace(/<\/?p>/g, "");

  // 연속된 빈 줄 제거
  markdown = markdown.replace(/\n\s*\n\s*\n/g, "\n\n");

  // 앞뒤 공백 제거
  markdown = markdown.trim();

  return markdown;
};

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
      console.log("🚀 ~ fetchNotice ~ data:", data);
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
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  className={`${
                    notice.category === "NOTICE"
                      ? "bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                      : notice.category === "INFO"
                      ? "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/20"
                      : "bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 border-orange-500/20"
                  } border`}
                  variant="outline"
                >
                  {notice.category === "NOTICE" ? "공지" : notice.category === "INFO" ? "안내" : "이벤트"}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {format(new Date(notice.createdAt), "yyyy.MM.dd", { locale: ko })}
                </div>
                {notice.isImportant && (
                  <Badge variant="destructive" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20">
                    중요
                  </Badge>
                )}
              </div>
              <h2 className="text-2xl font-bold">{notice.title}</h2>
            </div>

            <div className="prose prose-sm max-w-none text-gray-700">
              <TipTapViewer content={notice.content} />
            </div>

            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">첨부파일</h3>
                <div className="grid gap-3">
                  {notice.attachments.map((file, index) => {
                    const isImage = file.mimeType?.startsWith("image/") || file.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);

                    return isImage ? (
                      <div key={index} className="relative">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <Image src={file.fileUrl} alt={file.fileName} fill className="object-contain" sizes="(max-width: 768px) 100vw, 800px" />
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center gap-2">
                          <button
                            onClick={() => downloadFile(file.fileUrl, file.fileName)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/50 hover:bg-black/70 text-white text-xs font-medium backdrop-blur-sm transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            다운로드
                          </button>
                          <a
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/50 hover:bg-black/70 text-white text-xs font-medium backdrop-blur-sm transition-colors"
                          >
                            원본 보기
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-colors group">
                        <FileIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">{file.fileName}</span>
                        <div className="ml-auto flex items-center gap-2">
                          <button
                            onClick={() => downloadFile(file.fileUrl, file.fileName)}
                            className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600"
                          >
                            <Download className="w-4 h-4" />
                            <span className="text-sm">다운로드</span>
                          </button>
                          <a
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600"
                          >
                            <span className="text-sm">원본 보기</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
