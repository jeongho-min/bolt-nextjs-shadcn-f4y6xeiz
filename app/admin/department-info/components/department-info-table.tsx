"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface DepartmentInfo {
  id: string;
  name: string;
  type: "KOREAN" | "WESTERN";
  icon: string;
  description: string;
  order_num: number;
  is_active: boolean;
}

interface Props {
  departments: DepartmentInfo[];
  onEdit: (department: DepartmentInfo) => void;
  onDelete: (id: string) => void;
}

export function DepartmentInfoTable({ departments, onEdit, onDelete }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedDepartmentId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDepartmentId) {
      onDelete(selectedDepartmentId);
      setDeleteDialogOpen(false);
      setSelectedDepartmentId(null);
    }
  };

  const columns = [
    {
      header: "이름",
      cell: (item: DepartmentInfo) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-muted-foreground">{item.description}</div>
        </div>
      ),
    },
    {
      header: "유형",
      cell: (item: DepartmentInfo) => <Badge variant={item.type === "KOREAN" ? "default" : "secondary"}>{item.type === "KOREAN" ? "한의학" : "양의학"}</Badge>,
    },
    {
      header: "아이콘",
      cell: (item: DepartmentInfo) => item.icon,
    },
    {
      header: "순서",
      cell: (item: DepartmentInfo) => item.order_num,
    },
    {
      header: "상태",
      cell: (item: DepartmentInfo) => <Badge variant={item.is_active ? "default" : "secondary"}>{item.is_active ? "활성" : "비활성"}</Badge>,
    },
    {
      header: "",
      className: "w-[100px]",
      cell: (item: DepartmentInfo) => (
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
      <DataTable data={departments} columns={columns} pageSize={10} />

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>진료과목 삭제</DialogTitle>
            <DialogDescription>정말 이 진료과목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
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
