"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/data-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface TreatmentCategory {
  id: string;
  name: string;
  description: string | null;
  order_num: number;
  is_active: boolean;
}

interface Props {
  categories: TreatmentCategory[];
  onEdit: (category: TreatmentCategory) => void;
  onDelete: (id: string) => void;
}

export function TreatmentCategoryTable({ categories, onEdit, onDelete }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedCategoryId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategoryId) {
      onDelete(selectedCategoryId);
      setDeleteDialogOpen(false);
      setSelectedCategoryId(null);
    }
  };

  const columns: Column<TreatmentCategory>[] = [
    {
      header: "이름",
      cell: (item) => (
        <div>
          <div className="font-medium">{item.name}</div>
          {item.description && <div className="text-sm text-muted-foreground">{item.description}</div>}
        </div>
      ),
    },
    {
      header: "순서",
      cell: (item) => item.order_num,
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
      <DataTable data={categories} columns={columns} pageSize={10} />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>카테고리 삭제</DialogTitle>
            <DialogDescription>정말 이 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
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
