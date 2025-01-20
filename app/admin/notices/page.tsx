"use client";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Notice, NoticeCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { NoticeTable } from "./components/notice-table";

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<NoticeCategory | "ALL">("ALL");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    if (categoryFilter === "ALL") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter((notice) => notice.category === categoryFilter));
    }
  }, [categoryFilter, notices]);

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/admin/notices");
      const data = await response.json();
      setNotices(data);
      setFilteredNotices(data);
    } catch (error) {
      toast({
        title: "공지사항 로딩 실패",
        description: "공지사항을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/notices/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      fetchNotices();
      toast({
        title: "성공",
        description: "공지사항이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "공지사항 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const categoryOptions = [
    { label: "전체", value: "ALL" },
    { label: "공지", value: "NOTICE" },
    { label: "안내", value: "INFO" },
    { label: "이벤트", value: "EVENT" },
  ];

  const HeaderContent = () => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">카테고리 필터:</span>
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as NoticeCategory | "ALL")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">전체: {notices.length}</Badge>
        <Badge variant="default">공지: {notices.filter((notice) => notice.category === "NOTICE").length}</Badge>
        <Badge variant="secondary">안내: {notices.filter((notice) => notice.category === "INFO").length}</Badge>
        <Badge variant="destructive">이벤트: {notices.filter((notice) => notice.category === "EVENT").length}</Badge>
      </div>
    </div>
  );

  return (
    <PageLayout
      title="공지사항 관리"
      backUrl="/admin"
      headerContent={<HeaderContent />}
      actions={[
        {
          label: "새 공지사항",
          onClick: () => router.push("/admin/notices/new"),
        },
      ]}
    >
      <NoticeTable notices={filteredNotices} onDelete={handleDelete} />
    </PageLayout>
  );
}
