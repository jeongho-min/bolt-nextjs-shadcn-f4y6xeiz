"use client";

import { Department, MedicalSubject } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/data-table";
import { MoreHorizontal, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DepartmentWithSubjects extends Department {
  subjects: MedicalSubject[];
}

interface DepartmentTableProps {
  departments: DepartmentWithSubjects[];
  onStatusToggle: (id: string, currentStatus: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubjects: (id: string) => void;
}

export function DepartmentTable({ departments, onStatusToggle, onEdit, onDelete, onAddSubjects }: DepartmentTableProps) {
  const columns: Column<DepartmentWithSubjects>[] = [
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
      header: "진료과목",
      cell: (department) => (
        <div className="flex flex-wrap gap-1 max-w-[300px]">
          {department.subjects?.length > 0 ? (
            department.subjects.map((subject) => (
              <Badge key={subject.id} variant="outline" className="text-xs">
                {subject.name}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">등록된 진료과목이 없습니다</span>
          )}
        </div>
      ),
    },
    {
      header: () => (
        <div className="flex items-center gap-1">
          상태
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>예약하기 화면에서 해당 부서의 표시 여부를 결정합니다.</p>
                <p>숨김 상태인 경우 예약 시 선택할 수 없습니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
      cell: (department) => (
        <Badge
          variant={department.isActive ? "default" : "secondary"}
          className="cursor-pointer hover:opacity-80"
          onClick={() => onStatusToggle(department.id, department.isActive)}
        >
          {department.isActive ? "표시" : "숨김"}
        </Badge>
      ),
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
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(department.id)}>수정</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddSubjects(department.id)}>진료과목 추가</DropdownMenuItem>
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
