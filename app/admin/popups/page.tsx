"use client";

import { useEffect, useState } from "react";
import { PopupNotice, NoticeCategory } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { PageLayout } from "../components/page-layout";
import { PopupTable } from "./components/popup-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PopupsPage() {
  const [popups, setPopups] = useState<PopupNotice[]>([]);
  const [filteredPopups, setFilteredPopups] = useState<PopupNotice[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<NoticeCategory | "ALL">("ALL");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchPopups();
  }, []);

  useEffect(() => {
    if (categoryFilter === "ALL") {
      setFilteredPopups(popups);
    } else {
      setFilteredPopups(popups.filter((popup) => popup.category === categoryFilter));
    }
  }, [categoryFilter, popups]);

  const fetchPopups = async () => {
    try {
      const response = await fetch("/api/admin/popups");
      const data = await response.json();
      setPopups(data);
      setFilteredPopups(data);
    } catch (error) {
      toast({
        title: "팝업 정보 로딩 실패",
        description: "팝업 정보를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/popups/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      fetchPopups();
      toast({
        title: "성공",
        description: "팝업이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: error instanceof Error ? error.message : "팝업 삭제 중 문제가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/popups/${id}`);
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
        <Badge variant="outline">전체: {popups.length}</Badge>
        <Badge variant="default">공지: {popups.filter((popup) => popup.category === "NOTICE").length}</Badge>
        <Badge variant="secondary">안내: {popups.filter((popup) => popup.category === "INFO").length}</Badge>
        <Badge variant="destructive">이벤트: {popups.filter((popup) => popup.category === "EVENT").length}</Badge>
      </div>
    </div>
  );

  return (
    <PageLayout
      title="팝업 관리"
      backUrl="/admin"
      headerContent={<HeaderContent />}
      actions={[
        {
          label: "새 팝업",
          onClick: () => router.push("/admin/popups/new"),
        },
      ]}
    >
      <PopupTable popups={filteredPopups} onEdit={handleEdit} onDelete={handleDelete} />
    </PageLayout>
  );
}
