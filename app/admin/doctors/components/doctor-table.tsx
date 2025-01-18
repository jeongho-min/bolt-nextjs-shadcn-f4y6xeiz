"use client";

import { Doctor, Department } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/app/components/ui/data-table";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type DoctorWithDepartment = Doctor & {
  department: Department;
};

interface DoctorTableProps {
  doctors: DoctorWithDepartment[];
  onStatusToggle: (id: string, currentStatus: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DoctorTable({ doctors, onStatusToggle, onEdit, onDelete }: DoctorTableProps) {
  const columns: Column<DoctorWithDepartment>[] = [
    {
      header: "이름",
      cell: (doctor) => (
        <div>
          <div className="font-medium">{doctor.name}</div>
          <div className="text-sm text-muted-foreground">{doctor.position}</div>
        </div>
      ),
    },
    {
      header: "진료과",
      cell: (doctor) => <Badge variant="outline">{doctor.department.name}</Badge>,
    },
    {
      header: "전문분야",
      cell: (doctor) => doctor.specialties || "-",
    },
    {
      header: "상태",
      cell: (doctor) => <Badge variant={doctor.isActive ? "default" : "secondary"}>{doctor.isActive ? "진료중" : "휴진중"}</Badge>,
    },
    {
      header: "등록일",
      cell: (doctor) => format(new Date(doctor.createdAt), "PPP", { locale: ko }),
    },
    {
      header: "",
      className: "w-[80px]",
      cell: (doctor) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(doctor.id)}>수정</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(doctor.id)} className="text-destructive">
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return <DataTable data={doctors} columns={columns} pageSize={10} />;
}
