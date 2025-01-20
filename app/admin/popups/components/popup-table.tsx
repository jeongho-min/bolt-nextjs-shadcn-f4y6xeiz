"use client";

import { PopupNotice } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

interface PopupTableProps {
  popups: PopupNotice[];
  onEdit: (id: string) => void;
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

export function PopupTable({ popups, onEdit, onDelete }: PopupTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">카테고리</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[100px]">이미지</TableHead>
            <TableHead className="w-[150px]">게시기간</TableHead>
            <TableHead className="w-[100px]">상태</TableHead>
            <TableHead className="w-[100px]">우선순위</TableHead>
            <TableHead className="w-[100px] text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {popups.map((popup) => (
            <TableRow key={popup.id}>
              <TableCell>{getCategoryBadge(popup.category)}</TableCell>
              <TableCell>{popup.title}</TableCell>
              <TableCell>
                {popup.imageUrl && (
                  <div className="relative w-[50px] h-[50px] overflow-hidden rounded-lg border">
                    <Image src={popup.imageUrl} alt={popup.title} fill className="object-cover" sizes="50px" unoptimized />
                  </div>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(popup.startDate), "yyyy.MM.dd", { locale: ko })} ~ {format(new Date(popup.endDate), "yyyy.MM.dd", { locale: ko })}
              </TableCell>
              <TableCell>
                {popup.isActive ? (
                  <Badge variant="default" className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    활성
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <EyeOff className="w-3 h-3" />
                    비활성
                  </Badge>
                )}
              </TableCell>
              <TableCell>{popup.priority}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(popup.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(popup.id)}>
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
