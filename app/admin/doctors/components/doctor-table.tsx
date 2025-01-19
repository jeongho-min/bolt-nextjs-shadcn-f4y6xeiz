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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, doctorId: string) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest('[role="switch"]')) {
      return;
    }
    router.push(`/admin/doctors/${doctorId}`);
  };

  return (
    <Table className="w-full border">
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>소속과</TableHead>
          <TableHead>직책</TableHead>
          <TableHead>전문분야</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.id} className="cursor-pointer hover:bg-muted/50" onClick={(e) => handleRowClick(e, doctor.id)}>
            <TableCell>{doctor.name}</TableCell>
            <TableCell>{doctor.department.name}</TableCell>
            <TableCell>{doctor.position || "-"}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {doctor.specialties?.split(", ").map((specialty, index) => (
                  <Badge key={index} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Switch checked={doctor.isActive} onCheckedChange={() => onStatusToggle(doctor.id)} />
            </TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
