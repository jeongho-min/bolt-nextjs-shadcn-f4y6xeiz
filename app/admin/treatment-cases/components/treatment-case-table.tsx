"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/data-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface TreatmentCase {
  id: string;
  title: string;
  description: string;
  date: string;
  order_num: number;
  is_active: boolean;
  treatment_categories: {
    id: string;
    name: string;
  };
}

interface Props {
  treatmentCases: TreatmentCase[];
  onEdit: (treatmentCase: TreatmentCase) => void;
  onDelete: (id: string) => void;
}

export function TreatmentCaseTable({ treatmentCases, onEdit, onDelete }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedCaseId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCaseId) {
      onDelete(selectedCaseId);
      setDeleteDialogOpen(false);
      setSelectedCaseId(null);
    }
  };

  const columns: Column<TreatmentCase>[] = [
    {
      header: "제목",
      cell: (item) => (
        <div>
          <div className="font-medium">{item.title}</div>
          <div className="text-sm text-muted-foreground">{item.description}</div>
        </div>
      ),
    },
    {
      header: "카테고리",
      cell: (item) => <Badge variant="outline">{item.treatment_categories.name}</Badge>,
    },
    {
      header: "날짜",
      cell: (item) => format(new Date(item.date), "PPP", { locale: ko }),
    },
    {
      header: "상태",
      cell: (item) => <Badge variant={item.is_active ? "default" : "secondary"}>{item.is_active ? "활성" : "비활성"}</Badge>,
    },
    {
      header: "",
      className: "w-[100px]",
      cell: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>수정</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteClick(item.id)} className="text-red-600">
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable data={treatmentCases} columns={columns} pageSize={10} />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>치료 사례 삭제</DialogTitle>
            <DialogDescription>정말 이 치료 사례를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
