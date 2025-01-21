"use client";

import { Notice } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { DataTable, Column } from "@/components/ui/data-table";

interface NoticeTableProps {
  notices: Notice[];
  onDelete: (id: string) => void;
}

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "NOTICE":
      return <Badge variant="default">공지</Badge>;
    case "INFO":
      return <Badge variant="secondary">안내</Badge>;
    case "EVENT":
      return <Badge variant="destructive">이벤트</Badge>;
    default:
      return <Badge variant="outline">{category}</Badge>;
  }
};

export function NoticeTable({ notices, onDelete }: NoticeTableProps) {
  const router = useRouter();

  const columns: Column<Notice>[] = [
    {
      header: "카테고리",
      cell: (notice) => getCategoryBadge(notice.category),
      className: "w-[100px]",
    },
    {
      header: "제목",
      cell: (notice) => (
        <div className="flex items-center gap-2">
          {notice.title}
          {notice.isImportant && (
            <Badge variant="destructive" className="ml-2">
              중요
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "조회수",
      cell: (notice) => notice.viewCount.toLocaleString(),
      className: "w-[100px]",
    },
    {
      header: "공개 여부",
      cell: (notice) => (
        <div onClick={(e) => e.stopPropagation()} className="management-buttons">
          <Switch
            checked={notice.isActive}
            onCheckedChange={async (checked) => {
              try {
                const response = await fetch(`/api/admin/notices/${notice.id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ isActive: checked }),
                });

                if (!response.ok) throw new Error("Failed to update");

                toast.success(checked ? "공지사항이 공개되었습니다." : "공지사항이 비공개되었습니다.");
                router.refresh();
              } catch (error) {
                console.error(error);
                toast.error("상태 변경에 실패했습니다.");
              }
            }}
          />
        </div>
      ),
      className: "w-[100px]",
    },
    {
      header: "게시기간",
      cell: (notice) =>
        notice.startDate && notice.endDate
          ? `${format(new Date(notice.startDate), "yyyy.MM.dd", { locale: ko })} ~ ${format(new Date(notice.endDate), "yyyy.MM.dd", {
              locale: ko,
            })}`
          : "-",
      className: "w-[150px]",
    },
    {
      header: "작성일",
      cell: (notice) => format(new Date(notice.createdAt), "yyyy.MM.dd HH:mm", { locale: ko }),
      className: "w-[150px]",
    },
    {
      header: "",
      cell: (notice) => (
        <div className="flex justify-end gap-2 management-buttons">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/notices/${notice.id}/edit`);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notice.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "w-[100px] text-right",
    },
  ];

  return (
    <DataTable
      data={notices}
      columns={columns}
      onRowClick={(notice) => router.push(`/admin/notices/${notice.id}`)}
      pageSize={10}
      pageSizeOptions={[10, 20, 30, 50]}
      showPageSizeOptions={true}
    />
  );
}
