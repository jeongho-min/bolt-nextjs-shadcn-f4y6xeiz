"use client";

import { Notice } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">카테고리</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[100px]">조회수</TableHead>
            <TableHead className="w-[150px]">게시기간</TableHead>
            <TableHead className="w-[150px]">작성일</TableHead>
            <TableHead className="w-[100px] text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.map((notice) => (
            <TableRow
              key={notice.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest(".management-buttons")) return;
                router.push(`/admin/notices/${notice.id}`);
              }}
            >
              <TableCell>{getCategoryBadge(notice.category)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {notice.title}
                  {notice.isImportant && (
                    <Badge variant="destructive" className="ml-2">
                      중요
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{notice.viewCount.toLocaleString()}</TableCell>
              <TableCell>
                {notice.startDate && notice.endDate
                  ? `${format(new Date(notice.startDate), "yyyy.MM.dd", { locale: ko })} ~ ${format(new Date(notice.endDate), "yyyy.MM.dd", {
                      locale: ko,
                    })}`
                  : "-"}
              </TableCell>
              <TableCell>{format(new Date(notice.createdAt), "yyyy.MM.dd HH:mm", { locale: ko })}</TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
