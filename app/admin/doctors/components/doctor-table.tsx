"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DataTable, type Column } from "@/app/components/ui/data-table";
import { Department, Doctor } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type DoctorWithDepartment = Doctor & {
  department: Department;
};

interface DoctorTableProps {
  doctors: DoctorWithDepartment[];
  onStatusToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => void;
}

export function DoctorTable({ doctors, onStatusToggle, onDelete }: DoctorTableProps) {
  const router = useRouter();

  const columns: Column<DoctorWithDepartment>[] = [
    {
      header: "이름",
      accessorKey: "name",
    },
    {
      header: "소속과",
      cell: (doctor: DoctorWithDepartment) => doctor.department.name,
    },
    {
      header: "직책",
      accessorKey: "position",
      cell: (doctor: DoctorWithDepartment) => doctor.position || "-",
    },
    {
      header: "전문분야",
      cell: (doctor: DoctorWithDepartment) => (
        <div className="flex flex-wrap gap-1">
          {doctor.specialties?.split(", ").map((specialty: string, index: number) => (
            <Badge key={index} variant="outline">
              {specialty}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "상태",
      cell: (doctor: DoctorWithDepartment) => <Switch checked={doctor.isActive} onCheckedChange={() => onStatusToggle(doctor.id)} />,
    },
    {
      header: "관리",
      cell: (doctor: DoctorWithDepartment) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>의사 삭제</AlertDialogTitle>
              <AlertDialogDescription>정말로 이 의사를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(doctor.id)}>삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      className: "w-[100px]",
    },
  ];

  return (
    <DataTable
      data={doctors}
      columns={columns}
      onRowClick={(doctor: DoctorWithDepartment) => router.push(`/admin/doctors/${doctor.id}`)}
      rowClassName="cursor-pointer hover:bg-muted/50"
      pageSize={20}
    />
  );
}
