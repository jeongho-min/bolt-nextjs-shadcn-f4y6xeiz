"use client";

import { Department } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/app/components/ui/data-table";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DepartmentTableProps {
  departments: Department[];
  onStatusToggle: (id: string, currentStatus: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DepartmentTable({ departments, onStatusToggle, onEdit, onDelete }: DepartmentTableProps) {
  const columns: Column<Department>[] = [
    {
      header: "부서명",
      cell: (department) => (
        <div>
          <div className="font-medium">{department.name}</div>
          <div className="text-sm text-muted-foreground">{department.description}</div>
        </div>
      ),
    },
    {
      header: "상태",
      cell: (department) => <Badge variant={department.isActive ? "default" : "secondary"}>{department.isActive ? "운영중" : "운영중단"}</Badge>,
    },
    {
      header: "등록일",
      cell: (department) => format(new Date(department.createdAt), "PPP", { locale: ko }),
    },
    {
      header: "",
      className: "w-[80px]",
      cell: (department) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(department.id)}>수정</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(department.id)} className="text-destructive">
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return <DataTable data={departments} columns={columns} pageSize={10} />;
}
